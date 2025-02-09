// import React, { useState, useEffect } from 'react';
// import Navbar from '../../components/Navbar';
// import PopUps from './PopUps';
// import Pages from './Pages';
// import poverty from '../../assets/Home/poverty.png';
// import axios from "axios";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";

// const Home = () => {
//     const [latitude, setLatitude] = useState(0);
//     const [longitude, setLongitude] = useState(0);
//     const [address, setAddress] = useState("");
//     const [secondPoint, setSecondPoint] = useState({
//         lat: 19.0760,
//         lng: 72.8777,
//         name: "Predefined Location (Mumbai)",
//     });

//     useEffect(() => {
//         const fetchLocation = async () => {
//             if ("geolocation" in navigator) {
//                 navigator.geolocation.getCurrentPosition(async (position) => {
//                     const { latitude, longitude } = position.coords;
//                     setLatitude(latitude);
//                     setLongitude(longitude);
//                     console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

//                     try {
//                         const response = await axios.get(
//                             `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
//                         );
//                         setAddress(response.data.display_name);
//                         localStorage.setItem("address", address);
//                         console.log("Address:", response.data.display_name);
//                     } catch (error) {
//                         console.error("Error fetching address:", error);
//                     }
//                 });
//             }
//         };

//         fetchLocation();
//     }, []);

//     const initialText = "Imagine a world where no food goes to waste, and no one sleeps hungry. Every single day, perfectly good food is thrown away while millions struggle to find their next meal. This needs to change. We are on a mission to rescue surplus food, reduce wastage, and ensure that every meal reaches those who need it the most. Together, we can turn waste into hope, hunger into nourishment, and excess into opportunity. Join us in this movement—because every bite saved brings us closer to a better, more sustainable future for all.";

//     const [text, setText] = useState("");
//     const [valueTrue, setValueTrue] = useState(false);
//     let count = 0;

//     useEffect(() => {
//         const interval = setInterval(() => {
//             count++;
//             if (count <= initialText.length) {
//                 setText(initialText.substring(0, count));
//             } else {
//                 setValueTrue(true);
//                 clearInterval(interval);
//             }
//         }, 10);

//         return () => clearInterval(interval); // Clear interval on component unmount
//     }, [initialText]);

//     return (
//         <>

//             <div className="relative w-screen h-screen !overflow-hidden">
//                 {/* Background Image */}
//                 <div
//                     className="absolute inset-0 bg-cover bg-center brightness-30"
//                     style={{ backgroundImage: `url(${poverty})` }}
//                 >
//                 </div>

//                 {/* Content Above the Background */}
//                 <div className="relative z-10 text-white p-8">
//                     <PopUps />
//                     <p className='text-left flex text-[1.2em] mt-20 mx-40 text-white font-bold'>{text}</p>
//                 </div>
//             </div>
//             <Pages />
//             <div>
//                 {latitude && longitude && (
//                     <MapContainer
//                         center={[latitude, longitude]}
//                         zoom={10}
//                         className="h-[50vh] w-4xl rounded-lg mb-5"
//                     >
//                         {/* Map Tiles */}
//                         <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

//                         {/* Marker for Current Location */}
//                         <Marker position={[latitude, longitude]}>
//                             <Popup>Your Location</Popup>
//                         </Marker>

//                         {/* Marker for Second Location */}
//                         <Marker position={[secondPoint.lat, secondPoint.lng]}>
//                             <Popup>{secondPoint.name}</Popup>
//                         </Marker>
//                     </MapContainer>
//                 )}
//             </div>

//         </>
//     );
// };

// export default Home;

import React, { useState, useEffect, useRef } from "react";
import Navbar from "../../components/Navbar";
import PopUps from "./PopUps";
import Pages from "./Pages";
import poverty from "../../assets/Home/poverty.png";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-routing-machine";

const Home = () => {
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [address, setAddress] = useState("");
    const [secondPoint, setSecondPoint] = useState({
        lat: 19.076,
        lng: 72.8777,
        name: "Predefined Location (Mumbai)",
    });

    const mapRef = useRef(null);

    useEffect(() => {
        const fetchLocation = async () => {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(async (position) => {
                    const { latitude, longitude } = position.coords;
                    setLatitude(latitude);
                    setLongitude(longitude);
                    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

                    try {
                        const response = await axios.get(
                            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
                        );
                        setAddress(response.data.display_name);
                        localStorage.setItem("address", response.data.display_name);
                        console.log("Address:", response.data.display_name);
                    } catch (error) {
                        console.error("Error fetching address:", error);
                    }
                });
            }
        };

        fetchLocation();
    }, []);

    useEffect(() => {
        if (!latitude || !longitude || !mapRef.current) return;

        const map = mapRef.current;
        const routingControl = L.Routing.control({
            waypoints: [
                L.latLng(latitude, longitude),
                L.latLng(secondPoint.lat, secondPoint.lng),
            ],
            routeWhileDragging: true,
            lineOptions: {
                styles: [{ color: "blue", weight: 4 }],
            },
        }).addTo(map);

        return () => {
            map.removeControl(routingControl);
        };
    }, [latitude, longitude]);

    const initialText =
        "Imagine a world where no food goes to waste, and no one sleeps hungry. Every single day, perfectly good food is thrown away while millions struggle to find their next meal. This needs to change. We are on a mission to rescue surplus food, reduce wastage, and ensure that every meal reaches those who need it the most. Together, we can turn waste into hope, hunger into nourishment, and excess into opportunity. Join us in this movement—because every bite saved brings us closer to a better, more sustainable future for all.";

    const [text, setText] = useState("");
    const [valueTrue, setValueTrue] = useState(false);
    let count = 0;

    useEffect(() => {
        const interval = setInterval(() => {
            count++;
            if (count <= initialText.length) {
                setText(initialText.substring(0, count));
            } else {
                setValueTrue(true);
                clearInterval(interval);
            }
        }, 10);

        return () => clearInterval(interval); // Clear interval on component unmount
    }, [initialText]);

    return (
        <>
            <div className="relative w-screen h-screen !overflow-hidden">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center brightness-30"
                    style={{ backgroundImage: `url(${poverty})` }}
                ></div>

                {/* Content Above the Background */}
                <div className="relative z-10 text-white p-8">
                    <PopUps />
                    <p className="text-left flex text-[1.2em] mt-20 mx-40 text-white font-bold">
                        {text}
                    </p>
                </div>
            </div>
            <Pages />
            <div>
                {latitude && longitude && (
                    <MapContainer
                        center={[latitude, longitude]}
                        zoom={10}
                        className="h-[50vh] w-4xl rounded-lg mb-5"
                        ref={mapRef}
                    >
                        {/* Map Tiles */}
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                        {/* Marker for Current Location */}
                        <Marker position={[latitude, longitude]}>
                            <Popup>Your Location</Popup>
                        </Marker>

                        {/* Marker for Second Location */}
                        <Marker position={[secondPoint.lat, secondPoint.lng]}>
                            <Popup>{secondPoint.name}</Popup>
                        </Marker>
                    </MapContainer>
                )}
            </div>
        </>
    );
};

export default Home;
