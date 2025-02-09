import { useState } from "react";

export default function ComplianceChecklist() {
  const rulesText = ` The Food Safety and Standards Authority of India (FSSAI) is the regulatory body responsible for overseeing food safety and hygiene across the country. Established under the Food Safety and Standards Act, 2006, FSSAI sets comprehensive guidelines to ensure the safe production, storage, distribution, and donation of food items. All food businesses, including restaurants, manufacturers, and NGOs engaged in food donation, must comply with FSSAI regulations to ensure public health and safety. Key aspects of FSSAI compliance include proper hygiene and sanitation measures, safe handling and packaging of food items, and adherence to storage and transportation standards. Perishable foods must be stored at recommended temperatures to prevent spoilage, and all donated food must be clearly labeled with details such as preparation and expiry dates. Additionally, food handlers are required to maintain high personal hygiene, including wearing gloves, using clean utensils, and ensuring contamination-free environments during preparation. FSSAI also mandates that bulk donations from restaurants, caterers, and other food businesses must adhere to specific quality and safety norms. Donors must ensure that the food being distributed is fit for consumption and free from adulteration or contamination. Alcohol, tobacco, and other prohibited food items are strictly not allowed for donation. Any organization or individual engaging in large-scale food donation must register with FSSAI to ensure compliance with national food safety standards. This helps in maintaining transparency, traceability, and accountability in food distribution networks, ensuring that safe and nutritious food reaches those in need. `;

  const rules = [
    "I acknowledge that FSSAI regulations govern food safety and donation.",
    "I will ensure that all donated food meets hygiene and quality standards.",
    "I will not donate expired, contaminated, or partially consumed food.",
    "I will label food items properly with preparation and expiry dates.",
    "I will maintain proper storage conditions for perishable food items.",
    "I will comply with all guidelines related to bulk food donation.",
    "I will not donate alcohol, tobacco, or other restricted items.",
  ];

  const [checked, setChecked] = useState(Array(rules.length).fill(false));

  const handleCheck = (index) => {
    const updatedChecks = [...checked];
    updatedChecks[index] = !updatedChecks[index];
    setChecked(updatedChecks);
  };

  const allChecked = checked.every((c) => c);

  const handleProceedClick = () => {
    window.open("https://forms.gle/vJ6kzdK2MVwfoVVh7", "Form", "width=800,height=600");
  };

  return (
    <div className="w-full min-h-screen px-10 py-12 font-sans bg-gradient-to-br from-gray-300 to-white text-gray-900">
      <h2 className="text-5xl font-extrabold mb-6 tracking-wide text-center bg-clip-text text-black">Food Safety & FSSAI Regulations</h2>
      <div className="bg-white/70 p-6 rounded-2xl shadow-xl backdrop-blur-md border border-gray-200">
        <p className="text-lg leading-relaxed whitespace-pre-line text-gray-800">{rulesText}</p>
      </div>
      <h3 className="text-3xl font-semibold mt-10 mb-4 text-center text-gray-900">I agree to follow these regulations:</h3>
      <ul className="mb-8 space-y-4">
        {rules.map((rule, index) => (
          <li key={index} className="flex items-center space-x-4 bg-white p-4 rounded-xl shadow-md transition-transform transform hover:scale-101 border border-gray-300">
            <input type="checkbox" checked={checked[index]} onChange={() => handleCheck(index)} className="hidden peer" id={`checkbox-${index}`} />
            <label htmlFor={`checkbox-${index}`} className="w-7 h-7 flex items-center justify-center border-2 border-gray-400 rounded-md cursor-pointer transition-all peer-checked:border-green-500">
              {checked[index] && (
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </label>
            <span className="text-lg">{rule}<span className="text-red-700">*</span></span>
          </li>
        ))}
      </ul>
      <button onClick={handleProceedClick} className={`w-full text-lg font-medium px-6 py-4 rounded-lg text-white transition-all duration-300 shadow-xl ${allChecked ? "bg-green-500 hover:bg-green-600 transform hover:scale-102" : "bg-gray-300 cursor-not-allowed"}`} disabled={!allChecked}>Proceed to Form</button>
    </div>
  );
}