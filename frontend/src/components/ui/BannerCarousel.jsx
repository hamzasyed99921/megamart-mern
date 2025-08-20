import React, { useState } from 'react';

const banners = [
  {
    image: '/assets/images/logo.png',
    title: 'SMART WEARABLE.',
    subtitle: 'Best Deal Online on smart watches',
    discount: 'UP TO 80% OFF',
    bg: 'bg-gradient-to-r from-blue-100 to-blue-300',
  },
  {
    image: '/assets/images/logo.png',
    title: 'MEGA SALE',
    subtitle: 'Grab the best deals on electronics',
    discount: 'SAVE BIG',
    bg: 'bg-gradient-to-r from-purple-100 to-pink-200',
  },
];

const BannerCarousel = () => {
  const [current, setCurrent] = useState(0);
  const next = () => setCurrent((c) => (c + 1) % banners.length);
  const prev = () => setCurrent((c) => (c - 1 + banners.length) % banners.length);
  const banner = banners[current];

  return (
    <div className={`relative w-full rounded-xl overflow-hidden shadow-lg ${banner.bg} min-h-[220px] flex items-center justify-between px-8 py-6 mb-8`}>  
      <div className="flex-1">
        <div className="text-sm font-semibold text-blue-700 mb-2">{banner.subtitle}</div>
        <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{banner.title}</div>
        <div className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full font-semibold text-lg shadow">{banner.discount}</div>
      </div>
      <img src={banner.image} alt="banner" className="h-32 w-32 object-contain ml-8 hidden md:block" />
      <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow"><svg width="24" height="24" fill="none" stroke="currentColor"><path d="M15 19l-7-7 7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
      <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow"><svg width="24" height="24" fill="none" stroke="currentColor"><path d="M9 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, i) => (
          <span key={i} className={`w-2 h-2 rounded-full ${i === current ? 'bg-blue-600' : 'bg-blue-300'}`}></span>
        ))}
      </div>
    </div>
  );
};

export default BannerCarousel; 