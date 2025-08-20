import { useEffect, useState } from "react";

const BrandList = () => {
    const [brands, setBrands] = useState([]);
    const sheetId = import.meta.env.VITE_SHEET_ID;
    const gid = import.meta.env.VITE_GID; 


    useEffect(() => {
        const fetchData = async () => {
          try {
            const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&gid=${gid}`;
            const res = await fetch(url);
            const text = await res.text();
    
            const json = JSON.parse(text.substring(47).slice(0, -2));
            const headers = json.table.rows[0].c.map(cell => cell?.v);
    
            const data = json.table.rows.slice(1).map(row => {
              const obj = {};
              row.c.forEach((cell, i) => {
                obj[headers[i]] = cell?.v || "";
              });
              return obj;
            });
    
            setBrands(data);
          } catch (err) {
            console.error("Error fetching brands:", err);
          }
        };
    
        fetchData();
      }, []);
    



    return (
        <section className="mb-12 w-full max-w-screen-xl mx-auto px-2 md:px-8">
        {/* Animated Glowing Gradient Background */}
        <div className="absolute inset-0 h-full w-full z-0 pointer-events-none">
          <div className="w-full h-full bg-gradient-to-r from-blue-400/20 via-cyan-400/20 to-purple-500/20 blur-2xl animate-gradient-move rounded-3xl"></div>
        </div>
        <h3 className="relative z-10 text-2xl font-extrabold text-blue-900 mb-8 px-2 md:px-8 tracking-wide futuristic-title text-left w-full drop-shadow-lg">
          Top <span className="text-cyan-500">Electronics Brands</span>
        </h3>
        <div className="relative z-10 flex gap-8 md:gap-14 overflow-x-auto pb-6 custom-scrollbar-hide px-2 md:px-8 w-full items-center">
          {brands.map((brand, idx) => (
            <div key={idx} className="flex flex-col items-center min-w-[100px] md:min-w-[140px] group">
              <div className="bg-white/20 backdrop-blur-md border-2 border-cyan-300/60 group-hover:border-cyan-400/90 rounded-2xl w-24 h-16 md:w-32 md:h-24 flex items-center justify-center mb-3 shadow-2xl futuristic-card transition-all duration-300 group-hover:scale-105 group-hover:shadow-cyan-400/40 relative overflow-hidden">
                {/* Neon border effect */}
                <span className="absolute inset-0 rounded-2xl border-2 border-cyan-400/40 group-hover:border-cyan-400/80 animate-pulse pointer-events-none"></span>
                <img src={brand.image} alt={brand.name} className="h-full object-contain object-cente rounded-xl w-full transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 drop-shadow-lg" />
              </div>
              <span className="text-sm md:text-base font-semibold text-blue-900 futuristic-title group-hover:text-cyan-400 transition-colors duration-300 drop-shadow">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
        <style>{`
          @keyframes gradient-move {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          .animate-gradient-move {
            background-size: 200% 200%;
            animation: gradient-move 8s ease-in-out infinite;
          }
        `}</style>
      </section>
    );
};

export default BrandList; 