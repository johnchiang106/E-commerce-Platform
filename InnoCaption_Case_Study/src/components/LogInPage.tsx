import React from 'react';
import { useState } from 'react'
import { ProductProps, CartItemProps } from '../types';

interface LogInProps {
    updateCart: (newCart: CartItemProps[]) => void;
}

const LogInPage: React.FC<LogInProps> = ({ updateCart }) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogInButtonClick = () => {
        fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
            username,
            password,
            })
        })
        .then(res => {
            if (!res.ok) {
            throw new Error('Invalid username or password');
            }
            return res.json();
        })
        .then(userData => {
            // If login is successful, fetch user's cart
            fetch(`https://dummyjson.com/carts/user/${userData.id}`)
            .then(res => res.json())
            .then(newCart => {
                // Call the updateCart function passed from parent component
                updateCart(newCart);
            })
            .catch(error => {
                console.error('Error fetching user cart:', error);
            });
        })
        .catch(error => {
            console.error('Error logging in:', error);
        });
    };

  return (
    <div id="LogInPage" className="page">
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
      </div>
      <button id="login-button" onClick={handleLogInButtonClick}>Log In</button>
    </div>
  );
}

export default LogInPage;
