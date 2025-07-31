import React, { useRef, useEffect, useState } from 'react';

// Star icon component
const StarIcon = ({ filled }) => (
  <svg
    className={`w-4 h-4 ${filled ? 'text-[#FFA52F] fill-current' : 'text-gray-300 fill-current'}`}
    viewBox="0 0 20 20"
  >
    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
  </svg>
);

// ReviewCard Component
const ReviewCard = ({ title, text, rating, avatar, productImage }) => (
  <div className="bg-white sm:h-[48vh] h-[45vh] rounded-4xl shadow-sm border border-gray-100 overflow-hidden flex-shrink-0 w-80 md:w-96 lg:w-[35%] xl:w-[25%]">
    <div className="p-6">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-2 2xl:text-2xl">{title}</h3>
          <p className="text-gray-600 text-sm 2xl:text-lg 2xl:max-w-[85%] mb-3">{text}</p>
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} filled={i < Math.round(rating)} />
              ))}
            </div>
            <span className="text-sm 2xl:text-xl font-medium text-gray-700">{rating.toFixed(1)}</span>
          </div>
        </div>
        <img
          src={avatar}
          alt="User avatar"
          className="w-12 h-12 2xl:w-16 2xl:h-16 rounded-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://placehold.co/60x60/000000/FFFFFF?text=User';
          }}
        />
      </div>
    </div>

    <div className=" overflow-hidden flex justify-center items-center">
      <img
        src={productImage}
        alt="Product"
        className="w-[240px] h-[240px] object-cover"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = 'https://placehold.co/400x300/E0E0E0/000000?text=No+Image';
        }}
      />
    </div>
  </div>
);

// Main Reviews Component
const Reviews = () => {
  const scrollContainerRef = useRef(null);
  const [reviews, setReviews] = useState([]);

  // Auto-scroll effect
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollSpeed = 1;
    let animationFrameId;

    const animateScroll = () => {
      container.scrollLeft += scrollSpeed;
      const scrollWidth = container.scrollWidth;

      if (container.scrollLeft >= scrollWidth / 2) {
        container.scrollLeft = 0;
      }

      animationFrameId = requestAnimationFrame(animateScroll);
    };

    animationFrameId = requestAnimationFrame(animateScroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Fetch reviews with random logic
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch('https://dummyjson.com/products?limit=20&select=title,reviews,thumbnail');
        const { products } = await res.json();

        const allReviews = products.flatMap((product) =>
          (product.reviews || []).map((review) => ({
            title: product.title,
            comment: review.comment,
            rating: review.rating,
            productImage: product.thumbnail,
          }))
        );

        // Shuffle & pick 8 random reviews
        const shuffled = allReviews.sort(() => 0.5 - Math.random()).slice(0, 10);
        const randomized = shuffled.map((item, index) => ({
          id: `review-${index}-${Math.random()}`,
          title: item.title,
          text: item.comment,
          rating: item.rating,
          avatar: `https://randomuser.me/api/portraits/${
            Math.random() > 0.5 ? 'men' : 'women'
          }/${Math.floor(Math.random() * 70)}.jpg`,
          productImage: item.productImage,
        }));

        setReviews([...randomized, ...randomized]); // Duplicate for infinite scroll
      } catch (err) {
        console.error('Error fetching reviews:', err);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="w-full py-16 sm:py-24 flex justify-center font-inter">
      <div className="w-full">
        <div className="flex flex-row justify-between items-center mb-8 px-4 md:px-7 lg:px-10 xl:px-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-black uppercase tracking-wide md:mb-0 text-center md:text-left">
            Reviews
          </h2>
          <button className="bg-[#4A69E2] hover:bg-blue-600 text-white px-3 py-2 md:px-7 md:py-3 rounded-md text-xs sm:text-sm md:text-lg font-medium transition-colors">
            SEE ALL
          </button>
        </div>

        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-scroll no-scrollbar w-full"
          style={{ scrollBehavior: 'auto' }}
        >
          {reviews.map((review, index) => (
            <ReviewCard key={`${review.id}-${index}`} {...review} />
          ))}
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default Reviews;
