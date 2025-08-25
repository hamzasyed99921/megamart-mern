import { useEffect, useState } from 'react';
import { getCart, saveCart } from '@/utils/cart';
import { Link } from 'react-router-dom';

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart(getCart());
    const onChange = () => setCart(getCart());
    window.addEventListener('cartChange', onChange);
    return () => window.removeEventListener('cartChange', onChange);
  }, []);

  const getTotal = () => cart.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);

  const handleRemove = (id) => {
    const newCart = cart.filter(item => item.id !== id);
    setCart(newCart);
    saveCart(newCart);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 text-blue-700">
        <div className="text-xl">Your cart is empty.</div>
        <Link
          to="/my-orders"
          className="inline-block px-6 py-3 bg-gradient-to-r from-purple-400 to-indigo-600 text-white rounded-xl font-bold shadow-lg hover:from-indigo-600 hover:to-purple-400 transition-all duration-200"
        >
          See Your Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-blue-900 mb-6">Your Cart</h1>
      <div className="bg-white/60 rounded-2xl shadow-xl p-6">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2">Image</th>
              <th className="py-2">Title</th>
              <th className="py-2">Price</th>
              <th className="py-2">Quantity</th>
              <th className="py-2">Total</th>
              <th className="py-2">Remove</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, idx) => (
              <tr key={idx} className="border-b last:border-b-0">
                <td className="py-2"><img src={item.image} alt={item.name || item.title} className="w-16 h-16 object-cover rounded" /></td>
                <td className="py-2 font-semibold text-blue-900">{item.name || item.title}</td>
                <td className="py-2 text-cyan-700 font-bold">${item.price}</td>
                <td className="py-2">{item.quantity}</td>
                <td className="py-2 text-blue-900 font-bold">${(Number(item.price) * item.quantity).toFixed(2)}</td>
                <td className="py-2">
                  <button onClick={() => handleRemove(item.id)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-700 transition-all text-xs font-bold">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-6 gap-4">
          <div className="text-2xl font-bold text-blue-900">
            Grand Total: ${getTotal().toFixed(2)}
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/checkout" className="inline-block px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-600 text-white rounded-xl font-bold shadow-lg hover:from-blue-600 hover:to-cyan-400 transition-all duration-200">
              Proceed to Checkout
            </Link>
            <Link to="/my-orders" className="inline-block px-6 py-3 bg-gradient-to-r from-purple-400 to-indigo-600 text-white rounded-xl font-bold shadow-lg hover:from-indigo-600 hover:to-purple-400 transition-all duration-200">
              See Your Orders
            </Link>
          </div>
            
        </div>
      </div>
    </div>
  );
};

export default Cart; 