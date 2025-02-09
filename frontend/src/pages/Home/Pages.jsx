import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import img1 from "../../assets/Home/img1.png";
import img2 from "../../assets/Home/img2.png";
import img3 from "../../assets/Home/img3.png";

const Pages = () => {
    const pages = [
        {
            title: "Track your donations",
            description:
                "Our Real-Time Food Matching platform automatically connects food donors with NGOs based on real-time needs and location, ensuring efficient distribution and minimal waste. Whether you're a restaurant, store, or individual, our AI-driven system instantly pairs your surplus food with organizations that need it most. With seamless coordination and live tracking, donating food has never been easier or more impactful! ",
            image: img1,
            reverse: false,
        },
        {
            title: "Make a Bigger Impact",
            description:
                "Track Your Donations in Real Time Ensure your food donations reach the right place. From pickup to delivery, monitor every step with live GPS tracking, instant updates, and automated notifications. Stay informed, maintain transparency, and make a bigger impact by knowing exactly where your donation is and when it reaches those in need. Giving has never been this seamless!",
            image: img2,
            reverse: true, // Reverse layout for this section
        },
        {
            title: "Logistics support",
            description:
                "Logistics Support ensures your food donations are picked up, transported, and delivered efficiently. With real-time tracking, optimized routes, and dedicated coordination, we connect donors with reliable transport services, ensuring food reaches NGOs fresh and on time. Whether it's a single donation or large-scale distribution, our system streamlines the process, reducing waste and maximizing impact. ",
            image: img3,
            reverse: false,
        },
    ];

    return (
        <div className="w-full">
            {pages.map((page, index) => (
                <Section key={index} page={page} />
            ))}
        </div>
    );
};

const Section = ({ page }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["0.2 1", "0.8 0"], // Ensures smooth entry and exit
    });

    // Animations for text and image
    const textX = useTransform(scrollYProgress, [0, 0.5, 1], [page.reverse ? 150 : -150, 0, page.reverse ? 150 : -150]);
    const imageX = useTransform(scrollYProgress, [0, 0.5, 1], [page.reverse ? -150 : 150, 0, page.reverse ? -150 : 150]);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]); // Gradual fade-in and fade-out

    return (
        <div ref={ref} className="h-screen w-screen flex items-center justify-center px-16">
            {/* Text Section */}
            <motion.div
                className={`w-1/2 text-left ${page.reverse ? "order-2 text-right" : "order-1"}`}
                style={{ x: textX, opacity }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
            >
                <h2 className="text-5xl font-bold">{page.title}</h2>
                <p className="mt-4 text-xl text-gray-600">{page.description}</p>
            </motion.div>

            {/* Image Section */}
            <motion.img
                src={page.image}
                alt={page.title}
                className={`w-1/2 object-contain ${page.reverse ? "order-1" : "order-2"}`}
                style={{ x: imageX, opacity }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
            />
        </div>
    );
};

export default Pages;
