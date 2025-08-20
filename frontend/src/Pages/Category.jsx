import { useState, useEffect } from 'react';
import { getProducts } from '@/api/internal';
import ProductCard from '@/components/ui/ProductCard';
import { FiGrid, FiList, FiFilter, FiSearch, FiChevronDown, FiShoppingCart, FiEye } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { addItemToCart } from '@/utils/cart';

const Category = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await getProducts();
      if (response && response.data) {
        setProducts(response.data);
      } else {
        setError('Failed to fetch products');
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Error loading products');
    } finally {
      setLoading(false);
    }
  };

  // Get unique categories
  const categories = ['all', ...new Set(products.map(p => p.category).filter(Boolean))];

//   console.log(categories);

  // Filter and sort products
  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesPrice = (!priceRange.min || product.price >= parseFloat(priceRange.min)) &&
                          (!priceRange.max || product.price <= parseFloat(priceRange.max));
      return matchesSearch && matchesCategory && matchesPrice && product.isActive;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return (a.name || '').localeCompare(b.name || '');
        case 'price-low':
          return (a.price || 0) - (b.price || 0);
        case 'price-high':
          return (b.price || 0) - (a.price || 0);
        case 'newest':
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        default:
          return 0;
      }
    });

  const handleQuickAdd = (product) => {
    const id = product._id || product.id || product.name;
    const name = product.name || product.title;
    const price = Number(product.discount ? (product.price - (product.price * product.discount) / 100).toFixed(2) : product.price);
    const image = product.image;
    const stock = product.stock;
    if (product.isActive === false) {
      alert('This product is inactive and cannot be purchased.');
      return;
    }
    if (typeof stock === 'number' && stock <= 0) {
      alert('This product is out of stock.');
      return;
    }
    const result = addItemToCart({ id, name, image, price, stock });
    if (result.ok) alert('Added to cart!');
    else if (result.reason === 'out_of_stock') alert('Not enough stock available.');
    else alert('Failed to add to cart.');
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-cyan-100/40 via-white/60 to-purple-100/40">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-blue-700 font-semibold">Loading Products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-cyan-100/40 via-white/60 to-purple-100/40">
        <div className="text-center">
          <p className="text-xl text-red-600 font-semibold mb-4">{error}</p>
          <button 
            onClick={fetchProducts}
            className="bg-gradient-to-r from-blue-600 to-cyan-400 text-white px-6 py-2 rounded-xl font-bold shadow-lg hover:from-cyan-400 hover:to-blue-600 transition-all duration-200"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] bg-gradient-to-br from-cyan-100/40 via-white/60 to-purple-100/40 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-blue-900 futuristic-title drop-shadow-lg mb-4">
            Browse Products
          </h1>
          <p className="text-lg text-blue-700">Discover amazing products in our collection</p>
        </div>

        {/* Filters and Controls */}
        <div className="bg-white/30 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-cyan-200/40 mb-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-cyan-200/60 bg-white/60 backdrop-blur-md focus:ring-2 focus:ring-cyan-300 outline-none"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-4">
              <FiFilter className="text-blue-600" />
              <div className="w-56">
                <div className="rounded-xl p-[1px] bg-gradient-to-r from-blue-500/60 to-cyan-400/60 shadow-md">
                  <div className="relative">
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="appearance-none w-full px-4 py-3 rounded-xl bg-white/70 backdrop-blur-md border border-white/20 text-blue-900 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-transparent transition-all duration-200"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>
                          {category === 'all' ? 'All Categories' : category}
                        </option>
                      ))}
                    </select>
                    <FiChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-blue-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Sort */}
            <div className="w-60">
              <div className="rounded-xl p-[1px] bg-gradient-to-r from-blue-500/60 to-cyan-400/60 shadow-md">
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none w-full px-4 py-3 rounded-xl bg-white/70 backdrop-blur-md border border-white/20 text-blue-900 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-transparent transition-all duration-200"
                  >
                    <option value="name">Sort by Name</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="newest">Newest First</option>
                  </select>
                  <FiChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-blue-600" />
                </div>
              </div>
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-2 bg-white/60 rounded-xl p-1 border border-cyan-200/60">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  viewMode === 'grid' 
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-400 text-white shadow-lg' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <FiGrid size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  viewMode === 'list' 
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-400 text-white shadow-lg' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <FiList size={20} />
              </button>
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="mt-6 flex items-center gap-4">
            <span className="text-blue-900 font-semibold">Price Range:</span>
            <input
              type="number"
              placeholder="Min"
              value={priceRange.min}
              onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
              className="w-24 px-3 py-2 rounded-lg border border-cyan-200/60 bg-white/60 backdrop-blur-md focus:ring-2 focus:ring-cyan-300 outline-none"
            />
            <span className="text-blue-900">to</span>
            <input
              type="number"
              placeholder="Max"
              value={priceRange.max}
              onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
              className="w-24 px-3 py-2 rounded-lg border border-cyan-200/60 bg-white/60 backdrop-blur-md focus:ring-2 focus:ring-cyan-300 outline-none"
            />
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-blue-700 font-semibold">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>

        {/* Products Grid/List */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white/30 backdrop-blur-md rounded-2xl shadow-2xl p-12 border border-cyan-200/40 text-center">
            <div className="w-24 h-24 mx-auto mb-6 text-cyan-400">
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-blue-900 mb-2">No products found</h3>
            <p className="text-blue-700">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <ProductCard key={product._id || index} {...product} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProducts.map((product, index) => (
                <div
                  key={product._id || index}
                  className="group relative bg-white/30 backdrop-blur-md rounded-2xl shadow-2xl border border-cyan-200/40 overflow-hidden hover:bg-white/50 transition-all duration-200 hover:-translate-y-[2px]"
                >
                  <span className="pointer-events-none absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-blue-500 to-cyan-400 opacity-60 group-hover:opacity-100"></span>
                  <div className="flex flex-col md:flex-row items-stretch md:items-center">
                    <div className="w-full md:w-48 h-40 md:h-28 flex-shrink-0">
                      <img
                        src={product.image || 'https://via.placeholder.com/160x160?text=No+Image'}
                        alt={product.name || product.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 p-4">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                        <div>
                          <h3 className="text-xl font-extrabold text-blue-900">
                            {product.name || product.title}
                          </h3>
                          <p className="text-sm text-gray-600 line-clamp-2 max-w-3xl">
                            {product.description}
                          </p>
                          <div className="mt-2 flex flex-wrap items-center gap-2">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-cyan-100 text-cyan-800 border border-cyan-200">
                              {product.category || 'Uncategorized'}
                            </span>
                            {product.isActive === false && (
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">Inactive</span>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-900">
                            ${
                              product.discount > 0
                                ? (
                                    Number(product.price || 0) -
                                    (Number(product.price || 0) * Number(product.discount)) / 100
                                  ).toFixed(2)
                                : Number(product.price || 0).toFixed(2)
                            }
                          </div>
                          {product.discount > 0 && (
                            <div className="text-xs text-green-600 font-semibold">
                              -{product.discount}% OFF
                              <span className="ml-2 line-through text-gray-400">${Number(product.price || 0).toFixed(2)}</span>
                            </div>
                          )}
                          <div className="mt-2">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                              (product.stock || 0) > 10
                                ? 'bg-green-100 text-green-800 border border-green-200'
                                : (product.stock || 0) > 0
                                  ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                                  : 'bg-red-100 text-red-800 border border-red-200'
                            }`}>
                              {product.stock || 0} in stock
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center gap-3">
                        <Link
                          to={`/product/${product._id || product.id || product.name || product.title}`}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-400 text-white font-semibold shadow hover:from-cyan-400 hover:to-blue-600 transition-all"
                        >
                          <FiEye /> View
                        </Link>
                        <button
                          onClick={() => handleQuickAdd(product)}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-600 to-green-400 text-white font-semibold shadow hover:from-green-400 hover:to-emerald-600 transition-all"
                        >
                          <FiShoppingCart /> Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        )}

        {/* Quick Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white/30 backdrop-blur-md rounded-xl p-6 border border-cyan-200/40 shadow-lg">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-blue-900">{products.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/30 backdrop-blur-md rounded-xl p-6 border border-cyan-200/40 shadow-lg">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Products</p>
                <p className="text-2xl font-bold text-green-900">
                  {products.filter(p => p.isActive).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/30 backdrop-blur-md rounded-xl p-6 border border-cyan-200/40 shadow-lg">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Categories</p>
                <p className="text-2xl font-bold text-purple-900">{categories.length - 1}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/30 backdrop-blur-md rounded-xl p-6 border border-cyan-200/40 shadow-lg">
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 rounded-lg">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Price</p>
                <p className="text-2xl font-bold text-orange-900">
                  ${(products.reduce((sum, p) => sum + (p.price || 0), 0) / products.length || 0).toFixed(0)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;