import React from "react";
import { motion } from "framer-motion";
import img_network_1 from "../../assets/Home/img_network_1.png";
import img_network_2 from "../../assets/Home/img_network_2.png";
import img_network_3 from "../../assets/Home/img_network_3.png";

const networks = [
  {
    title: "Homeless Shelters",
    description:
      "Providing nutritious meals to those without a stable living situation.",
    image: img_network_1,
    animation: { y: 50 }, // Moves UP when appearing
  },
  {
    title: "Food Banks",
    description:
      "Ensuring food security for families and individuals facing hardship.",
    image: img_network_2,
    animation: { y: 50 }, // Moves DOWN when appearing
  },
  {
    title: "Community Kitchens",
    description:
      "Serving hot meals in a welcoming environment for the community.",
    image: img_network_3,
    animation: { y: 50 }, // Moves UP when appearing
  },
];

const OurNetworks = () => {
  return (
    <div className="w-full bg-[#eeecdd] pt-10 px-10 ">
      {/* Title animation */}
      <motion.h2
        className="text-3xl font-bold text-center mb-20"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }} // Disappear when scrolled away
        transition={{ duration: 0.8, ease: "easeInOut" }}
        viewport={{ once: false, amount: 0.3 }}
      >
        Our Network
      </motion.h2>

      {/* Cards Animation */}
      <div className="flex justify-center gap-10">
        {networks.map((network, index) => (
          <motion.div
            key={index}
            className="w-80 bg-transparent rounded-2xl overflow-hidden"
            initial={{ opacity: 0, y: network.animation.y }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: network.animation.y }} // Disappear when scrolled away
            transition={{ duration: 0.8, ease: "easeInOut" }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <img
              src={network.image}
              alt={network.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-bold text-xl">{network.title}</h3>
              <p className="text-gray-600">{network.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default OurNetworks;
