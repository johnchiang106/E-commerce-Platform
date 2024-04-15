import React, { useState } from 'react';
import { ProductProps } from '../types';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: ProductProps | null;
}

const ProductModal: React.FC<ModalProps> = ({ isOpen, onClose, product }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleLeftButtonClick = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + (product?.images.length || 0)) % (product?.images.length || 0));
    };

    const handleRightButtonClick = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % (product?.images.length || 0));
    };
    
    if (!isOpen || !product) {
        return null;
    }

    return (
        <div className="modal-mask" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-title">
                    <button className="close-button" onClick={onClose}>←</button>
                    <h2>{product.title}</h2>
                </div>
                <p>{product.description}</p>
                <div className="modal-image">
                    <button className="left-button" onClick={handleLeftButtonClick}>⇐</button>
                    <img src={product.images[currentImageIndex]} alt={product.title} />
                    <button className="right-button" onClick={handleRightButtonClick}>⇒</button>
                </div>
                <del>Original Price: ${product.price}</del><br />
                <p>Price: ${product.actualPrice}</p>
            </div>
        </div>
    );
};

export default ProductModal;