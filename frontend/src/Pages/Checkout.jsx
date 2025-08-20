import { useEffect, useMemo, useState } from 'react';
import { getCart, saveCart } from '@/utils/cart';
import { placeOrder, updateProduct, getProductsById } from '@/api/internal';
import { useNavigate } from 'react-router-dom';

// Function to convert image URL to base64
const convertImageToBase64 = async (imageUrl) => {
  try {
    if (!imageUrl) return '';
    
    // If it's already a base64 string, return as is
    if (imageUrl.startsWith('data:image')) {
      return imageUrl;
    }
    
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Error converting image to base64:', error);
    return imageUrl; // Return original URL if conversion fails
  }
};

const Checkout = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [shipping, setShipping] = useState({
    fullName: localStorage.getItem('token') || '',
    email: localStorage.getItem('email') || '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });

  useEffect(() => {
    const items = getCart();
    setCart(items);
  }, []);

  const total = useMemo(() => cart.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0), [cart]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShipping(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      setMessage({ type: 'error', text: 'Your cart is empty.' });
      return;
    }

    setSubmitting(true);
    setMessage({ type: '', text: '' });

    const orderPayload = {
      user: {
        name: shipping.fullName,
        email: shipping.email,
        phone: shipping.phone,
      },
      shippingAddress: {
        address: shipping.address,
        city: shipping.city,
        postalCode: shipping.postalCode,
        country: shipping.country,
      },
      items: cart.map(i => ({ id: i.id, name: i.name || i.title, price: Number(i.price), quantity: i.quantity })),
    };
    // console.log(orderPayload)
    try {
      const response = await placeOrder(orderPayload);
      console.log(response)
      if (response.status === 201 || response.status === 200) {
        // Reduce stock per item
        try {
          console.log('Starting stock updates for cart items:', cart);
          const updates = cart.map(async (item) => {
            try {
              console.log(`Processing item: ${item.name}, ID: ${item.id}`);
              
              // Use the item.id (which might be the product name) to get product data
              let productId = item.id;
              let productResponse;
              
              // Try to get product by the stored ID/name
              try {
                productResponse = await getProductsById(productId);
                console.log('Product response:', productResponse);
              } catch (error) {
                console.error(`❌ Failed to get product by ID/name: ${productId}`, error);
                return null;
              }
              
              if (productResponse && productResponse.data) {
                const currentStock = Number(productResponse.data.stock || 0);
                const qty = Number(item.quantity || 0);
                const newStock = Math.max(0, currentStock - qty);
                
                console.log(`Stock calculation for ${item.name}: ${currentStock} - ${qty} = ${newStock}`);
                
                // Convert image to base64
                const base64Image = await convertImageToBase64(productResponse.data.image);
                console.log(`Image converted to base64 for ${item.name}`);
                
                // Update product with new stock
                const updateData = {
                  stock: newStock,
                  name: productResponse.data.name,
                  price: productResponse.data.price,
                  description: productResponse.data.description,
                  discount: productResponse.data.discount || 0,
                  category: productResponse.data.category,
                  image: base64Image,
                  isActive: productResponse.data.isActive
                };
                
                console.log(`Updating product ${productId} with data:`, updateData);
                const updateResponse = await updateProduct(productId, updateData);
                console.log(`Update response for ${item.name}:`, updateResponse);
                
                if (updateResponse && (updateResponse.status === 200 || updateResponse.status === 201)) {
                  console.log(`✅ Successfully updated stock for ${item.name}: ${currentStock} -> ${newStock}`);
                  return updateResponse;
                } else {
                  console.error(`❌ Failed to update stock for ${item.name}:`, updateResponse);
                  return null;
                }
              } else {
                console.error(`❌ No product data found for ID: ${productId}`);
                return null;
              }
            } catch (error) {
              console.error(`❌ Error updating stock for ${item.name}:`, error);
              console.error('Error details:', error.response?.data);
              return null; // Don't throw, just return null to continue with other items
            }
          });
          
          const res = await Promise.allSettled(updates);
          console.log('Stock update results:', res);
          
          // Check results
          const successful = res.filter(r => r.status === 'fulfilled' && r.value !== null).length;
          const failed = res.filter(r => r.status === 'rejected' || r.value === null).length;
          console.log(`Stock updates: ${successful} successful, ${failed} failed`);
          
          if (successful > 0) {
            console.log('✅ Some stock updates were successful');
          } else {
            console.error('❌ No stock updates were successful');
          }
          
        } catch (e) {
          console.error('❌ Stock update failed for some items:', e);
        }

        // Clear cart
        saveCart([]);
        setMessage({ type: 'success', text: 'Order placed successfully!' });
        // Optional: navigate to a confirmation page
        alert('Order Placed Successfully!')
        // setTimeout(() => navigate('/'), 1200);
      } else {
        setMessage({ type: 'error', text: 'Failed to place order. Please try again.' });
      }
    } catch (error) {
      console.error('placeOrder error:', error);
      const serverMessage = error.response?.data?.message;
      setMessage({ type: 'error', text: serverMessage || 'Failed to place order. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-xl text-blue-700">
        Your cart is empty.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
        <div className='mb-4'>
        <button onClick={() => navigate('/cart')} className="mt-6 w-full sm:w-auto px-8 py-2 bg-gradient-to-r from-cyan-400 to-blue-600 text-white rounded-xl font-bold shadow-lg hover:from-blue-600 hover:to-cyan-400 transition-all disabled:opacity-50">
            Back
          </button>
        </div>
      <h1 className="text-3xl font-extrabold text-blue-900 mb-6 futuristic-title">Checkout</h1>

      {message.text && (
        <div className={`mb-6 p-4 rounded-lg text-center ${message.type === 'success' ? 'bg-green-100/80 border border-green-300 text-green-800' : 'bg-red-100/80 border border-red-300 text-red-800'}`}>
          {message.text}
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Shipping Details */}
        <form onSubmit={handlePlaceOrder} className="lg:col-span-2 bg-white/60 rounded-2xl p-6 border border-cyan-200/40 futuristic-card">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">Shipping Details</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-blue-900">Full Name</label>
              <input name="fullName" value={shipping.fullName} onChange={handleChange} required className="px-4 py-3 rounded-lg border border-cyan-200/60 bg-white/60 focus:ring-2 focus:ring-cyan-300 outline-none" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-blue-900">Email</label>
              <input type="email" name="email" value={shipping.email} onChange={handleChange} required className="px-4 py-3 rounded-lg border border-cyan-200/60 bg-white/60 focus:ring-2 focus:ring-cyan-300 outline-none" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-blue-900">Phone</label>
              <input name="phone" value={shipping.phone} onChange={handleChange} required className="px-4 py-3 rounded-lg border border-cyan-200/60 bg-white/60 focus:ring-2 focus:ring-cyan-300 outline-none" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-blue-900">Address</label>
              <input name="address" value={shipping.address} onChange={handleChange} required className="px-4 py-3 rounded-lg border border-cyan-200/60 bg-white/60 focus:ring-2 focus:ring-cyan-300 outline-none" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-blue-900">City</label>
              <input name="city" value={shipping.city} onChange={handleChange} required className="px-4 py-3 rounded-lg border border-cyan-200/60 bg-white/60 focus:ring-2 focus:ring-cyan-300 outline-none" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-blue-900">Postal Code</label>
              <input name="postalCode" value={shipping.postalCode} onChange={handleChange} required className="px-4 py-3 rounded-lg border border-cyan-200/60 bg-white/60 focus:ring-2 focus:ring-cyan-300 outline-none" />
            </div>
            <div className="flex flex-col gap-2 sm:col-span-2">
              <label className="font-semibold text-blue-900">Country</label>
              <input name="country" value={shipping.country} onChange={handleChange} required className="px-4 py-3 rounded-lg border border-cyan-200/60 bg-white/60 focus:ring-2 focus:ring-cyan-300 outline-none" />
            </div>
          </div>

          <button type="submit" disabled={submitting} className="mt-6 w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-cyan-400 to-blue-600 text-white rounded-xl font-bold shadow-lg hover:from-blue-600 hover:to-cyan-400 transition-all disabled:opacity-50">
            {submitting ? 'Placing Order...' : 'Place Order'}
          </button>
        </form>

        {/* Order Summary */}
        <div className="bg-white/60 rounded-2xl p-6 border border-cyan-200/40 futuristic-card">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">Order Summary</h2>
          <ul className="divide-y">
            {cart.map((item, idx) => (
              <li key={idx} className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={item.image} alt={item.name || item.title} className="w-12 h-12 rounded object-cover" />
                  <div>
                    <div className="font-semibold text-blue-900">{item.name || item.title}</div>
                    <div className="text-sm text-blue-700">Qty: {item.quantity}</div>
                  </div>
                </div>
                <div className="font-bold text-blue-900">${(Number(item.price) * item.quantity).toFixed(2)}</div>
              </li>
            ))}
          </ul>
          <div className="mt-4 border-t pt-4 flex items-center justify-between text-xl font-bold text-blue-900">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout; 