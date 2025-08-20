import { Link } from "react-router-dom";
import { FaTelegram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative mt-20 pt-16 pb-10 text-blue-900 bg-white/20 backdrop-blur-md border-t border-cyan-200/30 shadow-2xl overflow-hidden futuristic-card">
      {/* Animated Glowing Gradient Background */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-r from-cyan-400/20 via-blue-600/20 to-purple-500/20 blur-2xl animate-gradient-move rounded-t-3xl"></div>
      </div>
      <div className="container relative z-10">
        <div className="flex lg:justify-between justify-center flex-wrap items-center gap-8">
          <div>
            <Link to='/'>
              <img src="assets/images/logo.png" alt="" className="h-40 drop-shadow-xl" />
            </Link>
          </div>
          <div className="flex flex-wrap justify-center lg:space-x-16 gap-8">
            <div>
              <ul className="space-y-2">
                <li><Link to="/" className="no-underline text-blue-900 font-semibold futuristic-title hover:text-cyan-400 transition">Home</Link></li>
                <li><Link to="/categories" className="no-underline text-blue-900 font-semibold futuristic-title hover:text-cyan-400 transition">Categories</Link></li>
                <li><Link to="/deals" className="no-underline text-blue-900 font-semibold futuristic-title hover:text-cyan-400 transition">Deals</Link></li>
                <li><Link to="/brands" className="no-underline text-blue-900 font-semibold futuristic-title hover:text-cyan-400 transition">Brands</Link></li>
              </ul>
            </div>
            <div>
              <ul className="space-y-2">
                <li><Link to="/about" className="no-underline text-blue-900 font-semibold futuristic-title hover:text-cyan-400 transition">About</Link></li>
                <li><Link to="/contact" className="no-underline text-blue-900 font-semibold futuristic-title hover:text-cyan-400 transition">Contact</Link></li>
                <li><Link to="/account" className="no-underline text-blue-900 font-semibold futuristic-title hover:text-cyan-400 transition">Account</Link></li>
                <li><Link to="/cart" className="no-underline text-blue-900 font-semibold futuristic-title hover:text-cyan-400 transition">Cart</Link></li>
              </ul>
              <div className="flex space-x-4 items-center justify-center mt-4">
                <Link to='#' className="hover:scale-110 transition-transform"><FaTelegram className=" hover:text-blue-600 drop-shadow-glow transition-colors" size={28} /></Link>
                <Link to='#' className="hover:scale-110 transition-transform"><FaTwitter className=" hover:text-blue-600 drop-shadow-glow transition-colors" size={28} /></Link>
                <Link to='#' className="hover:scale-110 transition-transform"> <img src="assets/images/w.svg" className="w-7 drop-shadow-glow" alt="" /></Link>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 text-center text-sm text-blue-900/70 futuristic-title">
          &copy; {new Date().getFullYear()} MegaMart. All rights reserved.
        </div>
      </div>
      {/* Futuristic Gradient Bar at Bottom */}
      <div className="absolute left-0 bottom-0 w-full h-2 bg-gradient-to-r from-cyan-400 via-blue-600 to-purple-500 animate-gradient-move"></div>
      <style>{`
        @keyframes gradient-move {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-move {
          background-size: 200% 200%;
          animation: gradient-move 8s ease-in-out infinite;
        }
        .drop-shadow-glow {
          filter: drop-shadow(0 0 8px #22d3ee) drop-shadow(0 0 16px #2563eb);
        }
      `}</style>
    </footer>
  );
};

export default Footer;
