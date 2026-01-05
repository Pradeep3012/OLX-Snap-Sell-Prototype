import React from 'react';
import { Camera, Search, Heart, MessageCircle, User, Plus, Home, ArrowRight } from 'lucide-react';

interface Props {
  onSellClick: () => void;
}

const CATEGORIES = [
  { name: 'Cars', img: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=150&h=150&q=80' },
  { name: 'Properties', img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=150&h=150&q=80' },
  { name: 'Mobiles', img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=150&h=150&q=80' },
  { name: 'Jobs', img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=150&h=150&q=80' },
  { name: 'Bikes', img: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=150&h=150&q=80' }
];

const RECOMMENDATIONS = [
  {
    id: 1,
    title: 'iPhone 13 Pro 128GB',
    price: '₹ 65,000',
    location: 'Bandra West, Mumbai',
    time: 'Today',
    img: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 2,
    title: 'Royal Enfield Classic 350',
    price: '₹ 1,45,000',
    location: 'Andheri East, Mumbai',
    time: '2 days ago',
    img: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 3,
    title: 'Wooden Sofa Set 3+1+1',
    price: '₹ 8,500',
    location: 'Dadar, Mumbai',
    time: 'Today',
    img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 4,
    title: 'MacBook Air M1',
    price: '₹ 55,000',
    location: 'Powai, Mumbai',
    time: 'Yesterday',
    img: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=300&q=80'
  }
];

const Stage0_Home: React.FC<Props> = ({ onSellClick }) => {
  return (
    <div className="relative h-full bg-white">
      {/* Scrollable Content */}
      <div className="h-full overflow-y-auto pb-24">
        {/* Header */}
        <header className="bg-olx-dark p-4 flex justify-between items-center text-white sticky top-0 z-10 shadow-md">
          <span className="text-2xl font-bold tracking-tighter">OLX</span>
          <div className="flex gap-4">
            <span className="uppercase text-sm font-semibold">India</span>
          </div>
        </header>

        {/* Search Bar */}
        <div className="p-4 bg-gray-100 border-b border-gray-200">
          <div className="bg-white rounded border border-olx-border p-3 flex items-center gap-2">
            <Search size={20} className="text-gray-500" />
            <span className="text-gray-400 text-sm">Find Cars, Mobile Phones and more...</span>
          </div>
        </div>

        {/* Categories */}
        <div className="px-4 py-4">
          <h3 className="font-bold text-olx-dark mb-3">Browse Categories</h3>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
             {CATEGORIES.map(cat => (
               <div key={cat.name} className="flex flex-col items-center min-w-[60px]">
                 <div className="w-14 h-14 rounded-full bg-olx-light mb-2 overflow-hidden border border-gray-100 shadow-sm">
                   <img src={cat.img} alt={cat.name} className="w-full h-full object-cover" />
                 </div>
                 <span className="text-xs text-gray-700 font-medium">{cat.name}</span>
               </div>
             ))}
             
             {/* View All Button - Elongated Rectangular */}
             <div className="flex flex-col items-center min-w-[60px]">
               <button className="w-12 h-14 rounded-2xl border-2 border-gray-200 flex items-center justify-center text-olx-dark hover:bg-gray-50 transition-colors mb-2">
                  <ArrowRight size={24} />
               </button>
               <span className="text-xs text-gray-700 font-medium">See all</span>
             </div>
          </div>
        </div>

        {/* Fresh Recommendations */}
        <div className="px-4 pb-4">
          <h3 className="font-bold text-olx-dark mb-3">Fresh Recommendations</h3>
          <div className="grid grid-cols-2 gap-3">
            {RECOMMENDATIONS.map(item => (
              <div key={item.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm relative group">
                <div className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-sm z-10">
                  <Heart size={14} className="text-gray-400 group-hover:text-red-500 transition-colors" />
                </div>
                <div className="h-32 bg-gray-200 relative">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                  <div className="absolute bottom-0 left-0 bg-yellow-400 text-[10px] font-bold px-1.5 py-0.5 uppercase tracking-wide">Featured</div>
                </div>
                <div className="p-2">
                  <h4 className="font-bold text-olx-dark text-lg truncate">{item.price}</h4>
                  <p className="text-sm text-gray-600 truncate mb-1">{item.title}</p>
                  <div className="flex justify-between items-end mt-2">
                    <span className="text-[10px] text-gray-400 uppercase truncate max-w-[60%]">{item.location}</span>
                    <span className="text-[10px] text-gray-400">{item.time}</span>
                  </div>
                </div>
              </div>
            ))}
            {/* Duplicate items to demonstrate scrolling */}
            {RECOMMENDATIONS.map(item => (
              <div key={`dup-${item.id}`} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm relative group">
                <div className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-sm z-10">
                  <Heart size={14} className="text-gray-400 group-hover:text-red-500 transition-colors" />
                </div>
                <div className="h-32 bg-gray-200 relative">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-2">
                  <h4 className="font-bold text-olx-dark text-lg truncate">{item.price}</h4>
                  <p className="text-sm text-gray-600 truncate mb-1">{item.title}</p>
                  <div className="flex justify-between items-end mt-2">
                    <span className="text-[10px] text-gray-400 uppercase truncate max-w-[60%]">{item.location}</span>
                    <span className="text-[10px] text-gray-400">{item.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Bottom Nav */}
      <nav className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-between items-center px-6 py-2 pb-4 shadow-[0_-5px_15px_rgba(0,0,0,0.1)] z-50">
        <div className="flex flex-col items-center gap-1 text-gray-500">
          <Home size={24} />
          <span className="text-[10px]">Home</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-gray-500">
          <MessageCircle size={24} />
          <span className="text-[10px]">Chats</span>
        </div>
        
        {/* Sell Button - Primary CTA */}
        <div className="flex flex-col items-center gap-1 -mt-8 cursor-pointer group" onClick={onSellClick}>
          <div className="w-14 h-14 bg-white rounded-full border-4 border-white shadow-lg flex items-center justify-center relative">
             <div className="w-11 h-11 bg-gradient-to-tr from-blue-500 to-teal-400 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform">
               <Plus size={28} className="text-white" />
             </div>
          </div>
          <span className="text-xs font-bold text-olx-dark uppercase">Sell</span>
        </div>

        <div className="flex flex-col items-center gap-1 text-gray-500">
          <Heart size={24} />
          <span className="text-[10px]">My Ads</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-gray-500">
          <User size={24} />
          <span className="text-[10px]">Account</span>
        </div>
      </nav>
    </div>
  );
};

export default Stage0_Home;