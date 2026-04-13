# Tokyo Ghoul Database

Una aplicación full-stack de gestión de datos de personajes de Tokyo Ghoul, desarrollada con React, Node.js y Sequelize ORM.

## Descripción del Proyecto

Esta es una base de datos interactiva que permite:
- **Crear** nuevos personajes con información detallada
- **Leer** y visualizar todos los personajes en una interfaz intuitiva
- **Actualizar** información de personajes existentes
- **Eliminar** personajes de la base de datos
- **Filtrar** personajes por tipo (Ghouls/Humanos)
- **Buscar** personajes por nombre o descripción

### Características Principales
- Interfaz moderna con diseño geométrico RGB cyberpunk
- Búsqueda en tiempo real
- Filtros por tipo de personaje
- Diseño responsivo
- Modales para crear, editar y visualizar detalles
- Validación de datos completa
- Manejo robusto de errores

## Estructura de Datos

### Tabla `Characters`
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | INTEGER (PK) | Identificador único |
| name | STRING | Nombre del personaje |
| age | INTEGER | Edad |
| gender | STRING | Género |
| status | STRING | Estado (Vivo, Fallecido, etc.) |
| is_ghoul | BOOLEAN | ¿Es un Ghoul? |
| image | STRING (URL) | URL de imagen |
| kagune | STRING | Tipo de Kagune (si aplica) |
| quinque | STRING | Tipo de Quinque (si aplica) |
| description | TEXT | Descripción del personaje |
| createdAt | TIMESTAMP | Fecha de creación |
| updatedAt | TIMESTAMP | Fecha de actualización |

## Instalación y Configuración

### Requisitos Previos
- Node.js (v14 o superior)
- npm o yarn
- MySQL o PostgreSQL
- Git

### Pasos de Instalación

#### 1. Clonar el Repositorio
```bash
git clone <tu-repo-url>
cd react_tps
```

#### 2. Configurar el Backend

```bash
cd backend
npm install
```

**Crear archivo `.env` en la carpeta `backend`:**
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=tokyo_ghoul_db
DB_PORT=3306
NODE_ENV=development
PORT=3000
```

**Inicializar la base de datos:**
```bash
npm run db:sync
```

**Iniciar el servidor:**
```bash
npm start
```
El backend estará disponible en `http://localhost:3000`

#### 3. Configurar el Frontend

```bash
cd ../front
npm install
npm run dev
```

El frontend estará disponible en `http://localhost:5173`

## API Endpoints

### Personajes

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/characters` | Obtener todos los personajes |
| GET | `/api/characters/:id` | Obtener un personaje específico |
| POST | `/api/characters` | Crear nuevo personaje |
| PUT | `/api/characters/:id` | Actualizar un personaje |
| DELETE | `/api/characters/:id` | Eliminar un personaje |

### Ejemplo de POST
```javascript
POST /api/characters
{
  "name": "Kaneki Ken",
  "age": 18,
  "gender": "Masculino",
  "status": "Vivo",
  "is_ghoul": true,
  "image": "https://...",
  "kagune": "Rinkaku",
  "quinque": "Arata",
  "description": "Protagonista principal..."
}
```

## Estructura del Proyecto

```
react_tps/
├── backend/
│   ├── src/
│   │   ├── config/          # Configuración de BD
│   │   ├── controllers/     # Lógica de negocio
│   │   ├── models/          # Modelos Sequelize
│   │   ├── routes/          # Rutas API
│   │   └── middlewares/     # Validadores
│   ├── app.js              # Configuración Express
│   └── package.json
│
├── front/
│   ├── src/
│   │   ├── components/     # Componentes React
│   │   ├── hooks/          # Custom hooks
│   │   ├── App.jsx         # Componente principal
│   │   └── main.jsx
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

## Tecnologías Utilizadas

### Frontend
- **React.js** - Librería UI
- **Vite** - Build tool
- **CSS3** - Estilos personalizados

### Backend
- **Node.js** - Runtime
- **Express.js** - Framework web
- **Sequelize** - ORM para BD
- **MySQL/PostgreSQL** - Base de datos

## Scripts Disponibles

### Backend
```bash
npm start          # Inicia el servidor
npm run db:sync    # Sincroniza modelos con BD
```

### Frontend
```bash
npm run dev        # Inicia servidor de desarrollo
npm run build      # Crea build de producción
npm run preview    # Previsualiza build
```

## Validaciones

- **Campos requeridos**: name, age, gender, status, is_ghoul
- **Validación de edad**: Solo números enteros positivos
- **Validación de URLs**: Las imágenes deben ser URLs válidas
- **Eliminación confirmada**: Se requiere confirmación antes de eliminar

## Manejo de Errores

La aplicación maneja los siguientes códigos HTTP:
- `200` - Éxito
- `400` - Datos inválidos
- `404` - Personaje no encontrado
- `500` - Error del servidor

## Funcionalidades Principales

### Crear Personaje
1. Click en "+ NUEVO REGISTRO"
2. Rellenar formulario con información
3. Click en "GUARDAR"

### Editar Personaje
1. Click en tarjeta de personaje
2. Click en botón "EDITAR"
3. Modificar campos necesarios
4. Click en "GUARDAR CAMBIOS"

### Eliminar Personaje
1. Click en tarjeta de personaje
2. Click en botón "ELIMINAR"
3. Confirmar eliminación

### Buscar y Filtrar
- **Búsqueda**: Escribe en barra de búsqueda por nombre o descripción
- **Filtros**: Usa botones (TODOS, GHOULS, HUMANOS) para filtrar por tipo

## Interfaz

- **Navbar**: Encabezado con diseño geométrico RGB
- **SearchBar**: Búsqueda en tiempo real
- **FilterButtons**: Botones para filtrar por tipo
- **CharacterCards**: Tarjetas con información de personajes
- **Modales**: Formularios para crear, editar y eliminar

## Troubleshooting

### Error: "Cannot connect to database"
- Verificar que MySQL/PostgreSQL esté corriendo
- Revisar credenciales en `.env`
- Confirmar que la base de datos existe

### Error: "Port 3000 already in use"
```bash
# En Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# En Linux/Mac
lsof -ti:3000 | xargs kill -9
```

### El frontend no se conecta al backend
- Verificar que backend esté corriendo en puerto 3000
- Revisar CORS en configuración de Express
- Abrir consola del navegador para ver errores específicos

### Capturas de pantalla
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/2c08f8db-2983-43fb-8cf8-31421629ab32" />
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/1b21d7dc-9073-4d88-9938-0e21e26a8b5d" />
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/72993b6c-6d23-422c-9c4c-9827fafd4f8d" />



