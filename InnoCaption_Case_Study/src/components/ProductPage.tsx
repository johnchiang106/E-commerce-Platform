import { useEffect, useState } from 'react'
import { ProductProps } from '../types';

interface ProductPageProps {
    addToCart: (product: ProductProps, quantity: number) => void;
}

const ProductPage: React.FC<ProductPageProps> = ({ addToCart }) => {
    const [products, setProducts] = useState<ProductProps[]>([]); // Specify the type as ProductProps[]

    useEffect(() => {
        fetch('https://dummyjson.com/products')
        .then(res => res.json())
        .then(data => {
            if (data && data.products) {
            setProducts(data.products);
            }
        })
        .catch(error => console.error('Error fetching products:', error));
    }, []); // empty dependency array to fetch data only once when component mounts
    
    return (
    <div id="prodPage" className="page">
      {products.map(product => (
        <div key={product.id} className="prod card">
          <strong>{product.title}</strong><br />
          <span className="red">${product.price}</span><br />
          {/* <input type="number" min="1" defaultValue="1" ref={input => product.inputRef = input} /> */}
          <button className="fancy-button buy" onClick={() => addToCart(product, 1)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
  }
  
  export default ProductPage;
