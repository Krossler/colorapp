🎨 API CRUD de Colores

Esta API te permite gestionar una lista de colores con operaciones CRUD (Crear, Leer, Actualizar y Eliminar) en una base de datos MongoDB.


🛡️ Validación

Esta API incluye sistemas de validación para las solicitudes POST y PUT. Los códigos de colores insertados en el formulario deben ser códigos HEX válidos. Si el código no cumple con este formato, la inserción se rechazará.

Además, si el color ya existe en la base de datos, la inserción o actualización también se rechazará.

🚀 Tecnologías

Node.js

Express.js

MongoDB

Mongoose

Cors
