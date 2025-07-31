import React, { useState } from 'react';
import mainImg from '../../../public/images/assets/HeroSection/main.png';
import thumb1 from '../../../public/images/assets/HeroSection/thumb-image1.jpg';
import thumb2 from '../../../public/images/assets/HeroSection/thumb-image2.jpg';

export const HeroSection = () => {
    const [currentMainImage, setCurrentMainImage] = useState(mainImg);

    const [thumbnails, setThumbnails] = useState([thumb1, thumb2]);

    const handleThumbnailClick = (clickedThumbnailUrl, clickedThumbnailIndex) => {
        const prevMainImage = currentMainImage;
        setCurrentMainImage(clickedThumbnailUrl);
        const updatedThumbnails = [...thumbnails];
        updatedThumbnails[clickedThumbnailIndex] = prevMainImage;
        setThumbnails(updatedThumbnails);
    };
    return (
        <div className="flex flex-col w-[91.6%] items-center justify-center mx-auto">
            <h1 className="text-6xl whitespace-nowrap sm:text-8xl md:text-9xl mt-4 md:whitespace-nowrap md:leading-tighter lg:text-[155px] xl:text-[223.5px] 2xl:text-[270px] 2xl:whitespace-nowrap font-bold text-gray-900 mb-4 text-center tracking-tight">
                DO IT <span className="text-blue-600">RIGHT</span>
            </h1>
            <div
                className="relative w-full h-[50vh] sm:h-[85vh]  flex flex-col justify-between p-8 rounded-4xl"
                style={{
                    backgroundImage: `url('${currentMainImage}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <div
                    className="absolute top-[12%] left-0 p-3 bg-[#232321] bg-opacity-75 rounded-2xl flex items-center justify-center"
                    style={{
                        writingMode: 'vertical-rl',
                        textOrientation: 'mixed',
                        transform: 'rotate(180deg)',
                        transformOrigin: 'center center'
                    }}
                >
                    <p className="text-xs md:text-sm font-medium text-white whitespace-nowrap">Nike product of the year</p>
                </div>

                <div className="absolute bottom-8 left-4 w-11/12 sm:bottom-20 sm:left-4 md:left-10 lg:left-16 p-4 bg-transparent bg-opacity-75 sm:max-w-xl">
                    <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-white mb-2">Nike Air Max</h1>
                    <p className="text-base sm:text-xl md:text-2xl max-w-[80%] sm:max-w-sm md:max-w-lg text-white">
                        Nike introducing the new air max for everyone's comfort
                    </p>
                    <button className="mt-4 px-3 sm:px-6 py-2 sm:py-3 bg-[#4A69E2] text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 transition-colors duration-300">
                        Shop Now
                    </button>
                </div>

                <div className="absolute bottom-22 right-4 sm:right-8 flex flex-col space-y-4">
                    {thumbnails.map((thumbUrl, index) => (
                        <div
                            key={index}
                            className="w-18 h-18 md:w-32 md:h-32 bg-transparent rounded-lg shadow-lg overflow-hidden border-2 border-white cursor-pointer transform hover:scale-105 transition-transform duration-200"
                            onClick={() => handleThumbnailClick(thumbUrl, index)}
                        >
                            <img
                                src={thumbUrl}
                                alt={`Thumbnail ${index + 1}`}
                                className="w-full h-full object-cover rounded-md"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
