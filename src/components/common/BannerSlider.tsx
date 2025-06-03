import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BannerDataProps {
    id: number;
    imageSrc: string;
    title: string;
    description: string;
}

const bannerData: BannerDataProps[] = [
    {
        id: 1,
        imageSrc: "/images/product/banner-01.jpg",
        title: "",
        description: "",
    },
    {
        id: 2,
        imageSrc: "/images/product/banner-01.jpg",
        title: "",
        description: "",
    },
    {
        id: 3,
        imageSrc: "/images/product/banner-01.jpg",
        title: "",
        description: "",
    },
];

export default function BannerSlider() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        const newIndex = (currentIndex - 1 + bannerData.length) % bannerData.length;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const newIndex = (currentIndex + 1) % bannerData.length;
        setCurrentIndex(newIndex);
    };

    return (
        <div className="relative overflow-hidden">
            {/* Slider container */}
            <div
                className="flex transition-transform duration-500"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {bannerData.map((banner) => (
                    <div key={banner.id} className="min-w-full relative h-56 md:h-80 lg:h-96">
                        <img
                            src={banner.imageSrc}
                            alt={banner.title}
                            className="w-full h-full object-cover"
                            onError={() =>
                                console.error("❌ Gagal load gambar:", banner.imageSrc)
                            }
                        />
                        <div className="absolute inset-0 flex flex-col justify-center items-start px-6 md:px-16 md:py-69 text-white ">
                            <p className="text-sm md:text-lg">{banner.title}</p>
                            <h2 className="text-2xl md:text-4xl font-bold mb-4">
                                {banner.description}
                            </h2>
                            {/* <button className="px-5 py-2 bg-blue-700 text-black font-medium rounded hover:bg-gray-300 transition">
                                Detail →
                            </button> */}
                        </div>
                    </div>
                ))}
            </div>

           {/* Navigasi Arrow */}
            <button
                onClick={prevSlide}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 p-2 bg-blue-300 text-black rounded-full hover:bg-blue-900 transition"
            >
                <ChevronLeft size={20} />
            </button>
            <button
                onClick={nextSlide}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 p-2 bg-blue-300 text-black rounded-full hover:bg-blue-900 transition"
            >
                <ChevronRight size={20} />
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {bannerData.map((_, index) => (
                    <span
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-3 w-3 rounded-full cursor-pointer border-2 ${index === currentIndex
                                ? "border-white bg-red-500"
                                : "border-gray-400 bg-gray-500"
                            }`}
                    ></span>
                ))}
            </div>
        </div>
    );
}
