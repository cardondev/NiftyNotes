document.addEventListener("DOMContentLoaded", function () {
  displayBookmarks();

  document.getElementById("bookmark-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const description = document.getElementById("bookmark-description").value;
    const link = document.getElementById("bookmark-link").value;

    if (description && link) {
      addItem("bookmarks", { description, link });
      displayBookmarks();
    }
  });
});

function displayBookmarks() {
  const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
  const table = document.getElementById("bookmarks-list");
  table.innerHTML = "<tr><th>Description</th><th>Link</th><th>Action</th></tr>";

  bookmarks.forEach((bookmark, index) => {
    const row = table.insertRow(-1);
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);

    cell1.innerHTML = bookmark.description;
    cell2.innerHTML = bookmark.link;
    cell3.innerHTML = `<button onclick="deleteBookmark(${index})">Delete</button>`;
  });
}

function deleteBookmark(index) {
  const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
  bookmarks.splice(index, 1);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  displayBookmarks();
}

