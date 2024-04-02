export type ProductProps = {
    id: number;
    title: string;
    price: number;
    description: string;
    discountPercentage: number;
    actualPrice: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    images: string[];
    // Add other properties as needed
  };