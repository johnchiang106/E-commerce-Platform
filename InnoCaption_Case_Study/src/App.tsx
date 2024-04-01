import { useEffect, useState } from 'react'
import ProductPage from './components/ProductPage'
import CartPage from './components/CartPage'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('product'); // State to track active tab

  // Function to handle tab click and switch active tab
  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
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
        {activeTab === 'product' && <ProductPage />}
        {activeTab === 'cart' && <CartPage />}
      </div>
    </>
  )
  /*
  const [count, setCount] = useState(0)

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []); // empty dependency array to run only once when component mounts

  return (
    <div className="App">
      <span id="showInfoPage" className="tab"><img src="https://upload.cc/i1/2024/04/01/QJ5IXd.png" />
      </span>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
  */
}

export default App
