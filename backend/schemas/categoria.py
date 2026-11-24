from pydantic import BaseModel


class CategoriaOut(BaseModel):
    id: int
    nombre: str
    stock_minimo: int