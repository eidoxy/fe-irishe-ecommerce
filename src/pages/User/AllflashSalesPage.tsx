// src/pages/User/AllFlashSalesPage.tsx
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../layout/UserHeader"; // Pastikan path ini benar
import Footer from "../../layout/UserFooter"; // Pastikan path ini benar
import CardProduct from "../../components/common/CardProduct"; // Pastikan path ini benar
import { Product } from "../../types/Product"; // Pastikan path ini benar
import { Link } from "react-router-dom";

export default function AllFlashSalesPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get('http://47.128.233.82:3000/api/products');
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
                <div className="flex justify-center items-center" style={{ minHeight: 'calc(100vh - 120px)' }}> {/* Adjust minHeight if header/footer sizes differ */}
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
                        <h1 className="text-3xl font-bold text-gray-800 mt-4">Flash Sales</h1>
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
            <div className="container mx-auto px-4 md:px-8 lg:px-20 py-8">
                <div className="mb-8">
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-bold text-gray-800">Flash Sales</h1>
                        <Link to="/users" className="text-sm text-blue-500 hover:text-blue-700 hidden md:block">
                            &larr; Back to Home
                        </Link>
                    </div>
                    {products.length > 0 ? (
                        <p className="text-gray-600">Check out all our amazing deals!</p>
                    ) : (
                        <p className="text-lg text-gray-500 mt-4">Tidak ada produk flash sale yang tersedia saat ini.</p>
                    )}
                    <Link to="/users" className="text-sm text-blue-500 hover:text-blue-700 md:hidden mt-2 block">
                        &larr; Back to Home
                    </Link>
                </div>

                {products.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
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
                )}
            </div>
            <Footer />
        </>
    );
}