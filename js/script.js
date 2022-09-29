const form = document.getElementById("generate-form");
const qr = document.getElementById("qrcode");

// Button submit
function onGenerateSubmit(e) {
  e.preventDefault();

  clearUI();

  const url = document.getElementById("url").value;
  const size = document.getElementById("size").value;

  // Validate url
  if (url === "") {
    alert("Please enter a URL");
  } else {
    showSpinner();
    // Show spinner for 1 sec
    setTimeout(() => {
      hideSpinner();
      generateQRCode(url, size);

      // Generate the save button after the qr code image src is ready
      setTimeout(() => {
        // Get save url
        const saveUrl = qr.querySelector("img").src;
        // Create save button
        createSaveBtn(saveUrl);
      }, 50);
    }, 1000);
  }
}

// Generate QR code
function generateQRCode(url, size) {
  const qrcode = new QRCode("qrcode", {
    text: url,
    width: size,
    height: size,
  });
}

// Clear QR code and save button
function clearUI() {
  qr.innerHTML = "";
  const saveBtn = document.getElementById("save-link");
  if (saveBtn) {
    saveBtn.remove();
  }
}

// Show spinner
function showSpinner() {
  const spinner = document.getElementById("spinner");
  spinner.style.display = "block";
}

// Hide spinner
function hideSpinner() {
  const spinner = document.getElementById("spinner");
  spinner.style.display = "none";
}

// Save button to download QR code as image
function createSaveBtn(saveUrl) {
  const link = document.createElement("a");
  link.id = "save-link";
  link.classList =
    "bg-red-500 hover:bg-red-700 text-white font-bold py-2 rounded w-1/3 m-auto my-5";
  link.href = saveUrl;
  link.download = "qrcode";
  link.innerHTML = "Spara bild";
  document.getElementById("generated").appendChild(link);
}

function createAnimations() {
  gsap.fromTo(
    "#ff-logo",
    { x: -100, opacity: 0 },
    { x: 0, opacity: 1, duration: 0.5 }
  );
  gsap.fromTo(
    "#header",
    { x: 100, opacity: 0 },
    { x: 0, opacity: 1, delay: 0.5 }
  );
  gsap.fromTo(
    "#qrlogo",
    { x: 500, opacity: 0 },
    { x: 0, opacity: 1, delay: 0.7, duration: 1 }
  );
  gsap.fromTo(
    "#content",
    { y: 200, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, delay: 1.5 }
  );
}
createAnimations();
hideSpinner();

form.addEventListener("submit", onGenerateSubmit);
