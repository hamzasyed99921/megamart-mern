import { useState, useEffect } from 'react';
import { getProducts, getOrders, approveOrder } from '@/api/internal';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const {auth:isLoggedIn, role:isAdmin} = useSelector((state) => state.user);

  // console.log(isLoggedIn, isAdmin)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts();
        if (res && res.data) {
          setProducts(res.data);
        } else {
          setError('Failed to load products');
        }
      } catch (err) {
        console.error(err);
        setError('Error loading products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

    const [orders, setOrders] = useState([]);

  useEffect(() => {
    // fetch products already
    const fetchOrders = async () => {
      try {
        const res = await getOrders();
        // console.log(res)
        if (res && res.data && Array.isArray(res.data.orders)) setOrders(res.data.orders);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrders();
  }, []);

  const metrics = {
    total: products.length,
    active: products.filter(p => p.isActive).length,
    lowStock: products.filter(p => (p.stock || 0) <= 10 && (p.stock || 0) > 0).length,
    outOfStock: products.filter(p => (p.stock || 0) === 0).length,
    orders: orders.length,
  };

  // Approve order and update status
  const handleApprove = async (orderId) => {
    if (!window.confirm('Approve this order?')) return;
    try {
      await approveOrder(orderId); // update in DB

      // Re-fetch latest orders from server to ensure state is in sync
      const res = await getOrders();
      if (res && res.data && Array.isArray(res.data.orders)) {
        setOrders(res.data.orders);
      } else {
        // fallback optimistic update if fetch fails
        setOrders(prev => prev.map(o => (o._id === orderId ? { ...o, status: 'approved' } : o)));
      }
    } catch (err) {
      console.error('Approve error', err);
      alert('Failed to approve order');
    }
  };

  if (!isLoggedIn || isAdmin !== 'admin') {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gradient-to-br from-cyan-100/40 via-white/60 to-purple-100/40 py-12 px-2">
        <div className="w-full max-w-xl bg-white/30 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-cyan-200/40 futuristic-card text-center">
          <h1 className="text-3xl font-extrabold text-blue-900 mb-8 futuristic-title drop-shadow-lg">Admin</h1>
          <p className="text-lg text-blue-800">You must be logged in to view this page. Please log in first.</p>
        </div>
      </div>
    );
  }
 
 

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <p className="text-red-600 text-xl">{error}</p>
      </div>
    );
  }



  return (
    <div className="min-h-[70vh] bg-gradient-to-br from-cyan-100/40 via-white/60 to-purple-100/40 py-10 px-4">
      <h1 className="text-center text-4xl font-extrabold text-blue-900 mb-10">Admin Dashboard</h1>

      {/* Summary metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
        {[
          { label: 'Total Products', value: metrics.total, color: 'blue' },
          { label: 'Active Products', value: metrics.active, color: 'green' },
          { label: 'Low Stock (≤10)', value: metrics.lowStock, color: 'yellow' },
          { label: 'Out of Stock', value: metrics.outOfStock, color: 'red' },
          { label: 'Orders', value: metrics.orders, color: 'purple' },
        ].map(card => (
          <div key={card.label} className={`bg-white/30 backdrop-blur-md rounded-xl p-6 border border-${card.color}-200/40 shadow-lg`}>
            <p className="text-sm font-medium text-gray-600">{card.label}</p>
            <p className={`text-3xl font-bold text-${card.color}-900`}>{card.value}</p>
          </div>
        ))}
      </div>

      {/* Orders Table */}
      <div className="max-w-6xl mx-auto bg-white/30 backdrop-blur-md rounded-2xl p-6 border border-purple-200/40 shadow-lg">
        <h2 className="text-2xl font-bold text-blue-900 mb-6">Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-blue-600/20 to-cyan-400/20">
              <tr>
                <th className="px-4 py-2 text-left text-lg font-extrabold uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 drop-shadow-[0_2px_8px_rgba(58,199,255,0.5)]">Order ID</th>
                <th className="px-4 py-2 text-left text-lg font-extrabold uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 drop-shadow-[0_2px_8px_rgba(58,199,255,0.5)]">User</th>
                <th className="px-4 py-2 text-left text-lg font-extrabold uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 drop-shadow-[0_2px_8px_rgba(58,199,255,0.5)]">Total</th>
                <th className="px-4 py-2 text-left text-lg font-extrabold uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 drop-shadow-[0_2px_8px_rgba(58,199,255,0.5)]">Status</th>
                <th className="px-4 py-2 text-left text-lg font-extrabold uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 drop-shadow-[0_2px_8px_rgba(58,199,255,0.5)]">Details</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <OrderRow key={order._id} order={order} onApprove={handleApprove} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin; 

// Expandable OrderRow component
const OrderRow = ({ order, onApprove }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <tr className="border-b border-cyan-200/40">
        <td className="px-4 py-3 font-mono text-cyan-500 text-shadow-lg tracking-wide text-base">{order?._id}</td>
        <td className="px-4 py-3 font-semibold text-blue-700 uppercase tracking-wide">{order?.user?.name || 'N/A'}</td>
        <td className="px-4 py-3 font-bold text-purple-700">${order?.total && typeof order.total === 'number' && order.total.toFixed ? order.total.toFixed(2) : order?.total || 'N/A'}</td>
        <td className="px-4 py-3">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${order?.status === 'approved' ? 'from-green-400 to-lime-400 text-green-900' : 'from-fuchsia-400 to-purple-400 text-purple-900'} shadow-md uppercase tracking-wider`}>{order?.status}</span>
        </td>
        <td className="px-4 py-3 space-x-2">
          {order?.status !== 'approved' && (
            <button
              onClick={() => onApprove(order._id)}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded"
            >
              Approve
            </button>
          )}
          <button
            onClick={() => setOpen((o) => !o)}
            className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-5 py-1.5 rounded-xl font-extrabold uppercase tracking-widest shadow-lg hover:from-blue-500 hover:to-cyan-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400/60 drop-shadow-[0_2px_8px_rgba(58,199,255,0.5)]"
            style={{ textShadow: '0 0 8px #3ac7ff99' }}
          >
            {open ? 'Hide' : 'View'}
          </button>
        </td>
      </tr>
      {open && (
        <tr>
          <td colSpan={5} className="bg-white/60 rounded-xl p-4">
            <div className="grid md:grid-cols-3 gap-4">
              {/* Order Items */}
              <div>
                <h3 className="font-bold text-blue-900 mb-2">Items</h3>
                <ul className="divide-y">
                  {(order?.items || []).map((item, idx) => (
                    <li key={idx} className="py-2 flex items-center justify-between">
                      <span>{item?.name}</span>
                      <span>Qty: {item?.quantity}</span>
                      <span>${item && item.price && item.quantity ? (Number(item.price) * item.quantity).toFixed(2) : 'N/A'}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Shipping Address */}
              <div>
                <h3 className="font-bold text-blue-900 mb-2">Shipping</h3>
                <div className="text-sm text-blue-800">
                  {order?.shippingAddress ? (
                    <>
                      <div>{order.shippingAddress?.address}</div>
                      <div>{order.shippingAddress?.city}, {order.shippingAddress?.postalCode}</div>
                      <div>{order.shippingAddress?.country}</div>
                    </>
                  ) : 'N/A'}
                </div>
              </div>
              {/* User Info */}
              <div>
                <h3 className="font-bold text-blue-900 mb-2">User Info</h3>
                <div className="text-sm text-blue-800">
                  <div>Name: {order?.user?.name || 'N/A'}</div>
                  <div>Email: {order?.user?.email || 'N/A'}</div>
                  <div>Phone: {order?.user?.phone || 'N/A'}</div>
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

OrderRow.propTypes = {
  order: PropTypes.shape({
    _id: PropTypes.string,
    user: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      phone: PropTypes.string,
    }),
    total: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    status: PropTypes.string,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        quantity: PropTypes.number,
        price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      })
    ),
    shippingAddress: PropTypes.shape({
      address: PropTypes.string,
      city: PropTypes.string,
      postalCode: PropTypes.string,
      country: PropTypes.string,
    }),
  }),
  onApprove: PropTypes.func,
}; 