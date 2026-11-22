from pydantic import BaseModel

class ProductoOut(BaseModel):
    id: int
    nombre: str
    precio_unitario: float
    stock_actual: int
    categoria_id: int
    categoria: str