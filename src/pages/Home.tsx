import React from 'react';
import Hero from '../components/Hero';
import CategorySlider from '../components/CategorySlider';
import RestaurantList from '../components/RestaurantList';
import NearbyPlaces from '../components/NearbyPlaces';
import FeaturedEvents from '../components/FeaturedEvents';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = React.useState('all');

  return (
    <>
      <Hero />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Popular Restaurants</h2>
          </div>
          <CategorySlider 
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          <div className="mt-8">
            <RestaurantList category={selectedCategory} />
          </div>
        </section>
        
        <NearbyPlaces />
        
        <section className="mb-16 mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Events</h2>
          <FeaturedEvents />
        </section>
      </main>
    </>
  );
}