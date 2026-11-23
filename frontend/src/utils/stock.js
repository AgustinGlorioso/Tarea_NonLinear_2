// Reglas de presentación del stock, compartidas por la tabla, el gráfico y las alertas

export const ETIQUETAS = {
  sin_stock: 'Sin stock',
  bajo: 'Bajo',
  ok: 'OK',
}

// Qué tan cerca está del umbral: 0 = sin stock, 1 = justo en el mínimo
export function cercaniaAlUmbral(producto) {
  if (producto.stock_actual === 0) return 0
  if (producto.stock_minimo === 0) return Infinity
  return producto.stock_actual / producto.stock_minimo
}

// Más críticos primero; si empatan, por nombre
export function ordenarPorCriticidad(productos) {
  return [...productos].sort(
    (a, b) =>
      cercaniaAlUmbral(a) - cercaniaAlUmbral(b) ||
      a.nombre.localeCompare(b.nombre),
  )
}

export const formatoPrecio = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0,
})