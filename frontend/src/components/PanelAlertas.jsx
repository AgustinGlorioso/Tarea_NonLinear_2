import { ETIQUETAS, ordenarPorCriticidad } from '../utils/stock'

function PanelAlertas({ alertas }) {
  if (alertas.length === 0) {
    return (
      <section className="panel panel-alertas">
        <p>No hay productos con stock bajo.</p>
      </section>
    )
  }

  return (
    <section className="panel panel-alertas">
      <h2>Productos que requieren reposición</h2>
      <ul>
        {ordenarPorCriticidad(alertas).map((producto) => (
          <li key={producto.id} className={`alerta estado-${producto.estado}`}>
            <span className="estado-etiqueta">{ETIQUETAS[producto.estado]}</span>
            <span className="alerta-nombre">{producto.nombre}</span>
            <span className="alerta-detalle">
              {producto.categoria} · {producto.stock_actual} de mínimo{' '}
              {producto.stock_minimo}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default PanelAlertas