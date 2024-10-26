import React, { useState } from 'react';
import { Plus, Edit2, Trash2, ChevronDown, ChevronRight } from 'lucide-react';
import EditLocationModal from './EditLocationModal';

interface City {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  population?: number;
  description?: string;
}

interface Country {
  id: string;
  name: string;
  code: string;
  cities: City[];
  flag?: string;
}

export default function ManageLocations() {
  const [countries, setCountries] = useState<Country[]>([
    {
      id: '1',
      name: 'Türkiye',
      code: 'TR',
      flag: '🇹🇷',
      cities: [
        {
          id: '1',
          name: 'İstanbul',
          latitude: 41.0082,
          longitude: 28.9784,
          population: 15460000,
          description: 'Türkiye\'nin en büyük şehri'
        }
      ]
    }
  ]);

  const [expandedCountry, setExpandedCountry] = useState<string | null>(null);
  const [showAddCountryModal, setShowAddCountryModal] = useState(false);
  const [showAddCityModal, setShowAddCityModal] = useState(false);
  const [editingLocation, setEditingLocation] = useState<{
    type: 'country' | 'city';
    data: Country | City;
    countryId?: string;
  } | null>(null);

  const handleDeleteCountry = (countryId: string) => {
    if (window.confirm('Bu ülkeyi ve tüm şehirlerini silmek istediğinizden emin misiniz?')) {
      setCountries(countries.filter(c => c.id !== countryId));
    }
  };

  const handleDeleteCity = (countryId: string, cityId: string) => {
    if (window.confirm('Bu şehri silmek istediğinizden emin misiniz?')) {
      setCountries(countries.map(country => {
        if (country.id === countryId) {
          return {
            ...country,
            cities: country.cities.filter(city => city.id !== cityId)
          };
        }
        return country;
      }));
    }
  };

  const handleSaveLocation = (type: 'country' | 'city', data: Country | City, countryId?: string) => {
    if (type === 'country') {
      const country = data as Country;
      setCountries(countries.map(c => 
        c.id === country.id ? country : c
      ));
    } else {
      const city = data as City;
      setCountries(countries.map(country => {
        if (country.id === countryId) {
          return {
            ...country,
            cities: country.cities.map(c => 
              c.id === city.id ? city : c
            )
          };
        }
        return country;
      }));
    }
    setEditingLocation(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Konum Yönetimi</h2>
        <button 
          onClick={() => setShowAddCountryModal(true)}
          className="btn"
        >
          <Plus className="h-5 w-5 mr-2" />
          Yeni Ülke Ekle
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        {countries.map((country) => (
          <div key={country.id} className="border-b last:border-b-0">
            <div className="flex items-center justify-between p-4 hover:bg-gray-50">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setExpandedCountry(
                    expandedCountry === country.id ? null : country.id
                  )}
                  className="text-gray-400"
                >
                  {expandedCountry === country.id ? (
                    <ChevronDown className="h-5 w-5" />
                  ) : (
                    <ChevronRight className="h-5 w-5" />
                  )}
                </button>
                <span className="text-2xl">{country.flag}</span>
                <div>
                  <h3 className="font-medium text-gray-900">{country.name}</h3>
                  <p className="text-sm text-gray-500">Kod: {country.code}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setEditingLocation({ 
                    type: 'country', 
                    data: country 
                  })}
                  className="p-2 text-gray-400 hover:text-indigo-600 rounded-full"
                >
                  <Edit2 className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDeleteCountry(country.id)}
                  className="p-2 text-gray-400 hover:text-red-600 rounded-full"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            {expandedCountry === country.id && (
              <div className="bg-gray-50 p-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-sm font-medium text-gray-700">Şehirler</h4>
                  <button
                    onClick={() => setShowAddCityModal(true)}
                    className="text-sm text-indigo-600 hover:text-indigo-700 flex items-center"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Yeni Şehir Ekle
                  </button>
                </div>
                <div className="space-y-2">
                  {country.cities.map((city) => (
                    <div
                      key={city.id}
                      className="flex items-center justify-between p-3 bg-white rounded-lg"
                    >
                      <div>
                        <h5 className="font-medium text-gray-900">{city.name}</h5>
                        <p className="text-sm text-gray-500">
                          {city.latitude.toFixed(4)}, {city.longitude.toFixed(4)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditingLocation({
                            type: 'city',
                            data: city,
                            countryId: country.id
                          })}
                          className="p-1.5 text-gray-400 hover:text-indigo-600 rounded-full"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteCity(country.id, city.id)}
                          className="p-1.5 text-gray-400 hover:text-red-600 rounded-full"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {editingLocation && (
        <EditLocationModal
          type={editingLocation.type}
          data={editingLocation.data}
          countryId={editingLocation.countryId}
          onClose={() => setEditingLocation(null)}
          onSave={handleSaveLocation}
        />
      )}
    </div>
  );
}