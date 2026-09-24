/* =========================================================
   KONTAK - ROSTER CILEGON
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       CONTACT CARDS ANIMATION
    ========================== */

    const cards = document.querySelectorAll(".contact-card");

    cards.forEach(function (card, index) {

        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";

        setTimeout(function () {

            card.style.transition =
                "opacity 0.5s ease, transform 0.5s ease";

            card.style.opacity = "1";
            card.style.transform = "translateY(0)";

        }, 100 + (index * 100));

    });



    /* =========================
       CTA WHATSAPP
    ========================== */

    const whatsappLinks =
        document.querySelectorAll(
            'a[href*="wa.me"]'
        );

    whatsappLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            console.log(
                "Membuka WhatsApp Roster Cilegon..."
            );

        });

    });



    /* =========================
       MAP
    ========================== */

    const map = document.querySelector(
        ".map-wrapper"
    );

    if (map) {

        map.addEventListener(
            "mouseenter",
            function () {

                map.classList.add("map-active");

            }
        );

        map.addEventListener(
            "mouseleave",
            function () {

                map.classList.remove("map-active");

            }
        );

    }

});