import { useState } from 'react'
import { ProductProps } from './types';
import ProductPage from './components/ProductPage'
import CartPage from './components/CartPage'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('product'); // State to track active tab
  const [cart, setCart] = useState<{ product: ProductProps, amount: number }[]>([]);

  // Function to handle tab click and switch active tab
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
        {activeTab === 'product' && <ProductPage addToCart={addToCart} />}
        {activeTab === 'cart' && <CartPage cart={cart} removeFromCart={removeFromCart} />}
      </div>
    </>
  )
}

export default App
