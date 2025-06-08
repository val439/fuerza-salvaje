import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { User, Mail, Lock, Phone, MapPin } from 'lucide-react';

type RegisterFormInputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  address: string;
  terms: boolean;
};

const RegisterPage = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<RegisterFormInputs>();
  
  const onSubmit = (data: RegisterFormInputs) => {
    console.log(data);
    // Here you would submit the data to your API
    alert('Registro exitoso! En un entorno real, te enviaríamos un correo de confirmación.');
  };

  return (
    <div className="pt-20 pb-16 bg-neutral-50">
      <div className="container py-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid md:grid-cols-2">
            {/* Image Column */}
            <div className="hidden md:block relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-800/90 to-primary-900/90 z-10"></div>
              <img 
                src="https://images.pexels.com/photos/32375224/pexels-photo-32375224.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Registro" 
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 flex flex-col justify-center items-center p-8 z-20">
                <h2 className="text-3xl font-bold text-white mb-4">¡Únete a Fuerza Salvaje!</h2>
                <p className="text-primary-100 text-center mb-6">
                  Regístrate para formar parte de nuestra comunidad y ayudar a los animales que más lo necesitan.
                </p>
                <div className="space-y-4 text-white">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <span>Crea tu perfil personal</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3">
                      <Heart className="h-4 w-4 text-white" />
                    </div>
                    <span>Solicita adopciones</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3">
                      <Bell className="h-4 w-4 text-white" />
                    </div>
                    <span>Recibe notificaciones</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Column */}
            <div className="p-8">
              <div className="text-center mb-6 md:hidden">
                <h2 className="text-2xl font-bold text-neutral-900 mb-2">¡Únete a Fuerza Salvaje!</h2>
                <p className="text-neutral-600">
                  Regístrate para formar parte de nuestra comunidad.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-neutral-700 mb-1">
                      Nombre
                    </label>
                    <div className="relative">
                      <input
                        id="firstName"
                        type="text"
                        className={`input pl-10 ${errors.firstName ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                        placeholder="Juan"
                        {...register('firstName', { required: 'Nombre es requerido' })}
                      />
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
                    </div>
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-neutral-700 mb-1">
                      Apellido
                    </label>
                    <div className="relative">
                      <input
                        id="lastName"
                        type="text"
                        className={`input pl-10 ${errors.lastName ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                        placeholder="Pérez"
                        {...register('lastName', { required: 'Apellido es requerido' })}
                      />
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
                    </div>
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                    Correo Electrónico
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      className={`input pl-10 ${errors.email ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                      placeholder="ejemplo@correo.com"
                      {...register('email', { 
                        required: 'Correo electrónico es requerido',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Correo electrónico inválido'
                        }
                      })}
                    />
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-1">
                    Contraseña
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type="password"
                      className={`input pl-10 ${errors.password ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                      placeholder="********"
                      {...register('password', { 
                        required: 'Contraseña es requerida',
                        minLength: {
                          value: 8,
                          message: 'La contraseña debe tener al menos 8 caracteres'
                        }
                      })}
                    />
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-700 mb-1">
                    Confirmar Contraseña
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      type="password"
                      className={`input pl-10 ${errors.confirmPassword ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                      placeholder="********"
                      {...register('confirmPassword', { 
                        required: 'Confirma tu contraseña',
                        validate: value => value === watch('password') || 'Las contraseñas no coinciden'
                      })}
                    />
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1">
                    Teléfono
                  </label>
                  <div className="relative">
                    <input
                      id="phone"
                      type="tel"
                      className={`input pl-10 ${errors.phone ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                      placeholder="+1 234 567 890"
                      {...register('phone', { required: 'Teléfono es requerido' })}
                    />
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
                  </div>
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-neutral-700 mb-1">
                    Dirección
                  </label>
                  <div className="relative">
                    <input
                      id="address"
                      type="text"
                      className={`input pl-10 ${errors.address ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                      placeholder="Calle, Ciudad, Código Postal"
                      {...register('address', { required: 'Dirección es requerida' })}
                    />
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
                  </div>
                  {errors.address && (
                    <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
                  )}
                </div>

                <div className="flex items-center">
                  <input
                    id="terms"
                    type="checkbox"
                    className="h-4 w-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                    {...register('terms', { required: 'Debes aceptar los términos y condiciones' })}
                  />
                  <label htmlFor="terms" className="ml-2 block text-sm text-neutral-700">
                    Acepto los <Link to="#" className="text-primary-600 hover:text-primary-500">Términos y Condiciones</Link> y la <Link to="#" className="text-primary-600 hover:text-primary-500">Política de Privacidad</Link>
                  </label>
                </div>
                {errors.terms && (
                  <p className="mt-1 text-sm text-red-600">{errors.terms.message}</p>
                )}

                <button
                  type="submit"
                  className="btn-primary w-full py-2.5 text-base"
                >
                  Registrarse
                </button>

                <div className="text-center text-sm">
                  ¿Ya tienes una cuenta?{' '}
                  <Link to="/login" className="text-primary-600 hover:text-primary-500 font-medium">
                    Iniciar Sesión
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div> 
  );
};

// Import missing Lucide icons
const Heart = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);

const Bell = () => (
  <svg xmlns="https://images.pexels.com/photos/32466760/pexels-photo-32466760.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </svg>
);

export default RegisterPage;