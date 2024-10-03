function toggleMenu() {
    const menu = document.getElementById("side-menu");
    const menuBtn = document.querySelector('.menu-btn');

    const isOpen = menu.style.width === "250px";

    menu.style.width = isOpen ? "0" : "250px";
    menuBtn.classList.toggle('open', !isOpen);
}

// Automatically close the sidebar menu on window resize
window.addEventListener('resize', () => {
    const menu = document.getElementById("side-menu");
    const menuBtn = document.querySelector('.menu-btn');
    
    if (window.innerWidth > 768) {
        menu.style.width = "0"; // Close the menu
        menuBtn.classList.remove('open'); // Remove the open class from button
    }
});