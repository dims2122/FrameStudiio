// ========================================
// SUPABASE
// ========================================

const SUPABASE_URL =
    "https://uqasmtlwlxrxkryfuxik.supabase.co";

const SUPABASE_ANON_KEY =
    "sb_publishable_nw5CASl5dL0gxyfe7VLHjQ_BjVdrpi-";

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);


// ========================================
// ELEMENT
// ========================================

const reviewForm =
    document.getElementById("reviewForm");

const nameInput =
    document.getElementById("name");

const reviewInput =
    document.getElementById("review");

const ratingInputs =
    document.querySelectorAll(
        'input[name="rating"]'
    );


// POPUP

const successPopup =
    document.getElementById("successPopup");

const successClose =
    document.getElementById("successClose");

const successDone =
    document.getElementById("successDone");


// ========================================
// SUBMIT REVIEW
// ========================================

reviewForm.addEventListener("submit", async (e) => {

    // MENCEGAH FORM MASUK KE URL
    e.preventDefault();


    // ========================================
    // AMBIL DATA
    // ========================================

    const name =
        nameInput.value.trim();

    const message =
        reviewInput.value.trim();

    const selectedRating =
        document.querySelector(
            'input[name="rating"]:checked'
        );


    // ========================================
    // VALIDASI
    // ========================================

    if (!name) {
        alert("Nama wajib diisi.");
        return;
    }


    if (!selectedRating) {
        alert("Silakan pilih rating.");
        return;
    }


    if (!message) {
        alert("Review wajib diisi.");
        return;
    }


    const rating =
        Number(selectedRating.value);


    // ========================================
    // BUTTON
    // ========================================

    const button =
        reviewForm.querySelector(
            'button[type="submit"]'
        );

    button.disabled = true;

    button.textContent =
        "Mengirim...";


    try {

        console.log("Mengirim review:", {
            name,
            rating,
            message
        });


        // ========================================
        // INSERT SUPABASE
        // ========================================

        const {
            data,
            error
        } = await supabaseClient
            .from("reviews")
            .insert([
                {
                    name: name,
                    rating: rating,
                    message: message
                }
            ])
            .select();


        // ========================================
        // ERROR
        // ========================================

        if (error) {

            console.error(
                "SUPABASE ERROR:",
                error
            );

            alert(
                "Review gagal dikirim:\n\n" +
                error.message
            );

            return;
        }


        // ========================================
        // BERHASIL
        // ========================================

        console.log(
            "Review berhasil:",
            data
        );


        // Reset form
        reviewForm.reset();


        // ========================================
        // TAMPILKAN POPUP
        // ========================================

        successPopup.classList.add("show");


    } catch (error) {

        console.error(
            "ERROR:",
            error
        );

        alert(
            "Terjadi kesalahan:\n\n" +
            error.message
        );

    } finally {

        button.disabled = false;

        button.textContent =
            "Kirim review";

    }

});


// ========================================
// TUTUP POPUP
// ========================================

// ========================================
// TUTUP POPUP
// ========================================

function closeSuccessPopup() {

    successPopup.classList.remove("show");

}


successClose.addEventListener(
    "click",
    closeSuccessPopup
);


// ========================================
// TOMBOL SELESAI → LIHAT REVIEW
// ========================================

successDone.addEventListener(
    "click",
    () => {

        window.location.href =
            "../reviewlist.html";

    }
);


// ========================================
// KLIK BACKGROUND
// ========================================

successPopup
    .querySelector(".success-overlay")
    .addEventListener(
        "click",
        closeSuccessPopup
    );