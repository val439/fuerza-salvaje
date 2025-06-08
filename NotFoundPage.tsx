import React from 'react';
import { Link } from 'react-router-dom';
import { PawPrint as Paw, ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="pt-20 pb-16 bg-neutral-50">
      <div className="container py-16 flex flex-col items-center justify-center text-center">
        <div className="mb-8 text-primary-500">
          <Paw className="h-24 w-24 mx-auto" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">¡Ups! Página no encontrada</h1>
        <p className="text-neutral-600 max-w-md mx-auto mb-8">
          Parece que te has perdido. La página que buscas no existe o ha sido movida.
        </p>
        
        <div className="space-y-4">
          <Link 
            to="/" 
            className="btn-primary inline-flex items-center"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Volver al inicio
          </Link>
          <div>
            <p className="text-neutral-500 mt-2">
              ¿Necesitas ayuda? <Link to="/nosotros" className="text-primary-600 hover:text-primary-700">Contáctanos</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;