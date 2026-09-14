// ========================================
// LOAD COMPONENT
// ========================================

async function loadComponent(id, file) {

    const element = document.getElementById(id);

    if (!element) {
        console.error("Element tidak ditemukan:", id);
        return;
    }

    try {

        const response = await fetch(file);

        if (!response.ok) {
            throw new Error(
                "Gagal memuat: " + file
            );
        }

        const html = await response.text();

        element.innerHTML = html;

    } catch (error) {

        console.error("Navbar error:", error);

    }
}


// ========================================
// LOAD NAVBAR
// ========================================

async function loadNavbar() {

    // Cek apakah sedang berada di folder pages
    const isSubPage =
        window.location.pathname.includes("/pages/");


    // ========================================
    // PATH COMPONENT
    // ========================================

    const basePath = isSubPage
        ? "../"
        : "";


    // Load navbar
    await loadComponent(
        "navbar",
        basePath + "components/navbar.html"
    );


    // ========================================
    // LOGO
    // ========================================

    const logo =
        document.querySelector("#navbar [data-logo]");

    if (logo) {

        logo.src =
            basePath +
            "assets/images/logo/logo.png";

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
            "pages/tentang.html",

        gallery:
            "pages/gallery.html",

        review:
            "pages/reviewlist.html",

        contact:
            "pages/contact.html"

    };


    // ========================================
    // SET LINK
    // ========================================

    document
        .querySelectorAll("#navbar [data-page]")
        .forEach(link => {

            const page =
                link.dataset.page;


            if (!pages[page]) {
                return;
            }


            // Jika di halaman utama
            if (!isSubPage) {

                link.href =
                    pages[page];

            }

            // Jika di dalam folder pages
            else {

                if (page === "home") {

                    link.href =
                        "../index.html";

                } else {

                    link.href =
                        "../" + pages[page];

                }

            }

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
        document.getElementById("navbarToggle");

    const menu =
        document.getElementById("navbarMenu");


    if (!toggle || !menu) {

        console.error(
            "Navbar menu tidak ditemukan"
        );

        return;
    }


    toggle.addEventListener(
        "click",
        function () {

            menu.classList.toggle("active");

        }
    );

}


// ========================================
// START
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    loadNavbar
);