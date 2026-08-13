// ===============================
// MOBILE MENU
// ===============================

const nav = document.getElementById("navMenu");
const menuBtn = document.getElementById("menuBtn");

if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
        nav.classList.toggle("active");
    });
}

document.querySelectorAll("#navMenu a").forEach(link => {
    link.addEventListener("click", () => {
        nav.classList.remove("active");
    });
});


// ===============================
// GOOGLE APPS SCRIPT
// ===============================

const GOOGLE_SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbzLHIjEVjzrZp94EGTZNwvoUlyeVn4NxjbMJz0WFVZWwtabRh5D0wFHm-Z3gq4QtJq3TQ/exec";


// ===============================
// OPEN FORM
// ===============================

function openForm(type) {

    const modal = document.getElementById("formModal");
    const eyebrow = document.getElementById("formEyebrow");
    const title = document.getElementById("formTitle");
    const intro = document.getElementById("formIntro");
    const companyLabel = document.getElementById("companyLabel");
    const company = document.getElementById("company");
    const roleLabel = document.getElementById("roleLabel");
    const role = document.getElementById("role");
    const messageLabel = document.getElementById("messageLabel");
    const form = document.getElementById("leadForm");
    const success = document.getElementById("success");

    form.reset();

    document.getElementById("formType").value = type;

    form.style.display = "block";
    success.style.display = "none";

    if (type === "candidate") {

        eyebrow.textContent = "FOR CANDIDATES";
        title.textContent = "Candidate Registration";
        intro.textContent =
            "Share your details and we will review your profile for suitable opportunities.";

        companyLabel.classList.add("hidden");
        company.required = false;

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
        company.required = true;

        roleLabel.firstChild.textContent =
            "Position / Hiring Requirement";

        role.placeholder =
            "Example: 5 Sales Executives, 2+ years experience, Hyderabad";

        messageLabel.classList.remove("hidden");
    }

    modal.classList.add("show");
}


// ===============================
// CLOSE FORM
// ===============================

function closeForm() {
    document.getElementById("formModal").classList.remove("show");
}

document.getElementById("formModal").addEventListener("click", function(e) {

    if (e.target.id === "formModal") {
        closeForm();
    }

});


// ===============================
// SUBMIT FORM
// ===============================

document.getElementById("leadForm").addEventListener("submit", function(e) {

    e.preventDefault();

    const form = document.getElementById("leadForm");
    const success = document.getElementById("success");
    const submitButton = form.querySelector("button[type='submit']");

    const type = document.getElementById("formType").value;

    const data = {
        type: type,
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        company: document.getElementById("company").value.trim(),
        role: document.getElementById("role").value.trim(),
        message: document.getElementById("message").value.trim()
    };

    submitButton.disabled = true;
    submitButton.textContent = "Submitting...";

    try {

        const blob = new Blob(
            [JSON.stringify(data)],
            { type: "text/plain;charset=utf-8" }
        );

        const sent = navigator.sendBeacon(
            GOOGLE_SCRIPT_URL,
            blob
        );

        if (!sent) {
            throw new Error("Could not send the form.");
        }

        // Show success immediately
        form.style.display = "none";
        success.style.display = "block";

        if (type === "candidate") {

            success.innerHTML =
                `<strong>Thank you, ${data.name}!</strong>
                Your candidate registration has been submitted successfully.
                Hire Orbit Solutions will contact you regarding suitable opportunities.`;

        } else {

            success.innerHTML =
                `<strong>Thank you, ${data.name}!</strong>
                Your hiring requirement has been submitted successfully.
                Hire Orbit Solutions will contact you regarding your recruitment requirement.`;
        }

    } catch (error) {

        console.error(error);

        submitButton.disabled = false;
        submitButton.textContent = "Submit Details";

        alert(
            "Unable to submit the form. Please check your internet connection and try again."
        );
    }

});
