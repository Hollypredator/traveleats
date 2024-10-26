import React, { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import EditCategoryModal from './EditCategoryModal';

interface Category {
  id: string;
  name: string;
  icon: string;
  slug: string;
  count: number;
}

export default function ManageCategories() {
  const [categories, setCategories] = useState<Category[]>([
    { id: '1', name: 'Turkish', icon: '🥙', slug: 'turkish', count: 15 },
    { id: '2', name: 'Italian', icon: '🍝', slug: 'italian', count: 8 },
    { id: '3', name: 'Seafood', icon: '🦐', slug: 'seafood', count: 12 }
  ]);

  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleDeleteCategory = (id: string) => {
    if (window.confirm('Bu kategoriyi silmek istediğinizden emin misiniz?')) {
      setCategories(categories.filter(c => c.id !== id));
    }
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
  };

  const handleSaveCategory = (updatedCategory: Category) => {
    setCategories(categories.map(c => 
      c.id === updatedCategory.id ? updatedCategory : c
    ));
    setEditingCategory(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Kategori Yönetimi</h2>
        <button 
          onClick={() => setShowAddModal(true)}
          className="btn"
        >
          <Plus className="h-5 w-5 mr-2" />
          Yeni Kategori
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                İkon
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kategori Adı
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Slug
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mekan Sayısı
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                İşlemler
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {categories.map((category) => (
              <tr key={category.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-2xl">{category.icon}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-gray-900">{category.name}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-500">{category.slug}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-500">{category.count}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => handleEditCategory(category)}
                      className="text-gray-400 hover:text-indigo-600"
                    >
                      <Edit2 className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(category.id)}
                      className="text-gray-400 hover:text-red-600"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingCategory && (
        <EditCategoryModal
          category={editingCategory}
          onClose={() => setEditingCategory(null)}
          onSave={handleSaveCategory}
        />
      )}
    </div>
  );
}