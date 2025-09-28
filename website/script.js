// 🌿 QR Scanner simulation
function startScanner() {
  alert("📷 Scanner started (simulated)");
}

function stopScanner() {
  alert("🛑 Scanner stopped");
}

function simulateScan() {
  const result = document.getElementById("scan-result");
  result.innerText = "✅ QR Code Detected: ECO-2024-1247";
  result.classList.remove("hidden");
}

// 🌿 QR Code Generator
function generateQR() {
  let qrContainer = document.getElementById("qrcode");
  qrContainer.innerHTML = ""; // clear old QR
  let text = document.getElementById("qr-text").value;
  
  if (text.trim() === "") {
    alert("Please enter text to generate QR code");
    return;
  }

  new QRCode(qrContainer, {
    text: text,
    width: 200,
    height: 200,
  });
}

// 🌿 Global User Data
let userPoints = 1247;
let userBalance = 24.94;

// 🌿 Utility: Capitalize first letter
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// 🌿 Page Navigation
function showPage(page) {
  // Hide all pages
  document.querySelectorAll('.page-content').forEach(function(section) {
    section.classList.add('hidden');
  });

  // Show the selected page
  document.getElementById(page + '-page').classList.remove('hidden');
}

// 🌿 Rewards System
function earnPoints(type, points) {
  userPoints += points;
  userBalance += points * 0.02; // conversion rate: 50 pts = $1

  document.getElementById("user-points").innerText = userPoints;
  document.querySelector("#rewards-page h3:nth-child(2)").innerText = "$" + userBalance.toFixed(2);

  addActivityLog(type, points, 'earn');
  updateProfileStats();
}

function redeemPoints(points, amount) {
  if (userPoints < points) {
    alert("❌ Not enough points to redeem");
    return;
  }
  userPoints -= points;
  userBalance -= amount;

  addActivityLog('redeem', points, 'redeem', amount);

  document.getElementById("user-points").innerText = userPoints;
  document.querySelector("#rewards-page h3:nth-child(2)").innerText = "$" + userBalance.toFixed(2);
  updateProfileStats();
}

// 🌿 Update Profile Stats
function updateProfileStats() {
  document.getElementById("profile-points").innerText = userPoints;
  document.getElementById("profile-balance").innerText = "$" + userBalance.toFixed(2);
}

// 🌿 Update Profile Button
function updateProfile() {
  alert("✅ Profile updated successfully!");
}

// 🌿 Activity Log
function addActivityLog(type, points, action, amount = 0) {
  const log = document.getElementById("activity-log");
  const div = document.createElement("div");
  div.className = "flex items-center justify-between p-4 rounded-lg";

  if(action === 'earn') {
    div.classList.add("bg-green-50");
    div.innerHTML = `
      <div class="flex items-center">
        <div class="text-2xl mr-4">${type === 'recyclable' ? '♻' : type === 'compost' ? '🌱' : '🗑'}</div>
        <div>
          <p class="font-medium">${capitalize(type)} disposed correctly</p>
          <p class="text-sm text-gray-600">Just now</p>
        </div>
      </div>
      <div class="text-green-600 font-bold">+${points} points</div>
    `;
  } else if(action === 'redeem') {
    div.classList.add("bg-purple-50");
    div.innerHTML = `
      <div class="flex items-center">
        <div class="text-2xl mr-4">💰</div>
        <div>
          <p class="font-medium">Redeemed $${amount.toFixed(2)}</p>
          <p class="text-sm text-gray-600">Just now</p>
        </div>
      </div>
      <div class="text-red-600 font-bold">-${points} points</div>
    `;
  }

  log.prepend(div);
}

// 🌿 Handle Login
function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email && password) {
        alert(`Demo Login Successful!\n\nEmail: ${email}`);
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
        showPage('profile'); // Navigate to Profile
    } else {
        alert('Please enter both email and password!');
    }
}

// 🌿 Generate user-specific QR
function generateUserQR(userId) {
    const qrContainer = document.getElementById("user-qr");
    qrContainer.innerHTML = ""; // Clear any existing QR
    new QRCode(qrContainer, {
        text: `https://ecosort.com/reward?user=${userId}`,
        width: 200,
        height: 200,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });
}

// 🌿 Default Page on Load & QR Generation
document.addEventListener('DOMContentLoaded', () => {
  showPage('login'); // Show login page first
  generateUserQR(12345); // Generate QR for user
});