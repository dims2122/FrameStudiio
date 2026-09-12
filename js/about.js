// ========================================
// TENTANG KAMI
// ========================================

document.addEventListener("DOMContentLoaded", () => {

    const sections = document.querySelectorAll(
        ".about-section, .why-section, .location-section, .about-cta"
    );

    const observer = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.15
        }
    );

    sections.forEach((section) => {
        observer.observe(section);
    });

});