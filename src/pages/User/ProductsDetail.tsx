import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Header from "../../layout/UserHeader";
import Footer from "../../layout/UserFooter";
import { Product } from "../../models/product.model";

export default function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`http://47.128.233.82:3000/api/products/${id}`);
                if (response.data && response.data.data) {
                    setProduct(response.data.data);
                } else {
                    setError("Produk tidak ditemukan.");
                }
            } catch (err) {
                console.error("Error fetching product:", err);
                setError("Gagal mengambil detail produk.");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <>
                <Header />
                <div className="flex justify-center items-center" style={{ minHeight: 'calc(100vh - 120px)' }}>
                    <p className="text-lg text-gray-500">Loading product details...</p>
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
                    <Link to="/catalog" className="text-blue-500 hover:text-blue-700">&larr; Back to Catalog</Link>
                    <h1 className="text-2xl font-bold text-red-600 mt-4">{error}</h1>
                </div>
                <Footer />
            </>
        );
    }

    if (!product) return null;

    return (
        <>
            <Header />
            <div className="container mx-auto px-4 md:px-8 lg:px-20 py-8">
                <Link to="/catalog" className="text-blue-500 hover:text-blue-700">&larr; Back to Catalog</Link>

                <div className="grid md:grid-cols-2 gap-8 mt-6">
                    {/* Image */}
                    <div className="bg-gray-50 p-6 flex items-center justify-center">
                        <img
                            src={product.imageUrl || "/images/placeholder.png"}
                            alt={product.name}
                            className="max-w-full max-h-96 object-contain"
                        />
                    </div>

                    {/* Info */}
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
                        <p className="text-gray-500 mb-2">Category: {product.categoryName}</p>
                        <p className="text-blue-700 text-2xl font-bold mb-4">${product.price.toFixed(2)}</p>
                        <p className="text-gray-600 mb-6">{product.description || "No description available."}</p>

                        <div className="flex items-center gap-4 mb-4">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${product.stock > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                                {product.stock > 0 ? `In Stock: ${product.stock}` : "Out of Stock"}
                            </span>
                        </div>

                        {/* <button className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg shadow transition">
                            Add to Cart
                        </button> */}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
