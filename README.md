CRUD-TASK

Este es un proyecto Angular v19 para la gestión de tareas mediante un CRUD (Create, Read, Update, Delete).

Requisitos previos

Antes de instalar y ejecutar el proyecto, asegúrate de tener instalado lo siguiente:

Node.js (versión recomendada: 18)

Angular CLI (puedes instalarlo con npm install -g @angular/cli)

Instalación

Clona el repositorio o descarga el código fuente:

git clone https://github.com/casalazar562/crud-task-front.git
cd crud-task-front

Instala las dependencias del proyecto:

npm install

Ejecución del proyecto

Para ejecutar el proyecto en modo desarrollo, usa el siguiente comando:

ng serve

Luego, abre tu navegador y accede a http://localhost:4200/.

Construcción para producción

Si deseas generar una versión optimizada para producción, ejecuta:

ng build --configuration=production

Los archivos generados estarán en la carpeta dist/.

Estructura del Proyecto

El proyecto sigue una arquitectura modular. Aquí hay una breve descripción de las carpetas principales:

src/app/core/: Contiene servicios y configuraciones globales.

src/app/features/tasks/: Módulo de tareas con sus respectivos componentes.

src/app/models/: Modelos de datos utilizados en el proyecto.

src/app/environments/: Configuraciones para diferentes entornos (environment.ts, environment.prod.ts).

