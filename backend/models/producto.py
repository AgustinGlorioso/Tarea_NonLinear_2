from typing import TYPE_CHECKING
from sqlalchemy import Integer, String, Float, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import Base

if TYPE_CHECKING:
    from .categoria import Categoria
    from .movimiento import Movimiento
    from .producto_historial import ProductoHistorial


class Producto(Base):
    __tablename__ = "producto"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=False)
    nombre: Mapped[str] = mapped_column(String(60), nullable=False)
    precio_unitario: Mapped[float] = mapped_column(Float, nullable=False)
    stock_actual: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    categoria_id: Mapped[int] = mapped_column(ForeignKey("categoria.id"), nullable=False)

    # Relaciones
    categoria: Mapped["Categoria"] = relationship(back_populates="productos")
    movimientos: Mapped[list["Movimiento"]] = relationship(back_populates="producto")
    historial: Mapped[list["ProductoHistorial"]] = relationship(back_populates="producto")
