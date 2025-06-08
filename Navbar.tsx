import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, PawPrint as Paw, User } from 'lucide-react';
import useAuthStore from '../../store/authStore';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { pathname } = useLocation();
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const isActive = (path: string) => pathname === path;

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
          <Paw className="h-8 w-8 text-primary-600" />
          <span className="text-xl font-display font-bold text-neutral-900">
            Fuerza Salvaje
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            to="/"
            className={`text-sm font-medium hover:text-primary-600 transition-colors ${
              isActive('/') ? 'text-primary-600' : 'text-neutral-700'
            }`}
          >
            Inicio
          </Link>
          <Link 
            to="/animales"
            className={`text-sm font-medium hover:text-primary-600 transition-colors ${
              isActive('/animales') ? 'text-primary-600' : 'text-neutral-700'
            }`}
          >
            Animales
          </Link>
          <Link 
            to="/nosotros"
            className={`text-sm font-medium hover:text-primary-600 transition-colors ${
              isActive('/nosotros') ? 'text-primary-600' : 'text-neutral-700'
            }`}
          >
            Nosotros
          </Link>
          
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 text-sm font-medium text-neutral-700 hover:text-primary-600">
                  <User className="h-5 w-5" />
                  <span>{user?.firstName}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block">
                  <Link
                    to="/perfil"
                    className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                  >
                    Mi Perfil
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            ) : (
              <>
                <Link 
                  to="/login"
                  className="btn-outline text-sm py-1.5"
                >
                  Iniciar Sesión
                </Link>
                <Link 
                  to="/registro"
                  className="btn-primary text-sm py-1.5"
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-neutral-700 hover:text-neutral-900 focus:outline-none"
          onClick={toggleMenu}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-neutral-200 animate-fade-in">
          <div className="container mx-auto px-4 py-3 space-y-3">
            <Link 
              to="/"
              className={`block py-2 text-base font-medium ${
                isActive('/') ? 'text-primary-600' : 'text-neutral-700'
              }`}
              onClick={closeMenu}
            >
              Inicio
            </Link>
            <Link 
              to="/animales"
              className={`block py-2 text-base font-medium ${
                isActive('/animales') ? 'text-primary-600' : 'text-neutral-700'
              }`}
              onClick={closeMenu}
            >
              Animales
            </Link>
            <Link 
              to="/nosotros"
              className={`block py-2 text-base font-medium ${
                isActive('/nosotros') ? 'text-primary-600' : 'text-neutral-700'
              }`}
              onClick={closeMenu}
            >
              Nosotros
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link
                  to="/perfil"
                  className="block py-2 text-base font-medium text-neutral-700"
                  onClick={closeMenu}
                >
                  Mi Perfil
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    closeMenu();
                  }}
                  className="block w-full text-left py-2 text-base font-medium text-neutral-700"
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <div className="pt-4 flex flex-col space-y-3">
                <Link 
                  to="/login"
                  className="btn-outline w-full text-center"
                  onClick={closeMenu}
                >
                  Iniciar Sesión
                </Link>
                <Link 
                  to="/registro"
                  className="btn-primary w-full text-center"
                  onClick={closeMenu}
                >
                  Registrarse
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;