import { createProducts } from '@/api/internal';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';



const Account = () => {
  const [form, setForm] = useState({
    name: '',
    price: '',
    description: '',
    discount: '',
    category: '',
    stock: '',
    isActive: true,
    imageUrl: '',
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate()

  // Default image for preview
  const DEFAULT_IMAGE = 'https://via.placeholder.com/300x200?text=No+Image';

  useEffect(() => {
    // Check if user is logged in
    const checkLogin = () => {
      const loggedInUser = localStorage.getItem('auth');
      setIsLoggedIn(!!loggedInUser);
    };
    checkLogin();
    window.addEventListener('authChange', checkLogin);
    return () => window.removeEventListener('authChange', checkLogin);
    
  }, []);

  const handleChange = async (e) => {
    const { name, value, type, files, checked } = e.target;
    if (type === 'file') {
      const file = files[0];
      if (!file) return;
      setUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({ ...prev, imageUrl: reader.result }));
        setImagePreview(reader.result);
        setUploading(false);
      };
      reader.readAsDataURL(file);
    } else if (type === 'checkbox') {
      setForm({ ...form, [name]: checked });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Validate required fields
    if (!form.name || !form.price || !form.description || !form.category) {
      alert('Please fill in all required fields (Name, Price, Description, Category)');
      setSubmitting(false);
      return;
    }

    // Validate price is a positive number
    if (parseFloat(form.price) <= 0) {
      alert('Price must be a positive number');
      setSubmitting(false);
      return;
    }

    // Validate stock is a positive integer
    if (parseInt(form.stock) < 0) {
      alert('Stock must be a non-negative number');
      setSubmitting(false);
      return;
    }

    // Validate discount is between 0 and 100
    if (parseInt(form.discount) < 0 || parseInt(form.discount) > 100) {
      alert('Discount must be between 0 and 100');
      setSubmitting(false);
      return;
    }
    
    const data = {
      name: form.name.trim(),
      price: parseFloat(form.price),
      description: form.description.trim(),
      discount: parseInt(form.discount) || 0,
      stock: parseInt(form.stock) || 0,
      category: form.category.trim(),
      image: form.imageUrl || '',
      isActive: Boolean(form.isActive),
    };
    
  
    try {
      const response = await createProducts(data);
      // console.log('Response:', response);
      
      if (response && response.data) {
        alert('Product submitted successfully!');
        setForm({
          name: '',
          price: '',
          description: '',
          discount: '',
          category: '',
          stock: '',
          isActive: true,
          imageUrl: '',
        });
        setImagePreview(null);
      } else {
        alert('Failed to submit product. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit product. Please check the console for details.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gradient-to-br from-cyan-100/40 via-white/60 to-purple-100/40 py-12 px-2">
        <div className="w-full max-w-xl bg-white/30 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-cyan-200/40 futuristic-card text-center">
          <h1 className="text-3xl font-extrabold text-blue-900 mb-8 futuristic-title drop-shadow-lg">Account</h1>
          <p className="text-lg text-blue-800">You must be logged in to view this page. Please log in first.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gradient-to-br from-cyan-100/40 via-white/60 to-purple-100/40 py-12 px-2">
        <div className='mb-4 self-end mx-5'>
        <button 
        onClick={() => navigate('/product/list')}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-400 text-white px-6 py-2 rounded-xl font-bold shadow-lg hover:from-cyan-400 hover:to-blue-600 transition-all duration-200 futuristic-btn text-lg tracking-wide"
          >
            Product List
          </button>
        </div>
      <div className="w-full max-w-xl bg-white/30 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-cyan-200/40 futuristic-card">
        <h1 className="text-3xl font-extrabold text-blue-900 mb-8 futuristic-title drop-shadow-lg text-center">Add Product</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {[
            { name: 'name', label: 'Product Name', type: 'text' },
            { name: 'price', label: 'Price', type: 'number', min: '0', step: '0.01'  },
            { name: 'description', label: 'Description', type: 'text' },
            { name: 'discount', label: 'Discount (%)', type: 'number', min: '0', max: '100' },
            { name: 'category', label: 'Category', type: 'text' },
            { name: 'stock', label: 'Stock Quantity', type: 'number', min: '0' }
          ].map((field) => (
            <div className="flex flex-col gap-2" key={field.name}>
              <label className="font-semibold text-blue-900 futuristic-title">
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                value={form[field.name]}
                onChange={handleChange}
                min={field.min}
                max={field.max}
                step={field.step}
                required
                className="px-4 py-2 rounded-lg border border-cyan-200/60 bg-white/60 backdrop-blur-md focus:ring-2 focus:ring-cyan-300 outline-none"
              />
            </div>
          ))}
          
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="isActive"
              checked={form.isActive}
              onChange={handleChange}
              className="w-5 h-5 text-cyan-600 bg-gray-100 border-gray-300 rounded focus:ring-cyan-500 focus:ring-2"
            />
            <label className="font-semibold text-blue-900 futuristic-title">Product Active</label>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold text-blue-900 futuristic-title">Product Image</label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleChange} 
              disabled={uploading} 
              className="px-4 py-2 rounded-lg border border-cyan-200/60 bg-white/60 backdrop-blur-md focus:ring-2 focus:ring-cyan-300 outline-none" 
            />
            {uploading && <p className="text-sm text-blue-700">Encoding image...</p>}
            <img
              src={imagePreview || DEFAULT_IMAGE}
              alt="Preview"
              className="mt-2 rounded-xl shadow-lg max-h-40 mx-auto border-2 border-cyan-200/60"
            />
          </div>
          
          <button 
            type="submit" 
            disabled={uploading || submitting} 
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-400 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:from-cyan-400 hover:to-blue-600 transition-all duration-200 futuristic-btn text-lg tracking-wide"
          >
            {uploading ? 'Encoding...' : submitting ? 'Processing...' : 'Submit Product'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Account;
