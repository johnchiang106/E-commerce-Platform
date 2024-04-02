import { useEffect, useState } from 'react'
import { ProductProps } from '../types';

interface ProductPageProps {
    products: ProductProps[];
    addToCart: (product: ProductProps, quantity: number) => void;
}

const ProductPage: React.FC<ProductPageProps> = ({ products, addToCart }) => {
    
    return (
    <div id="prodPage" className="page">
        {products.map(product => (
            <div key={product.id} className="prod card">
            <div className="title-container"><strong>{product.title}</strong></div>
            <img src={product.images[0]} alt={product.title} /><br />
            <del>${product.price}</del><br />
            <span className="red">${product.actualPrice}</span><br />
            {/* <input type="number" min="1" defaultValue="1" ref={input => product.inputRef = input} /> */}
            <button className="fancy-button buy" onClick={() => addToCart(product, 1)}>Add to Cart</button>
            </div>
        ))}
    </div>
      
  );
  }
  
  export default ProductPage;
