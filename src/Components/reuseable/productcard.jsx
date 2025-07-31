import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ id, imageUrl, title, price, originalPrice }) => {
  const navigate = useNavigate();

  const numericPrice = parseFloat(price);
  const numericOriginalPrice = parseFloat(originalPrice);
  const hasDiscount = !isNaN(numericOriginalPrice) && !isNaN(numericPrice) && numericOriginalPrice > numericPrice;

  const handleError = (e) => {
    e.target.onerror = null; 
    e.target.src = 'NoImage'; 
  };

  return (
    <div
      className="relative rounded-xl overflow-hidden flex flex-col cursor-pointer"
      onClick={() => navigate(`/product/${id}`)}
    >
      <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-md z-10">
        New
      </div>
      {hasDiscount && (
        <div className="absolute top-4 right-4 bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-md z-10">
          {((1 - (numericPrice / numericOriginalPrice)) * 100).toFixed(0)}% off
        </div>
      )}

      <div className="relative w-full pt-[100%] bg-white rounded-3xl p-2 overflow-hidden">
        <img
          src={imageUrl || 'https://placehold.co/300x300/E0E0E0/333333?text=No+Image'}
          alt={title}
          className="absolute inset-0 w-full p-3 h-full object-cover rounded-3xl"
          onError={handleError}
        />
      </div>
      <div className="flex-grow flex flex-col justify-between mt-4">
        <h3 className="text-sm md:text-xl font-semibold text-gray-800 mb-2 leading-tight">{title || 'Untitled Product'}</h3> {/* Fallback for title */}
        <button className="bg-gray-800 text-white text-xs font-medium py-2 sm:py-3 rounded-md hover:bg-gray-700 transition-colors duration-300 w-full">
          View Product
          <span className="text-[#FFA52F] ml-2 text-xs sm:text-base font-bold"> - ${numericPrice ? numericPrice.toFixed(2) : 'N/A'}</span>
          {hasDiscount && (
            <span className="text-gray-400 ml-1 text-xs line-through">${numericOriginalPrice.toFixed(2)}</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;







// <svg
//                   className="w-6 h-6"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
//                 </svg>




{/* <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg> */}