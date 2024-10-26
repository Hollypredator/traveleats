import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const categories = [
  { id: 'all', name: 'All', icon: '🍽️' },
  { id: 'turkish', name: 'Turkish', icon: '🥙' },
  { id: 'italian', name: 'Italian', icon: '🍝' },
  { id: 'seafood', name: 'Seafood', icon: '🦐' },
  { id: 'asian', name: 'Asian', icon: '🍜' },
  { id: 'dessert', name: 'Dessert', icon: '🍰' },
  { id: 'breakfast', name: 'Breakfast', icon: '☕' },
];

interface CategorySliderProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function CategorySlider({ selectedCategory, onSelectCategory }: CategorySliderProps) {
  const scrollContainer = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainer.current) {
      const scrollAmount = 200;
      scrollContainer.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative">
      <button 
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-50"
      >
        <ChevronLeft className="h-5 w-5 text-gray-600" />
      </button>
      
      <div 
        ref={scrollContainer}
        className="flex gap-3 overflow-x-auto scrollbar-hide py-4 px-8 scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-full whitespace-nowrap transition-all ${
              selectedCategory === category.id
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span>{category.icon}</span>
            <span>{category.name}</span>
          </button>
        ))}
      </div>

      <button 
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-50"
      >
        <ChevronRight className="h-5 w-5 text-gray-600" />
      </button>
    </div>
  );
}