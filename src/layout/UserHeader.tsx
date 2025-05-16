import { useState } from 'react';
import { Search, Menu, X, Heart, ShoppingCart } from 'lucide-react';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle search submission
  const handleSearchSubmit = () => {
    console.log('Searching for:', searchQuery);
    // Add actual search functionality here
  };

  // Handle key press for search (Enter key)
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="w-full border-b border-purple-300 bg-white sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-4 md:px-8 lg:px-20 py-3">
        {/* Brand name */}
        <div className="font-bold text-xl md:text-2xl flex items-center">
          Irishe E
        </div>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        {/* Navigation links - Desktop */}
        <nav className="hidden md:flex space-x-6 lg:space-x-10">
          <a href="/" className="hover:text-blue-800 transition-colors duration-200 font-medium">Home</a>
          <a href="/contact" className="hover:text-blue-800 transition-colors duration-200 font-medium">Contact</a>
          <a href="/about" className="hover:text-blue-800 transition-colors duration-200 font-medium">About</a>
          {/* <a href="/signup" className="hover:text-blue-800 transition-colors duration-200 font-medium">Sign Up</a> */}
        </nav>
        
        {/* Search bar */}
        <div className="hidden md:block flex-1 max-w-md mx-4 lg:mx-8">
          <div className="relative">
            <input
              type="text"
              placeholder="What are you looking for?"
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyPress={handleKeyPress}
              className="w-full rounded-md border border-gray-300 py-2 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300"
            />
            <button
              onClick={handleSearchSubmit}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 hover:text-purple-700 transition-colors duration-200"
            >
              <Search size={18} className="text-gray-500" />
            </button>
          </div>
        </div>
        
        {/* Icons */}
        {/* <div className="hidden md:flex items-center space-x-6">
          <button className="text-gray-700 hover:text-purple-700 transition-colors duration-200">
            <Heart size={20} />
          </button>
          <button className="text-gray-700 hover:text-purple-700 transition-colors duration-200 relative">
            <ShoppingCart size={20} />
            <span className="absolute -top-2 -right-2 bg-purple-600 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">0</span>
          </button>
        </div> */}
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white py-4 px-4 shadow-md">
          <nav className="flex flex-col space-y-4">
            <a href="/" className="hover:text-purple-800 transition-colors duration-200 font-medium">Home</a>
            <a href="/userheader" className="hover:text-purple-800 transition-colors duration-200 font-medium">Contact</a>
            <a href="/about" className="hover:text-purple-800 transition-colors duration-200 font-medium">About</a>
            <a href="/signup" className="hover:text-purple-800 transition-colors duration-200 font-medium">Sign Up</a>
          </nav>
          
          <div className="mt-4">
            <div className="relative">
              <input
                type="text"
                placeholder="What are you looking for?"
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyPress={handleKeyPress}
                className="w-full rounded-md border border-gray-300 py-2 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <button
                onClick={handleSearchSubmit}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <Search size={18} className="text-gray-500" />
              </button>
            </div>
          </div>
          
          <div className="flex items-center space-x-6 mt-4">
            <button className="text-gray-700 hover:text-purple-700 transition-colors duration-200">
              <Heart size={20} />
            </button>
            <button className="text-gray-700 hover:text-purple-700 transition-colors duration-200 relative">
              <ShoppingCart size={20} />
              <span className="absolute -top-2 -right-2 bg-purple-600 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">0</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;