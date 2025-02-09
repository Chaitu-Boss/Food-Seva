from datetime import timedelta
from flask import Blueprint,request,jsonify
from geopy.distance import geodesic
from app.utils.sendSms import sendSms
from app.utils.getResponse import getResponse
import os

routes = Blueprint('routes', __name__)
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@routes.route('/')
def index():
    return 'hello world'

def calculate_distance(coord1, coord2):
    return geodesic(coord1, coord2).km

NGO_LIST = [
    {"name": "Helping Hands", "phone": "+917045454218", "address": {"coordinates": [18.940123, 72.842345]}},
    {"name": "Food Relief NGO", "phone": "+918779631531", "address": {"coordinates": [18.936541, 72.815234]}},
    {"name": "Hunger Free India", "phone": "+919152747228", "address": {"coordinates": [28.6900, 77.1200]}}
]

@routes.route("/upload-food", methods=["POST"])
def upload_food():
    try:

        data = request.get_json()

        donor_name=data["donor"]
        food_details = ", ".join([f"{item['totalQuantity']} of {item['foodName']}" for item in data["foodItems"]])
        donor_location = (data["pickupLocation"]["coordinates"]["lat"], data["pickupLocation"]["coordinates"]["lng"])
        print(data['pickupLocation']["coordinates"]['lat'])

        nearby_ngos = [
              ngo for ngo in NGO_LIST if calculate_distance(donor_location, ngo["address"]["coordinates"]) <= 5
        ]
        if not nearby_ngos:
            return jsonify({"message": "No NGOs found within 5 km"}), 404

        sms_results = []
        for ngo in nearby_ngos:
            sms_sid = sendSms(ngo, donor_name, food_details)
            sms_results.append({"ngo": ngo["name"], "sms_sid": sms_sid})

        return jsonify({
            "message": f"{len(nearby_ngos)} NGOs notified",
            "nearby_ngos": nearby_ngos
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@routes.route("/chat", methods=["POST"])
def chat():
    try:
        data = request.get_json()
        print(data["user_input"])
        response = getResponse(data["user_input"])
        return jsonify({"response": response})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@routes.route("/predict", methods=["POST"])
def predict():
    try:
        if "image" not in request.files:
            return jsonify({"error": "No image uploaded"}), 401
    
        image = request.files["image"]
        if image.filename == "":
            return jsonify({"error": "No selected file"}), 400
    
        image_path = os.path.join(UPLOAD_FOLDER, image.filename)
        image.save(image_path)  # Save the image

        return jsonify({"message": "Image uploaded successfully!", "image_path": image_path})
    except Exception as e:
        return jsonify({"error": str(e)}), 500