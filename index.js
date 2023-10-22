let products = [
  {
    id: 00001,
    name: "prod01",
    price: 10.5,
  },
  {
    id: 00002,
    name: "prod02",
    price: 45,
  },
  {
    id: 00003,
    name: "prod03",
    price: 43,
  },
]; // φτιάχνω ένα πίνακα με αντικείμενα- προιόντα

let basketProducts = []; //φτιάχνω ένα άδειο δεύτερο πίνακα για να βάζω τα προιόντα στο καλάθι

const badge = document.getElementById("badge");
const emptyBasketButton = document.getElementById("empty-basket-btn");
const savedBasketProductsString = localStorage.getItem("basketProducts");

if (savedBasketProductsString !== null) {
  basketProducts = JSON.parse(savedBasketProductsString);
  let counter = 0;
  basketProducts.forEach((basketProduct) => {
    counter += basketProduct.howmany;
  });

  badge.innerText = counter;
  console.log(basketProducts);
}
// βρίσκω τον πίνακα στο local storage με το κλειδί που με ενδιαφέρει

// Αν υπάρχει και δεν είναι null

// μετατρέπω τον πίνακα από string σε πίνακα αντικειμένων με το  JSON
// και τον αναθέτω στον πίνακα  basketProducts για να κάνω loop ( for each)
// και να δείξει το bagde το συνολικό αριθμό προιόντων στο καλάθι

const exitButton = document.getElementById("exit-btn");

emptyBasketButton.addEventListener("click", () => {
  basketProducts = [];
  badge.innerText = 0;
  localStorage.removeItem("basketProducts");
  removeBasketChildren();
}); // αδείαζω το καλάθι και μηδενίζω τον badge

exitButton.addEventListener("click", () => {
  removeBasketChildren();
  basketList.classList.add("hidden");
}); //όταν πατήσει ο χρήστης την έξοδο αφαιρώ όλα τα αντικείμενα και κρύβω το header του basket

const intl = new Intl.NumberFormat("el-gr", {
  style: "currency",
  currency: "EUR",
}); //τύπος για να βάλω το σήμα του ευρώ

const basketIcon = document.getElementById("basket-icon-container");
basketIcon.addEventListener("click", showProductsInbasket);
const basketList = document.getElementById("basket-list");

products.forEach((product) => {
  const productItemElement = document.createElement("div");
  productItemElement.classList = ["product"];

  const spanId = document.createElement("span");
  spanId.innerText = product.id;

  const spanName = document.createElement("span");
  spanName.innerText = product.name;

  const spanPrice = document.createElement("span");
  spanPrice.innerText = intl.format(product.price);

  const addToBasketButton = document.createElement("button");
  addToBasketButton.innerHTML = '<i class="fa-solid fa-plus"></i>'; //ετοιμο κουμπί απο το font awesome
  addToBasketButton.classList = ["add-to-basket-btn"];
  productItemElement.append(spanId, spanName, spanPrice, addToBasketButton);

  //φτιάχνω hmtl elements για όλα τα τα αντικείμενα -products και βάζω κάθε property σε ξεχωρίστα span και τους προσθέτω κουμπί
  //και τα κάνω append σε ένα μεγαλύτερο div to productsItemElements

  const productsList = document.getElementById("products-list");
  productsList.append(productItemElement);

  addToBasketButton.addEventListener("click", () => {
    badge.innerText = parseInt(badge.innerText) + 1;
    const existingProductInBasket = basketProducts.find((basketProduct) => {
      return basketProduct.id === product.id;
    });

    if (existingProductInBasket) {
      existingProductInBasket.howmany += 1;
    } else {
      basketProducts.push({ ...product, howmany: 1 });
    } // καθέ φορά που προσθέτω ενα προιόν  αυξάνω το badge και ελέγχω αν το προιόν υπάρχει ήδη στο καλάθι για να αυξήσω μόνο την ποσότητα
    //για  να μην εμφανιστεί ξεχωριστά αν δεν υπάρχει το κάνω push (...products : μπαίνουν όλα τα properties)

    localStorage.setItem("basketProducts", JSON.stringify(basketProducts));
    if (!basketList.classList.contains("hidden")) {
      showProductsInbasket();
    } //βάζω το προιόν στην μνήμη και αν είναι ανοιχτό το καλάθι στην οθόνη , δείχνω τα προιόντα του καλαθιού
  });
});

function showProductsInbasket() {
  basketList.classList.remove("hidden");
  removeBasketChildren();
  basketProducts.forEach((product) => {
    const productItemElement = document.createElement("div");
    productItemElement.classList = ["basket-products"];

    const spanName = document.createElement("span");
    spanName.innerText = product.name;

    const spanPrice = document.createElement("span");
    spanPrice.innerText = intl.format(product.price);

    const spanHowMany = document.createElement("span");
    spanHowMany.innerText = product.howmany;

    const sumPerItem = document.createElement("span");
    sumPerItem.innerText = intl.format(product.price * product.howmany);
    productItemElement.append(
      spanName,
      spanName,
      spanPrice,
      spanHowMany,
      sumPerItem
    );

    basketList.append(productItemElement);
  }); //δημιουργώ ξανά hmtl elements αυτη την φορά  για τα προιόντα που είναι στο καλάθι
}

function removeBasketChildren() {
  Array.from(basketList.children).forEach((child) => {
    if (!child.classList.contains("head-basket-list")) {
      child.remove();
    }
  }); // η μεθόδος for each λειτουργεί σε πίνακες (μετατρέπω την basketlist σε πίνακα array.from)
}
