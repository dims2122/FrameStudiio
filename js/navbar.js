// ========================================
// NAVBAR.JS
// Otomatis: GitHub Pages + Live Server
// ========================================


// ========================================
// MENENTUKAN BASE PATH WEBSITE
// ========================================

function getBasePath() {

    // Cari script navbar.js yang sedang digunakan
    const scripts = document.querySelectorAll("script");

    for (const script of scripts) {

        const src = script.getAttribute("src");

        if (!src) continue;

        if (src.includes("/js/navbar.js") || src.includes("js/navbar.js")) {

            // Ambil URL lengkap navbar.js
            const url = new URL(src, window.location.href);

            // Contoh GitHub:
            // https://dims2122.github.io/FrameStudio/js/navbar.js
            //
            // hasil:
            // /FrameStudio

            const match = url.pathname.match(/^(.+)\/js\/navbar\.js$/);

            if (match) {
                return match[1];
            }

            // Live Server:
            // http://127.0.0.1:5500/js/navbar.js
            //
            // hasil:
            // ""

            return "";
        }
    }

    return "";
}


// ========================================
// BASE PATH
// ========================================

const BASE_PATH = getBasePath();


// ========================================
// LOAD COMPONENT
// ========================================

async function loadComponent(id, file) {

    const element = document.getElementById(id);

    if (!element) {

        console.error(
            "Element tidak ditemukan:",
            id
        );

        return;
    }

    try {

        const response = await fetch(
            BASE_PATH + "/" + file
        );

        if (!response.ok) {

            throw new Error(
                `Gagal memuat ${file} (${response.status})`
            );
        }

        const html = await response.text();

        element.innerHTML = html;

    } catch (error) {

        console.error(
            "Navbar error:",
            error
        );
    }
}


// ========================================
// LOAD NAVBAR
// ========================================

async function loadNavbar() {

    await loadComponent(
        "navbar",
        "components/navbar.html"
    );


    // ========================================
    // LOGO
    // ========================================

    const logo =
        document.querySelector(
            "#navbar [data-logo]"
        );

    if (logo) {

        logo.src =
            BASE_PATH +
            "/assets/images/logo/Logo.png";
    }


    // ========================================
    // LINK NAVBAR
    // ========================================

    const pages = {

        home:
            "index.html",

        product:
            "pages/product.html",

        about:
            "pages/about.html",

        gallery:
            "pages/gallery.html",

        review:
            "pages/reviewlist.html",

        contact:
            "pages/contact.html"
    };


    document
        .querySelectorAll(
            "#navbar [data-page]"
        )
        .forEach(link => {

            const page =
                link.dataset.page;


            if (!pages[page]) {
                return;
            }


            // ========================================
            // BUAT LINK OTOMATIS
            // ========================================

            link.href =
                BASE_PATH +
                "/" +
                pages[page];

        });


    // ========================================
    // HAMBURGER
    // ========================================

    initializeNavbar();
}


// ========================================
// HAMBURGER MENU
// ========================================

function initializeNavbar() {

    const toggle =
        document.getElementById(
            "navbarToggle"
        );

    const menu =
        document.getElementById(
            "navbarMenu"
        );


    if (!toggle || !menu) {

        console.error(
            "Navbar menu tidak ditemukan"
        );

        return;
    }


    // Hindari event listener terpasang dua kali
    if (
        toggle.dataset.navbarInitialized === "true"
    ) {
        return;
    }


    toggle.dataset.navbarInitialized = "true";


    toggle.addEventListener(
        "click",
        function () {

            menu.classList.toggle(
                "active"
            );

        }
    );
}


// ========================================
// JALANKAN NAVBAR
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadNavbar();

    }
);