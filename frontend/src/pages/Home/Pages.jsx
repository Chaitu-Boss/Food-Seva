// /* eslint-disable react/prop-types */
// import React, { useRef } from "react";
// import { motion, useScroll, useTransform } from "framer-motion";
// import img1 from "../../assets/Home/img1.png";
// import img2 from "../../assets/Home/img2.png";
// import img3 from "../../assets/Home/img3.png";

// const Pages = () => {
//   const pages = [
//     {
//       title: "Register Your Surplus",
//       description:
//         "Easily list your excess food, from produce to prepared meals.",
//       image: img1,
//     //   reverse: false,
//     },
//     {
//       title: "We Connect and Distribute",
//       description:
//         "Our platform finds nearby organizations that can utilize your donation, coordinating efficient and timely distribution.",
//       image: img2,
//     //   reverse: true, // Reverse layout for this section
//     },
//     {
//       title: "Track Your Impact",
//       description:
//         "Gain insights into the positive impact of your contributions through detailed reports.",
//       image: img3,
//       reverse: false,
//     },
//   ];

//   return (
//     <div className="w-screen bg-[#eeecdd] overflow-hidden">
//       {pages.map((page, index) => (
//         <Section key={index} page={page} />
//       ))}
//     </div>
//   );
// };
// const Section = ({ page }) => {
//   const ref = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: ref,
//     offset: ["0.2 1", "0.8 0"], // Ensures smooth entry and exit
//   });
//   // Animations for text and image
//   const textX = useTransform(
//     scrollYProgress,
//     [0, 0.5, 1],
//     [page.reverse ? 50 : -50, 0, page.reverse ? 50 : -50]
//   );
//   const imageX = useTransform(
//     scrollYProgress,
//     [0, 0.5, 1],
//     [page.reverse ? -50 : 50, 0, page.reverse ? -50 : 50]
//   );
//   const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]); // Gradual fade-in and fade-out

//   return (
//     <div
//       ref={ref}
//       className="h-screen w-screen flex items-center justify-center px-12 overflow-hidden"
//     >
//       {/* Text Section */}
//       <motion.div
//         className={`w-1/2 text-left ${
//           page.reverse ? "order-2 text-right" : "order-1"
//         }`}
//         style={{ x: textX, opacity }}
//         transition={{ duration: 0.7, ease: "easeInOut" }}
//       >
//         <h2 className="text-5xl font-bold">{page.title}</h2>
//         <p className="mt-4 text-xl text-gray-600">{page.description}</p>
//       </motion.div>

//       {/* Image Section */}
//       <motion.img
//         src={page.image}
//         alt={page.title}
//         className={`w-1/2 object-contain ${
//           page.reverse ? "order-1" : "order-2"
//         }`}
//         style={{ x: imageX, opacity }}
//         transition={{ duration: 0.7, ease: "easeInOut" }}
//       />
//     </div>
//   );
// };

// export default Pages;
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const steps = [
  {
    icon: "✏️",
    title: "Register Your Surplus",
    description:
      "Easily list your excess food, from produce to prepared meals.",
    reverse: false,
  },
  {
    icon: "📦",
    title: "We Connect and Distribute",
    description:
      "Our platform finds nearby organizations that can utilize your donation, coordinating efficient and timely distribution.",
    reverse: true,
  },
  {
    icon: "📊",
    title: "Track Your Impact",
    description:
      "Gain insights into the positive impact of your contributions through detailed reports.",
    reverse: false,
  },
];

const HowItWorks = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0.2 1", "0.8 0"], // Triggers animation smoothly
  });

  return (
    <div ref={ref} className="w-full bg-[#eeecdd] py-20 px-10">
      {/* Title Animation Fix */}
      <motion.h2
        className="text-4xl font-extrabold mb-16 text-center"
        style={{
          opacity: useTransform(scrollYProgress, [0, 0.2, 0.4, 0.6], [0, 1, 1, 1]),
          y: useTransform(scrollYProgress, [0, 0.1, 0.3, 0.5], [50, 0, 0, -50]),
        }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        How It Works
      </motion.h2>

      <div className="flex flex-col items-center space-y-20">
        {steps.map((step, index) => {
          // Animation triggers at different scroll positions
          const start = 0.1 + index * 0.1;
          const end = start + 0.4;

          const opacity = useTransform(scrollYProgress, [start, start + 0.1, end, end + 0.2], [0, 1, 1, 0]);
          const y = useTransform(scrollYProgress, [start, start + 0.1, end, end + 0.2], [50, 0, 0, -50]);

          return (
            <motion.div
              key={index}
              className={`w-[80%] flex items-center ${step.reverse ? "flex-row-reverse text-right" : "flex-row text-left"} space-x-6`}
              style={{ opacity, y }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              {/* Step Icon */}
              <span className="text-3xl bg-white p-4 rounded-full shadow-md">{step.icon}</span>

              {/* Step Content */}
              <div className="bg-white p-6 rounded-lg shadow-lg w-2/3">
                <h3 className="font-bold text-2xl">{step.title}</h3>
                <p className="text-gray-600 mt-2">{step.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default HowItWorks;

