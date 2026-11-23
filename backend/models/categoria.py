from typing import TYPE_CHECKING
from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import Base

if TYPE_CHECKING:
    from .producto import Producto


class Categoria(Base):
    __tablename__ = "categoria"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=False)
    nombre: Mapped[str] = mapped_column(String(60), nullable=False)
    descripcion: Mapped[str | None] = mapped_column(String(255), nullable=True)
    stock_minimo: Mapped[int] = mapped_column(Integer, nullable=False, default=0)

    # Relación con Producto (1 a N)
    productos: Mapped[list["Producto"]] = relationship(back_populates="categoria")
