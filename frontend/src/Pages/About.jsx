import React from 'react';
import { FaRocket, FaUsers, FaShieldAlt, FaHeart, FaStar, FaTrophy } from 'react-icons/fa';
import { MdSecurity, MdLocalShipping, MdSupport } from 'react-icons/md';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-100/40 via-white/60 to-purple-100/40">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-blue-600/20 to-purple-500/20"></div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-extrabold text-blue-900 mb-6 futuristic-title drop-shadow-2xl">
              About MegaMart
            </h1>
            <p className="text-xl md:text-2xl text-blue-700 max-w-3xl mx-auto leading-relaxed">
              Revolutionizing online shopping with cutting-edge technology and unparalleled customer experience
            </p>
            <div className="mt-8 flex justify-center">
              <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 via-blue-600 to-purple-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-blue-900 futuristic-title">
                Our Mission
              </h2>
              <p className="text-lg text-blue-700 leading-relaxed">
                At MegaMart, we're committed to transforming the way people shop online. Our mission is to provide 
                a seamless, secure, and enjoyable shopping experience that connects customers with the best products 
                from around the world.
              </p>
              <p className="text-lg text-blue-700 leading-relaxed">
                We believe in leveraging cutting-edge technology to create innovative solutions that make shopping 
                not just convenient, but truly delightful.
              </p>
              <div className="flex items-center gap-4 pt-4">
                <FaRocket className="text-4xl text-cyan-400" />
                <span className="text-xl font-semibold text-blue-800">Innovation Driven</span>
              </div>
            </div>
            <div className="bg-white/30 backdrop-blur-md rounded-2xl p-8 border border-cyan-200/40 futuristic-card shadow-2xl">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-cyan-400 mb-2">10K+</div>
                  <div className="text-blue-700">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
                  <div className="text-blue-700">Products</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-500 mb-2">24/7</div>
                  <div className="text-blue-700">Support</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-cyan-400 mb-2">99%</div>
                  <div className="text-blue-700">Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-16 px-4 bg-white/20 backdrop-blur-md">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-900 futuristic-title mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-blue-700 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/30 backdrop-blur-md rounded-2xl p-8 border border-cyan-200/40 futuristic-card text-center hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaShieldAlt className="text-2xl text-white" />
              </div>
              <h3 className="text-2xl font-bold text-blue-900 mb-4">Trust & Security</h3>
              <p className="text-blue-700 leading-relaxed">
                We prioritize the security of your data and transactions, ensuring a safe shopping environment.
              </p>
            </div>
            <div className="bg-white/30 backdrop-blur-md rounded-2xl p-8 border border-cyan-200/40 futuristic-card text-center hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaHeart className="text-2xl text-white" />
              </div>
              <h3 className="text-2xl font-bold text-blue-900 mb-4">Customer First</h3>
              <p className="text-blue-700 leading-relaxed">
                Every decision we make is centered around providing the best experience for our customers.
              </p>
            </div>
            <div className="bg-white/30 backdrop-blur-md rounded-2xl p-8 border border-cyan-200/40 futuristic-card text-center hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaStar className="text-2xl text-white" />
              </div>
              <h3 className="text-2xl font-bold text-blue-900 mb-4">Excellence</h3>
              <p className="text-blue-700 leading-relaxed">
                We strive for excellence in every aspect of our service, from product quality to customer support.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-900 futuristic-title mb-4">
              Why Choose MegaMart?
            </h2>
            <p className="text-xl text-blue-700 max-w-2xl mx-auto">
              Discover what makes us different from the rest
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <MdSecurity className="text-xl text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-blue-900 mb-2">Secure Shopping</h3>
                <p className="text-blue-700">Advanced encryption and secure payment gateways protect your transactions.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <MdLocalShipping className="text-xl text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-blue-900 mb-2">Fast Delivery</h3>
                <p className="text-blue-700">Quick and reliable shipping to get your products to you as soon as possible.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-lg flex items-center justify-center flex-shrink-0">
                <MdSupport className="text-xl text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-blue-900 mb-2">24/7 Support</h3>
                <p className="text-blue-700">Round-the-clock customer support to help you whenever you need assistance.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <FaTrophy className="text-xl text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-blue-900 mb-2">Quality Products</h3>
                <p className="text-blue-700">Curated selection of high-quality products from trusted brands and sellers.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <FaUsers className="text-xl text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-blue-900 mb-2">Community Driven</h3>
                <p className="text-blue-700">Built by and for our community of shoppers and sellers.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-lg flex items-center justify-center flex-shrink-0">
                <FaRocket className="text-xl text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-blue-900 mb-2">Innovation</h3>
                <p className="text-blue-700">Constantly evolving with the latest technology and shopping trends.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16 px-4 bg-white/20 backdrop-blur-md">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-900 futuristic-title mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-blue-700 max-w-2xl mx-auto">
              The passionate individuals behind MegaMart's success
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/30 backdrop-blur-md rounded-2xl p-8 border border-cyan-200/40 futuristic-card text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-3xl font-bold text-white">JD</span>
              </div>
              <h3 className="text-2xl font-bold text-blue-900 mb-2">John Doe</h3>
              <p className="text-cyan-600 font-semibold mb-4">CEO & Founder</p>
              <p className="text-blue-700">
                Visionary leader with 15+ years of experience in e-commerce and technology.
              </p>
            </div>
            <div className="bg-white/30 backdrop-blur-md rounded-2xl p-8 border border-cyan-200/40 futuristic-card text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-3xl font-bold text-white">JS</span>
              </div>
              <h3 className="text-2xl font-bold text-blue-900 mb-2">Jane Smith</h3>
              <p className="text-cyan-600 font-semibold mb-4">CTO</p>
              <p className="text-blue-700">
                Technology expert driving innovation and ensuring platform reliability.
              </p>
            </div>
            <div className="bg-white/30 backdrop-blur-md rounded-2xl p-8 border border-cyan-200/40 futuristic-card text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-3xl font-bold text-white">MJ</span>
              </div>
              <h3 className="text-2xl font-bold text-blue-900 mb-2">Mike Johnson</h3>
              <p className="text-cyan-600 font-semibold mb-4">Head of Operations</p>
              <p className="text-blue-700">
                Operations specialist ensuring smooth logistics and customer satisfaction.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="bg-gradient-to-r from-cyan-400/20 via-blue-600/20 to-purple-500/20 rounded-3xl p-12 border border-cyan-200/40 futuristic-card">
            <h2 className="text-4xl font-bold text-blue-900 futuristic-title mb-6">
              Ready to Experience the Future of Shopping?
            </h2>
            <p className="text-xl text-blue-700 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who have discovered the MegaMart difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/" className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-600 text-white rounded-xl font-bold shadow-lg hover:from-blue-600 hover:to-cyan-400 transition-all duration-200 futuristic-btn text-lg">
                Start Shopping
              </Link>
              <Link to="/contact" className="px-8 py-4 border-2 border-cyan-400 text-cyan-600 rounded-xl font-bold hover:bg-cyan-400 hover:text-white transition-all duration-200 text-lg">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;