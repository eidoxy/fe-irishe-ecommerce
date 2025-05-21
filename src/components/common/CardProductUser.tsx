import { useState } from "react";
import CardProduct from "./CardProduct";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CardProductUserProps {
    id: number;
    imageSrc: string;
    title: string;
    price: string;
    oldPrice: string;
    discount: string;
    rating: number;
    reviewCount: number;
}

const tableData: CardProductUserProps[] = [
    {
        id: 1,
        imageSrc: "/images/product/product-01-bg.png",
        title: "HAVIT HV-G92 Gamepad",
        price: "$120",
        oldPrice: "$160",
        discount: "-40%",
        rating: 4,
        reviewCount: 88,
    },
    {
        id: 2,
        imageSrc: "/images/product/product-02-bg.png",
        title: "Smart Watch",
        price: "$25.99",
        oldPrice: "$35.00",
        discount: "-25%",
        rating: 3,
        reviewCount: 56,
    },
    {
        id: 3,
        imageSrc: "/images/product/product-03-bg.png",
        title: "Iphone 13 pro max",
        price: "$89.99",
        oldPrice: "$120.00",
        discount: "-30%",
        rating: 5,
        reviewCount: 102,
    },
    {
        id: 4,
        imageSrc: "/images/product/product-05-bg.png",
        title: "HAVIT HV-G92 Gamepad",
        price: "$120",
        oldPrice: "$160",
        discount: "-40%",
        rating: 4,
        reviewCount: 88,
    },
    {
        id: 5,
        imageSrc: "/images/product/product-02-bg.png",
        title: "Wireless Mouse",
        price: "$25.99",
        oldPrice: "$35.00",
        discount: "-25%",
        rating: 3,
        reviewCount: 56,
    },
    {
        id: 6,
        imageSrc: "/images/product/product-03-bg.png",
        title: "Mechanical Keyboard",
        price: "$89.99",
        oldPrice: "$120.00",
        discount: "-30%",
        rating: 5,
        reviewCount: 102,
    },
];

export default function CardProductUser() {
    const [scrollPosition, setScrollPosition] = useState(0);
    
    const scrollLeft = () => {
        const container = document.getElementById('product-scroll-container');
        if (container) {
            const newPosition = Math.max(scrollPosition - 300, 0);
            container.scrollTo({ left: newPosition, behavior: 'smooth' });
            setScrollPosition(newPosition);
        }
    };
    
    const scrollRight = () => {
        const container = document.getElementById('product-scroll-container');
        if (container) {
            const newPosition = Math.min(scrollPosition + 300, container.scrollWidth - container.clientWidth);
            container.scrollTo({ left: newPosition, behavior: 'smooth' });
            setScrollPosition(newPosition);
        }
    };

    return (
        <div className="flex flex-col py-8 bg-gray-50">
            {/* Header with same padding as main header */}
            <div className="container mx-auto px-4 md:px-8 lg:px-20">
                <div className="flex items-center mb-2">
                    <span className="bg-blue-500 h-6 w-1 mr-2 rounded hidden md:block"></span>
                    <h1 className="text-lg font-bold text-blue-500">Today's</h1>
                </div>
                
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">Flash Sales</h2>
                    
                    {/* Navigation Controls */}
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={scrollLeft}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-blue-500 hover:bg-purple-100 hover:border-purple-300 transition-colors duration-200"
                        >
                            <ChevronLeft size={18} />
                        </button>
                        <button 
                            onClick={scrollRight}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-blue-500 hover:bg-purple-100 hover:border-purple-300 transition-colors duration-200"
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            </div>
            
            {/* Scrollable Horizontal Container */}
            <div 
                id="product-scroll-container"
                className="container mx-auto overflow-x-auto px-4 md:px-8 lg:px-20 scrollbar-hide"
                style={{
                    scrollbarWidth: 'none', /* Firefox */
                    msOverflowStyle: 'none' /* IE and Edge */
                }}
            >
                <div className="flex gap-6 pb-4">
                    {tableData.map((product) => (
                        <div key={product.id} className="flex-shrink-0 w-60 md:w-64">
                            <CardProduct
                                imageSrc={product.imageSrc}
                                title={product.title}
                                price={product.price}
                                oldPrice={product.oldPrice}
                                discount={product.discount}
                                rating={product.rating}
                                reviewCount={product.reviewCount}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}