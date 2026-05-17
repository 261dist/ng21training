import { Component, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categorias.html',
  styleUrl: './categorias.scss',
})
export class Categorias {
  categorias = signal<any[]>([]);
  formNombre = '';
  formDescripcion = '';
  editandoId: number|null = null;

  constructor(private http: HttpClient) {
    this.cargarCategorias();
  }

  cargarCategorias() {
    this.http.get<any[]>('http://localhost:7091/api/v1/categorias')
      .subscribe(data => this.categorias.set(data));
  }

  crearCategoria() {
    const nombre = this.formNombre.trim();
    const descripcion = this.formDescripcion.trim();
    if (!nombre || !descripcion) return;
    this.http.post<any>('http://localhost:7091/api/v1/categorias', { nombre, descripcion })
      .subscribe(() => {
        this.formNombre = '';
        this.formDescripcion = '';
        this.cargarCategorias();
      });
  }
  eliminarCategoria(id: number) {
    if (confirm(`¿Está seguro de eliminar esta categoría ${id}?`)) {
      this.http.delete(`http://localhost:7091/api/v1/categorias/${id}`)
        .subscribe(() => this.cargarCategorias());
    }
  }

  iniciarEdicion(cat: any) {
    this.editandoId = cat.id;
    this.formNombre = cat.nombre;
    this.formDescripcion = cat.descripcion;
  }

  cancelarEdicion() {
    this.editandoId = null;
    this.formNombre = '';
    this.formDescripcion = '';
  }

  guardarEdicion() {
    const nombre = this.formNombre.trim();
    const descripcion = this.formDescripcion.trim();
    if (!nombre || !descripcion || this.editandoId == null) return;
    this.http.put(`http://localhost:7091/api/v1/categorias/${this.editandoId}`, { nombre, descripcion })
      .subscribe(() => {
        this.cancelarEdicion();
        this.cargarCategorias();
      });
  }
}
