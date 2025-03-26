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

  let serialNumber = 1; // Global counter to ensure unique serial numbers

  const renderRow = (item) => {
    if (user?.role === 'donor') {
      return item.foodItems.map((food) => (
        <tr key={`${item._id}-${food.foodName}`} className="text-gray-700">
          <td className="border border-gray-300 px-4 py-2 text-center">{serialNumber++}</td>
          <td className="border border-gray-300 px-4 py-2 text-center">
            {food.foodName} ({food.foodType})
          </td>
          <td className="border border-gray-300 px-4 py-2 text-center">
            {new Date(item.createdAt).toLocaleDateString()}
          </td>
          <td className="border border-gray-300 px-4 py-2 text-center">{item.status}</td>
        </tr>
      ));
    } else {
      return item.foodItems.map((food) => (
        <tr key={`${item._id}-${food.foodName}`} className="text-gray-700">
          <td className="border border-gray-300 px-4 py-2 text-center">{serialNumber++}</td>
          <td className="border border-gray-300 px-4 py-2 text-center">
            Claimed: {item.claimedQuantity} {food.foodName}
          </td>
          <td className="border border-gray-300 px-4 py-2 text-center">
            {new Date(item.claimedAt).toLocaleDateString()}
          </td>
          <td className="border border-gray-300 px-4 py-2 text-center">{item.status}</td>
        </tr>
      ));
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
