const nav=document.querySelector(".nav");
document.getElementById("menuBtn").addEventListener("click",()=>nav.classList.toggle("open"));
document.querySelectorAll("nav a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

function openForm(type){
  const modal=document.getElementById("formModal");
  const eyebrow=document.getElementById("formEyebrow");
  const title=document.getElementById("formTitle");
  const intro=document.getElementById("formIntro");
  const companyLabel=document.getElementById("companyLabel");
  const roleLabel=document.getElementById("roleLabel");
  const role=document.getElementById("role");
  const messageLabel=document.getElementById("messageLabel");
  document.getElementById("formType").value=type;
  document.getElementById("leadForm").style.display="block";
  document.getElementById("success").style.display="none";
  document.getElementById("leadForm").reset();

  if(type==="candidate"){
    eyebrow.textContent="FOR CANDIDATES";
    title.textContent="Candidate Registration";
    intro.textContent="Share your details and we will review your profile for suitable opportunities.";
    companyLabel.classList.add("hidden");
    roleLabel.firstChild.textContent="Skills / Preferred Role";
    role.placeholder="Example: Software Developer, JavaScript, 3 years experience";
    messageLabel.classList.remove("hidden");
  }else{
    eyebrow.textContent="FOR COMPANIES";
    title.textContent="Hiring Requirement";
    intro.textContent="Tell us what you need to hire and our team can contact you.";
    companyLabel.classList.remove("hidden");
    document.getElementById("company").required=true;
    roleLabel.firstChild.textContent="Position / Hiring Requirement";
    role.placeholder="Example: 5 Sales Executives, 2+ years experience, Hyderabad";
    messageLabel.classList.remove("hidden");
  }
  modal.classList.add("show");
}
function closeForm(){document.getElementById("formModal").classList.remove("show")}
document.getElementById("formModal").addEventListener("click",e=>{if(e.target.id==="formModal")closeForm()});

document.getElementById("leadForm").addEventListener("submit",e=>{
  e.preventDefault();
  const type=document.getElementById("formType").value;
  const name=document.getElementById("name").value.trim();
  const success=document.getElementById("success");
  document.getElementById("leadForm").style.display="none";
  success.style.display="block";
  success.innerHTML=type==="candidate"
    ? `<strong>Thank you, ${name}!</strong>Your candidate registration has been received. Hire Orbit Solutions will contact you regarding suitable opportunities.`
    : `<strong>Thank you, ${name}!</strong>Your hiring requirement has been received. Hire Orbit Solutions will contact you regarding your recruitment requirement.`;
});
