import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../layout/UserHeader";
import Footer from "../../layout/UserFooter";
import CardProduct from "../../components/common/CardProduct";
import { Product } from "../../models/product.model";
import { Link } from "react-router-dom";

export default function Catalog() {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [categories, setCategories] = useState<string[]>([]);
    const [sortOrder, setSortOrder] = useState<string>("default");

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get('https://be-irishe.seido.my.id/api/products');
                let data: Product[] = [];

                if (Array.isArray(response.data)) {
                    data = response.data;
                } else if (response.data && Array.isArray(response.data.data)) {
                    data = response.data.data;
                } else if (response.data && Array.isArray(response.data.products)) {
                    data = response.data.products;
                } else {
                    console.warn("Struktur data API tidak dikenali atau data kosong.");
                }

                setProducts(data);
                setFilteredProducts(data);

                const uniqueCategories = Array.from(new Set(data.map(item => item.categoryName))).filter(Boolean);
                setCategories(["All", ...uniqueCategories]);

            } catch (err) {
                console.error("Error fetching products:", err);
                if (axios.isAxiosError(err)) {
                    setError(err.message || "Gagal mengambil produk.");
                } else {
                    setError("Terjadi kesalahan.");
                }
                setProducts([]);
                setFilteredProducts([]);
                setCategories(["All"]);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Sort function
    const applySort = (list: Product[], order: string) => {
        let sortedList = [...list];
        switch (order) {
            case "name-asc":
                sortedList.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "name-desc":
                sortedList.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case "price-asc":
                sortedList.sort((a, b) => a.price - b.price);
                break;
            case "price-desc":
                sortedList.sort((a, b) => b.price - a.price);
                break;
            case "stock-asc":
                sortedList.sort((a, b) => a.stock - b.stock);
                break;
            case "stock-desc":
                sortedList.sort((a, b) => b.stock - a.stock);
                break;
            default:
                break;
        }
        setFilteredProducts(sortedList);
    };

    // Handle category filter
    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedCategory(value);

        const filtered = value === "All" ? products : products.filter(product => product.categoryName === value);
        applySort(filtered, sortOrder);
    };

    // Handle sort change
    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSortOrder(value);
        const filtered = selectedCategory === "All" ? products : products.filter(product => product.categoryName === selectedCategory);
        applySort(filtered, value);
    };

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
            <div className="container px-2 sm:px-6 md:px-8 lg:px-12 xl:px-20 py-8">
                <div className="mb-6 md:mb-8">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Our Products</h1>
                        <Link to="/users" className="text-sm text-blue-500 hover:text-blue-700 mt-2 sm:mt-0">
                            &larr; Back to Home
                        </Link>
                    </div>

                    {/* Filter & Sort Controls */}
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                        <div className="flex items-center">
                            <label htmlFor="categoryFilter" className="mr-2 text-sm font-medium text-gray-700">Filter by Category:</label>
                            <select
                                id="categoryFilter"
                                value={selectedCategory}
                                onChange={handleCategoryChange}
                                className="border border-gray-300 rounded px-2 py-1 text-sm"
                            >
                                {categories.map((category, index) => (
                                    <option key={index} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex items-center">
                            <label htmlFor="sortOrder" className="mr-2 text-sm font-medium text-gray-700">Sort by:</label>
                            <select
                                id="sortOrder"
                                value={sortOrder}
                                onChange={handleSortChange}
                                className="border border-gray-300 rounded px-2 py-1 text-sm"
                            >
                                <option value="default">Default</option>
                                <option value="name-asc">Name (A-Z)</option>
                                <option value="name-desc">Name (Z-A)</option>
                                <option value="price-asc">Price (Lowest)</option>
                                <option value="price-desc">Price (Highest)</option>
                                <option value="stock-asc">Stock (Lowest)</option>
                                <option value="stock-desc">Stock (Highest)</option>
                            </select>
                        </div>
                    </div>

                    {filteredProducts.length > 0 ? (
                        <p className="text-gray-600 text-sm sm:text-base">Check out all our amazing deals!</p>
                    ) : (
                        !loading && <p className="text-lg text-gray-500 mt-4">Tidak ada produk tersedia.</p>
                    )}
                </div>

                {/* Product List */}
                {filteredProducts.length > 0 && (
                    <div className="flex flex-wrap justify-start gap-4">
                        {filteredProducts.map((product) => (
                            <div key={product.id} className="w-64 md:w-52">
                                <Link to={`/product/${product.id}`} className="flex-shrink-0 w-60 md:w-64">
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
                )}
            </div>
            <Footer />
        </>
    );
}
