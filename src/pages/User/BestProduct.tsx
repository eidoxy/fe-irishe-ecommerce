import { useState } from "react";
import { Eye, Heart } from "lucide-react";

interface BestSellingProductProps {
    id: number;
    imageSrc: string;
    title: string;
    price: string;
    oldPrice: string;
    rating: number;
    reviewCount: number;
}

const bestSellingProducts: BestSellingProductProps[] = [
    {
        id: 1,
        imageSrc: "/images/product/product-01-bg.png",
        title: "The north coat",
        price: "$260",
        oldPrice: "$360",
        rating: 5,
        reviewCount: 65
    },
    {
        id: 2,
        imageSrc: "/images/product/product-02-bg.png",
        title: "Gucci duffle bag",
        price: "$960",
        oldPrice: "$1160",
        rating: 5,
        reviewCount: 65
    },
    {
        id: 3,
        imageSrc: "/images/product/product-03-bg.png",
        title: "RGB liquid CPU Cooler",
        price: "$160",
        oldPrice: "$170",
        rating: 5,
        reviewCount: 65
    },
    {
        id: 4,
        imageSrc: "/images/product/product-05-bg.png",
        title: "Small BookSelf",
        price: "$360",
        oldPrice: "",
        rating: 5,
        reviewCount: 65
    }
];

// Product Card Component
const BestSellingProductCard = ({
    imageSrc,
    title,
    price,
    oldPrice,
    rating,
    reviewCount
}: Omit<BestSellingProductProps, 'id'>) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="bg-gray-100 rounded-md p-4 transition-all duration-300 relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Wishlist Icon */}
            <button className="absolute top-6 right-6 z-10 bg-white p-1.5 rounded-full shadow-sm hover:bg-gray-100">
                <Heart size={16} className="text-gray-600" />
            </button>

            {/* Quick View Icon */}
            <button className="absolute top-6 right-16 z-10 bg-white p-1.5 rounded-full shadow-sm hover:bg-gray-100">
                <Eye size={16} className="text-gray-600" />
            </button>

            {/* Product Image */}
            <div className="flex items-center justify-center h-40 mb-4">
                <img
                    src={imageSrc}
                    alt={title}
                    className="max-h-full max-w-full object-cover transition-transform duration-300"
                    style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
                />
            </div>

            {/* Product Details */}
            <div>
                <h3 className="text-sm font-medium text-gray-800 mb-1">{title}</h3>

                {/* Price */}
                <div className="flex items-center gap-2">
                    <span className="text-blue-500 font-medium">{price}</span>
                    {oldPrice && (
                        <span className="text-gray-400 text-sm line-through">{oldPrice}</span>
                    )}
                </div>

                {/* Rating */}
                <div className="flex items-center mt-2">
                    <div className="flex">
                        {Array.from({ length: 5 }).map((_, idx) => (
                            <svg
                                key={idx}
                                className={`w-3.5 h-3.5 ${idx < rating ? "text-yellow-400" : "text-gray-300"
                                    }`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.174c.969 0 1.371 1.24.588 1.81l-3.376 2.453a1 1 0 00-.364 1.118l1.287 3.97c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.376 2.453c-.784.57-1.838-.197-1.539-1.118l1.286-3.97a1 1 0 00-.364-1.118L2.63 9.397c-.783-.57-.38-1.81.588-1.81h4.174a1 1 0 00.951-.69l1.286-3.97z" />
                            </svg>
                        ))}
                    </div>
                    <span className="text-gray-500 text-xs ml-1">({reviewCount})</span>
                </div>
            </div>
        </div>
    );
};

export default function BestSellingProducts() {
    return (
        <div className="flex flex-col py-8">
            {/* Header with same padding as main header */}
            <div className="container mx-auto px-4 md:px-8 lg:px-20">
                <div className="flex items-center mb-2">
                    <span className="bg-blue-500 h-6 w-1 mr-2 rounded hidden md:block"></span>
                    <h1 className="text-lg font-bold text-blue-500">This Month</h1>
                </div>

                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">Best Selling Products</h2>

                    {/* View All Button */}
                    <button className="bg-blue-500 hover:bg-blue-500 text-white px-4 py-2 rounded text-sm font-medium transition-colors duration-200">
                        View All
                    </button>
                </div>
            </div>

            {/* Products Grid */}
            <div className="container mx-auto px-4 md:px-8 lg:px-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {bestSellingProducts.map((product) => (
                        <BestSellingProductCard
                            key={product.id}
                            imageSrc={product.imageSrc}
                            title={product.title}
                            price={product.price}
                            oldPrice={product.oldPrice}
                            rating={product.rating}
                            reviewCount={product.reviewCount}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}