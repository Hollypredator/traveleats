import { Star, MapPin, Navigation } from 'lucide-react';

const restaurants = [];

interface RestaurantListProps {
  category: string;
}

export default function RestaurantList({ category }: RestaurantListProps) {
  const filteredRestaurants = category === 'all' 
    ? restaurants 
    : restaurants.filter(restaurant => restaurant.cuisine === category);

  const handleGetDirections = (coordinates: number[]) => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${coordinates[0]},${coordinates[1]}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredRestaurants.length === 0 ? (
        <div className="col-span-full text-center py-8">
          <p className="text-gray-500">Henüz restoran eklenmemiş.</p>
        </div>
      ) : (
        filteredRestaurants.map((restaurant) => (
          <div key={restaurant.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition group">
            <div className="relative h-48">
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-900">{restaurant.name}</h3>
              <p className="text-gray-500 text-sm mt-1 capitalize">{restaurant.cuisine}</p>
              <div className="flex items-center mt-2">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="ml-1 text-gray-700">{restaurant.rating}</span>
                <span className="mx-1 text-gray-400">•</span>
                <span className="text-gray-500">{restaurant.reviews} reviews</span>
              </div>
              <div className="flex items-center mt-2 text-gray-500">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">{restaurant.location}</span>
              </div>
              <button
                onClick={() => handleGetDirections(restaurant.coordinates)}
                className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors"
              >
                <Navigation className="h-4 w-4" />
                Yol Tarifi Al
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}