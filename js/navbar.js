async function loadComponent(id, file) {
    const element = document.getElementById(id);

    if (!element) {
        console.error("Element tidak ditemukan:", id);
        return;
    }

    try {
        const response = await fetch(file);

        if (!response.ok) {
            throw new Error("Gagal memuat: " + file);
        }

        const html = await response.text();
        element.innerHTML = html;

    } catch (error) {
        console.error("Navbar error:", error);
    }
}


async function loadNavbar() {

    // Cek apakah sedang berada di folder pages
    const isSubPage = window.location.pathname.includes("/pages/");

    // Tentukan jalur berdasarkan posisi halaman
    const basePath = isSubPage ? "../" : "";

    // Load navbar
    await loadComponent(
        "navbar",
        `${basePath}components/navbar.html`
    );


    // =========================
    // LOGO
    // =========================

    const logo = document.querySelector("#navbar [data-logo]");

    if (logo) {
        logo.src = `${basePath}assets/images/logo/logo.png`;
    }


    // =========================
    // LINK NAVBAR
    // =========================

    const pages = {

        home: "index.html",

        product: "pages/product.html",

        about: "pages/tentang.html",

        gallery: "pages/gallery.html",

        contact: "pages/contact.html"

    };


    document
        .querySelectorAll("#navbar [data-page]")
        .forEach(link => {

            const page = link.dataset.page;

            if (pages[page]) {
                link.href = basePath + pages[page];
            }

        });


    // =========================
    // HAMBURGER
    // =========================

    initializeNavbar();
}


function initializeNavbar() {

    const toggle = document.getElementById("navbarToggle");
    const menu = document.getElementById("navbarMenu");

    if (!toggle || !menu) {
        console.error("Navbar menu tidak ditemukan");
        return;
    }

    toggle.addEventListener("click", function () {

        menu.classList.toggle("active");

    });
}


document.addEventListener(
    "DOMContentLoaded",
    loadNavbar
);