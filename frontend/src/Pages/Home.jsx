import BannerCarousel from '../components/ui/BannerCarousel';
import HorizontalProductList from '../components/ui/HorizontalProductList';
import CategoryList from '../components/ui/CategoryList';
import BrandList from '../components/ui/BrandList';

const Home = () => {
  return (
    <div className="bg-[#f6f9fb] min-h-screen">
      <div className="container mx-auto px-2 md:px-8 py-6">
        <BannerCarousel />
        <HorizontalProductList />
        <CategoryList />
        <BrandList />
      </div>
    </div>
  );
};

export default Home;