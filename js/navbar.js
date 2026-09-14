// ========================================
// NAVBAR.JS
// GitHub Pages + Live Server
// ========================================

// ========================================
// MENENTUKAN BASE PATH WEBSITE
// ========================================

function getBasePath() {
    const script = document.querySelector(
        'script[src*="navbar.js"]'
    );

    if (!script) {
        return "";
    }

    const scriptURL = new URL(
        script.src,
        window.location.href
    );

    // navbar.js berada di:
    // /js/navbar.js
    //
    // maka base website:
    // /

    // atau GitHub:
    // /RosterCilegon/js/navbar.js
    //
    // maka base website:
    // /RosterCilegon/

    return new URL(
        "../",
        scriptURL
    ).pathname.replace(/\/$/, "");
}

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
            "Component error:",
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

    const logo = document.querySelector(
        "#navbar [data-logo]"
    );

    if (logo) {

        logo.src =
            BASE_PATH +
            "/assets/images/logo.png";

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
            "pages/reviewlist.html"

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