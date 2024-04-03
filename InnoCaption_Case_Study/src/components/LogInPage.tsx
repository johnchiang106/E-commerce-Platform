import React from 'react';
import { ProductProps } from '../types';

interface LogInProps {
  cart: { product: ProductProps, amount: number }[];
  removeFromCart: (productId: number) => void;
}

const LogInPage: React.FC<LogInProps> = ({ cart, removeFromCart }) => {

    const handleLogInButtonClick = () => {
        // setCurrentImageIndex((prevIndex) => (prevIndex - 1 + (product?.images.length || 0)) % (product?.images.length || 0));
        console.log("hi");
    };

  return (
    <div id="LogInPage" className="page">
      <div className="user-info">
        <div className="user-input">
            <p>UserName:</p>
            <input
            type="string"
            size={16}
            />
        </div>
        <div className="user-input">
            <p>Password:</p>
            <input
            type="string"
            size={16}
            />
        </div>
      </div>
      <button id="login-button" onClick={handleLogInButtonClick}>Log In</button>
    </div>
  );
}

export default LogInPage;
