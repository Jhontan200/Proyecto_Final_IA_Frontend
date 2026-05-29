const BASE_URL = import.meta.env.VITE_API_URL; // http://127.0.0.1:8000/api

export const API = {
  // Consulta la raíz absoluta del backend (http://127.0.0.1:8000/)
  async verificarEstado() {
    // Removemos temporalmente '/api' para pegarle al endpoint raíz de FastAPI
    const ROOT_URL = BASE_URL.replace('/api', '');

    const response = await fetch(`${ROOT_URL}/`);
    if (!response.ok) throw new Error("Fallo en la comunicación con el servidor");
    return await response.json();
  },
  async login(correo, contrasena) {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correo, contrasena })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.detail || "Error en el login");
    return data;
  },
  async registro(nombre, correo, contrasena) {
    const response = await fetch(`${BASE_URL}/registro`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, correo, contrasena })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.detail || "Error en el registro");
    return data;
  },

  async obtenerFormulario() {
    const response = await fetch(`${BASE_URL}/formulario`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.detail || "Error al obtener formulario");
    return data;
  },

  async obtenerRecomendaciones(respuestas) {
    const response = await fetch(`${BASE_URL}/recomendar`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(respuestas)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.detail || "Error en la inferencia");
    return data; // Retorna { recomendaciones: [...] }
  }
};