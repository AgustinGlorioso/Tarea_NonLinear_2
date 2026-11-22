from fastapi import APIRouter, HTTPException

from backend.schemas.producto import ProductoOut
from backend.services import producto_service
from backend.services.producto_service import CategoriaNoEncontrada

router = APIRouter()

@router.get("/productos", response_model=list[ProductoOut])
def get_productos(categoria: str | None = None):
    try:
        return producto_service.listar_productos(categoria)
    except CategoriaNoEncontrada as e:
        raise HTTPException(status_code=404, detail=str(e))