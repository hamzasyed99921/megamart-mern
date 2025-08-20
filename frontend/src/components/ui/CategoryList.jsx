import { useNavigate } from "react-router-dom";


const categories = [
  { name: 'Mobile', icon: '📱' },
  { name: 'laptops', icon: '💻' },
  { name: 'Furniture', icon: '🛋️' },
  { name: 'Watches', icon: '⌚' },
  { name: 'Decor', icon: '🖼️' },
  { name: 'Accessories', icon: '🎧' },
  { name: 'Appliances', icon: '🧊' },
];

const CategoryList = () => {
  
  return (
  <section className="mb-10 w-full max-w-screen-xl mx-auto px-2 md:px-8">
    <h3 className="text-2xl font-extrabold text-blue-900 mb-6 px-2 md:px-8 tracking-wide futuristic-title text-left w-full">
      Shop From <span className="text-cyan-500">Top Categories</span>
    </h3>
    <div className="flex  gap-8 md:gap-12 overflow-x-auto pb-4 custom-scrollbar-hide px-2 md:px-8 w-full">
      {categories.map((cat, idx) => (
        <div
          key={idx}
          
          className="flex cursor-pointer flex-col items-center min-w-[120px] md:min-w-[140px] group"
        >
          <div className="bg-white/20 backdrop-blur-md border border-cyan-300/40 rounded-full w-24 h-24 md:w-32 md:h-32 flex items-center justify-center mb-3 shadow-lg futuristic-card transition-all duration-300 group-hover:scale-110 group-hover:shadow-cyan-400/40 group-hover:border-cyan-400">
            <span className="text-4xl md:text-5xl drop-shadow-lg group-hover:text-cyan-500 transition-colors duration-300">
              {cat.icon}
            </span>
          </div>
          <span className="text-base md:text-lg font-semibold text-blue-900 futuristic-title group-hover:text-cyan-500 transition-colors duration-300">
            {cat.name}
          </span>
        </div>
      ))}
    </div>
  </section>
    );
}

export default CategoryList; 