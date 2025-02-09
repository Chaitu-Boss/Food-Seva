// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const Dashboard = () => {
//   const [user, setUser] = useState(null);
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem('user'));
//     if (storedUser) {
//       setUser(storedUser);
//       fetchData(storedUser);
//     }
//   }, []);

//   const fetchData = async (user) => {
//     try {
//       const endpoint =
//         user.role === 'donor'
//           ? `http://localhost:5000/api/donations/${user._id}`
//           : `http://localhost:5000/api/claims/${user._id}`;
//       const response = await axios.get(endpoint);

//       if (response.headers['content-type'].includes('application/json')) {
//         setData(response.data); // Set data if valid JSON response
//       } else {
//         console.error('Expected JSON response, but got:', response.headers['content-type']);
//         setData([]); // Set empty array for invalid response
//       }
//     } catch (error) {
//       console.error('Error fetching data', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderRow = (item, index) => {
//     if (user?.role === 'donor') {
//       return (
//         <tr key={item._id} className="text-gray-700 justify-center items-center">
//           <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
//           <td className="border border-gray-300 px-4 py-2 text-center">
//             {item.donorFoodDetails.foodItems[0]?.foodName} ({item.donorFoodDetails.foodItems[0]?.foodType})
//           </td>
//           <td className="border border-gray-300 px-4 py-2 text-center">
//             {new Date(item.donorFoodDetails.createdAt).toLocaleDateString()}
//           </td>
//           <td className="border border-gray-300 px-4 py-2 text-center">{item.donorFoodDetails.status}</td>
//         </tr>
//       );
//     } else {
//       return (
//         <tr key={item._id} className="text-gray-700">
//           <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
//           <td className="border border-gray-300 px-4 py-2">
//             Claimed: {item.claimedQuantity} {item.donorFoodDetails.foodItems[0]?.foodName}
//           </td>
//           <td className="border border-gray-300 px-4 py-2">
//             {new Date(item.claimedAt).toLocaleDateString()}
//           </td>
//           <td className="border border-gray-300 px-4 py-2">{item.status}</td>
//         </tr>
//       );
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6">
//         <h1 className="text-2xl font-bold text-gray-800">
//           {user?.role === 'donor' ? 'Your Donations' : 'Your Claims'}
//         </h1>

//         {loading ? (
//           <p className="text-gray-600 mt-4">Loading...</p>
//         ) : (
//           <div className="mt-6">
//             {data.length > 0 ? (
//               <table className="w-full border-collapse border border-gray-300 text-center">
//                 <thead>
//                   <tr className="bg-gray-200">
//                     <th className="border border-gray-300 px-4 py-2">Sr No.</th>
//                     <th className="border border-gray-300 px-4 py-2">
//                       {user?.role === 'donor' ? 'Donation Details' : 'Claim Details'}
//                     </th>
//                     <th className="border border-gray-300 px-4 py-2">Date</th>
//                     <th className="border border-gray-300 px-4 py-2">Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>{data.map((item, index) => renderRow(item, index))}</tbody>
//               </table>
//             ) : (
//               <p className="text-gray-600 text-center mt-4">
//                 {user?.role === 'donor' ? 'No donations found.' : 'No claims found.'}
//               </p>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      fetchData(storedUser);
    }
  }, []);

  const fetchData = async (user) => {
    try {
      const endpoint =
        user.role === 'donor'
          ? `http://localhost:5000/api/donations/${user._id}`
          : `http://localhost:5000/api/claims/${user._id}`;

      const response = await axios.get(endpoint, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }, // Ensure auth
      });

      setData(response.data); // Store fetched data
    } catch (error) {
      console.error('Error fetching data', error);
    } finally {
      setLoading(false);
    }
  };

  const renderRow = (item, index) => {
    if (user?.role === 'donor') {
      return (
        <tr key={item._id} className="text-gray-700">
          <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
          <td className="border border-gray-300 px-4 py-2 text-center">
            {item.foodItems.map(food => `${food.foodName} (${food.foodType})`).join(', ')}
          </td>
          <td className="border border-gray-300 px-4 py-2 text-center">
            {new Date(item.createdAt).toLocaleDateString()}
          </td>
          <td className="border border-gray-300 px-4 py-2 text-center">{item.status}</td>
        </tr>
      );
    } else {
      return (
        <tr key={item._id} className="text-gray-700">
          <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
          <td className="border border-gray-300 px-4 py-2">
            Claimed: {item.claimedQuantity} {item.foodItems[0]?.foodName}
          </td>
          <td className="border border-gray-300 px-4 py-2">
            {new Date(item.claimedAt).toLocaleDateString()}
          </td>
          <td className="border border-gray-300 px-4 py-2">{item.status}</td>
        </tr>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800">
          {user?.role === 'donor' ? 'Your Donations' : 'Your Claims'}
        </h1>

        {loading ? (
          <p className="text-gray-600 mt-4">Loading...</p>
        ) : (
          <div className="mt-6">
            {data.length > 0 ? (
              <table className="w-full border-collapse border border-gray-300 text-center">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 px-4 py-2">Sr No.</th>
                    <th className="border border-gray-300 px-4 py-2">
                      {user?.role === 'donor' ? 'Food Items' : 'Claim Details'}
                    </th>
                    <th className="border border-gray-300 px-4 py-2">Date</th>
                    <th className="border border-gray-300 px-4 py-2">Status</th>
                  </tr>
                </thead>
                <tbody>{data.map((item, index) => renderRow(item, index))}</tbody>
              </table>
            ) : (
              <p className="text-gray-600 text-center mt-4">
                {user?.role === 'donor' ? 'No donations found.' : 'No claims found.'}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
