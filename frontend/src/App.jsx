import { useEffect, useState } from 'react'
import { obtenerCategorias, obtenerProductos } from './api/inventario'
import GraficoStock from './components/GraficoStock'
import PanelAlertas from './components/PanelAlertas'
import TablaProductos from './components/TablaProductos'
import './App.css'

function App() {
  const [productos, setProductos] = useState([])
  const [todosLosProductos, setTodosLosProductos] = useState([])
  const [mostrarAlertas, setMostrarAlertas] = useState(false)
  const [categorias, setCategorias] = useState([])
  const [categoriaElegida, setCategoriaElegida] = useState('')
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

// Las categorías y el total de productos se piden una sola vez, al abrir la pantalla.
// Las alertas necesitan todos los productos, aunque la tabla esté filtrada.
useEffect(() => {
  obtenerCategorias()
    .then(setCategorias)
    .catch((e) => setError(e.message))
  obtenerProductos('')
    .then(setTodosLosProductos)
    .catch((e) => setError(e.message))
}, [])

const alertas = todosLosProductos.filter((p) => p.estado !== 'ok')
  // Los productos se vuelven a pedir cada vez que cambia el filtro
  useEffect(() => {
    let ignorar = false // evita que una respuesta vieja pise a una nueva

    obtenerProductos(categoriaElegida)
      .then((datos) => {
        if (!ignorar) setProductos(datos)
      })
      .catch((e) => {
        if (!ignorar) setError(e.message)
      })
      .finally(() => {
        if (!ignorar) setCargando(false)
      })

    return () => {
      ignorar = true
    }
  }, [categoriaElegida])

  function cambiarCategoria(nombre) {
    setCategoriaElegida(nombre)
    setCargando(true)
    setError(null)
  }

  // Acciones todavía sin implementar: por ahora solo dejan registro en la consola
  function editarProducto(producto) {
    console.log('Editar producto', producto)
  }

  function registrarMovimiento(producto) {
    console.log('Registrar movimiento', producto)
  }

  return (
    <main className="pagina">
      <header className="encabezado">
        <h1>Inventario</h1>
        <div className="acciones-encabezado">
          <button
            type="button"
            aria-expanded={mostrarAlertas}
            onClick={() => setMostrarAlertas(!mostrarAlertas)}
          >
            Alertas <span className="contador">{alertas.length}</span>
          </button>
          <button type="button" className="boton-principal" disabled title="Próximamente">
            + Nuevo producto
          </button>
        </div>
      </header>

      {mostrarAlertas && <PanelAlertas alertas={alertas} />}

      <div className="filtros">
        <label>
          Categoría{' '}
          <select
            value={categoriaElegida}
            onChange={(evento) => cambiarCategoria(evento.target.value)}
          >
            <option value="">Todas</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.nombre}>
                {categoria.nombre}
              </option>
            ))}
          </select>
        </label>
        <input
          type="search"
          placeholder="Buscar por nombre (próximamente)"
          disabled
        />
      </div>

      {error && <p className="mensaje-error">No se pudieron cargar los datos. {error}</p>}

      {cargando ? (
        <p>Cargando productos...</p>
      ) : (
        <div className='contenido'>
          <TablaProductos
            productos={productos}
            onEditar={editarProducto}
            onRegistrarMovimiento={registrarMovimiento}
          />
          <GraficoStock productos={productos} categoriaElegida={categoriaElegida} />
        </div>
      )}
    </main>
  )
}

export default App