import React, { useState } from 'react';
import { X } from 'lucide-react';

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

interface EditLocationModalProps {
  type: 'country' | 'city';
  data: Country | City;
  countryId?: string;
  onClose: () => void;
  onSave: (type: 'country' | 'city', data: Country | City, countryId?: string) => void;
}

export default function EditLocationModal({
  type,
  data,
  countryId,
  onClose,
  onSave
}: EditLocationModalProps) {
  const [formData, setFormData] = useState(data);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(type, formData, countryId);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {type === 'country' ? 'Ülke Düzenle' : 'Şehir Düzenle'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {type === 'country' ? (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ülke Adı
                </label>
                <input
                  type="text"
                  value={(formData as Country).name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ülke Kodu
                </label>
                <input
                  type="text"
                  value={(formData as Country).code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bayrak Emoji
                </label>
                <input
                  type="text"
                  value={(formData as Country).flag}
                  onChange={(e) => setFormData({ ...formData, flag: e.target.value })}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Şehir Adı
                </label>
                <input
                  type="text"
                  value={(formData as City).name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Enlem
                  </label>
                  <input
                    type="number"
                    step="0.0001"
                    value={(formData as City).latitude}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      latitude: parseFloat(e.target.value) 
                    })}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Boylam
                  </label>
                  <input
                    type="number"
                    step="0.0001"
                    value={(formData as City).longitude}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      longitude: parseFloat(e.target.value) 
                    })}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nüfus
                </label>
                <input
                  type="number"
                  value={(formData as City).population}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    population: parseInt(e.target.value) 
                  })}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Açıklama
                </label>
                <textarea
                  value={(formData as City).description}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    description: e.target.value 
                  })}
                  rows={3}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </>
          )}

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              İptal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}