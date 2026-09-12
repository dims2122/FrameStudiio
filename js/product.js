/* ========================================
   DATA PRODUK
======================================== */

const products = [

    {
        id: 1,
        name: "Roster Minimalis 01",
        category: "minimalis",
        price: "Rp15.000",
        image: "../assets/images/Motif1.jpg",
        description:
            "Motif minimalis dengan tampilan sederhana dan modern."
    },

    {
        id: 2,
        name: "Roster Geometris 02",
        category: "geometris",
        price: "Rp17.000",
        image: "../assets/images/Motif2.jpg",
        description:
            "Motif geometris yang cocok untuk fasad dan dinding."
    },

    {
        id: 3,
        name: "Roster Klasik 03",
        category: "klasik",
        price: "Rp18.000",
        image: "../assets/images/Motif3.jpg",
        description:
            "Desain klasik untuk memberikan karakter pada bangunan."
    },

    {
        id: 4,
        name: "Roster Minimalis 04",
        category: "minimalis",
        price: "Rp16.000",
        image: "../assets/images/Motif1.jpg",
        description:
            "Roster dengan desain simpel untuk rumah modern."
    },

    {
        id: 5,
        name: "Roster Geometris 05",
        category: "geometris",
        price: "Rp19.000",
        image: "../assets/images/Motif2.jpg",
        description:
            "Pola geometris dengan tampilan tegas dan elegan."
    },

    {
        id: 6,
        name: "Roster Klasik 06",
        category: "klasik",
        price: "Rp20.000",
        image: "../assets/images/Motif3.jpg",
        description:
            "Motif klasik yang cocok untuk teras dan area eksterior."
    }

];


/* ========================================
   ELEMENT
======================================== */

const productGrid =
    document.getElementById("productGrid");

const filterButtons =
    document.querySelectorAll(".filter-btn");


/* ========================================
   TAMPILKAN PRODUK
======================================== */

function displayProducts(category = "all") {

    productGrid.innerHTML = "";


    const filteredProducts =
        category === "all"
            ? products
            : products.filter(
                product =>
                    product.category === category
            );


    filteredProducts.forEach((product, index) => {

        const card = document.createElement("article");

        card.className = "product-card";

        card.innerHTML = `

            <div class="product-image">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

                <span class="product-number">
                    ${String(product.id).padStart(2, "0")}
                </span>

            </div>


            <div class="product-info">

                <span class="product-category">
                    ${product.category.toUpperCase()}
                </span>

                <h2>
                    ${product.name}
                </h2>

                <p>
                    ${product.description}
                </p>


                <div class="product-bottom">

                    <strong>
                        Mulai ${product.price}
                    </strong>

                    <a
                        href="contact.html"
                        class="product-order">
                        Pesan →
                    </a>

                </div>

            </div>

        `;


        productGrid.appendChild(card);

    });

}


/* ========================================
   FILTER PRODUK
======================================== */

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });


        button.classList.add("active");


        const category =
            button.dataset.category;


        displayProducts(category);

    });

});


/* ========================================
   LOAD AWAL
======================================== */

displayProducts();