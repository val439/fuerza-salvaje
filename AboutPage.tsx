import React from 'react';
import { Shield, Users, Heart, Award } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="pt-20 pb-16">
      {/* Hero Section */}
      <section className="bg-primary-800 py-16">
        <div className="container text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">Sobre Nosotros</h1>
<img src="https://images.pexels.com/photos/32375223/pexels-photo-32375223.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Imagen sobre nosotros" class="mx-auto my-4 rounded-xl shadow-lg w-full max-w-md" />
<p className="text-primary-100 max-w-2xl mx-auto">
  Conoce más sobre nuestra misión, visión y el equipo que hace posible Fuerza Salvaje.
          </p>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Nuestra Misión</h2>
              <p className="text-neutral-700 mb-6 leading-relaxed">
                En Fuerza Salvaje, nuestra misión es proteger, cuidar y rehabilitar a los animales que han sido 
                abandonados, maltratados o que necesitan un nuevo hogar. Trabajamos para garantizar que cada 
                animal reciba el cuidado que merece y encuentre una familia amorosa y responsable.
              </p>
              <p className="text-neutral-700 leading-relaxed">
                Utilizamos la tecnología para conectar a los animales con potenciales adoptantes, 
                facilitando el proceso de adopción y asegurando el seguimiento de cada caso para 
                garantizar el bienestar de los animales a largo plazo o corto plazo.
              </p>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Nuestra Visión</h2>
              <p className="text-neutral-700 mb-6 leading-relaxed">
                Aspiramos a crear un mundo donde ningún animal sufra abandono o maltrato, 
                donde la adopción responsable sea la norma y no la excepción, y donde cada animal 
                tenga la oportunidad de vivir en un hogar seguro y amoroso.
              </p>
              <p className="text-neutral-700 leading-relaxed">
                Buscamos ser referentes en el uso de la tecnología para la protección animal, 
                desarrollando sistemas que permitan un seguimiento efectivo de cada caso y 
                que faciliten la labor de todos los involucrados en el cuidado y la adopción de animales.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-neutral-50">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Nuestros Valores</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 text-primary-600 mb-4">
                <Heart className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Compasión</h3>
              <p className="text-neutral-600">
                Actuamos con empatía y respeto hacia todos los animales, reconociendo sus necesidades y derechos.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-secondary-100 text-secondary-600 mb-4">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Responsabilidad</h3>
              <p className="text-neutral-600">
                Asumimos el compromiso de cuidar y proteger a los animales con los más altos estándares.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-accent-100 text-accent-600 mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Comunidad</h3>
              <p className="text-neutral-600">
                Fomentamos la colaboración entre personas y organizaciones para crear un impacto mayor.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 mb-4">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Excelencia</h3>
              <p className="text-neutral-600">
                Nos esforzamos por ofrecer el mejor servicio y atención tanto a los animales como a las personas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-white">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Nuestro Equipo</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="bg-white border border-neutral-200 rounded-lg overflow-hidden shadow-sm transition-transform hover:-translate-y-1 duration-300">
                <div className="h-64 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-primary-600 font-medium mb-4">{member.role}</p>
                  <p className="text-neutral-600 mb-4">
                    {member.bio}
                  </p>
                  <div className="flex space-x-3">
                    {member.social.map((social, index) => (
                      <a 
                        key={index}
                        href={social.url} 
                        className="text-neutral-500 hover:text-neutral-700"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className='https://images.pexels.com/photos/32375224/pexels-photo-32375224.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'>
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">Nuestro Impacto</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">500+</div>
              <p className="text-primary+100">Animales Rescatados</p>
            </div>
            
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">350+</div>
              <p className="text-primary+100">Adopciones Exitosas</p>
            </div>
            
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">20+</div>
              <p className="text-primary+100">Centros Asociados</p>
            </div>
            
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">5000+</div>
              <p className="text-primary+100">Usuarios Registrados</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Social icons
const TwitterIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

// Team Members Data
const teamMembers = [
  {
    id: 1,
    name: 'Ana Martínez',
    role: 'Directora General',
    image: 'https://images.pexels.com/photos/32336390/pexels-photo-32336390.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    bio: 'Ana tiene más de 15 años de experiencia en protección animal, utiliza la tecnología para mejorar la vida de los animales.',
    social: [
      { icon: <TwitterIcon />, url: '#' },
      { icon: <LinkedInIcon />, url: '#' },
      { icon: <InstagramIcon />, url: '#' }
    ]
  },
  {
    id: 2,
    name: 'Carlos Rodríguez',
    role: 'Veterinario Jefe',
    image: 'https://images.pexels.com/photos/6235660/pexels-photo-6235660.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    bio: 'Carlos se especializa en medicina de emergencia y cuidados intensivos para animales rescatados. Supervisa todos los protocolos médicos y de rehabilitación.',
    social: [
      { icon: <TwitterIcon />, url: '#' },
      { icon: <LinkedInIcon />, url: '#' }
    ]
  },
  {
    id: 3,
    name: 'Laura Gómez',
    role: 'Coordinadora de Adopciones',
    image: 'https://images.pexels.com/photos/7979431/pexels-photo-7979431.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    bio: 'Laura lidera el proceso de adopción, asegurando que cada animal encuentre un hogar adecuado. Tiene formación en comportamiento animal y trabajo social.',
    social: [
      { icon: <InstagramIcon />, url: '#' },
      { icon: <LinkedInIcon />, url: '#' }
    ]
  }
];

export default AboutPage;