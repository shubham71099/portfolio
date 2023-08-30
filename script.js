const header = document.querySelector("header");

window.addEventListener("scroll", function () {
  header.classList.toggle("sticky", window.scrollY > 200);
});

let menu = document.querySelector("#menu-icon");
let navlist = document.querySelector(".navlist");

menu.onclick = () => {
  menu.classList.toggle("bx-x");
  navlist.classList.toggle("open");
};

window.onscroll = () => {
  menu.classList.remove("bx-x");
  navlist.classList.remove("open");
};

const sr = ScrollReveal({
  distance: "40px",
  duration: 2050,
  delay: 200,
  reset: true,
});

sr.reveal(".hero-text", { origin: "top" });
sr.reveal(".about-img, .service-item, .about-text ", {
  origin: "bottom",
});
sr.reveal(".about-text h2, .text-center, .right-contact h2", {
  origin: "top",
});
sr.reveal(".left-contact", { origin: "left" });
sr.reveal(".right-contact", { origin: "right" });
sr.reveal(".end-section", { origin: "top" });

function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
}

async function sendEmail() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const mobile = document.getElementById("mobile").value;
  const message = document.getElementById("message").value;
  const contactForm = document.getElementById("contact-form");
  const submitBtn = document.getElementById("submit-btn");

  if (!name || !email || !mobile || !message) {
    alert("Please enter all details");
    return;
  }
  if (!validateEmail(email)) {
    alert("Please enter valid email id");
    return;
  }

  const endpoint =
    "https://adventurous-sunglasses-frog.cyclic.app/api/email/send";

  const emailMessage = `<b>Name:</b> ${name}<br/><b>Email:</b> ${email}<br/><b>Mobile:</b> ${mobile}<br/><b>Message:</b> ${message}`;

  const body = {
    emailBody: emailMessage,
    emailSubject: `New message on portfolio from ${name}`,
    reciever: "shubham71099@gmail.com",
    apiKey: "jF45&^dfUE34%fjg",
  };

  try {
    submitBtn.innerHTML = "Sending";
    submitBtn.classList.add("loading");

    const res = await axios.post(endpoint, body, {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    });

    submitBtn.classList.remove("loading");
    submitBtn.innerHTML = "Send";
    contactForm.reset();
    alert("Email sent successfully!  I will contact you shortly.");
  } catch (error) {
    submitBtn.classList.remove("loading");
    submitBtn.innerHTML = "Send";
    alert("Something went wrong.");
  }
}
