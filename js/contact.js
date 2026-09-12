const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const subject = document.getElementById("subject").value;
        const message = document.getElementById("message").value.trim();

        const whatsappNumber = "6281234567890";

        const text = `Halo Roster Cilegon,

Nama: ${name}
No. WhatsApp: ${phone}
Keperluan: ${subject}
Pesan: ${message}`;

        const whatsappURL =
            `https://wa.me/${6285771028664}?text=${encodeURIComponent(text)}`;

        window.open(whatsappURL, "_blank");

        contactForm.reset();
    });
}