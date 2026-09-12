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
        console.error(error);
    }
}


async function loadNavbar() {

    await loadComponent(
        "navbar",
        "components/navbar.html"
    );

    if (typeof initializeNavbar === "function") {
        initializeNavbar();
    }

}


document.addEventListener("DOMContentLoaded", function () {
    loadNavbar();
});