import { useEffect, useState } from 'react';
import { approveOrder, getOrders } from '@/api/internal';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await getOrders();
      if (response && response.data) {
        setOrders(response.data);
      } else {
        setError('Failed to fetch orders');
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Error loading orders');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (orderId) => {
    if (!window.confirm('Approve this order?')) return;
    try {
      await approveOrder(orderId);
      alert('Order approved successfully!');
      fetchOrders();
    } catch (err) {
      console.error('Approve error', err);
      alert('Failed to approve order');
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading orders...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600 mt-10">{error}</p>;
  }

  return (
    <div className="min-h-[70vh] bg-gradient-to-br from-cyan-100/40 via-white/60 to-purple-100/40 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-900">Orders</h1>
        <button
          onClick={() => navigate(-1)}
          className="bg-gradient-to-r from-blue-600 to-cyan-400 text-white px-6 py-2 rounded-xl font-bold shadow-lg hover:from-cyan-400 hover:to-blue-600 transition-all duration-200"
        >
          Back
        </button>
      </div>
      <div className="overflow-x-auto bg-white/30 backdrop-blur-md rounded-2xl p-4">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-blue-600/20 to-cyan-400/20">
            <tr>
              <th className="px-4 py-2 text-left">Order ID</th>
              <th className="px-4 py-2 text-left">User</th>
              <th className="px-4 py-2 text-left">Total</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-b border-cyan-200/40">
                <td className="px-4 py-3">{order._id}</td>
                <td className="px-4 py-3">{order.user?.name || 'N/A'}</td>
                <td className="px-4 py-3">${order.total?.toFixed(2)}</td>
                <td className="px-4 py-3">{order.status}</td>
                <td className="px-4 py-3">
                  {order.status !== 'approved' && (
                    <button
                      onClick={() => handleApprove(order._id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded"
                    >
                      Approve
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
