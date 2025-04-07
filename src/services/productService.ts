// src/services/productoService.ts
import { api } from '@/lib/api';
import { Producto } from '@/types/producto';

export async function getProductos(): Promise<Producto[]> {
  const response = await api.get('/productos');
  return response.data;
}

export async function createProducto(producto: Producto): Promise<void> {
  await api.post('/productos', producto);
}

export async function updateProducto(producto: Producto): Promise<void> {
  await api.put(`/productos/${producto.id}`, producto);
}

export async function deleteProducto(id: number): Promise<void> {
  await api.delete(`/productos/${id}`);
}

