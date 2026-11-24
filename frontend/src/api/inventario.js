

export async function obtenerProductos(categoria) {
  const url = categoria
    ? `/api/productos?categoria=${encodeURIComponent(categoria)}`
    : '/api/productos'
  const respuesta = await fetch(url)
  if (!respuesta.ok) {
    throw new Error(`Error ${respuesta.status} al obtener los productos`)
  }
  return respuesta.json()
}

export async function obtenerCategorias() {
  const respuesta = await fetch('/api/categorias')
  if (!respuesta.ok) {
    throw new Error(`Error ${respuesta.status} al obtener las categorías`)
  }
  return respuesta.json()
}