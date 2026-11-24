import { useEffect, useRef, useState } from 'react'
import { validarMovimiento } from '../utils/stock'

function FormularioMovimiento({ producto, onCancelar, onConfirmar }) {
  const dialogo = useRef(null)
  const [tipo, setTipo] = useState('entrada')
  const [cantidad, setCantidad] = useState('')
  const [motivo, setMotivo] = useState('')
  const [error, setError] = useState(null)

  // <dialog> abierto en modo modal: bloquea la página de fondo, atrapa el foco
  // y se cierra con Esc
  useEffect(() => {
    const elemento = dialogo.current
    elemento.showModal()
    return () => elemento.close()
  }, [])

  function modificar(setter) {
    return (evento) => {
      setter(evento.target.value)
      setError(null) // el mensaje desaparece apenas el usuario corrige
    }
  }

  function enviar(evento) {
    evento.preventDefault()
    const mensaje = validarMovimiento({
      tipo,
      cantidad,
      stockActual: producto.stock_actual,
    })
    if (mensaje) {
      setError(mensaje)
      return
    }
    onConfirmar({
      producto_id: producto.id,
      tipo,
      cantidad: Number(cantidad),
      motivo: motivo.trim() || null,
    })
  }

  return (
    <dialog
      ref={dialogo}
      className="formulario-movimiento"
      aria-labelledby="titulo-movimiento"
      onCancel={(evento) => {
        evento.preventDefault() // lo cerramos nosotros, desde el estado de App
        onCancelar()
      }}
    >
      <form onSubmit={enviar} noValidate>
        <h2 id="titulo-movimiento">Registrar movimiento</h2>
        <p className="movimiento-producto">{producto.nombre}</p>

        <fieldset className="campo">
          <legend>Tipo</legend>
          <label>
            <input
              type="radio"
              name="tipo"
              value="entrada"
              checked={tipo === 'entrada'}
              onChange={modificar(setTipo)}
            />{' '}
            Entrada
          </label>
          <label>
            <input
              type="radio"
              name="tipo"
              value="salida"
              checked={tipo === 'salida'}
              onChange={modificar(setTipo)}
            />{' '}
            Salida
          </label>
        </fieldset>

        <div className="campo">
          <label htmlFor="cantidad">Cantidad</label>
          <input
            id="cantidad"
            type="number"
            min="1"
            step="1"
            value={cantidad}
            onChange={modificar(setCantidad)}
            aria-invalid={error !== null}
            aria-describedby={error ? 'error-cantidad' : undefined}
          />
          {error && (
            <p id="error-cantidad" className="mensaje-error" role="alert">
              {error}
            </p>
          )}
        </div>

        <div className="campo">
          <label htmlFor="motivo">Motivo (opcional)</label>
          <input
            id="motivo"
            type="text"
            maxLength={255}
            value={motivo}
            onChange={modificar(setMotivo)}
          />
        </div>

        <div className="botones-formulario">
          <button type="button" onClick={onCancelar}>
            Cancelar
          </button>
          <button type="submit" className="boton-principal">
            Confirmar
          </button>
        </div>
      </form>
    </dialog>
  )
}

export default FormularioMovimiento