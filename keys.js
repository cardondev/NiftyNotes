document.addEventListener("DOMContentLoaded", function () {
  displayKeys();

  document.getElementById("key-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const description = document.getElementById("key-description").value;
    const value = document.getElementById("key-value").value;

    if (description && value) {
      addItem("keys", { description, value });
      displayKeys();
    }
  });
});

function displayKeys() {
  const keys = JSON.parse(localStorage.getItem("keys") || "[]");
  const table = document.getElementById("keys-list");
  table.innerHTML = "<tr><th>Description</th><th>Key</th><th>Action</th></tr>";

  keys.forEach((keyItem, index) => {
    const row = table.insertRow(-1);
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);

    cell1.innerHTML = keyItem.description;
    cell2.innerHTML = keyItem.value;
    cell3.innerHTML = `<button onclick="deleteKey(${index})">Delete</button>`;

  });
}

function deleteKey(index) {
  const keys = JSON.parse(localStorage.getItem("keys") || "[]");
  keys.splice(index, 1);
  localStorage.setItem("keys", JSON.stringify(keys));
  displayKeys();
}
