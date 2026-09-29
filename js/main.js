const SITE = {
  x: "https://x.com/FlokionSend",
  sender: "https://x.com/senderdotfamily",
  chain: "ethereum",
  contract: "0xDcdFA13173807b29156118a1818f319dC48BA039",
};

function chartUrl() {
  return SITE.contract
    ? `https://dexscreener.com/${SITE.chain}/${SITE.contract}`
    : `https://dexscreener.com/${SITE.chain}`;
}

function chartEmbed() {
  return `${chartUrl()}?embed=1&theme=dark&trades=0&info=0`;
}

function buyUrl() {
  return SITE.contract
    ? `https://app.uniswap.org/swap?chain=ethereum&inputCurrency=ETH&outputCurrency=${SITE.contract}`
    : "https://app.uniswap.org/swap?chain=ethereum";
}

document.querySelectorAll("[data-x]").forEach((node) => {
  node.href = SITE.x;
});

document.querySelectorAll("[data-sender]").forEach((node) => {
  node.href = SITE.sender;
});

document.querySelectorAll("[data-buy]").forEach((node) => {
  node.href = buyUrl();
});

document.querySelectorAll("[data-chart]").forEach((node) => {
  node.href = chartUrl();
});

const frame = document.getElementById("chartEmbed");
if (frame) frame.src = chartEmbed();

const header = document.querySelector(".nav");
const toggle = document.querySelector(".nav-toggle");
const menu = document.querySelector(".nav-links");

if (toggle && menu) {
  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

const onScroll = () => {
  if (header) header.classList.toggle("is-stuck", window.scrollY > 12);
};

window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

const revealNodes = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );
  revealNodes.forEach((node) => observer.observe(node));
} else {
  revealNodes.forEach((node) => node.classList.add("is-in"));
}

const spot = document.querySelector(".spot");
const mark = document.querySelector(".mark");
const orbs = document.querySelectorAll(".orb");

window.addEventListener(
  "pointermove",
  (event) => {
    const x = event.clientX;
    const y = event.clientY;
    if (spot) spot.style.transform = `translate(${x}px, ${y}px)`;
    if (mark) {
      const rect = mark.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (x - cx) / 40;
      const dy = (y - cy) / 40;
      mark.style.setProperty("--tilt-x", `${dx}px`);
      mark.style.setProperty("--tilt-y", `${dy}px`);
    }
    orbs.forEach((orb, index) => {
      const depth = (index + 1) * 8;
      orb.style.setProperty("--mx", `${(x - window.innerWidth / 2) / depth}px`);
      orb.style.setProperty("--my", `${(y - window.innerHeight / 2) / depth}px`);
    });
  },
  { passive: true }
);

const sky = document.querySelector(".bubbles");
if (sky) {
  const count = 18;
  for (let i = 0; i < count; i += 1) {
    const bubble = document.createElement("span");
    const size = 8 + Math.random() * 28;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${Math.random() * 100}%`;
    bubble.style.animationDuration = `${14 + Math.random() * 18}s`;
    bubble.style.animationDelay = `${-Math.random() * 20}s`;
    bubble.style.opacity = `${0.18 + Math.random() * 0.45}`;
    sky.appendChild(bubble);
  }
}
