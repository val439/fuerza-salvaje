import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, Calendar, Star, Shield, AlertCircle, ArrowLeft, MapPin, Clock } from 'lucide-react';

// Sample animal data
const animalData = [
  {
    id: 1,
    name: 'Max',
    category: 'Perro',
    breed: 'Pastor Alemán',
    age: '3 años',
    image: 'https://images.pexels.com/photos/333083/pexels-photo-333083.jpeg',
    gallery: [
      'https://images.pexels.com/photos/333083/pexels-photo-333083.jpeg',
      'https://images.pexels.com/photos/32306169/pexels-photo-32306169/free-photo-of-pastor-aleman-jugando-sentado.jpeg'
    ],
    description: 'Max es un perro muy inteligente y leal. Ha recibido entrenamiento básico y es excelente con niños. Busca un hogar activo donde pueda correr y jugar.',
    status: 'Disponible',
    health: 'Excelente',
    training: 'Básico',
    history: 'Max fue rescatado de una situación de abandono hace un año. Desde entonces ha recibido cuidados veterinarios completos y entrenamiento básico de obediencia. Es un perro muy sociable que se lleva bien con personas y otros animales.',
    medicalRecords: [
      { date: '15/01/2023', diagnosis: 'Chequeo general', treatment: 'Vacunas anuales', vet: 'Dr. Martínez' },
      { date: '20/06/2023', diagnosis: 'Dermatitis leve', treatment: 'Champú medicado', vet: 'Dra. López' }
    ],
    locationId: 1
  },
  {
    id: 2,
    name: 'Luna',
    category: 'Gato',
    breed: 'Siamés',
    age: '2 años',
    image:'https://images.pexels.com/photos/13081054/pexels-photo-13081054.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    gallery: [
      'https://images.pexels.com/photos/13081054/pexels-photo-13081054.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/18381790/pexels-photo-18381790/free-photo-of-retrato-de-un-lindo-gato-sobre-un-fondo-negro.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/15578747/pexels-photo-15578747/free-photo-of-naturaleza-animal-prado-plantas.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    description: 'Luna es una gata cariñosa y juguetona. Le encanta acurrucarse y es muy limpia. Se lleva bien con otros gatos y busca un hogar tranquilo.',
    status: 'Disponible',
    health: 'Buena',
    training: 'Básico',
    history: 'Luna fue encontrada en la calle cuando era una gatita de apenas 3 meses. Fue rescatada y llevada a nuestro centro donde recibió atención veterinaria. Es muy juguetona y le encanta trepar.',
    medicalRecords: [
      { date: '10/03/2023', diagnosis: 'Chequeo general', treatment: 'Vacunas y desparasitación', vet: 'Dra. Rodríguez' },
      { date: '05/09/2023', diagnosis: 'Limpieza dental', treatment: 'Procedimiento dental', vet: 'Dr. Gómez' }
    ],
    locationId: 2
  },
  {
    id: 3,
    name: 'Rocky',
    category: 'Perro',
    breed: 'Boxer',
    age: '4 años',
    image: 'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg',
    gallery: [
      'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg',
      'https://images.pexels.com/photos/2187304/pexels-photo-2187304.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/6589012/pexels-photo-6589012.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    description: 'Rocky es un perro fuerte y protector. Es muy leal y ha servido como perro de guardia. Necesita un dueño con experiencia que pueda darle estructura y cariño.',
    status: 'En proceso',
    health: 'Buena',
    training: 'Avanzado',
    history: 'Rocky trabajó como perro de seguridad en una empresa durante 3 años. Debido a cambios en la empresa, fue donado a nuestro centro. Es un perro muy bien entrenado y obediente, pero necesita un dueño con experiencia.',
    medicalRecords: [
      { date: '20/02/2023', diagnosis: 'Chequeo general', treatment: 'Vacunas anuales', vet: 'Dr. Martínez' },
      { date: '15/07/2023', diagnosis: 'Lesión en pata delantera', treatment: 'Reposo y antiinflamatorios', vet: 'Dra. Pérez' }
    ],
    locationId: 1
  }
];

// Sample centers data
const rescueCenters = [
  {
    id: 1,
    name: 'Centro Principal Fuerza Salvaje',
    location: 'Av. Principal #123, Ciudad Central',
    contact: 'info@fuerzaanimal.com | +593 98 491 4557',
    hours: 'Lunes a Viernes: 9:00 - 18:00, Sábados: 10:00 - 14:00'
  },
  {
    id: 2,
    name: 'Centro de Rescate Felino',
    location: 'Calle Secundaria #456, Ciudad Este',
    contact: 'felinos@fuerzaanimal.com | +593 98 491 4557',
    hours: 'Lunes a Viernes: 9:00 - 17:00, Sábados: 10:00 - 13:00'
  }
];

const AnimalDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [animal, setAnimal] = useState<any>(null);
  const [center, setCenter] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState('');
  const [activeTab, setActiveTab] = useState('información');

  useEffect(() => {
    // Simulate API fetch
    if (id) {
      const foundAnimal = animalData.find(a => a.id === parseInt(id));
      
      if (foundAnimal) {
        setAnimal(foundAnimal);
        setSelectedImage(foundAnimal.image);
        
        // Find the rescue center
        const foundCenter = rescueCenters.find(c => c.id === foundAnimal.locationId);
        if (foundCenter) {
          setCenter(foundCenter);
        }
      }
    }
    
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="pt-20 pb-16">
        <div className="container flex items-center justify-center py-20">
          <p className="text-xl">Cargando información del animal...</p>
        </div>
      </div>
    );
  }

  if (!animal) {
    return (
      <div className="pt-20 pb-16">
        <div className="container py-20">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Animal no encontrado</h1>
            <p className="text-neutral-600 mb-6">Lo sentimos, no pudimos encontrar el animal que estás buscando.</p>
            <Link to="/animales" className="btn-primary">
              Ver todos los animales
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-16">
      <div className="container">
        {/* Back button */}
        <div className="mb-6">
          <Link 
            to="/animales" 
            className="inline-flex items-center text-neutral-600 hover:text-neutral-900"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a la lista
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Image Gallery */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={selectedImage} 
                  alt={animal.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 text-sm font-medium text-primary-700 shadow-sm">
                  {animal.category}
                </div>
              </div>
              
              <div className="p-4 flex gap-2 overflow-x-auto">
                {animal.gallery.map((img: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(img)}
                    className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden ${
                      selectedImage === img ? 'ring-2 ring-primary-500' : ''
                    }`}
                  >
                    <img 
                      src={img} 
                      alt={`${animal.name} ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Tabs */}
            <div className="mt-8 bg-white rounded-lg shadow-md overflow-hidden">
              <div className="border-b">
                <nav className="flex">
                  <button
                    onClick={() => setActiveTab('información')}
                    className={`px-4 py-3 text-sm font-medium border-b-2 ${
                      activeTab === 'información' 
                        ? 'border-primary-500 text-primary-600' 
                        : 'border-transparent text-neutral-500 hover:text-neutral-700'
                    }`}
                  >
                    Información
                  </button>
                  <button
                    onClick={() => setActiveTab('historial')}
                    className={`px-4 py-3 text-sm font-medium border-b-2 ${
                      activeTab === 'historial' 
                        ? 'border-primary-500 text-primary-600' 
                        : 'border-transparent text-neutral-500 hover:text-neutral-700'
                    }`}
                  >
                    Historial
                  </button>
                  <button
                    onClick={() => setActiveTab('médico')}
                    className={`px-4 py-3 text-sm font-medium border-b-2 ${
                      activeTab === 'médico' 
                        ? 'border-primary-500 text-primary-600' 
                        : 'border-transparent text-neutral-500 hover:text-neutral-700'
                    }`}
                  >
                    Historial Médico
                  </button>
                </nav>
              </div>
              
              <div className="p-6">
                {activeTab === 'información' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Sobre {animal.name}</h2>
                    <p className="text-neutral-700 mb-6">{animal.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                          <Calendar className="h-5 w-5 text-primary-600" />
                        </div>
                        <div>
                          <p className="text-sm text-neutral-500">Edad</p>
                          <p className="font-medium">{animal.age}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-secondary-100 flex items-center justify-center mr-3">
                          <Star className="h-5 w-5 text-secondary-600" />
                        </div>
                        <div>
                          <p className="text-sm text-neutral-500">Raza</p>
                          <p className="font-medium">{animal.breed}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-accent-100 flex items-center justify-center mr-3">
                          <Shield className="h-5 w-5 text-accent-600" />
                        </div>
                        <div>
                          <p className="text-sm text-neutral-500">Estado de Salud</p>
                          <p className="font-medium">{animal.health}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                          <AlertCircle className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm text-neutral-500">Entrenamiento</p>
                          <p className="font-medium">{animal.training}</p>
                        </div>
                      </div>
                    </div>
                    
                    {center && (
                      <div className="bg-neutral-50 p-4 rounded-lg mb-6">
                        <h3 className="text-lg font-semibold mb-2">Ubicación Actual</h3>
                        <div className="flex items-start">
                          <MapPin className="h-5 w-5 text-primary-600 mt-0.5 mr-2" />
                          <div>
                            <p className="font-medium">{center.name}</p>
                            <p className="text-neutral-600 text-sm">{center.location}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                {activeTab === 'historial' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Historial de {animal.name}</h2>
                    <p className="text-neutral-700 mb-6">{animal.history}</p>
                    
                    <div className="bg-neutral-50 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold mb-2">Estado actual</h3>
                      <div className="flex items-center">
                        <div className={`px-3 py-1 rounded-full text-sm font-medium text-white ${
                          animal.status === 'Disponible' ? 'bg-green-500' : 
                          animal.status === 'En proceso' ? 'bg-yellow-500' : 'bg-neutral-500'
                        }`}>
                          {animal.status}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'médico' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Historial Médico</h2>
                    {animal.medicalRecords.length > 0 ? (
                      <div className="space-y-4">
                        {animal.medicalRecords.map((record: any, index: number) => (
                          <div key={index} className="border rounded-lg p-4">
                            <div className="flex justify-between items-center mb-2">
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 text-primary-600 mr-2" />
                                <span className="font-medium">{record.date}</span>
                              </div>
                              <span className="text-sm text-neutral-500">{record.vet}</span>
                            </div>
                            <div className="mb-1">
                              <span className="font-semibold text-neutral-700">Diagnóstico:</span> {record.diagnosis}
                            </div>
                            <div>
                              <span className="font-semibold text-neutral-700">Tratamiento:</span> {record.treatment}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-neutral-600">No hay registros médicos disponibles.</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-2xl font-bold mb-4">{animal.name}</h2>
              <div className="flex items-center mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium text-white ${
                  animal.status === 'Disponible' ? 'bg-green-500' : 
                  animal.status === 'En proceso' ? 'bg-yellow-500' : 'bg-neutral-500'
                } mr-2`}>
                  {animal.status}
                </span>
                <span className="text-neutral-600 text-sm">{animal.breed}</span>
              </div>
              
              {animal.status === 'Disponible' && (
                <div className="mb-6">
                  <button className="btn-primary w-full mb-3">
                    <Heart className="h-5 w-5 mr-2" />
                    Solicitar Adopción
                  </button>
                  <p className="text-sm text-neutral-500 text-center">
                    Completa el formulario de solicitud para iniciar el proceso de adopción.
                  </p>
                </div>
              )}
              
              {center && (
                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-2">Centro de Rescate</h3>
                  <p className="text-neutral-800 mb-1">{center.name}</p>
                  <p className="text-neutral-600 text-sm mb-3">{center.location}</p>
                  
                  <div className="flex items-start mb-3">
                    <Clock className="h-4 w-4 text-neutral-500 mt-0.5 mr-2" />
                    <div className="text-sm text-neutral-600">{center.hours}</div>
                  </div>
                  
                  <div className="text-sm text-neutral-600">
                    <p>{center.contact}</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="bg-primary-50 rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-3">¿Interesado en adoptar?</h3>
              <p className="text-neutral-700 text-sm mb-4">
                Antes de adoptar, asegúrate de estar preparado para asumir la responsabilidad de cuidar a un animal. La adopción es un compromiso a largo plazo.
              </p>
              <Link to="/registro" className="btn-primary w-full">
                Regístrate para Adoptar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimalDetailPage;