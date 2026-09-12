const openRating = document.getElementById("openRating");
const closeRating = document.getElementById("closeRating");
const ratingModal = document.getElementById("ratingModal");

const modalStars = document.querySelectorAll(
    "#modalStars button"
);

const submitRating =
    document.getElementById("submitRating");

const reviewName =
    document.getElementById("reviewName");

const reviewMessage =
    document.getElementById("reviewMessage");

const ratingError =
    document.getElementById("ratingError");

const floatingReviews =
    document.getElementById("floatingReviews");

let selectedRating = 0;


// ========================================
// BUKA MODAL
// ========================================

openRating.addEventListener("click", () => {

    ratingModal.classList.add("active");

});


// ========================================
// TUTUP MODAL
// ========================================

closeRating.addEventListener("click", () => {

    ratingModal.classList.remove("active");

});


// Klik area luar modal
ratingModal.addEventListener("click", (e) => {

    if (e.target === ratingModal) {
        ratingModal.classList.remove("active");
    }

});


// ========================================
// PILIH BINTANG
// ========================================

modalStars.forEach((star) => {

    star.addEventListener("click", () => {

        selectedRating =
            Number(star.dataset.rating);

        modalStars.forEach((item) => {

            const rating =
                Number(item.dataset.rating);

            item.textContent =
                rating <= selectedRating
                    ? "★"
                    : "☆";

        });

    });

});


// ========================================
// KIRIM RATING
// ========================================

submitRating.addEventListener("click", async () => {

    const name =
        reviewName.value.trim();

    const message =
        reviewMessage.value.trim();


    if (selectedRating === 0) {

        ratingError.textContent =
            "Silakan pilih rating terlebih dahulu.";

        return;

    }


    if (name.length < 2) {

        ratingError.textContent =
            "Nama minimal 2 karakter.";

        return;

    }


    if (message.length < 3) {

        ratingError.textContent =
            "Tulis pengalaman Anda terlebih dahulu.";

        return;

    }


    submitRating.disabled = true;

    submitRating.textContent =
        "Mengirim...";


    const { error } = await supabaseClient
        .from("reviews")
        .insert({
            name: name,
            rating: selectedRating,
            message: message
        });


    if (error) {

        console.error(error);

        ratingError.textContent =
            "Rating gagal dikirim. Coba lagi.";

        submitRating.disabled = false;

        submitRating.textContent =
            "Kirim Rating";

        return;

    }


    ratingError.textContent =
        "Rating berhasil dikirim! ❤️";


    reviewName.value = "";
    reviewMessage.value = "";


    submitRating.textContent =
        "Berhasil";


    setTimeout(() => {

        ratingModal.classList.remove("active");

        submitRating.disabled = false;

        submitRating.textContent =
            "Kirim Rating";

        ratingError.textContent = "";

    }, 1500);

});


// ========================================
// FLOATING REVIEW
// ========================================

async function loadFloatingReviews() {

    const { data, error } = await supabaseClient
        .from("reviews")
        .select("*")
        .eq("rating", 5)
        .order("created_at", {
            ascending: false
        });

    if (error) {
        console.error("Gagal mengambil review:", error);
        return;
    }

    if (!data || data.length === 0) {
        return;
    }

    showFloatingReviews(data);
}


// ========================================
// TAMPILKAN FLOATING REVIEW
// ========================================

function showFloatingReviews(reviews) {

    const floatingReviews =
        document.getElementById("floatingReviews");

    if (!floatingReviews) return;

    let index = 0;

    const card = document.createElement("div");
    card.className = "floating-review-card";

    floatingReviews.appendChild(card);


    function renderReview() {

        const review = reviews[index];

        card.innerHTML = `
            <div class="floating-review-stars">
                ⭐ ⭐ ⭐ ⭐ ⭐
            </div>

            <p class="floating-review-message">
                ${review.message}
            </p>

            <span class="floating-review-name">
                — ${review.name}
            </span>
        `;

        // Muncul perlahan
        requestAnimationFrame(() => {
            card.classList.add("show");
        });
    }


    function nextReview() {

        // Fade out
        card.classList.remove("show");

        // Setelah benar-benar memudar,
        // baru ganti isi
        setTimeout(() => {

            index++;

            if (index >= reviews.length) {
                index = 0;
            }

            renderReview();

        }, 1000);
    }


    // Review pertama
    renderReview();


    // Ganti review setiap 15 detik
    setInterval(() => {
        nextReview();
    }, 15000);
}

// Jalankan floating review
loadFloatingReviews();