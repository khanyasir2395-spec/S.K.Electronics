const products = {
  ahuja: {
    speaker: {
      "500W": 18000,
      "1000W": 28000
    },
    amplifier: {
      "800W": 22000,
      "1200W": 32000
    },
    mic: {
      "Wireless": 6000
    }
  },

  skpro: {
    speaker: {
      "600W": 15000,
      "1200W": 25000
    },
    cabinet: {
      "15 inch": 14000
    },
    mixer: {
      "4 Channel": 9000
    }
  },

  robo: {
    speaker: {
      "500W": 16000
    },
    amplifier: {
      "1000W": 26000
    }
  }
};

let cart = [];
let total = 0;

function updateComponents() {
  const brand = document.getElementById("brand").value;
  const componentSelect = document.getElementById("component");
  componentSelect.innerHTML = `<option value="">Select Component</option>`;

  if (!brand) return;

  for (let component in products[brand]) {
    componentSelect.innerHTML += `<option value="${component}">${component}</option>`;
  }
}

function updateModels() {
  const brand = document.getElementById("brand").value;
  const component = document.getElementById("component").value;
  const modelSelect = document.getElementById("model");
  modelSelect.innerHTML = "";

  if (!component) return;

  for (let model in products[brand][component]) {
    modelSelect.innerHTML += `<option value="${model}">${model}</option>`;
  }
}

function addItem() {
  const brand = document.getElementById("brand").value;
  const component = document.getElementById("component").value;
  const model = document.getElementById("model").value;
  const qty = parseInt(document.getElementById("qty").value);

  if (!brand || !component || !model) {
    alert("Please select all options");
    return;
  }

  const price = products[brand][component][model];
  const itemTotal = price * qty;

  cart.push(`${brand.toUpperCase()} | ${component} | ${model} x ${qty} = ₹${itemTotal}`);
  total += itemTotal;

  updateSummary();
}

function updateSummary() {
  const list = document.getElementById("list");
  list.innerHTML = "";

  cart.forEach(item => {
    const li = document.createElement("li");
    li.innerText = item;
    list.appendChild(li);
  });

  document.getElementById("total").innerText = total;
}

function sendWhatsApp() {
  if (cart.length === 0) {
    alert("No items added");
    return;
  }

  let msg = "Hello SK Electronics Kolkata,%0A%0AMy DJ Setup:%0A";

  cart.forEach(i => {
    msg += i + "%0A";
  });

  msg += `%0ATotal: ₹${total}`;

  const phone = "8052546602"; // replace
  window.open(`https://wa.me/${phone}?text=${msg}`, "_blank");
}


/* ===== SK PRO WHOLESALE LOGIC ===== */

let skproCart = [];

function addSKProOrder() {
  const model = document.getElementById("skpro-model").value;
  const qty = document.getElementById("skpro-qty").value;

  if (!model || qty < 1) {
    alert("Please select model and quantity");
    return;
  }

  skproCart.push(`${model} × ${qty}`);
  updateSKProSummary();
}

function updateSKProSummary() {
  const list = document.getElementById("skpro-list");
  list.innerHTML = "";

  skproCart.forEach(item => {
    const li = document.createElement("li");
    li.innerText = item;
    list.appendChild(li);
  });
}

function sendSKProWhatsApp() {
  if (skproCart.length === 0) {
    alert("No items added");
    return;
  }

  let message = "Hello SK Electronics Kolkata,%0A%0AWholesale enquiry for SK Pro speakers:%0A";

  skproCart.forEach(item => {
    message += item + "%0A";
  });

  message += "%0APlease share wholesale pricing and availability.";

  const phone = "918052546602"; // replace number
  window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
}
function showLang(lang, btn) {
  // hide all language texts
  document.querySelectorAll(".about-text").forEach(el => {
    el.style.display = "none";
  });

  // remove active class from all buttons
  document.querySelectorAll(".lang-switch button").forEach(b => {
    b.classList.remove("active");
  });

  // show selected language
  document.querySelector(".about-text." + lang).style.display = "block";

  // activate clicked button
  btn.classList.add("active");
}
/* ===== SLIDER ===== */

let slideIndex = 0;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    dots[i].classList.remove("active");
  });

  slides[index].classList.add("active");
  dots[index].classList.add("active");
}

function autoSlide() {
  slideIndex++;
  if (slideIndex >= slides.length) slideIndex = 0;
  showSlide(slideIndex);
}

setInterval(autoSlide, 3000);

/* ===== DJ SETUP POPUP ===== */

/* ===== POPUP FIXED ===== */

function openSetup(id) {
  const popup = document.getElementById("setupPopup");
  const title = document.getElementById("popupTitle");
  const container = document.getElementById("popupOptions");

  let options = [];

  if (id === 1) {
    title.innerText = "Starter Setup (₹80K–1L)";
    options = [
      {
        img:"images/p1.jpg",
        price:"₹80,000",
        details:"2x 500W Speakers, 1 Amplifier, Basic Mixer, 2 Mic",
      },
      {
        img:"images/p2.jpg",
        price:"₹95,000",
        details:"2x 600W Speakers, Better Amp, Mixer + Mic Set",
      }
    ];
  }

  if (id === 2) {
    title.innerText = "Basic Pro Setup (₹1L–2L)";
    options = [
      {
        img:"images/p1.jpg",
        price:"₹1,20,000",
        details:"2x 1000W Speakers, High Power Amp, Mixer",
      },
      {
        img:"images/p2.jpg",
        price:"₹1,80,000",
        details:"3 Speaker Setup, Pro Mixer, Wireless Mic",
      }
    ];
  }
  if (id === 3) {
    title.innerText = "Advanced DJ Speakers (₹2L–3.8L)";
    options = [
      {
        img:"images/p1.jpg",
        price:"₹2,00,000",
        details:"2x 1000W Speakers, High Power Amp, Mixer",
      },
      {
        img:"images/p2.jpg",
        price:"₹1,80,000",
        details:"3 Speaker Setup, Pro Mixer, Wireless Mic",
      }
    ];
  }

  container.innerHTML = "";

  options.forEach(opt => {
    container.innerHTML += `
      <div class="option-card">
        <div class="img-box">
          <img src="${opt.img}">
          <button class="view-btn" onclick="showDetails('${opt.details}','${opt.price}')">
            View Details
          </button>
        </div>

        <div class="option-content">
          <h4>${opt.price}</h4>

          <a href="https://wa.me/918052546602?text=I want DJ setup ${opt.price}" 
             target="_blank" class="option-btn">
             Enquire Now
          </a>
        </div>
      </div>
    `;
  });

  popup.style.display = "block";
}

/* CLOSE BUTTON */
function closePopup() {
  document.getElementById("setupPopup").style.display = "none";
}

/* CLICK OUTSIDE CLOSE */
window.onclick = function(e) {
  const popup = document.getElementById("setupPopup");
  if (e.target === popup) {
    popup.style.display = "none";
  }
};
function showDetails(text, price) {
  document.getElementById("detailText").innerText = text;
  document.getElementById("detailPrice").innerText = price;
  document.getElementById("detailBox").style.display = "block";
}

function closeDetails() {
  document.getElementById("detailBox").style.display = "none";
}
function toggleMenu() {
  document.getElementById("mobileMenu").classList.toggle("active");
}

function showLang(lang, btn) {

  // hide all language blocks
  document.querySelectorAll('.about-text-block').forEach(el => {
    el.style.display = 'none';
  });

  // show selected language
  document.querySelectorAll('.about-text-block.' + lang).forEach(el => {
    el.style.display = 'block';
  });

  // remove active class from all buttons
  document.querySelectorAll('.lang-switch button').forEach(b => {
    b.classList.remove('active');
  });

  // add active class to clicked button
  btn.classList.add('active');
}
