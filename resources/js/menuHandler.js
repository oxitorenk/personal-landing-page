function toggleMenu() {
    const menu = document.getElementById("side-menu");
    const menuBtn = document.querySelector('.menu-btn'); // Select the button
    if (menu.style.width === "250px") { // Assuming 250px is the width of the open menu
        menu.style.width = "0"; // Close the menu
        menuBtn.classList.remove('open'); // Remove the open class
    } else {
        menu.style.width = "250px"; // Open the menu
        menuBtn.classList.add('open'); // Add the open class
    }
}

// Automatically close the sidebar menu on window resize
window.addEventListener('resize', () => {
    const menu = document.getElementById("side-menu");
    const menuBtn = document.querySelector('.menu-btn'); // Select the button
    if (window.innerWidth > 768) { // Set your desired breakpoint
        menu.style.width = "0"; // Close the menu
        menuBtn.classList.remove('open'); // Remove the open class
    }
});