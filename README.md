# Sistema de Gestión de Inventario

Evaluación técnica para Desarrollador Junior Full Stack. Backend en FastAPI y frontend en React, con datos de prueba.

## Requisitos

- Python 3.11 o superior
- Node.js LTS (probado con la versión 26)

## Cómo ejecutarlo

Se levantan dos servidores, cada uno en su propia terminal.

### 1. Backend (desde la raíz del repositorio)

```bash
python -m venv .venv
.venv\Scripts\activate          # Windows
pip install -r requirements.txt
uvicorn backend.main:app --reload
```

Queda en http://127.0.0.1:8000. Documentación interactiva en http://127.0.0.1:8000/docs.

### 2. Frontend (desde la carpeta `frontend/`)

```bash
cd frontend
npm install
npm run dev
```

Abrir http://localhost:5173.

El frontend pide los datos a `/api/...` y Vite los reenvía al backend (proxy configurado en `vite.config.js`), por eso el backend tiene que estar corriendo.

## Endpoints

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/productos` | Productos con stock actual, nombre de categoría, stock mínimo y estado (`ok`, `bajo`, `sin_stock`) |
| GET | `/productos?categoria=ropa` | Filtrado por categoría (sin distinguir mayúsculas ni acentos). Responde 404 si no existe |
| GET | `/categorias` | Categorías con su stock mínimo |

## Estructura

```
backend/
├── main.py             # crea la app y registra las rutas
├── routes/             # endpoints HTTP
├── services/           # lógica de negocio (ej.: cálculo del estado del stock)
├── repositories/       # acceso a datos (hoy: datos de prueba)
├── schemas/            # formato de las respuestas (Pydantic)
└── models/             # modelos de las tablas (SQLAlchemy)

frontend/
├── vite.config.js      # proxy /api → backend
└── src/
    ├── App.jsx         # pantalla principal: estado, filtros y armado de la vista
    ├── api/            # funciones que llaman al backend
    ├── components/     # tabla, gráfico, panel de alertas y formulario de movimientos
    └── utils/          # reglas de presentación compartidas (etiquetas, orden, validación)

base_de_datos/
├── schema.sql          # script de creación de las tablas
├── EDR.jpg             # diagrama entidad-relación
└── MFD.jpg             # modelo físico de datos

```

## Respuestas y decisiones

Las respuestas a las preguntas conceptuales (partes 1 a 5) están en [Evaluación técnica Sistema de Gestión de Inventario.pdf](Evaluación%20técnica%20Sistema%20de%20Gestión%20de%20Inventario.pdf).