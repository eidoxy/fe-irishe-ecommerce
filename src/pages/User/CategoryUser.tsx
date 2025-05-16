import { useState } from "react";
import { ChevronLeft, ChevronRight, Smartphone, Monitor, Watch, Camera, Headphones, Gamepad } from "lucide-react";

interface CategoryItemProps {
    id: number;
    icon: React.ReactNode;
    name: string;
    isActive?: boolean;
}

// Category Item Component
const CategoryItem = ({ icon, name, isActive = false }: CategoryItemProps) => {
    return (
        <div
            className={`flex flex-col items-center justify-center p-6 rounded-lg border transition-all duration-300 cursor-pointer ${isActive
                    ? "bg-blue-500 border-blue-500 text-white"
                    : "bg-white border-gray-200 text-gray-800 hover:shadow-md hover:border-red-200"
                }`}
        >
            <div className="mb-3">
                {icon}
            </div>
            <span className="text-sm font-medium">{name}</span>
        </div>
    );
};

const categories: CategoryItemProps[] = [
    {
        id: 1,
        icon: <Smartphone size={24} />,
        name: "Phones"
    },
    {
        id: 2,
        icon: <Monitor size={24} />,
        name: "Computers"
    },
    {
        id: 3,
        icon: <Watch size={24} />,
        name: "SmartWatch"
    },
    {
        id: 4,
        icon: <Camera size={24} />,
        name: "Camera",
        isActive: true
    },
    {
        id: 5,
        icon: <Headphones size={24} />,
        name: "HeadPhones"
    },
    {
        id: 6,
        icon: <Gamepad size={24} />,
        name: "Gaming"
    },
    {
        id: 7,
        icon: <Smartphone size={24} />,
        name: "Phones"
    },
    {
        id: 8,
        icon: <Monitor size={24} />,
        name: "Computers"
    }
];

export default function CategoryBrowser() {
    const [scrollPosition, setScrollPosition] = useState(0);

    const scrollLeft = () => {
        const container = document.getElementById('category-scroll-container');
        if (container) {
            const newPosition = Math.max(scrollPosition - 300, 0);
            container.scrollTo({ left: newPosition, behavior: 'smooth' });
            setScrollPosition(newPosition);
        }
    };

    const scrollRight = () => {
        const container = document.getElementById('category-scroll-container');
        if (container) {
            const newPosition = Math.min(scrollPosition + 300, container.scrollWidth - container.clientWidth);
            container.scrollTo({ left: newPosition, behavior: 'smooth' });
            setScrollPosition(newPosition);
        }
    };

    return (
        <div className="flex flex-col py-8">
            {/* Header with same padding as main header */}
            <div className="container mx-auto px-4 md:px-8 lg:px-20">
                <div className="flex items-center mb-2">
                    <span className="bg-blue-500 h-6 w-1 mr-2 rounded hidden md:block"></span>
                    <h1 className="text-lg font-bold text-blue-500">Categories</h1>
                </div>

                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">Browse By Category</h2>

                    {/* Navigation Controls */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={scrollLeft}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors duration-200"
                        >
                            <ChevronLeft size={18} />
                        </button>
                        <button
                            onClick={scrollRight}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors duration-200"
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Scrollable Horizontal Container */}
            <div
                id="category-scroll-container"
                className="container mx-auto overflow-x-auto px-4 md:px-8 lg:px-20"
                style={{
                    scrollbarWidth: 'none', /* Firefox */
                    msOverflowStyle: 'none' /* IE and Edge */
                }}
            >
                <div className="flex gap-5 pb-4">
                    {categories.map((category) => (
                        <div key={category.id} className="flex-shrink-0 w-36">
                            <CategoryItem
                                id={category.id}
                                icon={category.icon}
                                name={category.name}
                                isActive={category.isActive}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}