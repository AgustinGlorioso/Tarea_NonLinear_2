import { useState } from 'react'
import {
  Bar,
  BarChart,
  Cell,
  LabelList,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { formatoPrecio } from '../utils/stock'

const MEDIDAS = {
  unidades: { titulo: 'Unidades' },
  valor: { titulo: 'Valor del stock' },
  bajos: { titulo: 'Productos con alerta' },
}

const COLOR_BARRA = '#3b5b8c'
const COLOR_POR_ESTADO = {
  sin_stock: '#c0392b',
  bajo: '#d9a441',
  ok: '#5b8c6e',
}

function formatearValor(medida, valor) {
  return medida === 'valor' ? formatoPrecio.format(valor) : valor
}

// Nivel 1: una barra por categoría
function datosPorCategoria(productos, medida) {
  const grupos = new Map()
  for (const p of productos) {
    const grupo = grupos.get(p.categoria) ?? { nombre: p.categoria, valor: 0 }
    if (medida === 'unidades') grupo.valor += p.stock_actual
    if (medida === 'valor') grupo.valor += p.stock_actual * p.precio_unitario
    if (medida === 'bajos' && p.estado !== 'ok') grupo.valor += 1
    grupos.set(p.categoria, grupo)
  }
  return [...grupos.values()].sort((a, b) => b.valor - a.valor)
}

// Nivel 2: una barra por producto de la categoría elegida
function datosPorProducto(productos, medida) {
  return productos
    .map((p) => ({
      nombre: p.nombre,
      valor: medida === 'valor' ? p.stock_actual * p.precio_unitario : p.stock_actual,
      estado: p.estado,
    }))
    .sort((a, b) => b.valor - a.valor)
}

function GraficoStock({ productos, categoriaElegida }) {
  const [medida, setMedida] = useState('unidades')

  const porProducto = categoriaElegida !== ''
  // "Productos con alerta" solo tiene sentido agrupado por categoría
  const medidaActiva = porProducto && medida === 'bajos' ? 'unidades' : medida

  if (productos.length === 0) return null

  const datos = porProducto
    ? datosPorProducto(productos, medidaActiva)
    : datosPorCategoria(productos, medidaActiva)

  // Todos los productos de una categoría comparten el mismo mínimo
  const minimo = porProducto && medidaActiva === 'unidades' ? productos[0].stock_minimo : null

  function colorDe(dato) {
    if (!porProducto) return medidaActiva === 'bajos' ? COLOR_POR_ESTADO.bajo : COLOR_BARRA
    return medidaActiva === 'unidades' ? COLOR_POR_ESTADO[dato.estado] : COLOR_BARRA
  }

  const titulo = porProducto
    ? `${MEDIDAS[medidaActiva].titulo} por producto: ${categoriaElegida}`
    : `${MEDIDAS[medidaActiva].titulo} por categoría`

  return (
    <section className="panel grafico">
      <div className="grafico-encabezado">
        <h2>{titulo}</h2>
        <div className="selector-medida" role="group" aria-label="Medida del gráfico">
          {Object.entries(MEDIDAS).map(([clave, { titulo: texto }]) => (
            <button
              key={clave}
              type="button"
              className={clave === medidaActiva ? 'activo' : ''}
              aria-pressed={clave === medidaActiva}
              disabled={clave === 'bajos' && porProducto}
              title={
                clave === 'bajos' && porProducto
                  ? 'Solo disponible al ver todas las categorías'
                  : undefined
              }
              onClick={() => setMedida(clave)}
            >
              {texto}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={Math.max(400, datos.length * 56 + 40)}>
        <BarChart data={datos} layout="vertical" margin={{ top: 10, right: 50, bottom: 8, left: 8 }}>
          <XAxis
            type="number"
            allowDecimals={false}
            tickFormatter={(v) => formatearValor(medidaActiva, v)}
            stroke="#94a3b8"
          />
          <YAxis type="category" dataKey="nombre" width={120} stroke="#94a3b8" />
          <Tooltip
            formatter={(v) => [formatearValor(medidaActiva, v), MEDIDAS[medidaActiva].titulo]}
            cursor={{ fill: '#f1f5f9' }}
          />
          <Bar dataKey="valor" minPointSize={3} radius={[0, 6, 6, 0]} barSize={40}>
            {datos.map((dato) => (
              <Cell key={dato.nombre} fill={colorDe(dato)} />
            ))}
            <LabelList
              dataKey="valor"
              position="right"
              formatter={(v) => formatearValor(medidaActiva, v)}
              fill="#475569"
            />
          </Bar>
          {minimo !== null && (
            <ReferenceLine
              x={minimo}
              stroke="#64748b"
              strokeDasharray="4 4"
              label={{ value: `Mínimo: ${minimo}`, position: 'right', fill: '#64748b', fontSize: 12 }}
            />
          )}
        </BarChart>
      </ResponsiveContainer>
    </section>
  )
}

export default GraficoStock