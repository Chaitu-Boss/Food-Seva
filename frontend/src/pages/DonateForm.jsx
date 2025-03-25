import { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Carrot, Beef, CalendarRange, Package, Factory } from "lucide-react";
import { Button } from "@/components/ui/button"

const foodTypes = [
  "Processed food",
  "Vegetables",
  "Packed food",
  "Perishables",
  "Meat",
];

// function DonateForm() {

//   const user = JSON.parse(localStorage.getItem("user"));

//   const [formData, setFormData] = useState({
//     foodType: "",
//     quantity: "",
//     name: "",
//     expirationDate: "",
//   });

//   const [donatedItems, setDonatedItems] = useState([]); // Stores all added items
//   const [pickupLocation, setPickupLocation] = useState(""); // Stores pickup location
//   const [image, setImage] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleAddItem = (e) => {
//     e.preventDefault();

//     if (formData.foodType && formData.quantity && formData.name) {
//       setDonatedItems((prev) => [
//         ...prev,
//         {
//           id: Date.now(),
//           foodType: formData.foodType,
//           foodName: formData.name, // Store correctly
//           totalQuantity: formData.quantity,
//           expiryDate: formData.expirationDate, // Keep naming consistent
//         },
//       ]);

//       setFormData({ foodType: "", quantity: "", name: "", expirationDate: "" }); // Reset form
//     }
//   };

//   const handleRemoveItem = (id) => {
//     setDonatedItems((prev) => prev.filter((item) => item.id !== id)); // Remove item by id
//   };

//   const handleSubmitFood = async () => {

//     if(!image){
//       alert("Please upload an image")
//       return
//     }
//     try {
//       // Data to send to the backend
//       const data = {
//         donor: user?._id, // You can fetch the donor information based on your authentication
//         foodItems: donatedItems,
//         pickupLocation: {
//           street: "Princess Street",
//           city: "Mumbai",
//           state: "Maharashtra",
//           pincode: "400002",
//           coordinates: { lat: 18.9464, lng: 72.8293 }
//         }, // Pickup location can be dynamic as well
//       };

//       console.log(donatedItems)

//       const response = await axios.post("http://localhost:5000/api/food/upload-food", data);

//       console.log(response.data); // Handle the response from the backend
//       console.log("Data being sent:", data);
//       const sendSms = await axios.post("http://localhost:8080/upload-food", data, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       await axios.post("http://localhost:8080/predict", {image:image})
//       .then((res) => {
//         console.log(res.data.prediction);
//       })
//       .catch((err) => {
//         console.log(err);
//       });

//       console.log(sendSms.data);
//       setDonatedItems([]);
//       setPickupLocation("");
//     } catch (error) {
//       console.error("Error submitting food:", error.response ? error.response.data : error.message);
//     }
//   };

//     const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImage(file);
//     }
//   };

//   return (
//     <div className="pt-20 px-20 flex justify-between gap-10">
//       <div className="w-xl bg-white shadow-xl rounded-lg p-6 mb-6 flex-1">
//         <h2 className="text-xl font-semibold mb-2">Donate Food</h2>
//         <p className="text-gray-600 mb-4">Share your surplus food with people in need.</p>

//         <form onSubmit={handleAddItem} className="flex flex-col justify-center">
//           {/* Food Name */}
//           <div className="mb-4">
//             <input
//               type="text"
//               name="name"
//               placeholder="Food name"
//               value={formData.name}
//               onChange={handleChange}
//               className="w-full border border-gray-200 focus:outline-none focus:border-black p-2 rounded"
//               required
//             />
//           </div>

//           {/* Food Type */}
//           <div className="mb-4">
//             <select
//               name="foodType"
//               value={formData.foodType}
//               onChange={handleChange}
//               className={`w-full border border-gray-200 focus:outline-none focus:border-black p-2 rounded ${formData.foodType ? "text-black" : "text-gray-400"
//                 }`}
//               required
//             >
//               <option value="">Select food type</option>
//               {foodTypes.map((type) => (
//                 <option key={type} value={type}>
//                   {type}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Quantity */}
//           <div className="mb-4">
//             <input
//               type="number"
//               name="quantity"
//               placeholder="Quantity"
//               value={formData.quantity}
//               onChange={handleChange}
//               className="w-full border border-gray-200 focus:outline-none focus:border-black p-2 rounded"
//               required
//             />
//           </div>

//           {/* Expiration Date */}
//           <div className="mb-4">
//             <input
//               type="date"
//               name="expirationDate"
//               value={formData.expirationDate}
//               onChange={handleChange}
//               className={`w-full border border-gray-200 focus:outline-none focus:border-black p-2 rounded ${formData.expirationDate ? "text-black" : "text-gray-400"
//                 }`}
//               required
//             />
//           </div>

//           {/* Add Item Button */}
//           <button type="submit" className="w-1/2 cursor-pointer mb-4 mx-auto bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
//             Add Item +
//           </button>
//         </form>

//         {/* Pickup Location */}
//         <div className="mb-4">
//           <input
//             type="text"
//             placeholder="Pickup Location"
//             value={pickupLocation}
//             onChange={(e) => setPickupLocation(e.target.value)}
//             className="w-full border border-gray-200 focus:outline-none focus:border-black p-2 rounded"
//             required
//           />
//         </div>

//         {/* Submit Button */}
//         <button onClick={handleSubmitFood} className="w-full cursor-pointer bg-amber-500 text-white p-2 rounded hover:bg-amber-600">
//           Submit Food to donate
//         </button>
//       </div>

//       {/* Display Added Items Side by Side */}
//       <div className="w-1/2 bg-white shadow-xl rounded-lg p-6 mb-6 flex flex-col justify-x-center items-center">
//         {donatedItems.length === 0 ? (
//           <div className="text-center font-bold text-gray-500">No items added yet</div>

//         ) : (
//           <div>
//             <div className="text-bold text-xl mb-4 text-center border-b-2 pb-2 border-gray-200">Added Items:</div>
//             <div className="mt-5 flex flex-col space-y-4">
//               {donatedItems.map((item, index) => (
//                 <div key={item.id} className="flex gap-10 items-center">
//                   <div className="text-gray-700">
//                     {index + 1}. {item.foodName} ({item.foodType}) - {item.totalQuantity} units (Exp: {item.expiryDate})
//                   </div>
//                   {/* Remove Item Button */}
//                   <button
//                     onClick={() => handleRemoveItem(item.id)}
//                     className="text-red-500 cursor-pointer hover:text-red-700"
//                   >
//                     Remove
//                   </button>
//                 </div>

//               ))}
//             </div>

//           </div>

//         )}
//         <div className="flex flex-col items-center mt-4">
//   <input
//     type="file"
//     accept="image/*"
//     onChange={handleImageChange}
//     className="hidden"
//     id="fileUpload"
//   />
//   <label
//     htmlFor="fileUpload"
//     className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
//   >
//     Upload Image
//   </label>
//   {image && <p className="mt-2 text-sm text-gray-500">{image.name}</p>}
// </div>

//       </div>
//     </div>
//   );
// }

// export default DonateForm;

const DonateForm = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  const [formData, setFormData] = useState({
    foodType: "",
    quantity: "",
    name: "",
    expirationDate: "",
  });

  const [donatedItems, setDonatedItems] = useState([]); // Stores all added items
  const [pickupLocation, setPickupLocation] = useState(""); // Stores pickup location
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const getFoodIcon = (foodType) => {
    const icons = {
      Vegetables: <Carrot className="text-gray-700 w-6 h-6" />,
      "Processed food": <Factory className="text-gray-700 w-6 h-6" />,
      "Packed food": <Package className="text-gray-700 w-6 h-6" />,
      Perishables: <CalendarRange className="text-gray-700 w-6 h-6" />,
      Meat: <Beef className="text-gray-700 w-6 h-6" />,
    };
    return icons[foodType] || null; // Returns the correct icon or null if not found
  };

  const handleAddItem = (e) => {
    e.preventDefault();

    if (formData.foodType && formData.quantity && formData.name) {
      setDonatedItems((prev) => [
        ...prev,
        {
          id: Date.now(),
          foodType: formData.foodType,
          foodName: formData.name, // Store correctly
          totalQuantity: formData.quantity,
          expiryDate: formData.expirationDate, // Keep naming consistent
        },
      ]);

      setFormData({ foodType: "", quantity: "", name: "", expirationDate: "" }); // Reset form
    }
  };

  const handleRemoveItem = (id) => {
    setDonatedItems((prev) => prev.filter((item) => item.id !== id)); // Remove item by id
  };

  const handleSubmitFood = async () => {
    if (!image) {
      alert("Please upload an image");
      return;
    }
    try {
      // Data to send to the backend
      const data = {
        donor: user?._id, // You can fetch the donor information based on your authentication
        foodItems: donatedItems,
        pickupLocation: {
          street: "Princess Street",
          city: "Mumbai",
          state: "Maharashtra",
          pincode: "400002",
          coordinates: { lat: 18.9464, lng: 72.8293 },
        }, // Pickup location can be dynamic as well
      };

      console.log(donatedItems);

      const response = await axios.post(
        "http://localhost:5000/api/food/upload-food",
        data
      );

      console.log(response.data); // Handle the response from the backend
      console.log("Data being sent:", data);
      const sendSms = await axios.post(
        "http://localhost:8080/upload-food",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      await axios
        .post("http://localhost:8080/predict", { image: image })
        .then((res) => {
          console.log(res.data.prediction);
        })
        .catch((err) => {
          console.log(err);
        });

      console.log(sendSms.data);
      setDonatedItems([]);
      setPickupLocation("");
    } catch (error) {
      console.error(
        "Error submitting food:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  return (
    <div className="p-0 h-fit px-10 flex justify-between gap-15 pb-2 bg-[#F0ECCF]">
      <div className="w-xl bg-transparent rounded-lg p-6 flex-1">
        <h2 className="text-xl  mb-2 font-bold">Donate Food</h2>
        <p className="text-gray-600 mb-4">
          Help people in need by listing surplus food items for donation.
        </p>
        <form
          onSubmit={handleAddItem}
          className="flex flex-col justify-center "
        >
          {/* Food Name */}
          <div className="mb-4">
            <label htmlFor="name" className="font-medium text-lg">
              Food Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Food name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 focus:outline-none focus:border-b-black p-2 rounded"
              required
            />
          </div>

          {/* Food Type */}
          <div className="mb-4">
            <label htmlFor="foodType" className="font-medium text-lg">
              Food Type
            </label>
            <select
              name="foodType"
              value={formData.foodType}
              onChange={handleChange}
              className={`w-full border border-gray-300 focus:outline-none  p-2 rounded ${
                formData.foodType ? "text-black" : "text-gray-400"
              }`}
              required
            >
              <option value="">Select food type</option>
              {foodTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Quantity */}
          <div className="mb-4">
            <label htmlFor="quantity " className="font-medium text-lg">
              Quantity
            </label>
            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full border border-gray-300 focus:outline-none focus:border-b-black p-2 rounded"
              required
            />
          </div>

          {/* Expiration Date */}
          {/* <div className="mb-4">
            <input
              type="date"
              name="expirationDate"
              value={formData.expirationDate}
              onChange={handleChange}
              className={`w-full border border-gray-200 focus:outline-none focus:border-black p-2 rounded ${formData.expirationDate ? "text-black" : "text-gray-400"
                }`}
              required
            />
          </div> */}
          {/* date picker */}
          <div className="bg-transparent rounded-lg">
            <label className="block text-lg font-medium text-gray-800 mb-2">
              Expiration Date
            </label>

            <DatePicker
              className="p-2 w-full border border-gray-300   rounded"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </div>

          {/* Add Item Button */}
          <button
            type="submit"
            className="w-1/2 cursor-pointer mb-4 mt-4 mx-auto bg-[#13333E] hover:bg-[#1d2d33] text-white p-2 rounded-[24px]"
          >
            Add Item +
          </button>
        </form>

        {/* Pickup Location */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Pickup Location"
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
            className="w-full border border-gray-300 focus:outline-none p-2 rounded"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmitFood}
          className="w-full cursor-pointer bg-[#13333E] text-white p-2 rounded-[24px] hover:bg-[#1d2e34]"
        >
          Submit Food to donate
        </button>
      </div>

      {/* Display Added Items Side by Side */}

      <div className="w-1/2 bg-transparent  rounded-lg p-6  flex flex-col justify-x-center ">
        <h1 className="text-2xl font-bold mb-2">List of Items</h1>
        {donatedItems.length === 0 ? (
          <div className="text-center font-bold text-gray-800">
            No items added yet
          </div>
        ) : (
          <div>
            <div className="text-bold text-xl mb-4 text-center  pb-2 ">
              Added Items:
            </div>
            <div className="flex gap-10 items-center">
              {/* Remove Item Button */}
            </div>
            <div className="bg-transparent rounded-lg w-full">
              {donatedItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-45 p-3 rounded-md  align-center"
                >
                  {/* Left: Icon + Food Info */}
                  <div className="flex items-center gap-4">
                    {/* Icon Wrapper */}
                    <div className="bg-transparent  p-2 rounded-lg">
                      {getFoodIcon(item.foodType)}
                    </div>

                    {/* Food Name & Quantity */}
                    <div>
                      <p className="text-lg font-semibold text-gray-800">
                        {item.foodName}
                      </p>
                      <p className="text-sm text-[#B2954C] font-medium">
                        Quantity: {item.totalQuantity} {item.unit}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center ">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden bg-transparent"
                      id="fileUpload"
                    />
                    <label
                      htmlFor="fileUpload"
                      className="cursor-pointer text-black bg-transparent border-1 p-1 rounded-sm"
                    >
                      Upload Image
                    </label>
                    {image && (
                      <p className="mt-2 text-sm text-gray-500">{image.name}</p>
                    )}
                  </div>
                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-gray-700 hover:text-black justify-end m-0"
                  >
                    <span className="text-2xl m-0">&times;</span>
                  </button>
                  <br />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonateForm;

// import { useState } from "react";
// import axios from "axios";

// const foodTypes = ["Processed food", "Vegetables", "Packed food", "Perishables", "Meat"];

// function DonateForm() {
//   const user = JSON.parse(localStorage.getItem("user"));

//   const [formData, setFormData] = useState({
//     foodType: "",
//     quantity: "",
//     name: "",
//     expirationDate: "",
//   });

//   const [donatedItems, setDonatedItems] = useState([]);
//   const [pickupLocation, setPickupLocation] = useState("");
//   const [image, setImage] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

// const handleImageChange = (e) => {
//   const file = e.target.files[0];
//   if (file) {
//     setImage(file);
//   }
// };

//   const handleAddItem = (e) => {
//     e.preventDefault();

//     if (formData.foodType && formData.quantity && formData.name) {
//       const newItem = {
//         id: Date.now(),
//         foodType: formData.foodType,
//         foodName: formData.name,
//         totalQuantity: formData.quantity,
//         expiryDate: formData.expirationDate,
//       };

//       setDonatedItems((prev) => [...prev, newItem]);
//       setFormData({ foodType: "", quantity: "", name: "", expirationDate: "" });
//     }
//   };

//   const handleRemoveItem = (id) => {
//     setDonatedItems((prev) => prev.filter((item) => item.id !== id));
//   };

//   const handleSubmitFood = async () => {
//     try {
//       const formData = new FormData();
//       formData.append("donor", user?._id);
//       formData.append("pickupLocation", JSON.stringify({
//         street: "Princess Street",
//         city: "Mumbai",
//         state: "Maharashtra",
//         pincode: "400002",
//         coordinates: { lat: 18.9464, lng: 72.8293 }
//       }));

//       donatedItems.forEach((item, index) => {
//         formData.append(`foodItems[${index}][foodType]`, item.foodType);
//         formData.append(`foodItems[${index}][foodName]`, item.foodName);
//         formData.append(`foodItems[${index}][totalQuantity]`, item.totalQuantity);
//         formData.append(`foodItems[${index}][expiryDate]`, item.expiryDate);
//       });

//       if (image) {
//         formData.append("image", image);
//       }

//       const response = await axios.post("http://localhost:5000/api/food/upload-food", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       console.log(response.data);
//       setDonatedItems([]);
//       setPickupLocation("");
//       setImage(null);
//     } catch (error) {
//       console.error("Error submitting food:", error.response ? error.response.data : error.message);
//     }
//   };

//   return (
//     <div className="pt-20 px-20 flex justify-between gap-10">
//       <div className="w-xl bg-white shadow-xl rounded-lg p-6 mb-6 flex-1">
//         <h2 className="text-xl font-semibold mb-2">Donate Food</h2>
//         <p className="text-gray-600 mb-4">Share your surplus food with people in need.</p>

//         <form onSubmit={handleAddItem} className="flex flex-col justify-center">
//           <input type="text" name="name" placeholder="Food name" value={formData.name} onChange={handleChange} className="w-full border border-gray-200 focus:outline-none focus:border-black p-2 rounded mb-4" required />

//           <select name="foodType" value={formData.foodType} onChange={handleChange} className="w-full border border-gray-200 focus:outline-none focus:border-black p-2 rounded mb-4" required>
//             <option value="">Select food type</option>
//             {foodTypes.map((type) => (
//               <option key={type} value={type}>{type}</option>
//             ))}
//           </select>

//           <input type="number" name="quantity" placeholder="Quantity" value={formData.quantity} onChange={handleChange} className="w-full border border-gray-200 focus:outline-none focus:border-black p-2 rounded mb-4" required />

//           <input type="date" name="expirationDate" value={formData.expirationDate} onChange={handleChange} className="w-full border border-gray-200 focus:outline-none focus:border-black p-2 rounded mb-4" required />

//           <button type="submit" className="w-1/2 cursor-pointer mb-4 mx-auto bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Add Item +</button>
//         </form>
//       </div>

//       <div className="w-1/2 bg-white shadow-xl rounded-lg p-6 mb-6 flex flex-col justify-center items-center relative">
//         {donatedItems.length === 0 ? (
//           <div className="text-center font-bold text-gray-500">No items added yet</div>
//         ) : (
//           <div>
//             <div className="text-bold text-xl mb-4 text-center border-b-2 pb-2 border-gray-200">Added Items:</div>
//             <div className="mt-5 flex flex-col space-y-4">
//               {donatedItems.map((item, index) => (
//                 <div key={item.id} className="flex gap-10 items-center">
//                   <div className="text-gray-700">{index + 1}. {item.foodName} ({item.foodType}) - {item.totalQuantity} units (Exp: {item.expiryDate})</div>
//                   <button onClick={() => handleRemoveItem(item.id)} className="text-red-500 cursor-pointer hover:text-red-700">Remove</button>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         <input type="file" accept="image/*" onChange={handleImageChange} className="absolute bottom-4 right-4 cursor-pointer bg-gray-200 px-4 py-2 rounded hover:bg-gray-300" />

//         <button onClick={handleSubmitFood} className="mt-4 w-full cursor-pointer bg-amber-500 text-white p-2 rounded hover:bg-amber-600">Submit Food to donate</button>
//       </div>
//     </div>
//   );
// }

// export default DonateForm;
