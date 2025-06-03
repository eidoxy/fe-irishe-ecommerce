// src/pages/User/Catalog.tsx
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../layout/UserHeader";
import Footer from "../../layout/UserFooter";
import CardProduct from "../../components/common/CardProduct";
import { Product } from "../../models/product.model";
import { Link } from "react-router-dom";

export default function Catalog() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

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
    }, []);

    if (loading) {
        return (
            <>
                <Header />
                <div className="flex justify-center items-center" style={{ minHeight: 'calc(100vh - 120px)' }}>
                    <p className="text-lg text-gray-500">Loading all flash sale products...</p>
                </div>
                <Footer />
            </>
        );
    }

    if (error) {
        return (
            <>
                <Header />
                <div className="container mx-auto px-4 md:px-8 lg:px-20 py-8 text-center" style={{ minHeight: 'calc(100vh - 120px)' }}>
                    <div className="mb-8">
                        <Link to="/users" className="text-blue-500 hover:text-blue-700">&larr; Back to Home</Link>
                        <h1 className="text-3xl font-bold text-gray-800 mt-4">Our Products</h1>
                    </div>
                    <p className="text-lg text-red-500">Error: {error}</p>
                    <p className="text-gray-600">Tidak dapat memuat produk. Periksa koneksi Anda atau coba lagi nanti.</p>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            {/* Gunakan padding yang konsisten dengan CardProductUser jika perlu */}
            <div className="container  px-2 sm:px-6 md:px-8 lg:px-12 xl:px-20 py-8">
                <div className="mb-6 md:mb-8">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Our Products</h1>
                        <Link to="/users" className="text-sm text-blue-500 hover:text-blue-700 mt-2 sm:mt-0">
                            &larr; Back to Home
                        </Link>
                    </div>
                    {products.length > 0 ? (
                        <p className="text-gray-600 text-sm sm:text-base">Check out all our amazing deals!</p>
                    ) : (
                        !loading && <p className="text-lg text-gray-500 mt-4">Tidak ada produk flash sale yang tersedia saat ini.</p>
                    )}
                </div>

                {products.length > 0 && (
                    <div className="flex flex-wrap justify-start gap-4">
                        {products.map((product) => (
                            <div key={product.id} className="w-64 md:w-52">
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
                )}
            </div>
            <Footer />
        </>
    );
}

