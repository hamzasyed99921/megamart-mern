import { useEffect, useState } from 'react';
import { getOrders } from '@/api/internal';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

/**
 * ShowOrders page – displays the list of orders belonging to the currently
 * logged-in user. The username / email are retrieved from localStorage (these
 * values are saved during the login flow). All orders are fetched from the
 * backend and then filtered on the client side. If your backend already
 * exposes a user-specific endpoint, swap the call to that endpoint instead of
 * filtering in the UI.
 */
const ShowOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const {auth:loggedIn, username} = useSelector((state) => state.user);

  useEffect(() => {
    const handler = () => {
      // Update login status whenever an auth change is detected
     
      // Always try to fetch orders again so the list stays in sync
      fetchUserOrders();
    };

    // Run once on mount
    handler();

    // Listen for custom authChange events that your auth logic should dispatch
    window.addEventListener('authChange', handler);

    return () => window.removeEventListener('authChange', handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchUserOrders = async () => {
    // Grab latest auth details each time we fetch so that a logout immediately
    // causes the request to return an empty list for this user

    try {
      setLoading(true);
      const response = await getOrders();
      if (response && response.data) {
        const allOrders = Array.isArray(response.data)
          ? response.data
          : Array.isArray(response.data.orders)
          ? response.data.orders
          : [];

        // Filter orders that belong to the logged-in user.
        // Adjust these property names if your API is different.
        const userOrders = allOrders.filter((order) => {
          const user = order.user || {};
          return (
            (username && user.username === username) ||
            (username && user.name === username)
          );
        });

        setOrders(userOrders);
      } else {
        setError('Failed to load orders');
      }
    } catch (err) {
      console.error('Error fetching user orders:', err);
      setError('Error loading orders');
    } finally {
      setLoading(false);
    }
  };

  // If the user is logged out simply prompt them to sign-in again
//   console.log(loggedIn)
  if (!loggedIn) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 text-blue-700">
        <p className="text-xl">Please sign in to view your orders.</p>
        <button
          onClick={() => navigate('/login')}
          className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-400 text-white rounded-xl font-bold shadow-lg hover:from-cyan-400 hover:to-blue-600 transition-all duration-200"
        >
          Login
        </button>
      </div>
    );
  }

  if (loading) {
    return <p className="text-center mt-10">Loading your orders...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600 mt-10">{error}</p>;
  }

  if (orders.length === 0 && loggedIn) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 text-blue-700">
        <p className="text-xl">You have not placed any orders yet.</p>
        <button
          onClick={() => navigate(-1)}
          className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-400 text-white rounded-xl font-bold shadow-lg hover:from-cyan-400 hover:to-blue-600 transition-all duration-200"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] bg-gradient-to-br from-cyan-100/40 via-white/60 to-purple-100/40 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-900">My Orders</h1>
        <button
          onClick={() => navigate(-1)}
          className="bg-gradient-to-r from-blue-600 to-cyan-400 text-white px-6 py-2 rounded-xl font-bold shadow-lg hover:from-cyan-400 hover:to-blue-600 transition-all duration-200"
        >
          Back
        </button>
      </div>
      {loggedIn ?  <div className="overflow-x-auto bg-white/30 backdrop-blur-md rounded-2xl p-4">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-blue-600/20 to-cyan-400/20">
            <tr>
              <th className="px-4 py-2 text-left">Order ID</th>
              <th className="px-4 py-2 text-left">Items</th>
              <th className="px-4 py-2 text-left">Total</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-b border-cyan-200/40">
                <td className="px-4 py-3 font-mono text-cyan-500 tracking-wide">
                  {order._id}
                </td>
                <td className="px-4 py-3">
                  {Array.isArray(order.items) ? order.items.map(i => i.name || i.title).join(', ') : 'N/A'}
                </td>
                <td className="px-4 py-3 font-bold text-purple-700">
                  ${order.total?.toFixed(2)}
                </td>
                <td className="px-4 py-3 capitalize font-bold text-green-700">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> : <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 text-blue-700">
        <p className="text-xl">Please sign in to view your orders.</p>
        <button
          onClick={() => navigate('/login')}
          className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-400 text-white rounded-xl font-bold shadow-lg hover:from-cyan-400 hover:to-blue-600 transition-all duration-200"
        >
          Login
        </button>
      </div> }
     
    </div>
  );
};

export default ShowOrders;
