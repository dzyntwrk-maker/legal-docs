let selectedDoc = null;
let freeUsed = localStorage.getItem("legaldraft_used") === "1";
let currentDocText = "";

function selectDoc(type) {
  document.querySelectorAll(".doc-card").forEach(c => c.classList.remove("selected"));
  event.currentTarget.classList.add("selected");
  document.querySelectorAll(".form-card").forEach(f => f.classList.remove("visible"));
  document.getElementById(`form-${type}`).classList.add("visible");
  document.getElementById("output-card").classList.remove("visible");
  document.getElementById("paywall").classList.remove("visible");
  document.getElementById("error").classList.remove("visible");
  selectedDoc = type;
  document.getElementById(`form-${type}`).scrollIntoView({ behavior: "smooth", block: "start" });
}

function getFormData() {
  const d = {};
  if (selectedDoc === "nda") {
    d.party1 = document.getElementById("nda-party1").value;
    d.party2 = document.getElementById("nda-party2").value;
    d.purpose = document.getElementById("nda-purpose").value;
    d.duration = document.getElementById("nda-duration").value;
    d.governingLaw = document.getElementById("nda-law").value;
    d.type = document.getElementById("nda-type").value;
  } else if (selectedDoc === "freelance") {
    d.freelancer = document.getElementById("fl-freelancer").value;
    d.client = document.getElementById("fl-client").value;
    d.services = document.getElementById("fl-services").value;
    d.payment = document.getElementById("fl-payment").value;
    d.schedule = document.getElementById("fl-schedule").value;
    d.deadline = document.getElementById("fl-deadline").value;
    d.governingLaw = document.getElementById("fl-law").value;
  } else if (selectedDoc === "llc") {
    d.llcName = document.getElementById("llc-name").value;
    d.state = document.getElementById("llc-state").value;
    d.members = document.getElementById("llc-members").value;
    d.management = document.getElementById("llc-mgmt").value;
    d.purpose = document.getElementById("llc-purpose").value;
  } else if (selectedDoc === "employment") {
    d.company = document.getElementById("emp-company").value;
    d.candidate = document.getElementById("emp-candidate").value;
    d.title = document.getElementById("emp-title").value;
    d.salary = document.getElementById("emp-salary").value;
    d.startDate = document.getElementById("emp-start").value;
    d.empType = document.getElementById("emp-type").value;
    d.benefits = document.getElementById("emp-benefits").value;
  } else if (selectedDoc === "saas") {
    d.productName = document.getElementById("saas-name").value;
    d.url = document.getElementById("saas-url").value;
    d.pricing = document.getElementById("saas-pricing").value;
    d.governingLaw = document.getElementById("saas-law").value;
    d.description = document.getElementById("saas-desc").value;
  }
  return d;
}

function showLoader(text) {
  document.getElementById("loader").classList.add("visible");
  document.getElementById("loader-text").textContent = text;
}
function hideLoader() { document.getElementById("loader").classList.remove("visible"); }
function showError(msg) {
  const el = document.getElementById("error");
  el.textContent = msg;
  el.classList.add("visible");
}

async function generate(type) {
  if (freeUsed) {
    document.getElementById("paywall").classList.add("visible");
    document.getElementById("paywall").scrollIntoView({ behavior: "smooth" });
    return;
  }
  const data = getFormData();
  const btn = document.querySelector(`#form-${type} .btn-generate`);
  btn.disabled = true;
  document.getElementById("output-card").classList.remove("visible");
  document.getElementById("error").classList.remove("visible");
  showLoader("Drafting your document…");

  try {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ docType: type, formData: data })
    });
    hideLoader();
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `Server error ${res.status}`);
    }
    const { document: doc, title } = await res.json();
    currentDocText = doc;
    document.getElementById("output-title").textContent = title;
    document.getElementById("output-doc").textContent = doc;
    document.getElementById("output-card").classList.add("visible");
    document.getElementById("output-card").scrollIntoView({ behavior: "smooth" });
    freeUsed = true;
    localStorage.setItem("legaldraft_used", "1");
    btn.textContent = btn.textContent.replace("— Free", "— $9");
  } catch (err) {
    hideLoader();
    showError(`Error: ${err.message}`);
  } finally {
    btn.disabled = false;
  }
}

function copyDoc() {
  navigator.clipboard.writeText(currentDocText).then(() => {
    const btn = event.target;
    btn.textContent = "✅ Copied!";
    setTimeout(() => { btn.textContent = "📋 Copy"; }, 2000);
  });
}

function downloadDoc() {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([currentDocText], { type: "text/plain" }));
  a.download = `${selectedDoc || "document"}.txt`;
  a.click();
}
