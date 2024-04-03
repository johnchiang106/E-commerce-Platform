import { useState, useEffect } from 'react'
import { ProductProps } from './types';
import ProductPage from './components/ProductPage'
import CartPage from './components/CartPage'
import './App.css'
import LogInPage from './components/LogInPage';

function App() {
  const [activeTab, setActiveTab] = useState('product');
  const [cart, setCart] = useState<{ product: ProductProps, amount: number }[]>([]);
  const [products, setProducts] = useState<ProductProps[]>([]);

  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=0')
      .then(res => res.json())
      .then(data => {
        if (data && data.products) {
          const updatedProducts: ProductProps[] = data.products.map((product: ProductProps) => ({
            ...product,
            actualPrice: Math.round((product.price * (100 - product.discountPercentage))) / 100
          }));
          setProducts(updatedProducts);
        }
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []); // empty dependency array to fetch data only once when component mounts

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  const addToCart = (product: ProductProps, quantity: number) => {
    const existingItem = cart.find(item => item.product.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => {
        if (item.product.id === product.id) {
          return { ...item, amount: item.amount + quantity };
        }
        return item;
      }));
    } else {
      setCart([...cart, { product, amount: quantity }]);
    }
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    let newQ = Math.max(1, newQuantity);
    setCart(prevCart =>
      prevCart.map(item =>
        item.product.id === productId ? { ...item, amount: newQ } : item
      )
    );
  };
  
  return (
    <>
      <div className="banner">
          <h1>InnoCaption Shopping</h1>
          <span id="showProdPage"
            className={`tab ${activeTab === 'product' ? 'active' : ''}`}
            onClick={() => handleTabClick('product')}
          >
            Product List
          </span>
          <span id="showCartPage"
            className={`tab ${activeTab === 'cart' ? 'active' : ''}`}
            onClick={() => handleTabClick('cart')}
          >
            Cart
          </span>
          <span id="showInfoPage"
            className={`tab ${activeTab === 'account' ? 'active' : ''}`}
            onClick={() => handleTabClick('account')}
          >
            Account
          </span>
      </div>
      <div className="container">
        {activeTab === 'product' && <ProductPage cart={cart} products={products} addToCart={addToCart} handleTabClick={handleTabClick} />}
        {activeTab === 'cart' && <CartPage cart={cart} removeFromCart={removeFromCart} handleQuantityChange={handleQuantityChange} />}
        {activeTab === 'account' && <LogInPage cart={cart} removeFromCart={removeFromCart} />}
      </div>
    </>
  )
}

export default App
