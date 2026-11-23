import { useEffect, useState } from 'react'
import { obtenerCategorias, obtenerProductos } from './api/inventario'
import TablaProductos from './components/TablaProductos'
import './App.css'

function App() {
  const [productos, setProductos] = useState([])
  const [categorias, setCategorias] = useState([])
  const [categoriaElegida, setCategoriaElegida] = useState('')
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  // Las categorías se piden una sola vez, al abrir la pantalla
  useEffect(() => {
    obtenerCategorias()
      .then(setCategorias)
      .catch((e) => setError(e.message))
  }, [])

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
        <button type="button" disabled title="Próximamente">
          + Nuevo producto
        </button>
      </header>

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
        <TablaProductos
          productos={productos}
          onEditar={editarProducto}
          onRegistrarMovimiento={registrarMovimiento}
        />
      )}
    </main>
  )
}

export default App