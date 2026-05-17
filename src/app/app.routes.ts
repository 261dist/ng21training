import { Routes } from '@angular/router';

export const routes: Routes = [

   {
    path: 'categorias',
    loadComponent: () => import('./categorias/categorias').then(m => m.Categorias)
   },
  // Puedes agregar más rutas aquí
  // { path: '', redirectTo: 'categorias', pathMatch: 'full' }


];
