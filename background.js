let color = 'rgba(255, 0, 0, 0.9)';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
});