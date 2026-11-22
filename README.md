# Sistema de Gestión de Inventario — Backend

Este repositorio contiene el **punto 2.5 (Endpoint a implementar)** de la Evaluación Técnica para Desarrollador, y los modelos de las tablas de la base de datos creada para la tarea.

## Qué hay

### Endpoint (punto 2.5)

`GET /productos` devuelve en JSON el listado de productos con su stock actual y el nombre de su categoría.

- Filtro por categoría: `GET /productos?categoria=electronica`.
- Si la categoría no existe, responde `404`.
- Los datos son **mockeados** (están en el repositorio `producto_repository.py`), sin base de datos conectada.


### Modelos de la base de datos

Los modelos SQLAlchemy describen las cinco tablas de la base de datos creada para la tarea:

| Modelo | Tabla |
|---|---|
| `Usuario` | `usuario` |
| `Categoria` | `categoria` |
| `Producto` | `producto` |
| `Movimiento` | `movimiento` |
| `ProductoHistorial` | `producto_historial` |

No están conectados al endpoint: el endpoint usa los datos mockeados.

### Estructura

```
backend/
├── main.py             # crea la app y registra las rutas
├── routes/             # endpoints HTTP
├── services/           # lógica de negocio
├── repositories/       # acceso a datos (hoy: mock)
├── schemas/            # formato de las respuestas (Pydantic)
└── models/             # modelos de las tablas (SQLAlchemy)
```

## Cómo ejecutarlo

```bash
# 1. Crear y activar el entorno virtual
python -m venv .venv
.venv\Scripts\activate        # Windows

# 2. Instalar dependencias
pip install -r requirements.txt

# 3. Levantar el servidor
uvicorn backend.main:app --reload
```

Después se puede probar en:

- Documentación interactiva: http://127.0.0.1:8000/docs
- Filtrado por categoría: http://127.0.0.1:8000/productos?categoria=electronica
