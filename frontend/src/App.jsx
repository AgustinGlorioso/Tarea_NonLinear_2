import { useEffect, useState } from 'react'

function App() {
  const [productos, setProductos] = useState([])

  useEffect(() => {
    fetch('/api/productos')
      .then((respuesta) => respuesta.json())
      .then((datos) => setProductos(datos))
  }, [])

  return (
    <main>
      <h1>Inventario</h1>
      <p>Hay {productos.length} productos</p>
      <ul>
        {productos.map((producto) => (
          <li key={producto.id}>
            {producto.nombre}: {producto.stock_actual} unidades
          </li>
        ))}
      </ul>
    </main>
  )
}

export default App