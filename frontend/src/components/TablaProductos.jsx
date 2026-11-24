import { ETIQUETAS, formatoPrecio, ordenarPorCriticidad } from "../utils/stock"

function TablaProductos({ productos, onEditar, onRegistrarMovimiento }) {
  // Copia ordenada: los más cercanos al umbral primero; si empatan, por nombre
  const ordenados = ordenarPorCriticidad(productos)

  if (ordenados.length === 0) {
    return <p>No hay productos para mostrar.</p>
  }

  return (
    <table className="tabla-productos">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Categoría</th>
          <th className="numero">Precio unitario</th>
          <th className="numero">Stock actual</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {ordenados.map((producto) => (
          <tr
            key={producto.id}
            className="fila-clickeable"
            onClick={() => onEditar(producto)}
            title="Clic para editar"
          >
            <td>{producto.nombre}</td>
            <td>{producto.categoria}</td>
            <td className="numero">
              {formatoPrecio.format(producto.precio_unitario)}
            </td>
            <td className="numero">{producto.stock_actual}</td>
            <td className={`estado-${producto.estado}`}>
                <span className="estado-etiqueta">
                    {ETIQUETAS[producto.estado]}
                </span>
            </td>
            <td>
              <button
                type="button"
                onClick={(evento) => {
                  evento.stopPropagation() // que el clic no llegue a la fila
                  onRegistrarMovimiento(producto)
                }}
              >
                Registrar movimiento
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default TablaProductos