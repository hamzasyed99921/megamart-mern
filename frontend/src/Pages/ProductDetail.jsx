import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import fetchProducts from '../utils/fetchProducts';
import { addItemToCart } from '@/utils/cart';

const ProductDetail = () => {
  const { title } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      const response = await fetchProducts(title);
      setProduct(response);
      setLoading(false);
    };
    getProduct();
  }, [title]);

  if (loading) return <div className="min-h-[60vh] flex items-center justify-center text-xl text-blue-700">Loading...</div>;
  if (!product) return <div className="min-h-[60vh] flex items-center justify-center text-xl text-red-600">Product not found.</div>;

  const handleAddToCart = () => {
    const id = product.id || product._id || product.title; // fallback key
    const name = product.name || product.title;
    const price = Number(product.discount ? (product.price - (product.price * product.discount) / 100).toFixed(2) : product.price);
    const image = product.image;
    const stock = product.stock;

    const result = addItemToCart({ id, name, image, price, stock });
    if (result.ok) {
      alert('Added to cart!');
    } else if (result.reason === 'out_of_stock') {
      alert('Not enough stock available.');
    } else {
      alert('Failed to add to cart.');
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-cyan-100/40 via-white/60 to-purple-100/40 py-12 px-2">
      <div className="flex flex-col md:flex-row gap-8 bg-white/60 rounded-2xl shadow-xl p-8">
        <img src={product.image} alt={product.name || product.title} className="w-64 h-64 object-cover rounded-xl border border-cyan-200" />
        <div>
          <h1 className="text-3xl font-bold text-blue-900 mb-2">{product.name || product.title}</h1>
          <p className="text-base text-gray-700 mb-4">{product.description}</p>
          <div className="text-2xl text-cyan-600 font-bold mb-2">${product.price}</div>
          {product.discount > 0 && (
            <div className="text-sm text-green-600 font-semibold mb-2">{product.discount}% OFF</div>
          )}
          <div className="text-sm text-gray-700 font-medium mb-2">Stock: {product.stock}</div>
          <button onClick={handleAddToCart} className="mt-6 px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-400 text-white rounded-xl font-bold shadow-lg hover:from-cyan-400 hover:to-blue-600 transition-all duration-200 futuristic-btn text-lg tracking-wide">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 