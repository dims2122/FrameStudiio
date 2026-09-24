
const whatsappButton = document.getElementById("whatsappButton");
const contactList = document.getElementById("contactList");


// Buka / tutup daftar WhatsApp
whatsappButton.addEventListener("click", function () {
    contactList.classList.toggle("active");
});


// Tutup ketika klik di luar bubble
document.addEventListener("click", function (event) {

    const whatsappContainer =
        document.querySelector(".whatsapp-container");

    if (!whatsappContainer.contains(event.target)) {
        contactList.classList.remove("active");
    }

});
