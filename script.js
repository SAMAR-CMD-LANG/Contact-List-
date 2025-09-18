let contacts = [
  { name: "Sharan", phone: "123-456-7890" },
  { name: "Samarjith", phone: "987-654-3210" },
  { name: "lokesh", phone: "555-555-5555" },
  { name: "Gugan", phone: "444-444-4444" },
];

// --- Utility functions ---
function searchContacts(query, list = contacts) {
  const q = String(query).trim().toLowerCase();
  if (q === "") return list;
  return list.filter((contact) =>
    (contact.name || "").toLowerCase().includes(q)
  );
}

function countContactsByFirstLetter(list = contacts) {
  return list.reduce((acc, contact) => {
    const rawName = (contact.name || "").trim();
    const firstLetter = rawName[0] ? rawName[0].toUpperCase() : "#";
    acc[firstLetter] = (acc[firstLetter] ?? 0) + 1;
    return acc;
  }, {});
}

// --- Rendering functions ---
function renderTable(list) {
  const tbody = document.getElementById("contactTableBody");
  tbody.innerHTML = "";
  if (list.length === 0) {
    tbody.innerHTML = `<tr><td colspan="2">No contacts found.</td></tr>`;
    return;
  }
  list.forEach((c) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${(c.name || "").trim()}</td><td>${c.phone || ""}</td>`;
    tbody.appendChild(tr);
  });
}

function renderCounts(list) {
  const counts = countContactsByFirstLetter(list);
  const countsEl = document.getElementById("counts");
  countsEl.innerHTML = "";
  Object.keys(counts)
    .sort()
    .forEach((letter) => {
      const span = document.createElement("span");
      span.textContent = `${letter}: ${counts[letter]}`;
      countsEl.appendChild(span);
    });
}

function renderAll(list = contacts) {
  renderTable(list);
  renderCounts(list);
}

// --- Event listeners ---
document.getElementById("addBtn").addEventListener("click", () => {
  const name = document.getElementById("nameInput").value.trim();
  const phone = document.getElementById("phoneInput").value.trim();
  if (!name) {
    alert("Please enter a name.");
    return;
  }
  contacts.push({ name, phone });
  document.getElementById("nameInput").value = "";
  document.getElementById("phoneInput").value = "";
  renderAll(contacts);
});

document.getElementById("searchInput").addEventListener("input", (e) => {
  const query = e.target.value;
  const filtered = searchContacts(query);
  renderAll(filtered);
});

// --- Initial render ---
renderAll(contacts);
