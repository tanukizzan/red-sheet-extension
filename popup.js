// Initialize button with user's preferred color
let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageBackgroundColor,
  });
});

// The body of this function will be executed as a content script inside the
// current page
function setPageBackgroundColor() {
  chrome.storage.sync.get("color", ({ color }) => {
    // document.body.style.backgroundColor = color;
    const redSheet = document.createElement('div');
    redSheet.style.backgroundColor = color;
    redSheet.style.height = '45%';
    redSheet.style.width = '100%';
    redSheet.style.position = 'fixed';
    redSheet.style.bottom = '0';
    redSheet.style.left = '0';
    document.body.insertAdjacentElement('beforeend', redSheet);
  });
}