const filterButtons = document.querySelectorAll(".filter-btn");
const galleryItems = document.querySelectorAll(".gallery-item");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        // Hapus active dari semua tombol
        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        // Aktifkan tombol yang diklik
        button.classList.add("active");

        const filter = button.dataset.filter;

        galleryItems.forEach(item => {

            const category = item.dataset.category;

            if (filter === "all" || category === filter) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }

        });

    });

});