// background.js
chrome.runtime.onInstalled.addListener(() => {
  // Establecer un valor por defecto
  chrome.storage.sync.set({ darkModeEnabled: true });
});