const okrList = document.getElementById("okrs-container");
const createForm = document.getElementById("create-okr-form");
const userSelect = document.getElementById("user-select");

// Mock users - Ideally fetched from server
const users = [
  { id: 1, name: "Alice (Team A)" },
  { id: 2, name: "Bob (Team B)" }
];

// Populate user select dropdown
users.forEach(user => {
  const opt = document.createElement("option");
  opt.value = user.id;
  opt.textContent = user.name;
  userSelect.appendChild(opt);
});

// OKRs array
let okrs = [];

// Handle form submission
createForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("okr-title").value;
  const keyResult = document.getElementById("okr-key-result").value;
  const userId = userSelect.value;

  const okr = {
    id: Date.now(),
    title,
    keyResult,
    userId
  };

  okrs.push(okr);
  renderOKRs();
  createForm.reset();
});

// Render OKRs
function renderOKRs() {
  okrList.innerHTML = "";
  okrs.forEach(okr => {
    const user = users.find(u => u.id == okr.userId);
    const li = document.createElement("li");
    li.className = "okr-item";
    li.innerHTML = `
      <strong>${okr.title}</strong><br/>
      Key Result: ${okr.keyResult}<br/>
      Assigned to: ${user.name}<br/>
      <button onclick="deleteOKR(${okr.id})">Delete</button>
    `;
    okrList.appendChild(li);
  });
}

// Delete OKR
function deleteOKR(id) {
  okrs = okrs.filter(okr => okr.id !== id);
  renderOKRs();
}
