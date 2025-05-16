import { Heart, Eye } from "lucide-react";
import { useState } from "react";

type CardProductProps = {
  imageSrc: string;
  title: string;
  price: string;
  oldPrice: string;
  discount: string;
  rating: number;
  reviewCount: number;
};

export default function CardProduct({
  imageSrc,
  title,
  price,
  oldPrice,
  discount,
  rating,
  reviewCount,
}: CardProductProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative bg-white shadow-md rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Discount Badge */}
      <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-sm z-10">
        {discount}
      </span>

      {/* Action Icons */}
      <div className="absolute top-3 right-3 flex flex-col gap-2">
        <button className="bg-white p-1.5 rounded-full shadow hover:bg-gray-100 hover:text-blue-500 transition-colors duration-200">
          <Heart className="w-4 h-4 text-gray-600" />
        </button>
        <button className="bg-white p-1.5 rounded-full shadow hover:bg-gray-100 hover:text-blue-500 transition-colors duration-200">
          <Eye className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      {/* Product Image Container */}
      <div className="relative h-48 bg-gray-50 overflow-hidden">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-contain p-4 transition-all duration-500"
          style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
        />
        
        {/* Add to Cart Button - Shows on Hover */}
        <div 
          className={`absolute bottom-0 left-0 right-0 bg-blue-800 text-white py-2 text-center text-sm font-medium cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 ${
            isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
          }`}
        >
          View Details
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 h-10">{title}</h3>

        {/* Price */}
        <div className="flex items-center gap-2 mt-2">
          <span className="text-blue-700 font-bold">{price}</span>
          <span className="text-gray-400 text-sm line-through">{oldPrice}</span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-2">
          {Array.from({ length: 5 }).map((_, idx) => (
            <svg
              key={idx}
              className={`w-4 h-4 ${
                idx < rating ? "text-yellow-400" : "text-gray-300"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.174c.969 0 1.371 1.24.588 1.81l-3.376 2.453a1 1 0 00-.364 1.118l1.287 3.97c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.376 2.453c-.784.57-1.838-.197-1.539-1.118l1.286-3.97a1 1 0 00-.364-1.118L2.63 9.397c-.783-.57-.38-1.81.588-1.81h4.174a1 1 0 00.951-.69l1.286-3.97z" />
            </svg>
          ))}
          <span className="text-gray-500 text-xs ml-1">({reviewCount})</span>
        </div>
      </div>
    </div>
  );
}