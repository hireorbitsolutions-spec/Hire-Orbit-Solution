function toggleMenu() {
    const nav = document.getElementById("navMenu");

    nav.classList.toggle("active");
}


// Close mobile menu after clicking a link

document.querySelectorAll("#navMenu a").forEach(link => {

    link.addEventListener("click", () => {

        document
            .getElementById("navMenu")
            .classList.remove("active");

    });

});

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzalV7qJgD-OD7HnYPZ0g0aeoGMnumzH6cdllhQRgA0dpXPakN52s6W0S17u-wjjce-pQ/exec";


const nav = document.querySelector(".nav");

document.getElementById("menuBtn").addEventListener("click", () => {
  nav.classList.toggle("open");
});

document.querySelectorAll("nav a").forEach(a =>
  a.addEventListener("click", () => nav.classList.remove("open"))
);


function openForm(type) {

  const modal = document.getElementById("formModal");
  const eyebrow = document.getElementById("formEyebrow");
  const title = document.getElementById("formTitle");
  const intro = document.getElementById("formIntro");
  const companyLabel = document.getElementById("companyLabel");
  const roleLabel = document.getElementById("roleLabel");
  const role = document.getElementById("role");
  const messageLabel = document.getElementById("messageLabel");

  document.getElementById("formType").value = type;

  document.getElementById("leadForm").style.display = "block";
  document.getElementById("success").style.display = "none";

  document.getElementById("leadForm").reset();


  if (type === "candidate") {

    document.getElementById("company").required = false;

    eyebrow.textContent = "FOR CANDIDATES";

    title.textContent = "Candidate Registration";

    intro.textContent =
      "Share your details and we will review your profile for suitable opportunities.";

    companyLabel.classList.add("hidden");

    roleLabel.firstChild.textContent = "Skills / Preferred Role";

    role.placeholder =
      "Example: Software Developer, JavaScript, 3 years experience";

    messageLabel.classList.remove("hidden");

  } else {

    eyebrow.textContent = "FOR COMPANIES";

    title.textContent = "Hiring Requirement";

    intro.textContent =
      "Tell us what you need to hire and our team can contact you.";

    companyLabel.classList.remove("hidden");

    document.getElementById("company").required = true;

    roleLabel.firstChild.textContent =
      "Position / Hiring Requirement";

    role.placeholder =
      "Example: 5 Sales Executives, 2+ years experience, Hyderabad";

    messageLabel.classList.remove("hidden");
  }

  modal.classList.add("show");
}


function closeForm() {
  document.getElementById("formModal").classList.remove("show");
}


document.getElementById("formModal").addEventListener("click", e => {

  if (e.target.id === "formModal") {
    closeForm();
  }

});


document.getElementById("leadForm").addEventListener("submit", async e => {

  e.preventDefault();

  const form = document.getElementById("leadForm");

  const type = document.getElementById("formType").value;

  const data = {

    type: type,

    name: document
      .getElementById("name")
      .value
      .trim(),

    email: document
      .getElementById("email")
      .value
      .trim(),

    phone: document
      .getElementById("phone")
      .value
      .trim(),

    company: document
      .getElementById("company")
      .value
      .trim(),

    role: document
      .getElementById("role")
      .value
      .trim(),

    message: document
      .getElementById("message")
      .value
      .trim()
  };


  const success = document.getElementById("success");

  const submitButton =
    form.querySelector("button[type='submit']");


  submitButton.disabled = true;

  submitButton.textContent = "Submitting...";


  try {

    await fetch(GOOGLE_SCRIPT_URL, {

      method: "POST",

      mode: "no-cors",

      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },

      body: JSON.stringify(data)

    });


    form.style.display = "none";

    success.style.display = "block";


    if (type === "candidate") {

      success.innerHTML = `
        <strong>Thank you, ${data.name}!</strong>
        Your candidate registration has been received.
        Hire Orbit Solutions will contact you regarding suitable opportunities.
      `;

    } else {

      success.innerHTML = `
        <strong>Thank you, ${data.name}!</strong>
        Your hiring requirement has been received.
        Hire Orbit Solutions will contact you regarding your recruitment requirement.
      `;

    }


  } catch (error) {

    console.error(error);

    submitButton.disabled = false;

    submitButton.textContent = "Submit Details";

    success.style.display = "block";

    success.innerHTML = `
      <strong>Something went wrong.</strong>
      Please try again or contact us at
      hireorbitsolutions@gmail.com
    `;

  }

});
