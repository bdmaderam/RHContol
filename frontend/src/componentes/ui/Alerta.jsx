import { XMarkIcon } from '@heroicons/react/24/solid'; // ← Icono de v2

const Alerta = ({ tipo = 'error', mensajes = [], onCerrar }) => {
  const estilos = {
    error: 'bg-red-100 border-red-400 text-red-700',
    exito: 'bg-green-100 border-green-400 text-green-700'
  };

  return (
    <div className={`mb-4 p-3 text-sm rounded ${
      tipo === 'error' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
    }`}>
      {mensajes.map((msg, i) => (
        <p key={i}>{msg}</p>
      ))}
    </div>
  );

};


export default Alerta;