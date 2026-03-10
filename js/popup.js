// popup.js
document.addEventListener('DOMContentLoaded', function() {
  const toggle = document.getElementById('darkModeToggle');
  const status = document.getElementById('status');

  // Cargar estado actual
  chrome.storage.sync.get('darkModeEnabled', function(data) {
    const enabled = data.darkModeEnabled !== false; // por defecto true
    toggle.checked = enabled;
    status.textContent = enabled ? 'Activado' : 'Desactivado';
  });

  // Guardar cambios
  toggle.addEventListener('change', function() {
    const enabled = toggle.checked;
    chrome.storage.sync.set({ darkModeEnabled: enabled }, function() {
      status.textContent = enabled ? 'Activado' : 'Desactivado';
      // Enviar mensaje a la pestaña activa para actualizar sin recargar
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        if (tabs[0]) {
          chrome.tabs.sendMessage(tabs[0].id, { action: 'toggleDarkMode', enabled: enabled });
        }
      });
    });
  });
});