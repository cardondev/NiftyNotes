document.addEventListener("DOMContentLoaded", function () {
  displayLatest("bookmarks", "latest-bookmarks");
  displayLatest("notes", "latest-notes");
  displayLatest("keys", "latest-keys");
});

function displayLatest(storageKey, tableId) {
  const items = JSON.parse(localStorage.getItem(storageKey) || "[]").slice(-5).reverse();
  const table = document.getElementById(tableId);
  table.innerHTML = "";

  const header = table.createTHead().insertRow();
  Object.keys(items[0] || {}).forEach(key => {
    const cell = header.insertCell();
    cell.innerHTML = key;
  });
  
  items.forEach(item => {
    const row = table.insertRow();
    Object.values(item).forEach(value => {
      const cell = row.insertCell();
      cell.innerHTML = value;
    });
  });
}
