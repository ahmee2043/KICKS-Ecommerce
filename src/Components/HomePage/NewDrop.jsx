import React, { useState, useEffect } from 'react';
import ProductCard from '../reuseable/productcard.jsx';
import { useNavigate } from 'react-router-dom';

const NewDrop = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
   useEffect(() => {
    const fetchNewDrops = async () => {
        try {
            const response = await fetch('https://dummyjson.com/products');
            if (!response.ok) {
                const errorText = await response.text();
                console.error("API response not OK:", response.status, errorText);
                throw new Error(`HTTP error! Status: ${response.status}. Response content (first 200 chars): ${errorText.substring(0, 200)}...`);
            }

            const data = await response.json();
            console.log("Fetched raw data from API:", data.products);
            setProducts(data.products); // ✅ this is enough
        } catch (err) {
            console.error("Failed to fetch new drops:", err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    fetchNewDrops();
}, []);

    
    console.log("Products",products[0]?.id)


    return (
        <section className="w-[91.6%] mx-auto py-12 rounded-xl">
            <div className="flex flex-row justify-between items-start sm:items-center mb-8 sm:mb-12 lg:mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl font-extrabold text-gray-900 mb-4 sm:mb-0 leading-tight">
                    DON'T MISS OUT <br /> NEW DROPS
                </h2>
                <button
                    onClick={()=>{navigate('/shop')}}
                    className="sm:px-6 sm:py-3 px-4 py-2 mt-3 md:mt-0 bg-blue-600 text-white font-medium rounded-md shadow-md hover:bg-blue-700 transition-colors duration-300 whitespace-nowrap text-sm sm:text-base md:text-lg"
                >
                    SHOP NEW DROPS
                </button>
            </div>
            <div
                className="grid grid-cols-2 lg:grid-cols-4
                           gap-x-4 md:gap-x-8 lg:gap-x-16
                           gap-y-8 md:gap-y-12 lg:gap-y-16"
            >
                {
                    products.length !== 0 && products.slice(0, 4).map(prod=>(
                        <ProductCard id={prod.id} imageUrl={prod.thumbnail} title={prod.title} price={prod.price}/>
                    ))
                }
            </div>
        </section>
    );
};

export default NewDrop;
