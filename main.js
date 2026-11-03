const year = document.getElementById("year");
const header = document.getElementById("siteHeader");

if (year) year.textContent = new Date().getFullYear();

const updateHeader = () => {
  header?.classList.toggle("scrolled", window.scrollY > 24);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const trackContact = (id, name) => {
  if (!window.ttq || typeof window.ttq.track !== "function") return;

  window.ttq.track("Contact", {
    contents: [{
      content_id: id,
      content_type: "product",
      content_name: name
    }]
  });
};

document.querySelectorAll(".track-whatsapp").forEach((link) => {
  link.addEventListener("click", () => trackContact("whatsapp-contact", "WhatsApp Contact"));
});

document.querySelectorAll(".track-call").forEach((link) => {
  link.addEventListener("click", () => trackContact("phone-contact", "Phone Call"));
});

