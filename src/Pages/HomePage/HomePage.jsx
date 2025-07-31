import React from 'react'
import HeroSection from '../../Components/HomePage/HeroSection';
import NewDrop from '../../Components/HomePage/NewDrop';
import Categories from '../../Components/HomePage/Categories';
import Review from '../../Components/HomePage/Reviews';
const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <NewDrop  />
      <Categories/>
      <Review/>
    </div>
  )
}

export default HomePage
