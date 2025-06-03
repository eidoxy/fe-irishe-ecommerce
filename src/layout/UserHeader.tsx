import { useState } from 'react';
import {  Menu, X, Heart, ShoppingCart } from 'lucide-react';
import { Link } from "react-router";

const Header = () => {
  // const [searchQuery,] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // // Handle search input change
  // const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchQuery(e.target.value);
  // };

  // Handle search submission
  // const handleSearchSubmit = () => {
  //   console.log('Searching for:', searchQuery);
  //   // Add actual search functionality here
  // };

  // Handle key press for search (Enter key)
  // const handleKeyPress = (e: React.KeyboardEvent) => {
  //   if (e.key === 'Enter') {
  //     handleSearchSubmit();
  //   }
  // };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header style={{ backgroundColor: '#212529' }} className="w-full border-b border-black sticky top-0 z-50 shadow-sm">

      <div className="container  mx-auto flex items-center justify-between px-4 md:px-8 lg:px-20 py-3">
        {/* Brand name */}
        <div className="font-bold text-xl md:text-2xl flex items-center ">
          <img src="/images/logouser.png" alt="Logo" className="h-10 w-30" />
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Navigation links - Desktop */}
        <nav className="text-white hidden md:flex space-x-6 lg:space-x-10">
          <Link to="/" className="hover:text-blue-500 transition-colors duration-200 font-medium">Home</Link>
          <Link to="/catalog" className="hover:text-blue-500 transition-colors duration-200 font-medium">Catalog</Link>
          <a href="#about" className="hover:text-blue-500 transition-colors duration-200 font-medium">About</a>
          {/* <a href="/signup" className="hover:text-blue-800 transition-colors duration-200 font-medium">Sign Up</a> */}
          {/* <a href="/signup" className="hover:text-blue-800 transition-colors duration-200 font-medium">Sign Up</a> */}
        </nav>

        {/* Search bar */}
        {/* <div className="hidden md:block flex-1 max-w-md mx-4 lg:mx-8">
          <div className="relative">
            <input
              type="text"
              placeholder="What are you looking for?"
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyPress={handleKeyPress}
              className="w-full rounded-md border border-whi py-2 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300"
            />
            <button
              onClick={handleSearchSubmit}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 hover:text-purple-700 transition-colors duration-200"
            >
              <Search size={18} className="text-gray-500" />
            </button>
          </div>
        </div> */}

        {/* Icons */}
        <div style = {{ backgroundColor: '#212529' }} className="hidden md:flex items-center bg-black space-x-6 ">
          <button style={{ backgroundColor: '#212529' }} className="text-black hover:text-blacktransition-colors duration-200">
            <Heart size={20} />
          </button>
          <button style={{ backgroundColor: '#212529' }} className="text-black hover:text-black transition-colors duration-200 relative">
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white py-4 px-4 shadow-md">
          <nav className="hidden md:flex space-x-6 lg:space-x-10">
            <a href="/" className="text-white hover:text-blue-300 transition-colors duration-200 font-medium">Home</a>
            <a href="/contact" className="text-white hover:text-blue-300 transition-colors duration-200 font-medium">Contact</a>
            <a href="#about" className="text-white hover:text-blue-300 transition-colors duration-200 font-medium">About</a>
          </nav>

          {/* <div className="mt-4">
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
          </div> */}

          <div className="flex items-center space-x-6 mt-4">
            <button className="text-white hover:text-purple-700 transition-colors duration-200">
              <Heart size={20} />
            </button>
            <button className="text-white hover:text-purple-900 transition-colors duration-200 relative">
              <ShoppingCart size={20} />
              <span className="absolute -top-2 -right-2 bg-purple-900 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">0</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;