import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';

const ArrowLeftIcon = ({ className = "w-2 h-2 sm:w-6 sm:h-6" }) => (
    <svg width="14" height="14" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M6 10.5L1.5 6L6 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const ArrowRightIcon = ({ className = "sm:w-6 w-2 h-2 sm:h-6" }) => (
    <svg width="14" height="14" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M1 1.5L5.5 6L1 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const ExternalLinkIcon = ({ className = "w-2 h-2 sm:w-5 sm:h-5 " }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
    </svg>
);

const chunkArray = (arr, chunkSize) => {
    const chunkedArr = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        chunkedArr.push(arr.slice(i, i + chunkSize));
    }
    return chunkedArr;
};

// --- CategoryCard Component ---
const CategoryCard = ({ name, image, isFirstCard, index, isSmallScreenLayout }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        const targetUrl = `/shop?category=${name}`;
        console.log('Categories.jsx: Navigating to:', targetUrl); 
        navigate(targetUrl);
    };

    return (
        <div
            className={`flex flex-col cursor-pointer ${isSmallScreenLayout ? 'h-[calc(50%-8px)]' : 'h-full'} ${index === 0 || index === 2 || index === 3 || index === 5 ? 'bg-[#ECEEF0]' : 'bg-[#F6F6F6]'} ${isFirstCard ? 'rounded-tl-2xl' : ''}`}
            onClick={handleClick}
        >
            <div className={`w-full flex items-center justify-center p-0 ${isSmallScreenLayout ? 'h-56' : 'h-48 sm:h-[50vh]'}`}>
                <img src={image} alt={name} className="w-full h-full object-contain" />
            </div>
            <div className="p-6 sm:px-10 flex justify-between items-center">
                <h3 className="text-3xl max-w-[10%] sm:text-3xl md:text-3xl md:max-w-[48%] lg:max-w-[48%] xl:max-w-[32%] lg:text-4xl font-bold text-gray-900 uppercase leading-none">{name}</h3>
                <button className="bg-gray-900 text-white p-2 sm:p-3 rounded-md hover:bg-gray-800 transition-colors">
                    <ExternalLinkIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
            </div>
        </div>
    );
};

const Categories = () => {
    const navigationPrevRef = useRef(null);
    const navigationNextRef = useRef(null);
    const [swiperInstance, setSwiperInstance] = useState(null);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    const [categories, setCategories] = useState([]);

    const useMediaQuery = (query) => {
        const [matches, setMatches] = useState(false);
        useEffect(() => {
            const media = window.matchMedia(query);
            const listener = (event) => setMatches(event.matches);
            setMatches(media.matches);
            media.addEventListener('change', listener);
            return () => media.removeEventListener('change', listener);
        }, [query]);
        return matches;
    };

    const isSmallScreenMode = useMediaQuery('(max-width: 768px)');

    useEffect(() => {
        if (swiperInstance) {
            setIsBeginning(swiperInstance.isBeginning);
        }
    }, [swiperInstance]);

    const handleSlideChange = (swiper) => {
        setIsBeginning(swiper.isBeginning);
        setIsEnd(swiper.isEnd);
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('https://dummyjson.com/products');
                const data = await res.json();
                const products = data.products;
                const seenCategories = new Set();
                const unique = [];
                for (let product of products) {
                    if (!seenCategories.has(product.category)) {
                        seenCategories.add(product.category);
                        unique.push({ name: product.category, image: product.thumbnail });
                    }
                    if (unique.length >= 4) break;                 }
                setCategories(unique);
            } catch (err) {
                console.error('Failed to fetch products for categories:', err);
            }
        };

        fetchProducts();
    }, []); // Runs once on mount to get categories

    const pairedCategoriesForSmallScreen = chunkArray(categories, 2);

    return (
        <div className="flex justify-center h-full w-full bg-[#232321] pt-12">
            <div className="w-full rounded-tl-3xl overflow-hidden sm:ml-7 lg:ml-10 xl:ml-20 px-5 pb-5 sm:pb-0 sm:px-0">
                <div className="flex justify-between items-center mb-8 sm:pt-8">
                    <h2 className="text-3xl sm:text-5xl xl:text-7xl font-extrabold text-white uppercase tracking-wider">Categories</h2>
                    <div className="flex gap-2 sm:gap-3 mr-0 sm:mr-7 md:mr-20">
                        <button
                            ref={navigationPrevRef}
                            className={`p-3 rounded-lg transition-all duration-200 ${isBeginning ? 'bg-[#E7E7E3] text-gray-500 cursor-not-allowed opacity-50' : 'bg-white text-black hover:bg-gray-100'}`}
                            disabled={isBeginning}
                        >
                            <ArrowLeftIcon className="w-3 h-3 sm:w-5 sm:h-5" />
                        </button>
                        <button
                            ref={navigationNextRef}
                            className={`p-3 rounded-lg transition-all duration-200 ${isEnd ? 'bg-[#E7E7E3] text-gray-500 cursor-not-allowed opacity-50' : 'bg-white text-black hover:bg-gray-100'}`}
                            disabled={isEnd}
                        >
                            <ArrowRightIcon className="w-3 h-3 sm:w-5 sm:h-5" />
                        </button>
                    </div>
                </div>

                {isSmallScreenMode ? (
                    <Swiper
                        key="small-screen-swiper"
                        modules={[Navigation]}
                        navigation={{
                            prevEl: navigationPrevRef.current,
                            nextEl: navigationNextRef.current,
                        }}
                        onBeforeInit={(swiper) => {
                            if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
                                swiper.params.navigation.prevEl = navigationPrevRef.current;
                                swiper.params.navigation.nextEl = navigationNextRef.current;
                            }
                        }}
                        onSwiper={setSwiperInstance}
                        onSlideChange={handleSlideChange}
                        direction="horizontal"
                        spaceBetween={16}
                        slidesPerView={1}
                        className="h-[calc(100vh - 250px)] rounded-tl-4xl"
                    >
                        {pairedCategoriesForSmallScreen.map((pair, slideIndex) => (
                            <SwiperSlide key={slideIndex}>
                                <div className="flex flex-col h-full justify-between">
                                    {pair.map((category, cardIndex) => (
                                        <CategoryCard
                                            key={`${slideIndex}-${cardIndex}`}
                                            {...category}
                                            isFirstCard={slideIndex === 0 && cardIndex === 0}
                                            index={slideIndex * 2 + cardIndex}
                                            isSmallScreenLayout={true}
                                        />
                                    ))}
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <Swiper
                        key="large-screen-swiper"
                        modules={[Navigation]}
                        navigation={{
                            prevEl: navigationPrevRef.current,
                            nextEl: navigationNextRef.current,
                        }}
                        onBeforeInit={(swiper) => {
                            if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
                                swiper.params.navigation.prevEl = navigationPrevRef.current;
                                swiper.params.navigation.nextEl = navigationNextRef.current;
                            }
                        }}
                        onSwiper={setSwiperInstance}
                        onSlideChange={handleSlideChange}
                        direction="horizontal"
                        spaceBetween={0}
                        slidesPerView={2}
                        breakpoints={{
                            640: { slidesPerView: 2, spaceBetween: 0 },
                            1024: { slidesPerView: 2, spaceBetween: 0 },
                        }}
                        className="rounded-tl-4xl"
                    >
                        {categories.map((category, index) => (
                            <SwiperSlide key={index}>
                                <CategoryCard
                                    {...category}
                                    isFirstCard={index === 0}
                                    index={index}
                                    isSmallScreenLayout={false}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </div>
        </div>
    );
};
export default Categories;