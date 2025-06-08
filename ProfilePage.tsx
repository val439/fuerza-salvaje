import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Settings, LogOut, PawPrint, Heart, Plus } from 'lucide-react';
import useAuthStore from '../store/authStore';

const ProfilePage = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('perfil');

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  if (!user) {
    return (
      <div className="pt-20 pb-16">
        <div className="container">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Acceso Denegado</h1>
            <p className="mb-4">Debes iniciar sesión para ver tu perfil.</p>
            <button
              onClick={() => navigate('/login')}
              className="btn-primary"
            >
              Iniciar Sesión
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-16 bg-neutral-50">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          {/* Profile Header */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-primary-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{user.firstName} {user.lastName}</h1>
                <p className="text-neutral-600">{user.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="ml-auto btn-outline flex items-center"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Cerrar Sesión
              </button>
            </div>
          </div>

          {/* Profile Navigation */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
            <nav className="flex border-b">
              <button
                onClick={() => setActiveTab('perfil')}
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === 'perfil'
                    ? 'border-b-2 border-primary-500 text-primary-600'
                    : 'text-neutral-500 hover:text-neutral-700'
                }`}
              >
                <User className="w-4 h-4 inline-block mr-2" />
                Mi Perfil
              </button>
              <button
                onClick={() => setActiveTab('adoptados')}
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === 'adoptados'
                    ? 'border-b-2 border-primary-500 text-primary-600'
                    : 'text-neutral-500 hover:text-neutral-700'
                }`}
              >
                <Heart className="w-4 h-4 inline-block mr-2" />
                Mis Adopciones
              </button>
              {user.isAdmin && (
                <button
                  onClick={() => setActiveTab('gestionar')}
                  className={`px-6 py-3 text-sm font-medium ${
                    activeTab === 'gestionar'
                      ? 'border-b-2 border-primary-500 text-primary-600'
                      : 'text-neutral-500 hover:text-neutral-700'
                  }`}
                >
                  <PawPrint className="w-4 h-4 inline-block mr-2" />
                  Gestionar Animales
                </button>
              )}
              <button
                onClick={() => setActiveTab('configuracion')}
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === 'configuracion'
                    ? 'border-b-2 border-primary-500 text-primary-600'
                    : 'text-neutral-500 hover:text-neutral-700'
                }`}
              >
                <Settings className="w-4 h-4 inline-block mr-2" />
                Configuración
              </button>
            </nav>

            <div className="p-6">
              {activeTab === 'perfil' && (
                <div>
                  <h2 className="text-xl font-bold mb-4">Información Personal</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">
                        Nombre
                      </label>
                      <input
                        type="text"
                        className="input"
                        value={user.firstName}
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">
                        Apellido
                      </label>
                      <input
                        type="text"
                        className="input"
                        value={user.lastName}
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        className="input"
                        value={user.email}
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        className="input"
                        value={user.phone || ''}
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'adoptados' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Mis Animales Adoptados</h2>
                    <button className="btn-primary flex items-center">
                      <Plus className="w-4 h-4 mr-2" />
                      Solicitar Nueva Adopción
                    </button>
                  </div>
                  
                  <div className="bg-neutral-50 rounded-lg p-8 text-center">
                    <PawPrint className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
                    <p className="text-neutral-600 mb-4">
                      Aún no has adoptado ningún animal.
                    </p>
                    <button
                      onClick={() => navigate('/animales')}
                      className="btn-primary"
                    >
                      Ver Animales Disponibles
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'gestionar' && user.isAdmin && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Gestionar Animales</h2>
                    <button className="btn-primary flex items-center">
                      <Plus className="w-4 h-4 mr-2" />
                      Agregar Nuevo Animal
                    </button>
                  </div>
                  
                  <div className="bg-neutral-50 rounded-lg p-8 text-center">
                    <PawPrint className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
                    <p className="text-neutral-600">
                      No hay animales registrados en el sistema.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'configuracion' && (
                <div>
                  <h2 className="text-xl font-bold mb-4">Configuración de la Cuenta</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Cambiar Contraseña</h3>
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 mb-1">
                            Contraseña Actual
                          </label>
                          <input
                            type="password"
                            className="input"
                            placeholder="••••••••"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 mb-1">
                            Nueva Contraseña
                          </label>
                          <input
                            type="password"
                            className="input"
                            placeholder="••••••••"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 mb-1">
                            Confirmar Nueva Contraseña
                          </label>
                          <input
                            type="password"
                            className="input"
                            placeholder="••••••••"
                          />
                        </div>
                        <div>
                          <button className="btn-primary">
                            Actualizar Contraseña
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <h3 className="text-lg font-medium mb-2">Preferencias de Notificación</h3>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="emailNotif"
                            className="h-4 w-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                          />
                          <label htmlFor="emailNotif" className="ml-2 text-sm text-neutral-700">
                            Recibir notificaciones por email
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="newsNotif"
                            className="h-4 w-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                          />
                          <label htmlFor="newsNotif" className="ml-2 text-sm text-neutral-700">
                            Recibir boletín informativo
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <h3 className="text-lg font-medium text-red-600 mb-2">Zona de Peligro</h3>
                      <p className="text-sm text-neutral-600 mb-4">
                        Una vez que elimines tu cuenta, no hay vuelta atrás. Por favor, estar seguro.
                      </p>
                      <button className="btn bg-red-600 hover:bg-red-700 text-white">
                        Eliminar mi cuenta
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;