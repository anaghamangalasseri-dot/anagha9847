// Portfolio Loaded
console.log("Portfolio Loaded Successfully!");

// Smooth button animation
const button = document.querySelector(".btn");

button.addEventListener("mouseover", () => {
    button.style.transform = "scale(1.05)";
});

button.addEventListener("mouseout", () => {
    button.style.transform = "scale(1)";
});
