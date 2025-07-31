import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CustomCheckbox from '../../Components/reuseable/CustomCheckbox'

// Placeholder for ProductCard component.
// In your actual project, this would be imported from '../../Components/reuseable/productcard.jsx'
const ProductCard = ({ id, imageUrl, title, price, originalPrice }) => {

  const numericPrice = parseFloat(price);
  const numericOriginalPrice = parseFloat(originalPrice);

  const hasDiscount = !isNaN(numericOriginalPrice) && !isNaN(numericPrice) && numericOriginalPrice > numericPrice;

  const handleError = (e) => {
    e.target.onerror = null;
    e.target.src = 'https://placehold.co/300x300/E0E0E0/333333?text=No+Image';
  };

  return (
    <div
      className="relative rounded-xl overflow-hidden flex flex-col cursor-pointer"
      // onClick={() => navigate(`/product/${id}`)} // Uncomment in your actual app
    >
      <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-md z-10">
        New
      </div>
      

      <div className="relative w-full pt-[100%] bg-white rounded-3xl p-2 overflow-hidden">
        <img
          src={imageUrl || 'https://placehold.co/300x300/E0E0E0/333333?text=No+Image'}
          alt={title}
          className="absolute inset-0 w-full p-3 h-full object-cover rounded-3xl"
          onError={handleError}
        />
      </div>
      <div className="flex-grow flex flex-col justify-between mt-4">
        <h3 className="text-sm md:text-xl font-semibold text-gray-800 mb-2 leading-tight">{title || 'Untitled Product'}</h3>
        <button className="bg-gray-800 text-white text-xs font-medium py-2 sm:py-3 rounded-md hover:bg-gray-700 transition-colors duration-300 w-full">
          View Product
          <span className="text-[#FFA52F] ml-2 text-xs sm:text-base font-bold"> - ${numericPrice ? numericPrice.toFixed(2) : 'N/A'}</span>
          
        </button>
      </div>
    </div>
  );
};


const ProductList = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]); // Initialized to empty array
  const [tempSelectedCategories, setTempSelectedCategories] = useState([]); // Initialized to empty array
  const [selectedRatingRange, setSelectedRatingRange] = useState(null);
  const [tempSelectedRatingRange, setTempSelectedRatingRange] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProductsCount, setTotalProductsCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const productsPerPage = 9;
  const location = useLocation();
  const [categoryInitializedFromURL, setCategoryInitializedFromURL] = useState(false);

  // Define rating ranges
  const ratingRanges = [
    { label: '4 - 5 Stars', value: '4-5', min: 4, max: 4.99 },
    { label: '3 - 4 Stars', value: '3-4', min: 3, max: 3.99 },
    { label: '2 - 3 Stars', value: '2-3', min: 2, max: 2.99 },
    { label: '1 - 2 Stars', value: '1-2', min: 1, max: 1.99 },
  ];

  // Effect to read category from URL and initialize states
  useEffect(() => {
  const queryParams = new URLSearchParams(location.search);
  const categoryFromUrl = queryParams.get('category');

  if (categoryFromUrl) {
    setSelectedCategories([categoryFromUrl]);
    setTempSelectedCategories([categoryFromUrl]);
  } else {
    setSelectedCategories([]);
    setTempSelectedCategories([]);
  }

  setSelectedRatingRange(null);
  setTempSelectedRatingRange(null);
  setCurrentPage(1);
  setCategoryInitializedFromURL(true); // ✅ Added this
}, [location.search]);

  // Effect to fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('https://dummyjson.com/products/category-list');
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
        setError('Failed to load categories.');
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!categoryInitializedFromURL) return;

    const fetchAndFilterProducts = async () => {
      setLoading(true);
      setError(null);
      let allProducts = [];
      try {
        if (selectedCategories.length === 0) {
          const res = await fetch(`https://dummyjson.com/products?limit=194`);
          if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
          const data = await res.json();
          allProducts = data.products;
        } else {
          // Fetch products for selected categories
          const fetchPromises = selectedCategories.map(async (category) => {
            const res = await fetch(`https://dummyjson.com/products/category/${category}`);
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            const data = await res.json();
            return data.products;
          });

          const results = await Promise.all(fetchPromises);
          allProducts = results.flat();


          const uniqueMap = new Map();
          for (const product of allProducts) {
            if (!uniqueMap.has(product.id)) {
              uniqueMap.set(product.id, product);
            }
          }
          allProducts = Array.from(uniqueMap.values());
        }

        let filteredProducts = allProducts.map(p => ({
          id: p.id,
          imageUrl: p.thumbnail,
          title: p.title,
          price: p.price.toFixed(2),
          originalPrice: p.price.toFixed(2),
          rating: p.rating,
        }));

        // Apply Rating Filter (client-side)
        if (selectedRatingRange) {
          filteredProducts = filteredProducts.filter(p => {
            const range = ratingRanges.find(r => r.value === selectedRatingRange);
            if (!range) return true;

            const rating = p.rating;
            return rating >= range.min && rating < range.max + 0.01;
          });
        }

        // Apply Pagination
        const calculatedTotalCount = filteredProducts.length;
        const startIndex = (currentPage - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        const productsForCurrentPage = filteredProducts.slice(startIndex, endIndex);

        setProducts(productsForCurrentPage);
        setTotalProductsCount(calculatedTotalCount);
        setTotalPages(Math.ceil(calculatedTotalCount / productsPerPage));
      } catch (err) {
        console.error('Failed to fetch or filter products:', err);
        setError('Failed to load products. Please try again.');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAndFilterProducts();
  }, [selectedCategories, selectedRatingRange, currentPage, categoryInitializedFromURL]);

  const handleSelectAllCategories = (e) => {
    const { checked } = e.target;
    if (checked) {
      setSelectedCategories(categories);
    } else {
      setSelectedCategories([]);
    }
    setCurrentPage(1); 
  };

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    setSelectedCategories((prev) => {
      const updated = checked ? [...prev, value] : prev.filter((cat) => cat !== value);
      setCurrentPage(1);
      return updated;
    });
  };

  const handleTempSelectAllCategories = (e) => {
    const { checked } = e.target;
    if (checked) {
      setTempSelectedCategories(categories);
    } else {
      setTempSelectedCategories([]); 
    }
  };

  const handleTempCategoryChange = (e) => {
    const { value, checked } = e.target;
    setTempSelectedCategories((prev) =>
      checked ? [...prev, value] : prev.filter((cat) => cat !== value)
    );
  };

  // Handler for rating radio buttons in the sidebar (desktop)
  const handleRatingChange = (e) => {
    const { value } = e.target;
    setSelectedRatingRange(value === selectedRatingRange ? null : value); // Toggle selection
    setCurrentPage(1); // Reset page on filter change
  };

  // Handler for rating radio buttons in the modal
  const handleTempRatingChange = (e) => {
    const { value } = e.target;
    setTempSelectedRatingRange(value === tempSelectedRatingRange ? null : value); // Toggle selection
  };

  // Function to open the category modal
  const openCategoryModal = () => {
    setTempSelectedCategories([...selectedCategories]); // Sync temp with current selections
    setTempSelectedRatingRange(selectedRatingRange); // Sync temp rating too
    setShowCategoryModal(true);
  };

  // Function to reset all filters in the modal
  const resetAllFilters = () => {
    setTempSelectedCategories([]);
    setTempSelectedRatingRange(null);
  };

  // Function to apply filters from the modal
  const applyFiltersFromModal = () => {
    setSelectedCategories([...tempSelectedCategories]);
    setSelectedRatingRange(tempSelectedRatingRange);
    setCurrentPage(1); // Reset to first page when filters change
    setShowCategoryModal(false);
  };

  // Function to close the modal (using the cross button)
  const closeCategoryModal = () => {
    setShowCategoryModal(false);
    // Revert temp selections on close if not applied
    setTempSelectedCategories([...selectedCategories]);
    setTempSelectedRatingRange(selectedRatingRange);
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages + 2) {
      for (let i = 1; i <= totalPages; i++) buttons.push(i);
    } else {
      buttons.push(1);
      // Add '...' if current page is far from the beginning
      if (currentPage > 2) {
        buttons.push('...');
      }
      // Add current page and its immediate neighbors if applicable
      if (currentPage > 1 && currentPage < totalPages) {
          // Only add current page if it's not already 1 or totalPages
          if (currentPage !== 1 && currentPage !== totalPages) {
              buttons.push(currentPage);
          }
      }
      // Add '...' if current page is far from the end
      if (currentPage < totalPages - 1) {
        buttons.push('...');
      }
      buttons.push(totalPages);
    }

    // Filter out duplicate '...' and sort numerically (keeping '...' in place)
    const uniqueSortedButtons = [];
    new Set(buttons).forEach(item => uniqueSortedButtons.push(item));
    uniqueSortedButtons.sort((a, b) => {
        if (a === '...') return 1;
        if (b === '...') return -1;
        return a - b;
    });

    // Ensure only one '...' between numbers and correct order
    const finalButtons = [];
    for (let i = 0; i < uniqueSortedButtons.length; i++) {
        if (uniqueSortedButtons[i] === '...') {
            if (finalButtons.length > 0 && finalButtons[finalButtons.length - 1] === '...') {
                continue; // Skip if previous was also '...'
            }
        }
        finalButtons.push(uniqueSortedButtons[i]);
    }
    return finalButtons;
  };

  // Determine if "Select All" checkbox should be checked
  const isAllCategoriesSelected = categories.length > 0 && selectedCategories.length === categories.length;
  const isTempAllCategoriesSelected = categories.length > 0 && tempSelectedCategories.length === categories.length;

  return (
    <div className="min-h-screen flex flex-col md:flex-row"> {/* Reverted bg-gray-50 */}
      {/* Sidebar (visible on md screens and up) */}
      <aside className="hidden md:block w-full md:w-1/4 lg:w-1/5 p-6 md:p-8 rounded-lg m-4"> {/* Reverted bg-white shadow-sm */}
        <p className="text-sm text-gray-500 mb-6">{totalProductsCount} items</p>

        {/* Category Filter */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">CATEGORY</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-2"> {/* Added max-height and scroll */}
            {categories.length === 0 && loading && !error && <p>Loading categories...</p>}
            {error && <p className="text-red-500">{error}</p>}
            
            {/* Select All Checkbox for Desktop Sidebar */}
            {categories.length > 0 && (
              <CustomCheckbox
                id="selectAllCategories"
                label="Select All"
                value="all"
                checked={isAllCategoriesSelected}
                onChange={handleSelectAllCategories}
              />
            )}

            {categories.map((category) => (
              <CustomCheckbox
                key={category}
                id={category}
                label={category}
                value={category}
                checked={selectedCategories.includes(category)}
                onChange={handleCategoryChange}
              />
            ))}
          </div>
        </div>

        {/* Rating Filter */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">RATING</h3>
          <div className="space-y-2">
            {ratingRanges.map((range) => (
              <label key={range.value} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="rating" // Name ensures only one radio button can be selected
                  value={range.value}
                  checked={selectedRatingRange === range.value}
                  onChange={handleRatingChange}
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <span className="text-gray-700 text-sm">{range.label}</span>
              </label>
            ))}
          </div>
        </div>
      </aside>

      {/* Product Grid and Mobile Filter */}
      <main className="flex-1 p-6 md:p-8">
        {/* Mobile Category/Filter Button */}
        <div className="md:hidden flex justify-end mb-4">
          <button
            onClick={openCategoryModal}
            className="px-6 py-2 bg-gray-800 text-white rounded-md shadow-md hover:bg-gray-700 transition duration-300 flex items-center space-x-2" // Reverted styling
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
            <span>Filters</span> {/* Changed text to Filters */}
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {Array.from({ length: productsPerPage }).map((_, i) => (
              <div key={i} className=" rounded-xl shadow-sm h-64"></div>
            ))}
          </div>
        ) : error ? (
          <p className="text-red-500 text-center text-lg">{error}</p>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                imageUrl={product.imageUrl}
                title={product.title}
                price={product.price}
                originalPrice={product.originalPrice}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center text-lg mt-10">No products found for the selected filters.</p>
        )}

        {/* Pagination */}
        {totalProductsCount > productsPerPage && (
          <div className="flex justify-center items-center space-x-2 mt-8">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-md transition-colors duration-200 ${currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-gray-800 text-white hover:bg-gray-700'}`}
            >
              Previous
            </button>
            {renderPaginationButtons().map((page, i) => (
              <React.Fragment key={i}>
                {page === '...' ? (
                  <span className="px-2 py-2 text-gray-700">...</span>
                ) : (
                  <button
                    onClick={() => handlePageChange(page)}
                    className={`px-4 py-2 rounded-md transition-colors duration-200 ${currentPage === page ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`} // Reverted styling
                  >
                    {page}
                  </button>
                )}
              </React.Fragment>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-md transition-colors duration-200 ${currentPage === totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-gray-800 text-white hover:bg-gray-700'}`}
            >
              Next
            </button>
          </div>
        )}
      </main>

      {/* Category/Filter Selection Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50 p-4"> {/* Reverted styling */}
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl relative"> {/* Reverted styling */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Filters</h3>
              <button
                onClick={closeCategoryModal}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                aria-label="Close"
              >
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>

            {/* Category Filter in Modal */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">CATEGORY</h3>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                {categories.length === 0 && loading && !error && <p className="text-gray-600">Loading categories...</p>}
                {error && <p className="text-red-500">{error}</p>}

                {/* Select All Checkbox for Mobile Modal */}
                {categories.length > 0 && (
                  <CustomCheckbox
                    id="tempSelectAllCategories"
                    label="Select All"
                    value="all"
                    checked={isTempAllCategoriesSelected}
                    onChange={handleTempSelectAllCategories}
                  />
                )}

                {categories.map((category) => (
                  <CustomCheckbox
                    key={category}
                    id={`temp-${category}`} // Use a unique ID for modal checkboxes
                    label={category}
                    value={category}
                    checked={tempSelectedCategories.includes(category)}
                    onChange={handleTempCategoryChange}
                  />
                ))}
              </div>
            </div>

            {/* Rating Filter in Modal */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">RATING</h3>
              <div className="space-y-2">
                {ratingRanges.map((range) => (
                  <label key={range.value} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="tempRating"
                      value={range.value}
                      checked={tempSelectedRatingRange === range.value}
                      onChange={handleTempRatingChange}
                      className="form-radio h-5 w-5 text-gray-800" // Reverted styling
                    />
                    <span className="text-base">{range.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-auto pt-4 border-t border-gray-200">
              <button
                onClick={resetAllFilters}
                className="px-5 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition duration-300"
              >
                Reset
              </button>
              <button
                onClick={applyFiltersFromModal}
                className="px-5 py-2 rounded-lg bg-gray-800 text-white font-semibold hover:bg-gray-700 transition duration-300" // Reverted styling
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
