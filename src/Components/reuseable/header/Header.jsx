import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Kicks from '/images/assets/Header/kicks.png';

// --- SVG Icon Components for Mobile Menu ---
const SearchIcon = ({ className = "h-7 w-7" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
    </svg>
);

const ProfileIcon = ({ className = "h-7 w-7" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
    </svg>
);

const FavoriteIcon = ({ className = "h-7 w-7" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
    </svg>
);


const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [animateSearchBox, setAnimateSearchBox] = useState(false);
    const [isMenDropdownOpen, setIsMenDropdownOpen] = useState(false);
    const [isWomenDropdownOpen, setIsWomenDropdownOpen] = useState(false);
    const [isMobileMenDropdownOpen, setIsMobileMenDropdownOpen] = useState(false);
    const [isMobileWomenDropdownOpen, setIsMobileWomenDropdownOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

    const searchInputRef = useRef(null);
    const menDropdownRef = useRef(null);
    const womenDropdownRef = useRef(null);
    const profileDropdownRef = useRef(null);
    const mobileMenuRef = useRef(null);
    const [mobileSearchTerm, setMobileSearchTerm] = useState('');

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleSearch = () => {
        setIsSearchOpen((prev) => !prev);
        if (!isSearchOpen) {
            setTimeout(() => setAnimateSearchBox(true), 50);
        } else {
            setAnimateSearchBox(false);
        }
    };

    const toggleProfileDropdown = () => {
        setIsProfileDropdownOpen(prev => !prev);
        setIsMenDropdownOpen(false);
        setIsWomenDropdownOpen(false);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        console.log("Searching for:", searchTerm);
        setAnimateSearchBox(false);
        setTimeout(() => {
            setIsSearchOpen(false);
            setSearchTerm('');
        }, 300);
    };

    const handleMobileSearchSubmit = (e) => {
        e.preventDefault();
        console.log("Mobile searching for:", mobileSearchTerm);
        // You might want to close the menu or navigate to a search results page here
    };

    const toggleMenDropdown = (e) => {
        e.preventDefault();
        setIsMenDropdownOpen(prev => !prev);
        setIsWomenDropdownOpen(false);
        setIsProfileDropdownOpen(false);
    };

    const toggleWomenDropdown = (e) => {
        e.preventDefault();
        setIsWomenDropdownOpen(prev => !prev);
        setIsMenDropdownOpen(false);
        setIsProfileDropdownOpen(false);
    };

    const toggleMobileMenDropdown = (e) => {
        e.preventDefault();
        setIsMobileMenDropdownOpen(prev => !prev);
        setIsMobileWomenDropdownOpen(false);
    };

    const toggleMobileWomenDropdown = (e) => {
        e.preventDefault();
        setIsMobileWomenDropdownOpen(prev => !prev);
        setIsMobileMenDropdownOpen(false);
    };

    useEffect(() => {
        if (isSearchOpen && animateSearchBox && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isSearchOpen, animateSearchBox]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menDropdownRef.current && !menDropdownRef.current.contains(event.target)) {
                setIsMenDropdownOpen(false);
            }
            if (womenDropdownRef.current && !womenDropdownRef.current.contains(event.target)) {
                setIsWomenDropdownOpen(false);
            }
            if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
                setIsProfileDropdownOpen(false);
            }
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && isMenuOpen) {
                const hamburger = document.getElementById('hamburger-menu');
                if (hamburger && !hamburger.contains(event.target)) {
                    setIsMenuOpen(false);
                }
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isMenuOpen]);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen]);
    const closeProfileMenue = ()=>{
        setIsProfileDropdownOpen(false)
    }

    const NavLink = ({ to, children }) => <a href={to} className="block py-3 text-lg font-semibold text-gray-800">{children}</a>;
    const DropdownSubLink = ({ to, children }) => <a href={to} className="block py-2 px-4 text-md text-gray-800 hover:bg-gray-700 hover:text-white rounded-md">{children}</a>;

    return (
        <header className="relative z-50 mt-6">
            <div className="flex justify-between items-center px-6 mx-auto w-[91.6%] py-5 bg-white shadow-md lg:px-12 lg:py-5 rounded-2xl">
                {/* Left menu icon */}
                <div className="flex items-center space-x-4">
                    <div id="hamburger-menu" className="inline-block cursor-pointer lg:hidden" onClick={toggleMenu} aria-label="Toggle menu">
                        <div className={`w-[26px] h-[3px] bg-gray-800 my-[4px] transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-y-[7px] rotate-45' : ''}`}></div>
                        <div className={`w-[26px] h-[3px] bg-gray-800 my-[4px] transition-opacity duration-300 ease-in-out ${isMenuOpen ? 'opacity-0' : ''}`}></div>
                        <div className={`w-[26px] h-[3px] bg-gray-800 my-[4px] transition-transform duration-300 ease-in-out ${isMenuOpen ? '-translate-y-[7px] -rotate-45' : ''}`}></div>
                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex lg:space-x-8">
                        <ul className="flex space-x-4 lg:space-x-12">
                            <Link to="/shop"><li className="text-gray-800 hover:text-gray-700 font-semibold text-lg flex items-center">New Drops <span role="img" aria-label="fire emoji" className="ml-1 text-base">🔥</span></li></Link>
                            <li className="relative" ref={menDropdownRef}>
                                <a href="#" onClick={toggleMenDropdown} className="cursor-pointer text-gray-800 font-semibold text-lg flex items-center">Men <span className={`ml-1 text-[12px] transition-transform duration-200 ${isMenDropdownOpen ? 'rotate-180' : ''}`}>▼</span></a>
                                {isMenDropdownOpen && (
                                    <div className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-lg w-40 z-20"><ul className="py-2">
                                        <li><a href="#" className="block px-4 py-2 hover:bg-gray-100">Sneakers</a></li>
                                        <li><a href="#" className="block px-4 py-2 hover:bg-gray-100">Apparel</a></li>
                                        <li><a href="#" className="block px-4 py-2 hover:bg-gray-100">Accessories</a></li>
                                    </ul></div>
                                )}
                            </li>
                            <li className="relative" ref={womenDropdownRef}>
                                <a href="#" onClick={toggleWomenDropdown} className="cursor-pointer text-gray-800 font-semibold text-lg flex items-center">Women <span className={`ml-1 text-[12px] transition-transform duration-200 ${isWomenDropdownOpen ? 'rotate-180' : ''}`}>▼</span></a>
                                {isWomenDropdownOpen && (
                                    <div className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-lg w-40 z-20"><ul className="py-2">
                                        <li><a href="#" className="block px-4 py-2 hover:bg-gray-100">Sneakers</a></li>
                                        <li><a href="#" className="block px-4 py-2 hover:bg-gray-100">Apparel</a></li>
                                        <li><a href="#" className="block px-4 py-2 hover:bg-gray-100">Accessories</a></li>
                                    </ul></div>
                                )}
                            </li>
                        </ul>
                    </nav>
                </div>

                {/* Center logo */}
                <Link to='/' className="absolute left-1/2 transform -translate-x-1/2">
                    <img src={Kicks} alt="Kicks Logo" className="h-5 md:h-6 lg:h-6" />
                </Link>

                {/* Right: Search, Profile, Cart */}
                <div className="flex items-center space-x-4 lg:space-x-8">
                    <Link to="/">
                        <img src="/fav.svg" alt="" className='h-7 w-7 cursor-pointer hidden md:block' />
                    </Link>
                    <img src="/Search.svg" onClick={toggleSearch} className="h-7 w-7 cursor-pointer hidden md:block" alt="Search" />
                    <div className="relative" ref={profileDropdownRef}>
                        <img src="/Profile.svg" className="h-7 w-7 cursor-pointer" onClick={toggleProfileDropdown} alt="Profile" />
                        {isProfileDropdownOpen && (
                            <div className="absolute top-full right-0 mt-2 bg-white shadow-lg rounded-lg w-32 z-20"><ul className="py-1">
                                <Link onClick={closeProfileMenue} to="/Login"><li className="px-4 py-2 hover:bg-gray-100">Login</li></Link>
                                <Link onClick={closeProfileMenue} to="/Registration"><li className="px-4 py-2 hover:bg-gray-100">Signup</li></Link>
                                <Link onClick={closeProfileMenue} to="/"><li className="px-4 py-2 hover:bg-gray-100">Logout</li></Link>
                            </ul></div>
                        )}
                    </div>
                    <div className='bg-[#FFA52F] text-black rounded-full w-7 h-7 flex items-center justify-center font-bold text-sm'>0</div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 lg:hidden ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={toggleMenu}></div>
            <div ref={mobileMenuRef} className={`fixed top-0 left-0 h-full w-4/5 max-w-sm bg-[#F0EBE5] shadow-2xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-6 h-full flex flex-col">
                    <Link to='/' className="absolute left-18 transform -translate-x-1/2">
                    <img src={Kicks} alt="Kicks Logo" className="h-6" />
                    </Link>
                    <form onSubmit={handleMobileSearchSubmit} className="flex mb-4 mt-12">
                        <input type="text" placeholder="Search..." value={mobileSearchTerm} onChange={(e) => setMobileSearchTerm(e.target.value)} className="w-full p-2 border-2 bg-whte texit-white placeholder:text-gray-800 rounded-l-md  focus:outline-gray-900" />
                        <button type="submit" className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-r-md"><SearchIcon className="w-6 h-6"/></button>
                    </form>
                    <nav className="flex-grow text-gray-800">
                        <Link to="/shop"><NavLink to="#" className="text-gray-800">New Drops 🔥</NavLink></Link>
                        <div>
                            <a href="#" onClick={toggleMobileMenDropdown} className="flex justify-between items-center py-3 text-lg font-semibold text-gray-800">
                                <span>Men</span>
                                <span className={`transform transition-transform duration-200 ${isMobileMenDropdownOpen ? 'rotate-180' : ''}`}>▼</span>
                            </a>
                            {isMobileMenDropdownOpen && (
                                <div className="pl-4 border-l-2 text-gray-800 border-gray-600">
                                    <DropdownSubLink to="#">Sneakers</DropdownSubLink>
                                    <DropdownSubLink to="#">Apparel</DropdownSubLink>
                                    <DropdownSubLink to="#">Accessories</DropdownSubLink>
                                </div>
                            )}
                        </div>
                        <div>
                            <a href="#" onClick={toggleMobileWomenDropdown} className="flex justify-between items-center py-3 text-lg font-semibold text-gray-800">
                                <span>Women</span>
                                <span className={`transform transition-transform duration-200 ${isMobileWomenDropdownOpen ? 'rotate-180' : ''}`}>▼</span>
                            </a>
                            {isMobileWomenDropdownOpen && (
                                <div className="pl-4 border-l-2 border-gray-600">
                                    <DropdownSubLink to="#">Sneakers</DropdownSubLink>
                                    <DropdownSubLink to="#">Apparel</DropdownSubLink>
                                    <DropdownSubLink to="#">Accessories</DropdownSubLink>
                                </div>
                            )}
                        </div>
                    </nav>
                    <div className="border-t border-gray-700 pt-4">
                        <a href="#" className="flex items-center py-2 text-gray-800"><ProfileIcon className="w-6 h-6 mr-3" /> Profile</a>
                        <a href="#" className="flex items-center py-2 text-gray-800"><FavoriteIcon className="w-6 h-6 mr-3" /> Favorites</a>
                    </div>
                </div>
            </div>

            {/* Search Overlay */}
            {isSearchOpen && (
                <div className={`fixed inset-0 bg-gray-700 bg-opacity-50 flex items-start justify-center px-4 pt-20 z-40 ${animateSearchBox ? 'opacity-100' : 'opacity-0'}`} onClick={toggleSearch}>
                    <div className={`bg-[#F0EBE5] rounded-lg shadow-xl w-full max-w-md p-6 relative transition-all duration-300 ease-out ${animateSearchBox ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`} onClick={(e) => e.stopPropagation()}>
                        <h3 className="text-xl font-semibold mb-4 text-gray-800">Search Products</h3>
                        <form onSubmit={handleSearchSubmit} className="flex space-x-2">
                            <input ref={searchInputRef} type="text" placeholder="What are you looking for?" className="flex-grow p-3 border border-gray-300 rounded-md" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                            <button type="submit" className="bg-gray-800 text-white p-3 rounded-md hover:bg-gray-700">Search</button>
                        </form>
                        <button onClick={toggleSearch} className="absolute top-3 right-3 text-gray-500 text-2xl">&times;</button>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
