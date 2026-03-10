// content.js
(function() {
  'use strict';

  let darkModeEnabled = false;
  let styleElement = null;

  // Función para aplicar o quitar el filtro
  function applyDarkMode(enabled) {
    if (enabled) {
      if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.id = 'blogger-dark-mode-filter';
        styleElement.textContent = `
          /* Filtro global con inversión */
          body {
            filter: invert(1) hue-rotate(180deg) !important;
            background-color: #fff !important;
          }
          /* Restaurar imágenes para que no se vean invertidas */
          img {
            filter: invert(1) hue-rotate(180deg) !important;
          }
          /* Excluir el editor de código si es necesario? 
             Por ahora lo dejamos, pero podemos añadir una excepción */
          /* Si quieres que el editor no se vea afectado, puedes usar:
          .CodeMirror, [class*="code-mirror"] {
            filter: invert(1) hue-rotate(180deg) !important;
          }
          */
        `;
        document.documentElement.appendChild(styleElement);
      }
    } else {
      if (styleElement) {
        styleElement.remove();
        styleElement = null;
      }
    }
  }

  // Función para añadir URLs a las entradas
  function addPostUrls() {
    // Buscar contenedor de la lista de entradas
    const postList = document.querySelector('.post-list, .entry-list, [role="main"] .table, .blog-posts');
    if (!postList) return;

    const postRows = postList.querySelectorAll('tr, .post-item, .entry-item');
    postRows.forEach(row => {
      if (row.classList.contains('url-processed')) return;

      const titleLink = row.querySelector('a[href*="/posts/"]');
      if (!titleLink) return;

      let postUrl = titleLink.href;
      const isPublished = row.querySelector('.publish-icon, .status-published, [class*="published"]') !== null;

      const urlElement = document.createElement('div');
      urlElement.className = 'post-url-display';
      urlElement.style.marginTop = '4px';
      urlElement.style.fontSize = '12px';
      urlElement.style.fontFamily = 'monospace';

      if (isPublished) {
        const link = document.createElement('a');
        link.href = postUrl;
        link.textContent = postUrl;
        link.target = '_blank';
        link.style.color = '#1a73e8';
        link.style.textDecoration = 'none';
        link.style.wordBreak = 'break-all';
        urlElement.appendChild(link);
      } else {
        urlElement.textContent = postUrl;
        urlElement.style.color = '#5f6368';
      }

      titleLink.parentNode.insertBefore(urlElement, titleLink.nextSibling);
      row.classList.add('url-processed');
    });
  }

  // Inicializar: cargar preferencia y aplicar
  chrome.storage.sync.get('darkModeEnabled', function(data) {
    darkModeEnabled = data.darkModeEnabled !== false;
    applyDarkMode(darkModeEnabled);
  });

  // Escuchar mensajes del popup
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'toggleDarkMode') {
      darkModeEnabled = request.enabled;
      applyDarkMode(darkModeEnabled);
    }
  });

  // Añadir URLs cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addPostUrls);
  } else {
    addPostUrls();
  }

  // Observar cambios dinámicos (para cuando se navega por AJAX)
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.addedNodes.length) {
        addPostUrls();
      }
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });

})();