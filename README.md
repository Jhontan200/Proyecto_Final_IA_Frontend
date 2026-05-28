# SBC + SMA Celulares - Frontend Client 📱✨

Este repositorio contiene el cliente web independiente y modular diseñado bajo la filosofía de **Arquitectura Atómica** en JavaScript Vanilla. Está empaquetado de forma óptima con **Vite** e integrado de manera nativa con **Tailwind CSS v4** para interactuar asíncronamente con el backend de Inteligencia Artificial Híbrida (Sistema Basado en Conocimiento + Sistema Multiagente).

---

## 🚀 Requisitos de Entorno

Antes de inicializar el proyecto de forma local, asegúrate de tener instalados los siguientes componentes globales en tu máquina de desarrollo:

* **Node.js** (Versión 20.x o superior recomendada)
* **npm** (Instalado automáticamente junto con Node.js)
* **Git Bash** (Entorno de terminal recomendado para Windows)

---

## 🛠️ Instalación y Configuración

Sigue estos pasos en orden para clonar el repositorio y configurar tus variables de entorno:

1. **Clonar el repositorio independiente:**
   ```bash
   git clone [https://github.com/Jhontan200/Proyecto_Final_IA_Frontend.git](https://github.com/Jhontan200/Proyecto_Final_IA_Frontend.git)
   cd Proyecto_Final_IA_Frontend
   ```

2. **Instalar el árbol de dependencias oficiales:**
   ```bash
   npm install
   ```

3. **Configurar Variables de Entorno (.env):**
   Crea un archivo llamado `.env` en la raíz absoluta del proyecto (este archivo está protegido por `.gitignore` y jamás debe subirse a ramas públicas). Configura la URL local de la API de FastAPI:
   ```text
   VITE_API_URL=[http://127.0.0.1:8000/api](http://127.0.0.1:8000/api)
   ```

4. **Configurar el Entorno de Producción (.env.production):**
   Crea un archivo hermano llamado `.env.production` en la raíz para preparar el canal de datos de cara al despliegue oficial en la nube:
   ```text
   VITE_API_URL=[https://tu-backend-desplegado.onrender.com/api](https://tu-backend-desplegado.onrender.com/api)
   ```

---

## 💻 Comandos de Ejecución

El ciclo de vida del desarrollo y empaquetado de la aplicación se gestiona con los scripts nativos de Vite:

* **Levantar el Servidor de Desarrollo Local:**
   ```bash
   npm run dev
   ```
   *Vite compilará el entorno instantáneamente en caliente entregándote la dirección local de escucha (por defecto `http://localhost:5173`).*

* **Compilar el Proyecto para Producción (Build):**
   ```bash
   npm run build
   ```
   *Genera una compilación optimizada, minificada y purgada de clases CSS desutilizadas dentro de la carpeta `dist/`, lista para desplegarse con un clic en Vercel, Netlify o Railway.*

* **Previsualizar la Compilación Local de Producción:**
   ```bash
   npm run preview
   ```

---

## 🏗️ Estándares de Arquitectura y Estilo de Código

Para garantizar un mantenimiento limpio, desacoplado y de nivel profesional en nuestro proyecto de ingeniería de sistemas, todo el equipo técnico debe cumplir rigurosamente las siguientes directrices:

1. **Regla de Modularidad Estricta:** Ningún archivo de código fuente (`.js`, `.css`) bajo ninguna circunstancia debe superar las **100 líneas de código**. Si la lógica o maquetación de un componente crece demasiado, está estrictamente obligado a subdividirse en subcomponentes atómicos independientes.
2. **Uso Exclusivo de Módulos ES6:** Toda la comunicación entre capas lógicas debe realizarse mediante importaciones y exportaciones nativas (`import` / `export`), manteniendo activada la propiedad `"type": "module"` en el manifiesto `package.json`.
3. **Separación Absoluta de Responsabilidades (Router Puro):** El archivo enrutador central (`src/main.js`) funciona puramente como un despachador de estados lógicos y navegación de rutas globales. **Queda estrictamente prohibido inyectar o maquetar estructuras HTML fijas dentro del main.** Toda la interfaz visual debe delegarse a componentes modulares aislados en la carpeta `src/components/`.
4. **Capa de Red Centralizada (`src/services/api.js`):** Ningún componente visual puede realizar peticiones `fetch` directamente. Todas las interacciones con los endpoints lógicos de la IA de FastAPI deben registrarse en el archivo centralizado de servicios usando variables de entorno dinámicas.
5. **Estética Visual Premium:** Se aplica una línea de diseño *Premium Dark* minimalista y sofisticada. La inicialización estética se unifica bajo el nuevo motor de **Tailwind CSS v4** mediante una única importación limpia de estilo `@import "tailwindcss";`, prescindiendo de archivos de configuración redundantes.

---

## 🛡️ Control de Fallos en Red (Defensive Programming)

El cliente web implementa un enrutamiento defensivo inteligente. En caso de inicializar el Frontend sin que la API local esté activa, la aplicación aislará el error de inmediato y renderizará una interfaz de diagnóstico especial indicando al equipo los dos comandos exactos para revivir el servidor de Python:

```bash
source venv/Scripts/activate
uvicorn main:app --reload
```