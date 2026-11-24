from fastapi import FastAPI

from backend.routes import categoria_routes, producto_routes

app = FastAPI(title="Sistema de Gestión de Inventario")
app.include_router(producto_routes.router)
app.include_router(categoria_routes.router)