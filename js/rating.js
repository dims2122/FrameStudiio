const ratingForm = document.getElementById("ratingForm");

ratingForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("ratingName").value.trim();
    const rating = Number(
        document.querySelector('input[name="rating"]:checked')?.value
    );
    const message = document.getElementById("ratingMessage").value.trim();

    // Validasi
    if (!name) {
        alert("Nama wajib diisi.");
        return;
    }

    if (!rating) {
        alert("Silakan pilih rating bintang.");
        return;
    }

    if (!message) {
        alert("Komentar wajib diisi.");
        return;
    }

    // Kirim ke Supabase
    const { error } = await supabaseClient
        .from("reviews")
        .insert([
            {
                name: name,
                rating: rating,
                message: message
            }
        ]);

    if (error) {
        console.error("Gagal mengirim rating:", error);
        alert("Rating gagal dikirim. Coba lagi.");
        return;
    }

    alert("Terima kasih! Rating kamu berhasil dikirim ⭐");

    // Kosongkan form
    ratingForm.reset();
});