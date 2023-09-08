
function addItem(type, item) {
  const data = JSON.parse(localStorage.getItem(type) || '[]');
  data.push(item);
  localStorage.setItem(type, JSON.stringify(data));
}

function deleteItem(type, item) {
  const data = JSON.parse(localStorage.getItem(type) || '[]');
  const index = data.findIndex(existingItem => JSON.stringify(existingItem) === JSON.stringify(item));
  if (index > -1) {
    if (confirm("Are you sure you want to do that? No backsies.")) {
      data.splice(index, 1);
      localStorage.setItem(type, JSON.stringify(data));
      alert("Item removed");
    }
  }
}

function displayAllData() {
  const allDataDiv = document.getElementById('allData');
  allDataDiv.innerHTML = ""; // Clear existing content

  ['bookmarks', 'notes', 'keys'].forEach(type => {
    const data = JSON.parse(localStorage.getItem(type) || '[]');
    let dataList;
    if (type === 'bookmarks') {
      dataList = data.map(item => `${item.description}: ${item.link}`).join('<br>');
    } else if (type === 'keys') {
      dataList = data.map(item => `${item.description}: ${item.key}`).join('<br>');
    } else {
      dataList = data.join('<br>');
    }
    allDataDiv.innerHTML += `<h3>${type.charAt(0).toUpperCase() + type.slice(1)}</h3><p>${dataList}</p>`;
  });
}

window.addEventListener("DOMContentLoaded", (event) => {
  displayAllData();
});

function saveToFile(storageKey, filename) {
    const data = JSON.parse(localStorage.getItem(storageKey) || '[]');
    const blob = new Blob([JSON.stringify(data)], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
}

function loadFromFile(storageKey, fileInputId) {
    document.getElementById(fileInputId).addEventListener("change", function () {
        const file = this.files[0];
        const reader = new FileReader();
        reader.onload = function () {
            const data = JSON.parse(this.result);
            localStorage.setItem(storageKey, JSON.stringify(data));
        };
        reader.readAsText(file);
    });
}


