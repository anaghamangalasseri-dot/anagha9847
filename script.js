/* ===========================================
   PREMIUM PORTFOLIO
   script.js - Part 1
=========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       Loader
    ========================= */

    const loader = document.getElementById("loader");

    window.addEventListener("load", () => {
        setTimeout(() => {
            if (loader) {
                loader.style.opacity = "0";
                loader.style.visibility = "hidden";
            }
        }, 700);
    });

    /* =========================
       Typing Animation
    ========================= */

    const typing = document.querySelector(".typing");

    const words = [
        "BCA Student",
        "Web Developer",
        "Frontend Learner",
        "C & C++ Programmer",
        "JavaScript Enthusiast"
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeEffect() {

        if (!typing) return;

        const currentWord = words[wordIndex];

        typing.textContent = currentWord.substring(0, charIndex);

        if (!deleting) {

            charIndex++;

            if (charIndex > currentWord.length) {
                deleting = true;
                setTimeout(typeEffect, 1200);
                return;
            }

        } else {

            charIndex--;

            if (charIndex === 0) {
                deleting = false;
                wordIndex = (wordIndex + 1) % words.length;
            }

        }

        setTimeout(typeEffect, deleting ? 50 : 100);

    }

    typeEffect();

    /* =========================
       Scroll Progress Bar
    ========================= */

    const progressBar = document.getElementById("progressBar");

    window.addEventListener("scroll", () => {

        const scrollTop = document.documentElement.scrollTop;
        const height =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

        const progress = (scrollTop / height) * 100;

        if (progressBar) {
            progressBar.style.width = progress + "%";
        }

    });

    /* =========================
       Smooth Scroll
    ========================= */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function(e) {

            const target = document.querySelector(this.getAttribute("href"));

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({
                behavior: "smooth"
            });

        });

    });

    /* =========================
       Active Navigation
    ========================= */

    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".sidebar a");

    function updateActiveLink() {

        let current = "";

        sections.forEach(section => {

            const top = section.offsetTop - 150;
            const height = section.offsetHeight;

            if (pageYOffset >= top &&
                pageYOffset < top + height) {

                current = section.getAttribute("id");

            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (
                link.getAttribute("href") === "#" + current
            ) {

                link.classList.add("active");

            }

        });

    }

    window.addEventListener("scroll", updateActiveLink);

    updateActiveLink();

    /* =========================
       Back To Top Button
    ========================= */

    const topBtn = document.getElementById("topBtn");

    window.addEventListener("scroll", () => {

        if (!topBtn) return;

        if (window.scrollY > 300) {

            topBtn.classList.add("show");

        } else {

            topBtn.classList.remove("show");

        }

    });

    if (topBtn) {

        topBtn.addEventListener("click", () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        });

    }
  /* ===========================================
   PREMIUM PORTFOLIO
   script.js - Part 2
=========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       Animated Counters
    ========================= */

    const counters = document.querySelectorAll(".card h3");

    function animateCounter(el, target) {

        let value = 0;
        const increment = Math.max(1, Math.ceil(target / 60));

        function update() {
            value += increment;

            if (value >= target) {
                value = target;
            }

            if (el.textContent.includes("%")) {
                el.textContent = value + "%";
            } else if (el.textContent.includes("+")) {
                el.textContent = value + "+";
            } else {
                el.textContent = value;
            }

            if (value < target) {
                requestAnimationFrame(update);
            }
        }

        update();
    }

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const el = entry.target;
            const number = parseInt(el.textContent);

            if (!el.dataset.done) {

                el.dataset.done = "true";
                animateCounter(el, number);

            }

        });

    }, { threshold: 0.4 });

    counters.forEach(counter => observer.observe(counter));

    /* =========================
       Dark Mode Toggle
    ========================= */

    const toggle = document.getElementById("themeToggle");

    if (toggle) {

        const saved = localStorage.getItem("theme");

        if (saved === "light") {
            document.body.classList.add("light");
        }

        toggle.addEventListener("click", () => {

            document.body.classList.toggle("light");

            localStorage.setItem(
                "theme",
                document.body.classList.contains("light")
                    ? "light"
                    : "dark"
            );

        });

    }

    /* =========================
       Floating Cards
    ========================= */

    document.querySelectorAll(".project-card,.card,.skill-card")
        .forEach(card => {

            card.addEventListener("mousemove", e => {

                const rect = card.getBoundingClientRect();

                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const rotateX = (y - rect.height / 2) / 18;
                const rotateY = (rect.width / 2 - x) / 18;

                card.style.transform =
                    `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;

            });

            card.addEventListener("mouseleave", () => {

                card.style.transform = "";

            });

        });

    /* =========================
       Scroll Fade
    ========================= */

    const revealItems = document.querySelectorAll(
        ".timeline-item,.project-card,.skill-card,.card"
    );

    const revealObserver = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("fade-up");

            }

        });

    }, { threshold: 0.2 });

    revealItems.forEach(item => revealObserver.observe(item));

    /* =========================
       Button Ripple Effect
    ========================= */

    document.querySelectorAll(".btn,.btn2").forEach(btn => {

        btn.addEventListener("click", function(e) {

            const ripple = document.createElement("span");

            ripple.className = "ripple";

            const rect = this.getBoundingClientRect();

            ripple.style.left = (e.clientX - rect.left) + "px";
            ripple.style.top = (e.clientY - rect.top) + "px";

            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);

        });

    });

    /* =========================
       Initialize AOS
    ========================= */

    if (typeof AOS !== "undefined") {

        AOS.init({
            duration: 1000,
            once: true,
            easing: "ease-in-out"
        });

    }

    console.log("Premium Portfolio Loaded Successfully.");

});

});
