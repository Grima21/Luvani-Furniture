# Luvani - E-Commerce Concept

Luvani es una aplicación web de comercio electrónico moderna, minimalista y totalmente responsiva. El proyecto pasó de una maquetación con datos estáticos a una arquitectura dinámica conectada a una base de datos en la nube, optimizando el rendimiento y la escalabilidad del lado del cliente.

## 🚀 Características Clave

- **Arquitectura Serverless:** Conexión directa con **Supabase** para la gestión de productos en tiempo real.
- **Custom Hooks Basados en Rendimiento:** Consumo de datos centralizado mediante el hook `useProductos()`, evitando peticiones HTTP redundantes.
- **Filtrado Dinámico en Memoria:** Optimización en el frontend mediante JavaScript (`.filter()`) para segmentar colecciones exclusivas o novedades ("New", "Exclusive") sin saturar la base de datos con consultas repetitivas.
- **Diseño UI/UX Responsivo:** Interfaz limpia y estilizada utilizando **Tailwind CSS** y un set de iconos dinámicos con **Lucide React**.

## 🛠️ Tecnologías Utilizadas

- **Frontend:** React, Vite, JavaScript (JS), Tailwind CSS
- **Backend como Servicio (BaaS):** Supabase (PostgreSQL)
- **Iconografía:** Lucide React

## 📦 Estructura del Proyecto (Lógica de Datos)

El flujo de información se maneja de manera centralizada para asegurar que la app sea escalable y fácil de mantener:

1. **Base de Datos (Supabase):** Tabla `productos` con columnas dinámicas como `badge`, `price`, `materials`, entre otras.
2. **Capa de Servicio/Hooks:** `useProductos.js` se encarga de hacer el `select("*")` de manera eficiente en un solo viaje por red.
3. **Componentes Inteligentes:** Componentes como `FeatureCollection` consumen el hook y aplican filtros optimizados en memoria para renderizar secciones específicas de la portada sin parpadeos visuales (`return null` si los datos aún no están listos).

---

Desarrollado con enfoque en rendimiento, escalabilidad y código limpio.
