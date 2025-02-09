import React, { useEffect, useState } from "react";

const PopUps = () => {
    const stats = [
        { label: "DONATIONS", value: 2310 },
        { label: "ITEMS", value: 1219680 },
        { label: "POUNDS", value: 1219690 },
        { label: "MEALS SERVED", value: 1219690 },
    ];

    const [counts, setCounts] = useState(stats.map(() => 0));
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true); // Start animations

        const intervals = stats.map((stat, index) => {
            const increment = Math.ceil(stat.value / 90);
            return setInterval(() => {
                setCounts((prevCounts) => {
                    const newCounts = [...prevCounts];
                    if (newCounts[index] < stat.value) {
                        newCounts[index] = Math.min(newCounts[index] + increment, stat.value);
                    }
                    return newCounts;
                });
            }, 30);
        });

        return () => intervals.forEach((interval) => clearInterval(interval));
    }, []);

    return (
        <div className="flex mt-20 space-x-10 justify-center">
            {stats.map((stat, index) => (
                <div
                    key={index}
                    className={`bg-gray-200 p-6 text-center w-48 bg-opacity-50 shadow-2xl rounded-lg transition-all duration-700 ${isVisible
                            ? index % 2 === 0
                                ? "translate-y-0 opacity-100"
                                : "translate-y-0 opacity-100"
                            : index % 2 === 0
                                ? "-translate-y-20 opacity-0"
                                : "translate-y-20 opacity-0"
                        }`}
                >
                    <p className="font-bold text-black">{stat.label}</p>
                    <p className="text-lg font-extrabold text-black">
                        {counts[index].toLocaleString() + "+"}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default PopUps;
