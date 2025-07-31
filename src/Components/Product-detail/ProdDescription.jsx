import React, { useState, useEffect } from 'react';
import ProductCard from '../reuseable/productcard';
const ProductPage = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [carouselProducts, setCarouselProducts] = useState([]);
  const [loadingCarousel, setLoadingCarousel] = useState(true);
  const [errorCarousel, setErrorCarousel] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const productsPerPage = 4;
  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const mappedProducts = data.products.map(p => {
          const originalPrice = (p.price );

          return {
            id: p.id,
            imageUrl: p.thumbnail, 
            title: p.title,
            price: p.price.toFixed(2),
            originalPrice: originalPrice.toFixed(2), 
          };
        });
        setCarouselProducts(mappedProducts);
      } catch (err) {
        setErrorCarousel('Failed to fetch related products: ' + err.message);
        console.error(err);
      } finally {
        setLoadingCarousel(false);
      }
    };
    getProducts();
  }, []);
  if (!product) {
    return <div className="text-center py-10 text-gray-600">Product not found.</div>;
  }

  const totalSlides = Math.ceil(carouselProducts.length / 8);

  const goToPrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? prevSlide : prevSlide - 1));
  };

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === totalSlides - 1 ? prevSlide : prevSlide + 1));
  };

  const startIndex = currentSlide * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentCarouselProducts = carouselProducts.slice(startIndex, endIndex);

  return (
    <div className='w-[98%] xl:w-[91.6%] mx-auto'>
      <div className="flex justify-center items-center">
        <div className="flex flex-col lg:flex-row rounded-lg overflow-hidden ">
          <div className="mx-auto p-4 relative">
            <div className="hidden lg:flex lg:flex-wrap justify-center">
              {product.images?.slice(0, 4).map((image, index) => (
                <div key={index} className="relative rounded-lg overflow-hidden m-2">
                  <img
                    src={image}
                    alt={`Product image ${index + 1}`}
                    className="w-[325px] h-[325px] object-cover"
                  />
                </div>
              ))}
            </div>

            <div className="lg:hidden flex flex-col items-center">
              <div className="relative w-full rounded-lg overflow-hidden mb-4">
                <img
                  src={product.images?.[currentImageIndex]}
                  alt={`Product image ${currentImageIndex + 1}`}
                  className="w-[300px] h-[300px] object-contain"
                />
              </div>
              <div className="flex space-x-2 mb-4"> 
                {product.images?.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      currentImageIndex === index ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  ></button>
                ))}
              </div>
              <div className="flex justify-center space-x-2 overflow-x-auto pb-2"> 
                {product.images?.map((image, index) => (
                  <div
                    key={index}
                    className={`w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden cursor-pointer border-2 ${
                      currentImageIndex === index ? 'border-blue-600' : 'border-transparent'
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:w-2/5 p-8 flex max-h-[55vh] xl:max-h-[50vh] flex-col justify-between">
            <span className="bg-blue-600 text-white text-xs mt-4 text-center font-semibold  sm:max-w-[20%] lg:max-w-[40%] px-2 py-3 rounded-xl self-start">
              New Release
            </span>
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mt-4 mb-2">{product.title}</h1>
              <p className="text-xl text-gray-600 mb-4">${product.price}</p>
              <div className="flex max-w-full gap-2 md:gap-0 sm:flex-row sm:space-x-3 space-y-3 sm:space-y-0 mb-3">
                <button className="flex-1 flex text-sm items-center justify-center bg-gray-900 text-white py-3 px-4 rounded-lg font-semibold hover:bg-gray-800 transition duration-300">
                  ADD TO CART
                </button>
                <button className="sm:w-auto max-h-[5vh] sm:h-auto bg-gray-900 text-gray-700 p-1 lg:p-3 rounded-lg flex items-center justify-center hover:bg-gray-300 transition duration-300">
                  <svg
                    className="w-6 h-6"
                    fill="white"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    ></path>
                  </svg>
                </button>
              </div>
              <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">
                BUY IT NOW
              </button>
            </div>

            <div className="mt-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">ABOUT THE PRODUCT</h3>
              <p className="text-sm w-full text-gray-600 mb-4">{product.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className=" py-10 px-4 lg:px-0 lg:mt-10">
        <div className=" mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl xl:text-5xl font-bold text-gray-800">You may also like</h2>
            <div className="flex space-x-2">
              <button
                onClick={goToPrevSlide}
                disabled={currentSlide === 0} 
                className={`p-3 rounded-md bg-gray-800 text-white transition-colors duration-200 shadow-md
                  ${currentSlide === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-700'}`}
                aria-label="Previous slide"
              >
                <svg
                  className="w-3 h-3 sm:w-5 sm:h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>
              <button
                onClick={goToNextSlide}
                disabled={currentSlide === totalSlides - 1} // Disable if on the last slide
                className={`p-3 rounded-md bg-gray-800 text-white transition-colors duration-200 shadow-md
                  ${currentSlide === totalSlides - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-700'}`}
                aria-label="Next slide"
              >
                <svg
                  className="w-3 h-3 sm:w-5 sm:h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </div>

          {/* Product Cards Slider */}
          {loadingCarousel ? (
            <div className="text-center py-10 text-gray-600">Loading related products...</div>
          ) : errorCarousel ? (
            <div className="text-center py-10 text-red-600">{errorCarousel}</div>
          ) : carouselProducts.length === 0 ? (
            <div className="text-center py-10 text-gray-600">No related products found.</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {currentCarouselProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  id={p.id}
                  imageUrl={p.imageUrl}
                  title={p.title}
                  price={p.price}
                  originalPrice={p.originalPrice}
                />
              ))}
            </div>
          )}

            {carouselProducts.length > 0 && (
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  className={`w-6 h-1 rounded-sm ${
                    currentSlide === index ? 'bg-blue-600' : 'bg-gray-400'
                  } transition-colors duration-200`}
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                ></button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
