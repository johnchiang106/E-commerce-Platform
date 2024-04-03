import { useState, useEffect } from 'react'
import { ProductProps } from '../types';
import ProductModal from './ProductModal'

interface ProductPageProps {
    cart: { product: ProductProps, amount: number }[];
    products: ProductProps[];
    addToCart: (product: ProductProps, quantity: number) => void;
    handleTabClick: (tabName: string) => void;
}

const ProductPage: React.FC<ProductPageProps> = ({ cart, products, addToCart, handleTabClick }) => {
    const [filterText, setFilterText] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [filteredProductIds, setFilteredProductIds] = useState<number[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<ProductProps | null>(null);

    useEffect(() => {
        const fetchProductIds = async () => {
            try {
                const response = await fetch(`https://dummyjson.com/products/search?limit=0&q=${filterText}`);
                if (response.ok) {
                    const data = await response.json();
                    const productIds = data.products.map((product: { id: number }) => product.id);
                    setFilteredProductIds(productIds);
                } else {
                    console.error('Failed to fetch product IDs');
                }
            } catch (error) {
                console.error('Error fetching product IDs:', error);
            }
        };

        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                fetchProductIds();
            }
        };

        document.addEventListener('keypress', handleKeyPress);

        return () => {
            document.removeEventListener('keypress', handleKeyPress);
        };
    }, [filterText]);

    const filteredProducts = products.filter(product => {
        const matchesSearch = filteredProductIds.length === 0 || filteredProductIds.includes(product.id);
        const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
        return matchesSearch && matchesCategory;
    });

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilterText(event.target.value);
    };

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value);
    };

    const isInCart = (productId: number) => {
        return cart.some(item => item.product.id === productId);
    };

    const getCartAmount = (productId: number) => {
        const cartItem = cart.find(item => item.product.id === productId);
        return cartItem ? cartItem.amount : 0;
    };

    const renderButton = (product: ProductProps) => {
        if (isInCart(product.id)) {
            return <button className="fancy-button amount" onClick={() => handleTabClick("cart")}>{getCartAmount(product.id)}</button>;
        } else {
            return <button className="fancy-button add" onClick={() => addToCart(product, 1)}>Add to Cart</button>;
        }
    };

    const openModal = (product: ProductProps) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedProduct(null);
        setIsModalOpen(false);
    };

    return (
        <>
            <div>
                <input id="searchField"
                    type="text"
                    placeholder="Search products..."
                    value={filterText}
                    onChange={handleFilterChange}
                />
                <select onChange={handleCategoryChange} value={selectedCategory}>
                    <option value="">All Categories</option>
                    {Array.from(new Set(products.map(product => product.category))).map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
            </div>
            {!isModalOpen && (
                <div id="prodPage" className="page">
                    {filteredProducts.map(product => (
                        <div key={product.id} className="prod card">
                            <strong className="title-container" onClick={() => openModal(product)}>{product.title}</strong>
                            <img src={product.images[0]} alt={product.title} onClick={() => openModal(product)} /><br />
                            <del>${product.price}</del><br />
                            <span className="red">${product.actualPrice}</span><br />
                            {renderButton(product)}
                        </div>
                    ))}
                </div>
            )}
            <ProductModal isOpen={isModalOpen} onClose={closeModal} product={selectedProduct} />
        </>
    );
}

export default ProductPage;
