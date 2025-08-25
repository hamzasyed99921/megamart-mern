import { contact } from '@/api/internal';
import { useEffect, useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaHeadset } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({type: '', text: ''});
  const {username,email} = useSelector((state) => state.user);
  // console.log(email)

  // Auto-fill form with user data if logged in
  useEffect(() => {
    
    if (username && email) {
      // If user is logged in, pre-fill the name field
      setFormData(prev => ({
        ...prev,
        name: username, // Using username as name since that's what's stored
        email
      }));
    }
  }, [username, email]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({type: '', text: ''});

    let data = {
      username: formData.name,
      email: formData.email,
      message: formData.message
    }
  
    try {
      
      const response = await contact(data)
      // console.log(response.status)
      if(response.status === 201){
        setMessage({type: 'success', text: 'Your message was sent successfully!' });
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      }
     
    } catch (error) {
      console.error("API Error:", error);
      setMessage({ type: 'error', text: 'Failed to send message. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-100/40 via-white/60 to-purple-100/40 py-12 px-4">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold text-blue-900 mb-6 futuristic-title drop-shadow-2xl">
          Contact Us
        </h1>
        <p className="text-xl text-blue-700 max-w-2xl mx-auto">
          Get in touch with our team. We&apos;re here to help and answer any questions you might have.
        </p>
        <div className="mt-8 flex justify-center">
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 via-blue-600 to-purple-500 rounded-full"></div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white/30 backdrop-blur-md rounded-2xl p-8 border border-cyan-200/40 futuristic-card">
              <h2 className="text-3xl font-bold text-blue-900 futuristic-title mb-6">
                Get In Touch
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaPhone className="text-xl text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-blue-900 mb-2">Phone</h3>
                    <p className="text-blue-700">+1 (555) 123-4567</p>
                    <p className="text-blue-700">+1 (555) 987-6543</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaEnvelope className="text-xl text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-blue-900 mb-2">Email</h3>
                    <p className="text-blue-700">support@megamart.com</p>
                    <p className="text-blue-700">info@megamart.com</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaMapMarkerAlt className="text-xl text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-blue-900 mb-2">Address</h3>
                    <p className="text-blue-700">123 Tech Street</p>
                    <p className="text-blue-700">Innovation City, IC 12345</p>
                    <p className="text-blue-700">United States</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaClock className="text-xl text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-blue-900 mb-2">Business Hours</h3>
                    <p className="text-blue-700">Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p className="text-blue-700">Saturday: 10:00 AM - 4:00 PM</p>
                    <p className="text-blue-700">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Support Card */}
            <div className="bg-gradient-to-r from-cyan-400/20 via-blue-600/20 to-purple-500/20 rounded-2xl p-8 border border-cyan-200/40 futuristic-card">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaHeadset className="text-2xl text-white" />
                </div>
                <h3 className="text-2xl font-bold text-blue-900 mb-4">24/7 Support</h3>
                <p className="text-blue-700 mb-6">
                  Need immediate assistance? Our support team is available around the clock to help you.
                </p>
                <button className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-600 text-white rounded-xl font-bold shadow-lg hover:from-blue-600 hover:to-cyan-400 transition-all duration-200 futuristic-btn">
                  Live Chat
                </button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/30 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-cyan-200/40 futuristic-card">
            <h2 className="text-3xl font-bold text-blue-900 futuristic-title mb-6">
              Send us a Message
            </h2>
            
            {message.text && (
              <div className={`mb-6 p-4 rounded-lg text-center ${
                message.type === 'success' 
                  ? 'bg-green-100/80 border border-green-300 text-green-800' 
                  : 'bg-red-100/80 border border-red-300 text-red-800'
              }`}>
                {message.text}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="font-semibold text-blue-900 futuristic-title">Full Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="px-4 py-3 rounded-lg border border-cyan-200/60 bg-white/60 backdrop-blur-md focus:ring-2 focus:ring-cyan-300 outline-none transition-all duration-200"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="font-semibold text-blue-900 futuristic-title">Email Address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="px-4 py-3 rounded-lg border border-cyan-200/60 bg-white/60 backdrop-blur-md focus:ring-2 focus:ring-cyan-300 outline-none transition-all duration-200"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="font-semibold text-blue-900 futuristic-title">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                  className="px-4 py-3 rounded-lg border border-cyan-200/60 bg-white/60 backdrop-blur-md focus:ring-2 focus:ring-cyan-300 outline-none transition-all duration-200 resize-none"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-400 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:from-cyan-400 hover:to-blue-600 transition-all duration-200 futuristic-btn text-lg tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending Message...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact