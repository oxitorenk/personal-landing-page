function toggleMenu() {
    const sideMenu = document.getElementById("side-menu");
    if (sideMenu.style.width === "250px") {
        sideMenu.style.width = "0"; // Close the menu
    } else {
        sideMenu.style.width = "250px"; // Open the menu
    }
}

// Close the sidebar if the screen size is wider than 768px
window.addEventListener("resize", function() {
    if (window.innerWidth > 768) {
        document.getElementById("side-menu").style.width = "0"; // Ensure sidebar is closed
    }
});