// src/components/CardProductUser.tsx
import { useState, useEffect } from "react";
import CardProduct from "./CardProduct"; // Sesuaikan path jika perlu
import { ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";
import { Product } from "../../models/product.model";
import { Link } from "react-router-dom"; // Sesuaikan path jika perlu

export default function CardProductUser() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [containerWidth, setContainerWidth] = useState(0);
    const [scrollWidth, setScrollWidth] = useState(0);

    const MAX_ITEMS_HOMEPAGE = 8;

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get('https://be-irishe.seido.my.id/api/products');
                if (Array.isArray(response.data)) {
                    setProducts(response.data);
                } else if (response.data && Array.isArray(response.data.data)) {
                    setProducts(response.data.data);
                } else if (response.data && Array.isArray(response.data.products)) {
                    setProducts(response.data.products);
                } else {
                    console.warn("Struktur data API tidak dikenali atau data kosong. Menampilkan daftar produk kosong.");
                    setProducts([]);
                }
            } catch (err) {
                console.error("Error fetching products:", err);
                if (axios.isAxiosError(err)) {
                    setError(err.message || "Gagal mengambil produk. Silakan coba lagi nanti.");
                } else {
                    setError("Terjadi kesalahan yang tidak terduga.");
                }
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []); // Dependensi kosong, fetch hanya sekali saat mount

    useEffect(() => {
        const container = document.getElementById('product-scroll-container');
        if (container) {
            const updateDimensions = () => {
                setContainerWidth(container.clientWidth);
                setScrollWidth(container.scrollWidth);
            };
            updateDimensions(); // Initial call
            // Update on resize or when products change (re-render might affect scrollWidth)
            window.addEventListener('resize', updateDimensions);
            // Watch for product changes if it affects scrollWidth significantly
            // For simplicity, this effect runs once. Could add 'products' to dependency array
            // if dynamic loading of more items in this component happens.
            return () => window.removeEventListener('resize', updateDimensions);
        }
    }, [products]); // Re-run if products change, as scrollWidth might change

    const scrollAmount = 300; // Amount to scroll per click

    const scrollLeft = () => {
        const container = document.getElementById('product-scroll-container');
        if (container) {
            const newPosition = Math.max(scrollPosition - scrollAmount, 0);
            container.scrollTo({ left: newPosition, behavior: 'smooth' });
            setScrollPosition(newPosition);
        }
    };

    const scrollRight = () => {
        const container = document.getElementById('product-scroll-container');
        if (container) {
            // Ensure scrollWidth is up-to-date if products load dynamically
            const currentScrollWidth = container.scrollWidth;
            const currentClientWidth = container.clientWidth;
            const newPosition = Math.min(scrollPosition + scrollAmount, currentScrollWidth - currentClientWidth);
            container.scrollTo({ left: newPosition, behavior: 'smooth' });
            setScrollPosition(newPosition);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64 bg-gray-50">
                <p className="text-lg text-gray-500">Loading products...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 md:px-8 lg:px-20 py-8 text-center bg-gray-50">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Flash Sales</h2>
                <p className="text-lg text-red-500">Error: {error}</p>
                <p className="text-gray-600">Tidak dapat memuat produk.</p>
            </div>
        );
    }

    const displayProducts = products.slice(0, MAX_ITEMS_HOMEPAGE);
    // Pesan ini akan ditampilkan jika setelah loading dan tidak ada error, products tetap kosong
    if (products.length === 0) {
        return (
            <div className="container mx-auto px-4 md:px-8 lg:px-20 py-8 text-center">
                <p className="text-lg text-gray-500">Tidak ada produk yang tersedia saat ini.</p>
            </div>
        );
    }

    if (displayProducts.length === 0) {
        return (
            <div className="flex flex-col py-8 bg-gray-50">
                <div className="container mx-auto px-4 md:px-8 lg:px-20">
                    <div className="flex items-center mb-2">
                        <span className="bg-blue-500 h-6 w-1 mr-2 rounded hidden md:block"></span>
                        <h1 className="text-lg font-bold text-blue-500">Today's</h1>
                    </div>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold text-gray-800">Ourt Products</h2>
                        <Link
                            to="/catalog"// <-- Path ke halaman baru, disesuaikan dengan routing
                            className="bg-blue-500 hover:bg-blue-500 text-white px-4 py-2 rounded text-sm font-medium transition-colors duration-200"
                        >
                            View All
                        </Link>
                    </div>
                    <p className="text-lg text-gray-500 text-center py-10">Tidak ada produk flash sale yang tersedia saat ini.</p>
                </div>
            </div>
        );
    }

    const canScrollLeft = scrollPosition > 0;
    const canScrollRight = containerWidth < scrollWidth && scrollPosition < (scrollWidth - containerWidth);


    return (
        <div className="flex flex-col py-8 bg-gray-50">
            <div className="container mx-auto px-4 md:px-8 lg:px-20">
                <div className="flex items-center mb-2">
                    <span className="bg-blue-500 h-6 w-1 mr-2 rounded hidden md:block"></span>
                    <h1 className="text-lg font-bold text-blue-500">Today's</h1>
                </div>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">New Arrivals</h2>
                    <div className="flex items-center gap-2 md:gap-3">
                        {/* Tombol View All */}
                        <>
                            <button
                                onClick={scrollLeft}
                                className="w-8 h-8 rounded-full border border-black flex items-center justify-center text-blue-500 hover:bg-purple-100 hover:border-purple-300 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={!canScrollLeft}
                                aria-label="Scroll Left"
                            >
                                <ChevronLeft size={18} />
                            </button>
                            <button
                                onClick={scrollRight}
                                className="w-8 h-8 rounded-full border border-black flex items-center justify-center text-blue-500 hover:bg-purple-100 hover:border-purple-300 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={!canScrollRight}
                                aria-label="Scroll Right"
                            >
                                <ChevronRight size={18} />
                            </button>
                        </>

                    </div>
                </div>
            </div>
            <div
                id="product-scroll-container"
                className="container mx-auto overflow-x-auto px-4 md:px-8 lg:px-20 scrollbar-hide"
                style={{
                    scrollbarWidth: 'none', /* Firefox */
                    // @ts-ignore: Properti spesifik IE/Edge
                    msOverflowStyle: 'none',  /* IE and Edge */
                }}
            >
                <div className="flex gap-6 pb-4">
                    {products.map((product) => (
                        <div key={product.id} className="flex-shrink-0 w-60 md:w-64">
                            <Link to={`/product/${product.id}`} key={product.id} className="flex-shrink-0 w-60 md:w-64">
                                <CardProduct
                                    imageSrc={product.imageUrl || "/images/placeholder.png"}
                                    title={product.name}
                                    price={`$${product.price.toFixed(2)}`}
                                    oldPrice=""
                                    discount=""
                                    rating={0}
                                    reviewCount={0}
                                />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}