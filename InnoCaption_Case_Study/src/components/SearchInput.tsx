import { useState, useEffect } from 'react'
import { ProductProps } from '../types';

interface SearchInputProps {
    onFilterChange: (text: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onFilterChange }) => {

    const [filterText, setFilterText] = useState('');
    const [filteredProductIds, setProductIds] = useState<number[]>(Array.from({ length: 100 }, (_, index) => index + 1));

    useEffect(() => {
        const fetchProductIds = async () => {
            try {
                const response = await fetch(`https://dummyjson.com/products/search?limit=0&q=${filterText}`);
                if (response.ok) {
                    const data = await response.json();
                    // Extracting product IDs from the fetched products
                    const productIds = data.products.map((product: { id: number }) => product.id);
                    setProductIds(productIds);
                } else {
                    console.error('Failed to fetch product IDs');
                }
            } catch (error) {
                console.error('Error fetching product IDs:', error);
            }
        };
    
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                fetchProductIds();
            }
        };
    
        // Fetch product IDs when Enter key is pressed
        document.addEventListener('keypress', handleKeyPress);
    
        return () => {
            // Remove event listener when component unmounts
            document.removeEventListener('keypress', handleKeyPress);
        };
    }, [filterText]);

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // onFilterChange(event.target.value);
        setFilterText(event.target.value);
    };

    return (
        <input
            type="text"
            placeholder="Search products..."
            onChange={handleFilterChange}
        />
    );
}

export default SearchInput;
