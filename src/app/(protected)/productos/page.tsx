// src/app/productos/page.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { Producto } from '@/types/producto';
import {
  getProductos,
  createProducto,
  updateProducto,
  deleteProducto,
} from '@/services/productService';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

export default function ProductosPage() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [producto, setProducto] = useState<Producto | null>(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const toast = useRef<Toast>(null);

  useEffect(() => {
    loadProductos();
  }, []);

  const loadProductos = async () => {
    try {
      const data = await getProductos();
      setProductos(data);
    } catch (error) {
      toast.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: 'No se pudieron cargar los productos',
      });
    }
  };

  const abrirNuevo = () => {
    setProducto({ id: 0, nombre: '', precio: 0 });
    setDialogVisible(true);
  };

  const ocultarDialogo = () => {
    setDialogVisible(false);
    setProducto(null);
  };

  const guardarProducto = async () => {
    if (!producto || !producto.nombre) return;

    try {
      if (producto.id === 0) {
        await createProducto(producto);
        toast.current?.show({
          severity: 'success',
          summary: 'Creado',
          detail: `Producto ${producto.nombre} creado`,
        });
      } else {
        await updateProducto(producto);
        toast.current?.show({
          severity: 'info',
          summary: 'Actualizado',
          detail: `Producto ${producto.nombre} actualizado`,
        });
      }
      ocultarDialogo();
      loadProductos();
    } catch (error) {
      toast.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: 'No se pudo guardar el producto',
      });
    }
  };

  const editarProducto = (prod: Producto) => {
    setProducto(prod);
    setDialogVisible(true);
  };

  const confirmarEliminar = (prod: Producto) => {
    confirmDialog({
      message: `¿Deseas eliminar el producto "${prod.nombre}"?`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => eliminarProducto(prod.id),
    });
  };

  const eliminarProducto = async (id: number) => {
    try {
      await deleteProducto(id);
      toast.current?.show({
        severity: 'success',
        summary: 'Eliminado',
        detail: 'Producto eliminado',
      });
      loadProductos();
    } catch (error) {
      toast.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: 'No se pudo eliminar el producto',
      });
    }
  };

  const accionesTemplate = (rowData: Producto) => (
    <div className="flex gap-2">
      <Button
        icon="pi pi-pencil"
        className="p-button-rounded p-button-info"
        onClick={() => editarProducto(rowData)}
      />
      <Button
        icon="pi pi-trash"
        className="p-button-rounded p-button-danger"
        onClick={() => confirmarEliminar(rowData)}
      />
    </div>
  );

  const footerDialogo = (
    <div className="flex justify-end gap-2">
      <Button label="Cancelar" icon="pi pi-times" onClick={ocultarDialogo} className="p-button-text" />
      <Button label="Guardar" icon="pi pi-check" onClick={guardarProducto} autoFocus />
    </div>
  );

  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">Manage Products</h5>
      <span className="block mt-2 md:mt-0 p-input-icon-left">
        <i className="pi pi-search" />
        <Button label="Nuevo" icon="pi pi-plus" onClick={abrirNuevo} className="p-button-success" />
      </span>
    </div>
  );

  return (
    <div className="grid align-items-center justify-content-center">
      <div className="col-12">
        <div className="card">
          <Toast ref={toast} />
          {/* <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar> */}
          <ConfirmDialog />
          <DataTable value={productos} paginator rows={10} showGridlines responsiveLayout="scroll" header={header} className="rounded-xl shadow-md">
            <Column field="nombre" header="Nombre" sortable style={{ minWidth: '200px' }}></Column>
            <Column field="precio" header="Precio" sortable style={{ minWidth: '150px' }}></Column>
            <Column header="Acciones" body={accionesTemplate} style={{ minWidth: '150px' }}></Column>
          </DataTable>
          <Dialog
            header="Producto"
            visible={dialogVisible}
            style={{ width: '30rem' }}
            footer={footerDialogo}
            onHide={ocultarDialogo}
            modal
            className="p-fluid rounded-2xl shadow-lg"
          >
            <div className="grid gap-6 p-6">
              {/* Campo: Nombre */}
              <div className="col-span-12">
                <span className="p-float-label">
                  <InputText
                    id="nombre"
                    value={producto?.nombre || ''}
                    onChange={(e) =>
                      setProducto((prev) => ({ ...prev!, nombre: e.target.value }))
                    }
                    className="w-full"
                  />
                  <label htmlFor="nombre">Nombre</label>
                </span>
              </div>

              {/* Campo: Precio */}
              <div className="col-span-12">
                <span className="p-float-label">
                  <InputNumber
                    id="precio"
                    value={producto?.precio || 0}
                    onValueChange={(e) =>
                      setProducto((prev) => ({ ...prev!, precio: e.value || 0 }))
                    }
                    mode="currency"
                    currency="COP"
                    locale="es-CO"
                    className="w-full"
                  />
                  {/* <label htmlFor="precio">Precio</label> */}
                </span>
              </div>
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
