// ========================================
// SUPABASE
// ========================================

const SUPABASE_URL = "https://uqasmtlwlxrxkryfuxik.supabase.co";
const SUPABASE_KEY = "sb_publishable_nw5CASl5dL0gxyfe7VLHjQ_BjVdrpi-"

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);


// ========================================
// LOAD SEMUA REVIEW
// ========================================

async function loadReviews() {

    const reviewList = document.getElementById("reviewList");

    if (!reviewList) {
        console.error("Element #reviewList tidak ditemukan.");
        return;
    }

    // Tampilan loading
    reviewList.innerHTML = `
        <div class="review-loading">
            Memuat review...
        </div>
    `;

    try {

        const { data, error } = await supabaseClient
            .from("reviews")
            .select("id, name, rating, message, created_at")
            .order("created_at", {
                ascending: false
            });

        if (error) {
            throw error;
        }

        // ========================================
        // JIKA BELUM ADA REVIEW
        // ========================================

        if (!data || data.length === 0) {

            reviewList.innerHTML = `
                <div class="review-empty">
                    <h3>Belum Ada Review</h3>
                    <p>
                        Belum ada ulasan dari konsumen.
                    </p>
                </div>
            `;

            return;
        }


        // ========================================
        // KOSONGKAN LOADING
        // ========================================

        reviewList.innerHTML = "";


        // ========================================
        // TAMPILKAN SEMUA REVIEW
        // ========================================

        data.forEach(review => {

            const name = review.name || "Konsumen";
            const message = review.message || "";
            const rating = Number(review.rating) || 0;

            // Buat bintang
            let stars = "";

            for (let i = 1; i <= 5; i++) {

                if (i <= rating) {
                    stars += "★";
                } else {
                    stars += "☆";
                }

            }


            // Format tanggal
            const date = formatDate(review.created_at);


            // Buat card
            const card = document.createElement("div");

            card.className = "review-card";

            card.innerHTML = `
                
                <div class="review-card-header">

                    <div class="review-avatar">
                        ${getInitial(name)}
                    </div>

                    <div class="review-user">

                        <h3>
                            ${escapeHTML(name)}
                        </h3>

                        <div class="review-stars">
                            ${stars}
                        </div>

                    </div>

                </div>


                <p class="review-message">
                    ${escapeHTML(message)}
                </p>


                <span class="review-date">
                    ${date}
                </span>

            `;

            reviewList.appendChild(card);

        });


    } catch (error) {

        console.error(
            "Gagal mengambil review:",
            error
        );

        reviewList.innerHTML = `
            <div class="review-error">
                <h3>Review Gagal Dimuat</h3>
                <p>
                    Terjadi kesalahan saat mengambil data review.
                </p>
            </div>
        `;

    }

}


// ========================================
// FORMAT TANGGAL
// ========================================

function formatDate(dateString) {

    if (!dateString) {
        return "";
    }

    const date = new Date(dateString);

    return date.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });

}


// ========================================
// INISIAL NAMA
// ========================================

function getInitial(name) {

    if (!name) {
        return "K";
    }

    return name
        .trim()
        .charAt(0)
        .toUpperCase();

}


// ========================================
// AMANKAN TEXT DARI HTML
// ========================================

function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}


// ========================================
// JALANKAN SAAT HALAMAN DIBUKA
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    loadReviews
);