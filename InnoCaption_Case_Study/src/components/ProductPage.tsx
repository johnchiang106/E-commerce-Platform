import { useEffect, useState } from 'react'

interface Product {
    id: number;
    title: string;
    price: number;
    // Add other properties as needed
}

function ProductPage() {
    const [products, setProducts] = useState<Product[]>([]); // Specify the type as Product[]

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
            <button className="fancy-button buy" data-name={product.title} data-price={product.price}>Buy</button>
            </div>
        ))}
      </div>
    );
  }
  
  export default ProductPage;
