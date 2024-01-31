const header = document.querySelector("header");
const progressBar = document.querySelector(".progress-bar");

var typing = new Typed(".typing-text", {
  strings: [
    "  ",
    " Full stack developer",
    " Competitive programmer",
    " Tech enthusiast",
  ],
  typeSpeed: 50,
  backSpeed: 30,
  loop: true,
});

window.addEventListener("scroll", function () {
  header.classList.toggle("sticky", window.scrollY > 200);
  updateProgressBar();
});

function updateProgressBar() {
  const scrollPos =
    document.documentElement.scrollTop || document.body.scrollTop;
  const windowHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const progress = (scrollPos / windowHeight) * 100;
  progressBar.style.width = `${progress}%`;
}

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
function validateMobile(mobile) {
  var mobileRegex = /^\d{10}$/;
  return mobileRegex.test(mobile);
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
  if (!validateMobile(mobile)) {
    alert("Please enter 10 digit mobile no");
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

    await axios.post(endpoint, body, {
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

function upperCase() {
  const x = document.getElementById("name");
  x.value = x.value.toUpperCase();
}
function lowerCase() {
  const x = document.getElementById("email");
  x.value = x.value.toLowerCase();
}

async function getAndShowVisitors() {
  try {
    const visitorsCountAPIEndpoint =
      "https://visitors-count-api.onrender.com/visitCount";
    const res = await axios.post(
      visitorsCountAPIEndpoint,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }
    );
    const visitorsCount = res.data.visitCount;
    if (res.data.success) {
      const visitorsCountDiv = document.querySelector(".visitors-display");
      visitorsCountDiv.innerHTML = `Total Portfolio views : <b> ${visitorsCount}<b>`;
      visitorsCountDiv.style.display = "block";
    }
  } catch (error) {
    console.log(error);
  }
}

//getAndShowVisitors();
