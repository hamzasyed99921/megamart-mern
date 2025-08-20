import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { addItemToCart } from '@/utils/cart';

const ProductCard = ({ id, title, image, name, price, discount, isActive, stock }) => {
  const [username, setUsername] = useState('');
  const productName = name || title;
  const productSlug = id || productName; // fallback to name/title for routes expecting a slug
  const discountedPrice = discount ? (price - (price * discount) / 100).toFixed(2) : price;

  useEffect(() => {
    const loggedInUser = localStorage.getItem('token');
    setUsername(loggedInUser);
  }, []);

  const handleAddToCart = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (isActive === false) {
      alert('This product is inactive and cannot be purchased.');
      return;
    }
    if (typeof stock === 'number' && stock <= 0) {
      alert('This product is out of stock.');
      return;
    }

    const result = addItemToCart({ id: id || productName, name: productName, image, price: Number(discountedPrice || price), stock });
    if (result.ok) {
      alert('Added to cart!');
    } else if (result.reason === 'out_of_stock') {
      alert('Not enough stock available.');
    } else {
      alert('Failed to add to cart.');
    }
  };

  return (
    <div className="block h-full">
      <Link to={`/product/${productSlug}`} className="block h-full">
        <div className="relative bg-white/20 backdrop-blur-md border border-blue-200/40 rounded-2xl shadow-xl overflow-hidden hover:scale-[1.03] transition-transform duration-300 flex flex-col group futuristic-card h-full">
          {discount ? (
            <span className="absolute top-4 left-4 z-10 bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
              -{discount}% OFF
            </span>
          ) : null}
          <img
            src={image}
            alt={productName}
            className="w-full h-60  object-cover object-center drop-shadow-xl bg-gradient-to-br from-blue-100/60 to-cyan-100/30 rounded-t-2xl"
          />
          <div className="p-4 flex flex-col flex-1">
            <h3 className="text-lg font-extrabold mb-1 text-blue-900 tracking-wide futuristic-name drop-shadow">{productName}</h3>
            <div className="flex items-end justify-between mt-auto">
              <div>
                {discount ? (
                  <>
                    <span className="text-xl font-bold text-cyan-500 mr-2 drop-shadow">${discountedPrice}</span>
                    <span className="line-through text-gray-400 text-sm">${price}</span>
                  </>
                ) : (
                  <span className="text-xl font-bold text-blue-900">${price}</span>
                )}
              </div>
            </div>
            {username && (
              <p className="text-xs text-gray-500 ">Added by: {username}</p>
            )}
            <button onClick={handleAddToCart} className="bg-gradient-to-r from-blue-600 to-cyan-400 text-white px-5 py-2 rounded-xl font-semibold shadow-lg hover:from-cyan-400 hover:to-blue-600 transition-all duration-200 futuristic-btn mt-4 w-full">
              Add to Cart
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

ProductCard.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  title: PropTypes.string,
  image: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  discount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isActive: PropTypes.bool,
  stock: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default ProductCard;

