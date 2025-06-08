import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ArrowRight } from 'lucide-react';

// Sample data for animals
const animalData = [
  {
    id: 1,
    name: 'Max',
    category: 'Perro',
    breed: 'Pastor Alemán',
    age: '3 años',
    image: 'https://images.pexels.com/photos/333083/pexels-photo-333083.jpeg',
    description: 'Max es un perro muy inteligente y leal. Ha recibido entrenamiento básico y es excelente con niños.',
    status: 'Disponible',
    health: 'Excelente',
    training: 'Básico'
  },
  {
    id: 2,
    name: 'Luna',
    category: 'Gato',
    breed: 'Siamés',
    age: '2 años',
    image: 'https://images.pexels.com/photos/13081054/pexels-photo-13081054.jpeg',
    description: 'Luna es una gata cariñosa y juguetona. Le encanta acurrucarse y es muy limpia.',
    status: 'Disponible',
    health: 'Buena',
    training: 'Básico'
  },
  {
    id: 3,
    name: 'Rocky',
    category: 'Perro',
    breed: 'Boxer',
    age: '4 años',
    image: 'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg',
    description: 'Rocky es un perro fuerte y protector. Es muy leal y ha servido como perro de guardia.',
    status: 'En proceso',
    health: 'Buena',
    training: 'Avanzado'
  },
  {
    id: 4,
    name: 'Trueno',
    category: 'Caballo',
    breed: 'Pura Sangre',
    age: '6 años',
    image: 'https://images.pexels.com/photos/635499/pexels-photo-635499.jpeg',
    description: 'Trueno es un caballo noble y tranquilo, perfecto para principiantes.',
    status: 'Disponible',
    health: 'Excelente',
    training: 'Intermedio'
  }
];

// Filter options
const categories = ['Todos', 'Perro', 'Gato', 'Caballo'];
const statuses = ['Todos', 'Disponible', 'En proceso', 'Adoptado'];
const healthStatuses = ['Todos', 'Excelente', 'Buena', 'Regular', 'En tratamiento'];

const AnimalListPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: 'Todos',
    status: 'Todos',
    health: 'Todos'
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Handle filter changes
  const handleFilterChange = (key: string, value: string) => {
    setFilters({
      ...filters,
      [key]: value
    });
  };

  // Filter animals based on search and filters
  const filteredAnimals = animalData.filter(animal => {
    // Search filter
    if (searchTerm && !animal.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !animal.breed.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Category filter
    if (filters.category !== 'Todos' && animal.category !== filters.category) {
      return false;
    }
    
    // Status filter
    if (filters.status !== 'Todos' && animal.status !== filters.status) {
      return false;
    }
    
    // Health filter
    if (filters.health !== 'Todos' && animal.health !== filters.health) {
      return false;
    }
    
    return true;
  });

  return (
    <div className="pt-20 pb-16">
      <div className="bg-primary-800 py-12">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Nuestros Animales</h1>
          <p className="text-primary-100 max-w-2xl">
            Conoce a nuestros animales que buscan un hogar lleno de amor. Utiliza los filtros para encontrar tu compañero ideal.
          </p>
        </div>
      </div>
      
      <div className="container py-8">
        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-8">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Buscar por nombre o raza..."
                className="input pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
            </div>
            
            <button
              className="md:hidden btn-outline flex items-center justify-center"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter className="h-5 w-5 mr-2" />
              Filtros
            </button>
            
            {/* Desktop Filters */}
            <div className="hidden md:flex items-center gap-4">
              <div>
                <select
                  className="input"
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <select
                  className="input"
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <select
                  className="input"
                  value={filters.health}
                  onChange={(e) => handleFilterChange('health', e.target.value)}
                >
                  {healthStatuses.map(health => (
                    <option key={health} value={health}>{health}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          {/* Mobile Filters */}
          {isFilterOpen && (
            <div className="md:hidden mt-4 border-t pt-4 grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Tipo</label>
                <select
                  className="input"
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Estado</label>
                <select
                  className="input"
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Salud</label>
                <select
                  className="input"
                  value={filters.health}
                  onChange={(e) => handleFilterChange('health', e.target.value)}
                >
                  {healthStatuses.map(health => (
                    <option key={health} value={health}>{health}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
        
        {/* Results Count */}
        <div className="mb-6">
          <p className="text-neutral-600">
            Mostrando {filteredAnimals.length} {filteredAnimals.length === 1 ? 'animal' : 'animales'}
          </p>
        </div>
        
        {/* Animal Grid */}
        {filteredAnimals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 bg-[url('https://images.pexels.com/photos/32375221/pexels-photo-32375221.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-center bg-no-repeat p-8">
            {filteredAnimals.map((animal) => (
              <div key={animal.id} className="animal-card group">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={animal.image} 
                    alt={animal.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-white rounded-full px-3 py-1 text-xs font-medium text-primary-700 shadow-sm">
                    {animal.category}
                  </div>
                  <div className={`absolute bottom-3 left-3 rounded-full px-3 py-1 text-xs font-medium text-white shadow-sm ${
                    animal.status === 'Disponible' ? 'bg-green-500' : 
                    animal.status === 'En proceso' ? 'bg-yellow-500' : 'bg-neutral-500'
                  }`}>
                    {animal.status}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold mb-2">{animal.name}</h3>
                  <div className="flex items-center text-sm text-neutral-500 mb-3">
                    <span className="mr-3">{animal.breed}</span>
                    <span className="mr-3">•</span>
                    <span>{animal.age}</span>
                  </div>
                  <p className="text-neutral-600 mb-4 line-clamp-2">
                    {animal.description}
                  </p>
                  <Link 
                    to={`/animales/${animal.id}`}
                    className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700"
                  >
                    Ver más <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-neutral-600 mb-4">No se encontraron animales con los criterios seleccionados.</p>
            <button 
              className="btn-outline"
              onClick={() => {
                setSearchTerm('');
                setFilters({
                  category: 'Todos',
                  status: 'Todos',
                  health: 'Todos'
                });
              }}
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnimalListPage;