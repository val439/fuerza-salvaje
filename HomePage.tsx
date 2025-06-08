import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { AnimalModel } from '../components/3d/AnimalModel';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, Heart, Users, Shield, Star, Medal, Calendar, Play, Award, Clock, MapPin } from 'lucide-react';

const HomePage = () => {
  return (
    <>
      {/* Hero Section with Image Background */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Image Background */}
        <div className="absolute inset-0 z-0"> 
          <img 
            src="https://images.pexels.com/photos/32466744/pexels-photo-32466744.jpeg"
            alt="Fuerza Salvaje Background"
            className="w-full h-full object-cover"
          />
          {/* Image Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
          {/* Additional overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30"></div>
        </div>

        {/* Hero Content */} 
        <div className="relative z-10 flex items-center min-h-screen">
          <div className="container">
            <div className="max-w-4xl">
              {/* Badge */}
              <div className="inline-flex items-center bg-primary-600/90 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-lg">
                <Medal className="h-4 w-4 mr-2" />
                Protegiendo animales de corazon
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Bienvenido a 
                <span className="block text-primary-400 drop-shadow-lg">Fuerza Salvaje</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/95 mb-8 leading-relaxed max-w-3xl drop-shadow-md">
                Donde cada animal encuentra un hogar lleno de amor y cada historia de servicio es honrada con respeto y dignidad.
              </p>

              {/* Hero Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center border border-white/20">
                  <div className="text-2xl md:text-3xl font-bold text-primary-400 mb-1">500+</div>
                  <div className="text-white/80 text-sm">Rescatados</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center border border-white/20">
                  <div className="text-2xl md:text-3xl font-bold text-secondary-400 mb-1">350+</div>
                  <div className="text-white/80 text-sm">Adoptados</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center border border-white/20">
                  <div className="text-2xl md:text-3xl font-bold text-accent-400 mb-1">20+</div>
                  <div className="text-white/80 text-sm">Centros</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center border border-white/20">
                  <div className="text-2xl md:text-3xl font-bold text-yellow-400 mb-1">15+</div>
                  <div className="text-white/80 text-sm">Años</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/animales" className="btn-primary text-lg px-8 py-4 inline-flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  <Heart className="h-6 w-6 mr-2" />
                  Conocer Animales
                </Link>
                <Link to="/nosotros" className="btn bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 hover:bg-white/20 hover:border-white/50 text-lg px-8 py-4 inline-flex items-center justify-center shadow-xl transition-all duration-300">
                  <Play className="h-6 w-6 mr-2" />
                  Nuestra Historia
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-white/70 rounded-full flex justify-center backdrop-blur-sm bg-white/10">
              <div className="w-1 h-3 bg-white/90 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 right-10 w-20 h-20 bg-primary-500/20 rounded-full blur-xl animate-pulse hidden lg:block"></div>
        <div className="absolute bottom-1/4 left-10 w-16 h-16 bg-secondary-500/20 rounded-full blur-lg animate-pulse hidden lg:block"></div>
      </section>

      {/* Banner Section */}
      <section className="relative py-16 bg-gradient-to-r from-primary-800 via-primary-700 to-secondary-600 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Banner Content */}
            <div className="text-white">
              <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <Award className="h-5 w-5 mr-2 text-yellow-300" />
                <span className="text-sm font-medium">Más de 500 animales rescatados</span>
              </div>
               
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Héroes que merecen un 
                <span className="block text-yellow-300">segundo hogar</span>
              </h2>
              
              <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
                Cada animal en nuestra plataforma tiene una historia única de servicio y valentía. 
                Desde perros policía hasta caballos de terapia, todos merecen encontrar una familia 
                que valore su dedicación.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-yellow-300 mb-2">350+</div>
                  <p className="text-white/80 text-sm">Adopciones Exitosas</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-yellow-300 mb-2">5+</div>
                  <p className="text-white/80 text-sm">Años de Experiencia</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/animales" 
                  className="btn bg-white text-primary-800 hover:bg-white/90 px-6 py-3 inline-flex items-center justify-center font-semibold"
                >
                  <Search className="h-5 w-5 mr-2" />
                  Explorar Animales
                </Link>
                <Link 
                  to="/registro" 
                  className="btn border-2 border-white text-white hover:bg-white hover:text-primary-800 px-6 py-3 inline-flex items-center justify-center font-semibold"
                >
                  <Users className="h-5 w-5 mr-2" />
                  Únete Ahora
                </Link>
              </div>
            </div>

            {/* Banner Image/Stats */} 
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-300 rounded-full mb-4">
                    <img 
      src="https://images.pexels.com/photos/32466760/pexels-photo-32466760.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1 " 
      alt="Icono perro militar"
      className="94*64px object-cover rounded-lg"
    />
                    
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Impacto Real</h3>
                  <p className="text-white/80">Transformando vidas</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center">
                      <Heart className="h-5 w-5 text-red-400 mr-3" />
                      <span className="text-white">Animales Rescatados</span>
                    </div>
                    <span className="text-yellow-300 font-bold">50+</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-blue-400 mr-3" />
                      <span className="text-white">Familias Felices</span>
                    </div>
                    <span className="text-yellow-300 font-bold">25+</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-green-400 mr-3" />
                      <span className="text-white">Centros Asociados</span>
                    </div>
                    <span className="text-yellow-300 font-bold">20+</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-purple-400 mr-3" />
                      <span className="text-white">Seguimiento 24/7</span>
                    </div>
                    <span className="text-yellow-300 font-bold">100%</span>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-300/20 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-white/10 rounded-full animate-bounce"></div>
            </div>
          </div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 fill-white">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"></path>
          </svg>
        </div>
      </section>

      {/* 3D Model Section */}
      <section className="py-20 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Explora Nuestro Mundo 3D
            </h2>
            <p className="text-neutral-300 max-w-2xl mx-auto text-lg">
              Interactúa con nuestros modelos 3D y conoce mejor a nuestros compañeros animales
            </p>
          </div>

          <div className="relative">
            <div className="h-[500px] bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-2xl overflow-hidden shadow-2xl border border-neutral-700">
              <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                <ambientLight intensity={0.6} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4ade80" />
                <spotLight position={[0, 10, 0]} intensity={0.8} angle={0.3} penumbra={1} />
                <Suspense fallback={null}>
                  <AnimalModel />
                  <OrbitControls 
                    enableZoom={true}
                    enablePan={true}
                    enableRotate={true}
                    autoRotate={true}
                    autoRotateSpeed={2}
                  />
                </Suspense>
              </Canvas>
            </div>
            
            {/* 3D Controls Info */}
            <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm">
              <p>🖱️ Arrastra para rotar • 🔍 Scroll para zoom</p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Animals Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Héroes de Servicio</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Descubre las extraordinarias historias de los animales que han servido con distinción en diferentes campos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceAnimals.map((animal) => (
              <div key={animal.id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-neutral-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative h-64">
                  <img 
                    src={animal.image} 
                    alt={animal.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-olive-800 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {animal.type}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <Medal className="h-6 w-6 text-olive-700 mr-2" />
                    <h3 className="text-xl font-bold">{animal.name}</h3>
                  </div>
                  <div className="flex items-center text-sm text-neutral-500 mb-4">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{animal.service}</span>
                  </div>
                  <p className="text-neutral-600 mb-4">{animal.description}</p>
                  <div className="flex items-center text-sm text-olive-700 font-medium">
                    <Star className="h-4 w-4 mr-1" />
                    {animal.achievement}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-16 bg-neutral-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Historias de Éxito</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Conoce las inspiradoras historias de nuestros héroes que encontraron un hogar amoroso después de su servicio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {successStories.map((story) => (
              <div key={story.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="relative h-64">
                  <img 
                    src={story.image} 
                    alt={story.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Adoptado
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <Medal className="h-6 w-6 text-secondary-500 mr-2" />
                    <h3 className="text-xl font-bold">{story.name}</h3>
                  </div>
                  <div className="flex items-center text-sm text-neutral-500 mb-4">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Años de servicio: {story.serviceYears}</span>
                  </div>
                  <p className="text-neutral-600 mb-4">{story.description}</p>
                  <div className="border-t pt-4">
                    <p className="text-sm text-neutral-500 italic">
                      "{story.testimonial}"
                    </p>
                    <p className="text-sm font-medium text-neutral-700 mt-2">
                      - {story.adopter}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Por qué Fuerza Salvaje?</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Nuestra plataforma integra tecnología y compromiso para brindar la mejor experiencia
              tanto para los animales como para las personas que desean ayudar.
            </p>
          </div>
 
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center border border-neutral-100 hover:shadow-xl transition-all duration-300">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 text-primary-600 mb-6">
                <Search className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">Búsqueda Inteligente</h3>
              <p className="text-neutral-600">
                Encuentra fácilmente el animal perfecto que se adapte a tu hogar y estilo de vida.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center border border-neutral-100 hover:shadow-xl transition-all duration-300">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-secondary-100 text-secondary-600 mb-6">
                <Heart className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">Adopción Responsable</h3>
              <p className="text-neutral-600">
                Guiamos todo el proceso de adopción para asegurar el bienestar a largo plazo de los animales.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center border border-neutral-100 hover:shadow-xl transition-all duration-300">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-accent-100 text-accent-600 mb-6">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">Seguimiento Completo</h3>
              <p className="text-neutral-600">
                Mantenemos un historial médico y de comportamiento detallado para cada animal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-olive-800 to-olive-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/32375223/pexels-photo-32375223.jpeg')] bg-cover bg-center opacity-10"></div>
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Únete a nuestra misión</h2>
            <p className="text-lg mb-8 text-olive-100">
              Sé parte de nuestra comunidad dedicada a proteger y honrar a los animales que han servido con valentía.
            </p>
            <Link to="/registro" className="btn bg-white text-olive-900 hover:bg-neutral-100 px-8 py-4 text-lg font-bold inline-flex items-center">
              <Users className="h-6 w-6 mr-2" />
              Crear una cuenta
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

// Service animals data
const serviceAnimals = [
  {
    id: 1,
    name: "Ego",
    type: "Caballo Militar",
    image: "https://images.pexels.com/photos/635499/pexels-photo-635499.jpeg",
    service: "8 años de servicio militar",
    description: "Ego sirvió en la caballería militar, participando en desfiles ceremoniales y patrullas fronterizas. Su valentía y temple lo convirtieron en un ejemplo para el escuadrón.",
    achievement: "Medalla al Servicio Distinguido"
  },
  {
    id: 2,
    name: "Atlas",
    type: "Perro de Rescate",
    image: "https://images.pexels.com/photos/2523934/pexels-photo-2523934.jpeg",
    service: "6 años en búsqueda y rescate",
    description: "Atlas ha participado en más de 50 misiones de rescate en zonas de desastre, salvando numerosas vidas con su extraordinario olfato y dedicación.",
    achievement: "Reconocimiento por Servicios de Emergencia"
  },
  {
    id: 3,
    name: "Relámpago",
    type: "Caballo de Policía",
    image: "https://images.pexels.com/photos/1996333/pexels-photo-1996333.jpeg",
    service: "7 años en la policía montada",
    description: "Relámpago ha servido en la unidad de policía montada, manteniendo el orden en grandes eventos y realizando patrullas urbanas con excepcional calma y control.",
    achievement: "Medalla al Valor en Servicio"
  }
];

// Success stories data
const successStories = [
  {
    id: 1,
    name: "Choco",
    image: "https://images.pexels.com/photos/969381/pexels-photo-969381.jpeg",
    serviceYears: "5",
    description: "Choco sirvió como perro de búsqueda y rescate durante 5 años, ayudando en numerosas misiones de rescate. Después de su retiro, encontró un hogar amoroso con una familia que aprecia su valentía y dedicación.",
    testimonial: "choco no solo es un héroe, es parte de nuestra familia. Su experiencia en rescate lo hace especialmente protector con nuestros hijos.",
    adopter: "Familia Martínez"
  },
  {
    id: 2,
    name: "Mia",
    image: "https://images.pexels.com/photos/1904105/pexels-photo-1904105.jpeg",
    serviceYears: "4",
    description: "Mia fue parte de la unidad K-9 de detección de explosivos. Después de su servicio, se adaptó perfectamente a la vida civil y ahora disfruta de largos paseos y juegos con su nueva familia.",
    testimonial: "La disciplina y lealtad de Luna son increíbles. Ha traído tanta alegría a nuestro hogar.",
    adopter: "Carlos y Ana Rodríguez"
  },
  {
    id: 3,
    name: "Pipilon",
    image: "https://images.pexels.com/photos/18723767/pexels-photo-18723767/free-photo-of-hombre-gente-caminando-perro.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    serviceYears: "6",
    description: "Pipilon trabajó como perro de terapia en hospitales militares, brindando apoyo emocional a veteranos. Ahora disfruta de una vida tranquila, continuando su labor terapéutica en su nueva comunidad.",
    testimonial: "Pipilon tiene un don especial para sentir cuando alguien necesita consuelo. Es un ángel en forma de perro.",
    adopter: "Dr. Laura Sánchez"
  }
];

export default HomePage;