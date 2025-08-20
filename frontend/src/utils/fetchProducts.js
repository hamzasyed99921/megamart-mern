import { getProductsById } from '@/api/internal';
import axios from 'axios';

const fetchProducts = async (title) => {
  
  try {
    const response = await getProductsById(title)
    if(response.status === 200){
      let data = response.data
      return data;
    }

      // return {
      //   admin: obj["admin"],
      //   image: obj["imageUrl"],
      //   title: obj["productName"],
      //   description: `${obj["storage"]}GB - ${obj["color"]}`,
      //   price: parseFloat(obj["currentPrice"] || 0),
      //   discount: parseInt(obj["discount"], 10) || 0,
      // };
    
    
  } catch (err) {
    console.error("Error fetching sheet:", err);
    return [];
  }
};

export default fetchProducts; 