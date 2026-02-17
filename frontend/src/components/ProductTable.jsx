const ProductTable = ({ products = [] }) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-800">
      <table className="min-w-full divide-y divide-slate-800 text-sm">
        <thead className="bg-slate-800/70">
          <tr>
            <th className="px-3 py-2 text-left">Nombre</th>
            <th className="px-3 py-2 text-left">Categoría</th>
            <th className="px-3 py-2 text-left">Precio</th>
            <th className="px-3 py-2 text-left">Descripción</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800 bg-slate-900/70">
          {products.map((product) => (
            <tr key={product._id}>
              <td className="px-3 py-2">{product.nombre}</td>
              <td className="px-3 py-2">{product.categoria?.nombre || "-"}</td>
              <td className="px-3 py-2">${product.precio}</td>
              <td className="px-3 py-2">{product.descripcion || "Sin descripción"}</td>
            </tr>
          ))}
          {!products.length && (
            <tr>
              <td className="px-3 py-3 text-slate-400" colSpan={4}>
                No hay productos para mostrar.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
