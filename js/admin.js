const adminLogout = document.querySelector(".sayidbar__logout");
const productTbody = document.querySelector(".product__tbody");
const isLogin = localStorage.getItem("x-auth-token");
const productCategorySelect = document.querySelector(".product__category-select");
const navbarMenu = document.querySelector(".navbar__menu")
const admin = document.querySelector(".admin")
const navbar = document.querySelector(".navbar")
const sayidbar = document.querySelector(".sayidbar")
const API_URL = "https://dummyjson.com";

function checkUser() {
    if (!isLogin) {
        window.location.replace("./login.html");
    }
}
checkUser();

adminLogout.addEventListener("click", () => {
    localStorage.removeItem("x-auth-token");
    window.open("../index.html", "_self");
});

async function getProduct(category = "") {
    let url = `${API_URL}/products${category}`;
    fetch(url)
        .then(response => response.json())
        .then(data => mapProduct(data.products))
        .catch(err => console.error(err));
}

getProduct();

function mapProduct(productsData) {
    let tr = "";
    productsData.forEach((product) => {
        tr += `
        <tr>
            <td>
                <img class='product__img' src="${product.images[0]}" alt="${product.title}" />
                <h3>${product.title}</h3>
            </td>
            <td>
                <p>${product.meta.createdAt.split("T")[0]}</p>
            </td>
            <td>
                <p>${product.category.charAt(0).toUpperCase() + product.category.slice(1).toLowerCase()}</p>
            </td>
            <td class='product__text-price'>
                <p class='product__text'>$${product.price}</p>
            </td>
            <td class='product__text-old-price'>
                <p>$${product.price + 200}</p>
            </td>
        </tr>
        `;
    });
    productTbody.innerHTML = tr;
}

async function getCategory() {
    fetch(`${API_URL}/products/categories`)
        .then(response => response.json())
        .then(data => mapCategory(data))
        .catch(err => console.error(err));
}

getCategory();

function mapCategory(categoryData) {
    let options = `<option hidden selected>Select a category</option> <option value="all">All</option>`;
    categoryData.forEach((category) => {
        options += `
            <option value="${category.slug}">${category.name}</option>
        `;
    });
    productCategorySelect.innerHTML = options;
}

productCategorySelect.addEventListener("change", (e) => {
    if (e.target.value === "all") {
        getProduct("");
    } else {
        getProduct(`/category/${e.target.value}`);
    }
});

navbarMenu.addEventListener("click", () => {
    admin.classList.toggle("admin__show-menu")
    sayidbar.classList.toggle("side-bar__show-menu")
})