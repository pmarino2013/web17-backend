# Server Basic - Proyecto Backend con Express y MongoDB

## 📋 Resumen del Proyecto

Este es un proyecto de servidor backend básico desarrollado con **Node.js**, **Express** y **MongoDB** (usando Mongoose). El proyecto implementa una API REST para gestionar tareas (tasks), demostrando los conceptos fundamentales de desarrollo backend.

### Características principales:
- ✅ Servidor Express configurado
- ✅ Conexión a base de datos MongoDB
- ✅ Modelo de datos con Mongoose
- ✅ Rutas API RESTful
- ✅ Servidor de archivos estáticos

---

## 📁 Estructura de Carpetas

```
server-basic/
│
├── index.js                 # Archivo principal con ejemplos básicos de Express
├── package.json             # Configuración del proyecto y dependencias
├── package-lock.json        # Lock file de dependencias
│
├── public/                  # Archivos estáticos (HTML, CSS, JS del frontend)
│   └── index.html          # Página HTML estática
│
└── src/                     # Código fuente principal
    ├── app.js              # Configuración principal de la aplicación Express
    │
    ├── config/             # Configuraciones del proyecto
    │   └── db.js           # Configuración de conexión a MongoDB
    │
    ├── models/             # Modelos de datos (Mongoose Schemas)
    │   └── task.js         # Modelo de la entidad Task
    │
    ├── routes/             # Definición de rutas de la API
    │   └── taskRoutes.js   # Rutas relacionadas con las tareas
    │
    ├── controllers/        # Controladores (lógica de negocio) - Vacío por ahora
    │
    └── middlewares/        # Middlewares personalizados - Vacío por ahora
```

---

## 📄 Descripción de Archivos

### Archivos Raíz

#### `index.js`
Archivo que contiene ejemplos básicos de Express para aprender los conceptos fundamentales. Incluye:
- Configuración de un servidor Express
- Servidor de archivos estáticos
- Ejemplos de rutas GET, POST, PUT y DELETE
- Manejo de parámetros de ruta y body de peticiones

**Nota:** Este archivo parece ser un archivo de aprendizaje. La aplicación principal está en `src/app.js`.

#### `package.json`
Archivo de configuración del proyecto Node.js que contiene:
- Nombre y versión del proyecto
- Dependencias principales: `express` y `mongoose`
- Scripts disponibles: `dev` (para desarrollo con watch mode)
- Configuración de módulos ES6 (`"type": "module"`)

---

### Carpeta `src/`

#### `src/app.js`
**Archivo principal de la aplicación.** Aquí se configura:
- La instancia de Express
- Las rutas de la API (`/api/tasks`)
- La conexión a la base de datos MongoDB
- El puerto del servidor (4500)

Este es el punto de entrada de la aplicación cuando se ejecuta desde `src/`.

---

### Carpeta `src/config/`

#### `src/config/db.js`
Módulo que maneja la conexión a MongoDB:
- Define la URI de conexión a MongoDB Atlas
- Exporta la función `dbConnect()` que establece la conexión
- Maneja errores de conexión con try-catch

**⚠️ Importante:** En un proyecto real, la URI de conexión debería estar en variables de entorno por seguridad.

---

### Carpeta `src/models/`

#### `src/models/task.js`
Define el esquema y modelo de Mongoose para la entidad **Task**:
- **title**: Título de la tarea (requerido)
- **description**: Descripción de la tarea (opcional, por defecto vacío)
- **completed**: Estado de completado (booleano, por defecto `false`)
- **createdAt**: Fecha de creación (se asigna automáticamente)

Este modelo permite interactuar con la colección de tareas en MongoDB.

---

### Carpeta `src/routes/`

#### `src/routes/taskRoutes.js`
Define las rutas relacionadas con las tareas:
- **GET `/`**: Obtiene todas las tareas de la base de datos
- Manejo de errores con try-catch
- Retorna respuestas JSON

**Ruta completa:** `/api/tasks` (definida en `app.js`)

---

### Carpeta `public/`

#### `public/index.html`
Página HTML estática simple que se sirve cuando se accede a la raíz del servidor. Contiene una estructura básica HTML5.

---

### Carpetas Vacías

#### `src/controllers/`
Carpeta destinada a contener los controladores. Los controladores separan la lógica de negocio de las rutas, siguiendo el patrón MVC (Model-View-Controller).

#### `src/middlewares/`
Carpeta para middlewares personalizados. Los middlewares son funciones que se ejecutan entre la petición y la respuesta, útiles para:
- Autenticación
- Validación de datos
- Logging
- Manejo de errores

---

## 🚀 Cómo Usar el Proyecto

### Instalación

1. Instalar las dependencias:
```bash
npm install
```

### Ejecución

Para ejecutar el servidor en modo desarrollo (con watch mode):
```bash
npm run dev
```

El servidor estará disponible en: `http://localhost:4500`

### Endpoints Disponibles

- **GET** `/api/tasks` - Obtener todas las tareas
- **GET** `/` - Página HTML estática

---

## 🎓 Conceptos para Estudiantes

### Arquitectura del Proyecto

Este proyecto sigue una **arquitectura por capas**:

1. **Capa de Rutas** (`routes/`): Define los endpoints de la API
2. **Capa de Controladores** (`controllers/`): Contiene la lógica de negocio (aún por implementar)
3. **Capa de Modelos** (`models/`): Define la estructura de datos
4. **Capa de Configuración** (`config/`): Configuraciones del sistema

### Tecnologías Utilizadas

- **Express.js**: Framework web para Node.js que simplifica la creación de APIs
- **Mongoose**: ODM (Object Document Mapper) para MongoDB que facilita el trabajo con la base de datos
- **MongoDB**: Base de datos NoSQL orientada a documentos

### Buenas Prácticas Implementadas

✅ Separación de responsabilidades (rutas, modelos, configuración)  
✅ Uso de módulos ES6 (import/export)  
✅ Manejo de errores con try-catch  
✅ Estructura de carpetas organizada y escalable

### Mejoras Futuras Sugeridas

- [ ] Implementar controladores para separar la lógica de las rutas
- [ ] Agregar validación de datos con middlewares
- [ ] Implementar más operaciones CRUD (POST, PUT, DELETE para tasks)
- [ ] Usar variables de entorno para configuración sensible
- [ ] Agregar autenticación y autorización
- [ ] Implementar manejo de errores centralizado

---

## 📚 Recursos de Aprendizaje

- [Documentación de Express](https://expressjs.com/)
- [Documentación de Mongoose](https://mongoosejs.com/)
- [Documentación de MongoDB](https://www.mongodb.com/docs/)

---

## 👨‍💻 Autor
Pablo Marino

Proyecto educativo para aprendizaje de desarrollo backend.

