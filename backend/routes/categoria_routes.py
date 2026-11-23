from fastapi import APIRouter

from backend.schemas.categoria import CategoriaOut
from backend.services import categoria_service

router = APIRouter()


@router.get("/categorias", response_model=list[CategoriaOut])
def get_categorias():
    return categoria_service.listar_categorias()