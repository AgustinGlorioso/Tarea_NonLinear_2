from fastapi import FastAPI

from backend.routes import producto_routes

app = FastAPI(title="Sistema de Gestión de Inventario")
app.include_router(producto_routes.router)