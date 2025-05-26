// src/components/CardProductUser.tsx
import { useState, useEffect } from "react";
import CardProduct from "./CardProduct"; // Sesuaikan path jika perlu
import { ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";
import { Product } from "../../types/Product"; // Sesuaikan path jika perlu

export default function CardProductUser() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get('http://47.128.233.82:3000/api/products');

                // Memastikan data yang diterima adalah array atau bisa diubah menjadi array produk
                if (Array.isArray(response.data)) {
                    setProducts(response.data);
                } else if (response.data && Array.isArray(response.data.data)) {
                    // Umum jika API membungkus array dalam properti 'data'
                    setProducts(response.data.data);
                } else if (response.data && Array.isArray(response.data.products)) {
                    // Umum jika API membungkus array dalam properti 'products'
                    setProducts(response.data.products);
                } else {
                    // Jika struktur tidak dikenali atau data null/undefined
                    console.warn("Struktur data API tidak dikenali atau data kosong. Menampilkan daftar produk kosong.");
                    setProducts([]); // Pastikan products tetap array untuk mencegah error .map
                }
            } catch (err) {
                console.error("Error fetching products:", err);
                if (axios.isAxiosError(err)) {
                    setError(err.message || "Gagal mengambil produk. Silakan coba lagi nanti.");
                } else {
                    setError("Terjadi kesalahan yang tidak terduga.");
                }
                setProducts([]); // Set ke array kosong jika terjadi error fetch
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []); // Dependensi kosong, fetch hanya sekali saat mount

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

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-lg text-gray-500">Loading products...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 md:px-8 lg:px-20 py-8 text-center">
                <p className="text-lg text-red-500">Error: {error}</p>
                <p className="text-gray-600">Tidak dapat memuat produk. Periksa koneksi Anda atau coba lagi nanti.</p>
            </div>
        );
    }

    // Pesan ini akan ditampilkan jika setelah loading dan tidak ada error, products tetap kosong
    if (products.length === 0) {
        return (
            <div className="container mx-auto px-4 md:px-8 lg:px-20 py-8 text-center">
                <p className="text-lg text-gray-500">Tidak ada produk yang tersedia saat ini.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col py-8 bg-gray-50">
            <div className="container mx-auto px-4 md:px-8 lg:px-20">
                <div className="flex items-center mb-2">
                    <span className="bg-blue-500 h-6 w-1 mr-2 rounded hidden md:block"></span>
                    <h1 className="text-lg font-bold text-blue-500">Today's</h1>
                </div>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">Flash Sales</h2>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={scrollLeft}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-blue-500 hover:bg-purple-100 hover:border-purple-300 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={scrollPosition === 0}
                        >
                            <ChevronLeft size={18} />
                        </button>
                        <button
                            onClick={scrollRight}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-blue-500 hover:bg-purple-100 hover:border-purple-300 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={
                                document.getElementById('product-scroll-container') ?
                                    scrollPosition >= document.getElementById('product-scroll-container')!.scrollWidth - document.getElementById('product-scroll-container')!.clientWidth - 1 :
                                    products.length <= 4 // Fallback sederhana, bisa disesuaikan dengan jumlah item per tampilan
                            }
                        >
                            <ChevronRight size={18} />
                        </button>
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
                            <CardProduct
                                imageSrc={product.imageUrl || "/images/placeholder.png"} // Fallback jika imageUrl kosong
                                title={product.name}
                                price={`$${product.price.toFixed(2)}`} // Format harga
                                oldPrice="" // Tidak ada di Product type
                                discount=""  // Tidak ada di Product type
                                rating={0}   // Tidak ada di Product type
                                reviewCount={0} // Tidak ada di Product type
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}