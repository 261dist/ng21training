# Roadmap Angular 21

Este documento es tu guía de aprendizaje y registro de avances para dominar Angular 21, aprovechando sus nuevas características y dejando atrás lo legacy.


Plan actualizado (2026-05-16):

1. Instalación y configuración
 - Instalación y configuración de Angular CLI 21

2. Fundamentos de Angular 21 (completado)
 - Estructura de un proyecto Angular moderno
 - Uso de Standalone Components (componentes independientes)
 - Modularidad y lazy loading con rutas modernas

3. Consumo de APIs y manejo de estado (en progreso)
 - HttpClient y manejo de peticiones asíncronas (ya aplicado en CRUD de categorías)
 - Signals para manejo de estado reactivo (ya aplicado)
 - Integración con librerías modernas de estado (pendiente)

4. Novedades clave de Angular 21 (pendiente de profundizar)
 - Signals: programación reactiva simplificada (ya aplicado)
 - Control Flow Syntax (if, for, switch en plantillas) (pendiente)
 - Inputs/Outputs mejorados y tipados estrictos (pendiente)
 - Mejoras en el manejo de formularios reactivos (pendiente)

5. Desarrollo moderno (pendiente)
 - Uso de TypeScript estricto y tipado avanzado
 - Migración de servicios y pipes a standalone
 - Pruebas unitarias y de integración con TestBed y Harnesses
 - Uso de herramientas modernas: Angular DevTools, ESLint, Prettier

6. Optimización y buenas prácticas (pendiente)
 - Optimización de performance: ChangeDetection, trackBy, defer, hydration
 - Accesibilidad y SEO en Angular 21
 - Deploy moderno: SSR, prerendering y hosting en Vercel/Netlify

---

Notas de avance:
- Ya aplicamos consumo de APIs REST y signals para estado en el CRUD de categorías.
- Faltan: pruebas, optimización, control flow en plantillas, inputs/outputs avanzados, manejo de estado avanzado, etc.
- Siguiente paso sugerido: profundizar en novedades de Angular 21 y desarrollo moderno (tipado, pruebas, herramientas, optimización).



---

## Paso 1: Instalación y configuración

### Instalación

- Descargar Node.js: https://nodejs.org/es/download
- Instalar Angular 21: https://angular.dev/installation
- Comando recomendado:
  ```sh
  npm install -g @angular/cli@21
  ```
- Crear un nuevo proyecto Angular 21:
  ```sh
  ng new erpng --routing --style=scss --standalone --ssr=false --package-manager=npm --skip-git
  ```
  (Responde "no" a todas las preguntas adicionales)

---


## Paso 2: Fundamentos de Angular 21


### 2.1 Estructura de un proyecto Angular moderno

1. Explora la estructura de carpetas y archivos principales generados por Angular CLI:
  - `src/`: Código fuente de la app.
  - `src/app/`: Componentes, servicios y lógica principal.
  - `src/main.ts`: Punto de entrada de la app.
  - `angular.json`: Configuración del proyecto.
  - `package.json`: Dependencias y scripts.
  - `tsconfig.json`: Configuración de TypeScript.
2. Abre y revisa cada archivo para familiarizarte con su propósito.


#### 2.1.1 Entendiendo y simplificando los archivos clave

- **index.html**: Es la plantilla HTML raíz. Solo debe tener lo esencial, como el `<body>` con la etiqueta `<app-root>` (o el selector principal de tu app).
- **main.ts**: Es el punto de arranque de Angular. Aquí se hace el bootstrap del componente principal.
- **app.ts** (o `app.config.ts`, `app.routes.ts`): Define la configuración principal, rutas y lógica de arranque.
- **app.html**: Es la plantilla del componente raíz.

##### app.html (antes y después)

Ejemplo de un app.html generado por defecto (antes):
```html
<div class="container">
  <img src="...">
  <h1>Welcome to ng21training!</h1>
  <p>Congratulations! Your app is running.</p>
  <!-- Otros elementos, menús, enlaces, etc. -->
</div>
```

Deja solo lo mínimo funcional (después):
```html
<h1>Angular 21 Demo</h1>
<router-outlet></router-outlet>
```

**¿Qué hacer?**
1. Abre cada uno de estos archivos y revisa su contenido.
2. En `app.html`, elimina todo lo que no sea esencial para la estructura (puedes dejar solo el título y el `<router-outlet>`).
3. Observa cómo se conectan: `index.html` carga el selector raíz, `main.ts` arranca la app, y `app.html` es la vista principal.
4. Anota cualquier duda o hallazgo en el roadmap.

> Así tendrás una base limpia y clara para entender cómo Angular estructura y arranca una aplicación.

### 2.2 Uso de Standalone Components

1. ¿Qué son? Son componentes que no requieren estar declarados en un módulo (`NgModule`).
2. Ventajas: Simplifican la estructura, mejoran el lazy loading y reducen el boilerplate.
3. Crea un componente standalone para categorías:
  ```sh
  ng generate component categorias --standalone
  ```
  ```sh
  PS C:\ms1\ProyectosMS2026\ng21training>   ng generate component categorias --standalone
CREATE src/app/categorias/categorias.spec.ts (582 bytes)
CREATE src/app/categorias/categorias.ts (214 bytes)
CREATE src/app/categorias/categorias.scss (0 bytes)
CREATE src/app/categorias/categorias.html (26 bytes)
PS C:\ms1\ProyectosMS2026\ng21training>
  ```

4. Observa que el componente generado tiene `standalone: true` y no se declara en ningún módulo.
5. Usa el componente en tu app importándolo directamente en las rutas o en otros componentes standalone.

---

### 2.3 CRUD moderno de Categorías (Angular 21)

1. Agrega la ruta lazy para el componente:
   ```ts
   {
     path: 'categorias',
     loadComponent: () => import('./app/categorias/categorias').then(m => m.Categorias)
   }
   ```

2. En el componente `categorias`, implementa:
   - Listado de categorías (GET)
   - Crear nueva categoría (POST)
   - Editar categoría (PUT/PATCH)
   - Eliminar categoría (DELETE)
   - Usa signals para el estado local y HttpClient para las peticiones.
   - Solo usa RxJS si necesitas lógica reactiva avanzada.

#### Ejemplo antes y después (GET con signals)

**Antes (componente vacío):**
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-categorias',
  imports: [],
  templateUrl: './categorias.html',
  styleUrl: './categorias.scss',
})
export class Categorias {}
```

**Después (listado con signals y HttpClient):**
```ts
import { Component, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categorias.html',
  styleUrl: './categorias.scss',
})
export class Categorias {
  categorias = signal<any[]>([]);

  constructor(private http: HttpClient) {
    this.cargarCategorias();
  }

  cargarCategorias() {
    this.http.get<any[]>('http://localhost:7091/api/v1/categorias')
      .subscribe(data => this.categorias.set(data));
  }
}
```


**En la vista (categorias.html):**

Antes (solo placeholder):
```html
categorias works!
```

Después (listado real):
```html
<h2>Listado de categorías</h2>
<ul>
  <li *ngFor="let cat of categorias()">{{ cat.nombre }}</li>
</ul>
```

3. En la vista, muestra el listado y agrega formularios para crear/editar.

#### Ejemplo antes y después (Crear nueva categoría - POST)

**Antes (solo listado):**
```ts
// ...existing code...
// Solo método cargarCategorias() y signal categorias
```

**Después (agrega método crearCategoria):**
```ts
import { Component, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categorias.html',
  styleUrl: './categorias.scss',
})
export class Categorias {
  categorias = signal<any[]>([]);
  nuevaCategoria = signal<string>('');

  constructor(private http: HttpClient) {
    this.cargarCategorias();
  }

  cargarCategorias() {
    this.http.get<any[]>('http://localhost:7091/api/v1/categorias')
      .subscribe(data => this.categorias.set(data));
  }

  crearCategoria() {
    const nombre = this.nuevaCategoria();
    if (!nombre) return;
    this.http.post<any>('http://localhost:7091/api/v1/categorias', { nombre })
      .subscribe(() => {
        this.nuevaCategoria.set('');
        this.cargarCategorias();
      });
  }
}
```

**En la vista (categorias.html):**

Antes (solo listado):
```html
<h2>Listado de categorías</h2>
<ul>
  <li *ngFor="let cat of categorias()">{{ cat.nombre }}</li>
</ul>
```

Después (agrega formulario):
```html
<h2>Gestión de categorías</h2>
<form (ngSubmit)="editandoId ? guardarEdicion() : crearCategoria()">
  <table>
    <tr>
      <td>
        <input type="text" [(ngModel)]="formNombre" name="nombre" placeholder="Nombre de categoría" required>
      </td>
      <td>
        <input type="text" [(ngModel)]="formDescripcion" name="descripcion" placeholder="Descripción" required>
      </td>
      <td>
        <button type="submit">{{ editandoId ? 'Guardar' : 'Agregar' }}</button>
        <button *ngIf="editandoId" type="button" (click)="cancelarEdicion()">Cancelar</button>
      </td>
    </tr>
  </table>
</form>
<table>
  <thead>
    <tr>
      <th>ID</th>
      <th>Nombre</th>
      <th>Descripción</th>
      <th>Acciones</th>
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let cat of categorias()">
      <td>{{ cat.id }}</td>
      <td>{{ cat.nombre }}</td>
      <td>{{ cat.descripcion }}</td>
      <td>
        <button type="button" (click)="iniciarEdicion(cat)">Editar</button>
        <button type="button" (click)="eliminarCategoria(cat.id)">Eliminar</button>
      </td>
    </tr>
  </tbody>
</table>
```

4. Aplica buenas prácticas de Angular 21: standalone, signals, tipado estricto, sin NgModules.

---



### 2.4 Modularidad y Lazy Loading con rutas modernas

Ya aplicamos lazy loading y modularidad moderna usando componentes standalone. Por ejemplo, la ruta de categorías se define así:

```ts
{
  path: 'categorias',
  loadComponent: () => import('./app/categorias/categorias').then(m => m.Categorias)
}
```
Esto permite cargar el componente solo cuando se navega a esa ruta, sin necesidad de NgModules.

---


## Paso 3: Novedades clave de Angular 21

En el CRUD de categorías ya aplicamos varias novedades importantes:

- **Standalone components:** El CRUD de categorías se implementó como componente standalone, sin NgModule.
- **Signals:** Se usaron signals para el estado reactivo local (`categorias = signal<any[]>([])`).
- **Lazy loading:** Aplicado en las rutas con `loadComponent`.
- **HttpClient moderno:** Usado para consumir APIs REST.

**Pendiente de profundizar:**
- Control Flow Syntax (`if`, `for`, `switch` en plantillas)
- Inputs/Outputs mejorados y tipados estrictos
- Mejoras en el manejo de formularios reactivos

---

## Paso 4: Desarrollo moderno

- Estructura limpia: Código separado por componentes y archivos.
- Tipado estricto: (Pendiente de reforzar con interfaces y types en el CRUD).
- Pruebas: (Pendiente de agregar tests unitarios y de integración).
- Herramientas: (Pendiente de documentar uso de ESLint, Prettier, Angular DevTools).

---

## Paso 5: Consumo de APIs y manejo de estado

- Se usó HttpClient para consumir la API REST de categorías (GET, POST, PUT, DELETE).
- El estado local se maneja con signals, lo que permite reactividad y simplicidad.
- (Pendiente) Integrar librerías de estado avanzadas (NgRx Signals, RxJS solo si es necesario).

---

## Paso 6: Optimización y buenas prácticas

(Pendiente de desarrollo)

---


> Ve completando y anotando tus aprendizajes y dudas en cada sección.
