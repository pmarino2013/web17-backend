# Explicación del controlador `search.controller.js`

Este documento describe paso a paso cómo funciona el controlador `buscarProductos` para que los estudiantes entiendan el flujo y la lógica.

## Propósito

El controlador recibe un parámetro `termino` por la ruta y busca productos en la base de datos. Soporta búsqueda por _id_ (MongoDB ObjectId) y búsqueda por texto (campo `nombre`).

## Importaciones y utilidades

- `mongoose`: se usa para comprobar si el `termino` es un `ObjectId` válido con `mongoose.Types.ObjectId.isValid`.
- `Producto` (modelo): representa la colección de productos en MongoDB.

## Flujo del controlador

1. Extrae `termino` de `req.params`.
2. Comprueba si `termino` es un `ObjectId` válido:
   - Si es válido, realiza `Producto.findById(termino)` y devuelve el producto encontrado (si existe) dentro del array `results`.
   - Utiliza `.populate('categoria', 'nombre')` para reemplazar la referencia a `categoria` por el documento (o, aquí, solo el campo `nombre`) asociado.
3. Si `termino` no es un `ObjectId` válido, hace una búsqueda por texto:
   - Crea un `RegExp` insensible a mayúsculas/minúsculas con `new RegExp(termino, 'i')`.
   - Busca productos con `Producto.find({ nombre: regex, estado: true })` para obtener solo productos activos cuyo `nombre` coincida con el patrón.
   - Usa `populate('categoria', 'nombre')` para incluir el nombre de la categoría en los resultados.
4. Calcula `total` con `Producto.countDocuments({ nombre: regex, estado: true })` para obtener el número de coincidencias.
5. Responde con JSON que contiene `total` y `results` (lista de productos).

## Respuestas (forma esperada)

- Búsqueda por ID (encontrado):

  {
  "results": [ { /* objeto producto con campo categoria poblado */ } ]
  }

- Búsqueda por ID (no encontrado):

  {
  "results": []
  }

- Búsqueda por texto:

  {
  "total": 3,
  "results": [ /* array de productos que coinciden */ ]
  }

## Notas pedagógicas

- La comprobación `ObjectId.isValid(termino)` permite distinguir entre búsquedas directas por ID y búsquedas por texto, optimizando la consulta.
- `populate` es útil para mostrar datos relacionados (aquí la categoría) sin necesidad de hacer una consulta manual adicional.
- Filtrar por `estado: true` es una práctica común para excluir registros "eliminados" o inactivos en consultas públicas.
- `countDocuments` devuelve el total separado de los resultados; esto es útil cuando se quiere paginar o mostrar el número total de coincidencias.

## Ejemplo de uso (ruta)

Se espera que la ruta pase `termino` como parámetro URL. Ejemplo:

GET /api/search/rosas

o buscar por id:

GET /api/search/641a9f1b2c3d4e5f6a7b8c9d

---

Archivo explicado: `src/controllers/search.controller.js`
