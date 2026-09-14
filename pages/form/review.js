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

const reviewForm = document.getElementById("reviewForm");

const nameInput = document.getElementById("name");

const reviewInput = document.getElementById("review");

const ratingInputs =
    document.querySelectorAll('input[name="rating"]');

const ratingError =
    document.getElementById("ratingError");

const toast =
    document.getElementById("toast");

const toastClose =
    document.getElementById("toastClose");


// ========================================
// SUBMIT FORM
// ========================================

reviewForm.addEventListener("submit", async (e) => {

    // PENTING:
    // Mencegah form masuk ke URL
    e.preventDefault();


    // ========================================
    // AMBIL DATA
    // ========================================

    const name = nameInput.value.trim();

    const message = reviewInput.value.trim();

    const selectedRating =
        document.querySelector(
            'input[name="rating"]:checked'
        );


    // ========================================
    // VALIDASI
    // ========================================

    if (!name) {
        showError("Nama wajib diisi.");
        return;
    }


    if (!selectedRating) {
        showError("Silakan pilih rating.");
        return;
    }


    if (!message) {
        showError("Review wajib diisi.");
        return;
    }


    const rating =
        Number(selectedRating.value);


    if (rating < 1 || rating > 5) {
        showError("Rating tidak valid.");
        return;
    }


    // ========================================
    // BUTTON LOADING
    // ========================================

    const button =
        reviewForm.querySelector(
            'button[type="submit"]'
        );

    button.disabled = true;
    button.textContent = "Mengirim...";


    try {

        console.log("Data yang dikirim:", {
            name: name,
            rating: rating,
            message: message
        });


        // ========================================
        // INSERT KE SUPABASE
        // ========================================

        const { data, error } =
            await supabaseClient
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
        // CEK ERROR
        // ========================================

        if (error) {

            console.error(
                "Supabase Error:",
                error
            );

            showError(
                error.message ||
                "Review gagal dikirim."
            );

            return;
        }


        // ========================================
        // BERHASIL
        // ========================================

        console.log(
            "Review berhasil masuk:",
            data
        );


        // Reset form
        reviewForm.reset();


        // Tampilkan toast
        showToast();


    } catch (error) {

        console.error(
            "Error:",
            error
        );

        showError(
            error.message ||
            "Terjadi kesalahan saat mengirim review."
        );

    } finally {

        button.disabled = false;
        button.textContent = "Kirim review";

    }

});


// ========================================
// ERROR
// ========================================

function showError(message) {

    if (ratingError) {

        ratingError.textContent = message;

        return;
    }

    alert(message);
}


// ========================================
// TOAST
// ========================================

function showToast() {

    if (!toast) return;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 4000);

}


// ========================================
// CLOSE TOAST
// ========================================

if (toastClose) {

    toastClose.addEventListener("click", () => {

        toast.classList.remove("show");

    });

}