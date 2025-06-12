const FormularioEmpleado = ({ empleado, onCambio, onEnviar, textoBoton }) => {
  return (
    <form onSubmit={onEnviar} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Sección Información Básica */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Nombres*
          </label>
          <input
            type="text"
            name="nombres"
            value={empleado.nombres}
            onChange={onCambio}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Apellidos
          </label>
          <input
            type="text"
            name="apellidos"
            value={empleado.apellidos}
            onChange={onCambio}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Sección Documento */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Tipo de Documento
          </label>
          <select
            name="tipoDocumento"
            value={empleado.tipoDocumento}
            onChange={onCambio}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="CC">Cédula de Ciudadanía</option>
            <option value="CE">Cédula de Extranjería</option>
            <option value="PA">Pasaporte</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Número de Documento*
          </label>
          <input
            type="text"
            name="numeroDocumento"
            value={empleado.numeroDocumento}
            onChange={onCambio}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        {/* Sección Información Laboral */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Cargo
          </label>
          <input
            type="text"
            name="cargo"
            value={empleado.cargo}
            onChange={onCambio}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Salario
          </label>
          <input
            type="number"
            name="salario"
            value={empleado.salario}
            onChange={onCambio}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Sección Opciones */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Dependencia
          </label>
          <input
            type="text"
            name="dependencia"
            value={empleado.dependencia}
            onChange={onCambio}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            name="tieneCuentaBancaria"
            checked={empleado.tieneCuentaBancaria}
            onChange={onCambio}
            className="mr-2"
          />
          <label className="text-gray-700 text-sm font-bold">
            Tiene cuenta bancaria
          </label>
        </div>

        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            name="esTemporal"
            checked={empleado.esTemporal}
            onChange={onCambio}
            className="mr-2"
          />
          <label className="text-gray-700 text-sm font-bold">
            Ingreso por temporal
          </label>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {textoBoton}
        </button>
      </div>
    </form>
  );
};

export default FormularioEmpleado;