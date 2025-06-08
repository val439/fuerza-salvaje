import React from 'react';
import { Link } from 'react-router-dom';
import { PawPrint as Paw, Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Paw className="h-8 w-8 text-primary-500" />
              <span className="text-xl font-display font-bold">Fuerza Salvaje</span>
            </div>
            <p className="text-neutral-300 mb-6">
              Dedicados a la protección, cuidado y rehabilitación de animales para encontrarles 
              un hogar lleno de amor y respeto.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-300 hover:text-primary-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-300 hover:text-primary-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-300 hover:text-primary-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-display font-bold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-neutral-300 hover:text-primary-500 transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/animales" className="text-neutral-300 hover:text-primary-500 transition-colors">
                  Animales
                </Link>
              </li>
              <li>
                <Link to="/nosotros" className="text-neutral-300 hover:text-primary-500 transition-colors">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link to="/registro" className="text-neutral-300 hover:text-primary-500 transition-colors">
                  Regístrate
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-neutral-300 hover:text-primary-500 transition-colors">
                  Iniciar Sesión
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-display font-bold mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary-500 mt-0.5" />
                <span className="text-neutral-300">
                  Av. Principal #123, Ciudad Central
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary-500" />
                <span className="text-neutral-300">+593 98 491 4557</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary-500" />
                <span className="text-neutral-300">info@fuerzaanimal.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-display font-bold mb-4">Boletín Informativo</h3>
            <p className="text-neutral-300 mb-4">
              Suscríbete para recibir noticias sobre nuestros animales y eventos.
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Correo electrónico"
                className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-md text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
              <button
                type="submit"
                className="w-full btn-primary"
              >
                Suscribirse
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-10 pt-6 text-center text-neutral-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Fuerza Salvaje. VT.2025</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;