from typing import TYPE_CHECKING
from datetime import datetime
from sqlalchemy import Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import Base

if TYPE_CHECKING:
    from .producto import Producto
    from .usuario import Usuario


class ProductoHistorial(Base):
    __tablename__ = "producto_historial"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=False)
    nombre_anterior: Mapped[str] = mapped_column(String(60), nullable=False)
    nombre_nuevo: Mapped[str] = mapped_column(String(60), nullable=False)
    precio_anterior: Mapped[float] = mapped_column(Float, nullable=False)
    precio_nuevo: Mapped[float] = mapped_column(Float, nullable=False)
    fecha: Mapped[datetime] = mapped_column(DateTime, nullable=False)
    producto_id: Mapped[int] = mapped_column(ForeignKey("producto.id"), nullable=False)
    usuario_id: Mapped[int] = mapped_column(ForeignKey("usuario.id"), nullable=False)

    # Relaciones N a 1
    producto: Mapped["Producto"] = relationship(back_populates="historial")
    usuario: Mapped["Usuario"] = relationship(back_populates="historial")
