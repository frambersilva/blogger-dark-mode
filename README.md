# Blogger Dark Mode

Extensión para Chrome que aplica un modo oscuro global al panel de administración de Blogger, utilizando un filtro de inversión de colores. Incluye un elegante popup con diseño glass y guarda el estado localmente.

## Características

- 🌙 **Modo oscuro global** en todo el panel de Blogger (listas, editores, configuraciones).
- 🎨 **Diseño glass** en el popup, con efecto de desenfoque.
- 🔄 **Persistencia local**: el estado se guarda automáticamente y se recuerda entre sesiones.
- 🚀 **Ligera y rápida**: solo actúa en páginas de Blogger, sin ralentizar otras webs.
- 🛠️ **Respetuosa con el editor de código**: el editor de temas (CodeMirror) mantiene sus colores de sintaxis originales.

## Instalación

1. Descarga o clona este repositorio.
2. Abre Chrome y ve a `chrome://extensions/`.
3. Activa el **Modo desarrollador** (esquina superior derecha).
4. Haz clic en **Cargar extensión sin empaquetar** y selecciona la carpeta `blogger-dark-mode`.
5. ¡Listo! Verás el icono de la extensión en la barra de herramientas.

## Uso

- Haz clic en el icono de la extensión para abrir el popup.
- Usa el interruptor para activar o desactivar el modo oscuro.
- El cambio se aplica automáticamente a todas las pestañas de Blogger abiertas.
- La próxima vez que abras Blogger, recordará tu última preferencia.

## Estructura de archivos

- `manifest.json` – Configuración de la extensión.
- `popup.html` – Interfaz del popup con diseño glass.
- `popup.js` – Lógica del popup y comunicación con content.js.
- `content.js` – Script que inyecta el filtro oscuro en las páginas de Blogger.
- `icons/icon128.png` – Icono de la extensión (128x128).

## Personalización

Si deseas ajustar el filtro (por ejemplo, cambiar la intensidad), puedes modificar las reglas CSS dentro de `content.js`. Busca la sección donde se define `estiloDarkMode.textContent`.

## Compatibilidad

Probado en las últimas versiones de Chrome y en el panel clásico de Blogger. Si encuentras algún área que no se oscurezca correctamente, abre un issue o ajusta los selectores en el código.

## Licencia

Este proyecto está bajo la licencia MIT. Si lo usas, agradeceré una mención.
