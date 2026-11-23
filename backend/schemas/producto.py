from pydantic import BaseModel
from typing import Literal

class ProductoOut(BaseModel):
    id: int
    nombre: str
    precio_unitario: float
    stock_actual: int
    stock_minimo: int
    estado: Literal["sin_stock", "bajo", "ok"]
    categoria_id: int
    categoria: str