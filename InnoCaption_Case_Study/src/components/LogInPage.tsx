import React, { useState } from 'react';
import { CartItemProps } from '../types';

interface LogInProps {
    updateCart: (newCart: CartItemProps[]) => void;
    loggedIn: boolean;
    setLoggedIn: (loggedIn: boolean) => void;
    firstname: string;
    setFirstname: (firstName: string) => void;
}

const LogInPage: React.FC<LogInProps> = ({ updateCart, loggedIn, setLoggedIn, firstname, setFirstname }) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogInButtonClick = async () => {
        try {
            // Fetch user data
            const response = await fetch('https://dummyjson.com/users');
            const data = await response.json();

            // Find the user with matching username and password
            const user = data.users.find((user: any) => user.username === username && user.password === password);
            
            if (user) {
                console.log("Logged in!");
                setFirstname(user.firstName);
                setLoggedIn(true);
                // Fetch cart data for the found user
                const cartResponse = await fetch(`https://dummyjson.com/carts/${user.id}`);
                const responseData = await cartResponse.json();
                const products: CartItemProps[] = responseData.products;
                
                // Mapping over products array to create CartItemProps objects
                const cartItems = products.map(product => ({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    quantity: product.quantity,
                    total: product.total,
                    discountPercentage: product.discountPercentage,
                    discountedPrice: product.discountedPrice,
                    thumbnail: product.thumbnail
                }));
    
                // Update cart using the provided updateCart function
                updateCart(cartItems);
                setErrorMessage('');
            } else {
                // Handle invalid login
                setErrorMessage("Invalid username or password!");
            }
        } catch (error) {
            console.error("Error logging in:", error);
        }
    };

    const handleLogoutButtonClick = () => {
        // Clear user info and set logged in state to false
        setUsername('');
        setPassword('');
        setFirstname('');
        setLoggedIn(false);
        updateCart([]);
    };

  return (
    <div id="LogInPage" className="page">
      {!loggedIn ? (
        <div className="user-info">
          <div className="user-input">
              <p>UserName:</p>
              <input
              type="string"
              size={16}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              />
          </div>
          <div className="user-input">
              <p>Password:</p>
              <input
              type="password"
              size={16}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button id="login-button" onClick={handleLogInButtonClick}>Log In</button>
        </div>
      ) : (
        <div className="welcome-info">
          <p>Welcome {firstname}!</p>
          <button id="logout-button" onClick={handleLogoutButtonClick}>Log Out</button>
        </div>
      )}
    </div>
  );
}

export default LogInPage;
