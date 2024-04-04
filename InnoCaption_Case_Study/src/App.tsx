import { useState, useEffect } from 'react'
import { ProductProps, CartItemProps } from './types';
import ProductPage from './components/ProductPage'
import CartPage from './components/CartPage'
import LogInPage from './components/LogInPage';
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('product');
  const [cart, setCart] = useState<CartItemProps[]>([]);
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [firstname, setFirstname] = useState('');

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

  const addToCart = (product: ProductProps) => {
    // Calculate total price after discount
    const dPrice = Math.round(product.price * (100 - product.discountPercentage)) / 100;

    // Create a new CartItemProps object
    const newItem: CartItemProps = {
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: 1, // Assuming initially adding one quantity to the cart
      total: dPrice, // Initial total considering discount
      discountPercentage: product.discountPercentage,
      discountedPrice: dPrice,
      thumbnail: product.images[0], // Assuming first image as thumbnail
    };

    // Check if the item already exists in the cart
    const existingItemIndex = cart.findIndex(item => item.id === product.id);

    if (existingItemIndex !== -1) {
      // If item exists, update its quantity and total
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      updatedCart[existingItemIndex].total += dPrice;
      setCart(updatedCart);
    } else {
      // If item doesn't exist, add it to the cart
      setCart([...cart, newItem]);
    }
  };

  const updateCart = (newCart: CartItemProps[]) => {
    setCart(newCart);
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    const newQ = Math.max(1, newQuantity);
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQ, total: Math.round((item.discountedPrice * newQ) * 100) / 100 } : item
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
        {/* {activeTab === 'account' && <LogInPage updateCart={updateCart} />} */}
        {activeTab === 'account' && <LogInPage updateCart={updateCart} loggedIn={loggedIn} setLoggedIn={setLoggedIn} firstname={firstname} setFirstname={setFirstname} />}
      </div>
    </>
  )
}

export default App
