import PropTypes from 'prop-types';
import ProductCard from './ProductCard';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getProducts } from '@/api/internal';

const Loader = () => (
  <div className="flex justify-center items-center h-48 w-full">
    <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const HorizontalProductList = ({ title = 'Grab the best deal on Smartphones', viewAllLink = '#' }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
  
    const fetchData = async () => {
      try {
        const response = await getProducts()
       
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching sheet:", err);
        setLoading(false);
      }
    };
    // console.log('pro',products)
  
    useEffect(() => {
      fetchData();
      const interval = setInterval(fetchData, 30000); // refresh every 30 seconds
      return () => clearInterval(interval); // cleanup on unmount
    }, []);
   
    if(!products) {
      return null
    }
    
    return (
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4 px-2">
            <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
            <a href={viewAllLink} className="text-blue-600 font-medium hover:underline">View All</a>
          </div>
          <div className="bg-white rounded-2xl shadow p-4">
            {loading ? (
              <Loader />
            ) : (
              <div className="flex gap-6 overflow-x-auto pb-2 custom-scrollbar-hide">
                {products.filter(product => product.category === 'mobile').map((product, idx) => (
                  <div key={idx} className="min-w-[260px] max-w-[260px] flex-shrink-0">
                    <ProductCard {...product} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      );
}

HorizontalProductList.propTypes = {
  title: PropTypes.string,
  viewAllLink: PropTypes.string,
};

export default HorizontalProductList; 