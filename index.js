let products = [];
let cart = {}; /*Gather ID and Qaunity */


const updateCart = () => {
    let totalPrice = 0;
    /*Remove Prior Item before Add */
    document.querySelector('#cartSummary_items').replaceChildren([]);

    for(const key of Object.keys(cart)){
        
        const item = products.find((product)=>{
            return `${product.id}` === key;
        });


        const quanity = cart[key];
        const price = item.price;

        /*Create Element in Table Check Order*/
        const itemRow = document.createElement('tr');

        const itemName = document.createElement('th');
        itemName.innerText = item.title;

        const itemQuanity = document.createElement('td');
        itemQuanity.innerText = quanity;

        const itemPrice = document.createElement('td');
        let quanityMuliPrice = quanity * price;
        itemPrice.innerText = quanityMuliPrice.toFixed(2);

        /*Push in New row*/
        itemRow.append(itemName,itemQuanity,itemPrice);

        /*Push in Table*/
        document.querySelector('#cartSummary_items').append(itemRow);

        totalPrice = totalPrice + quanity * price;
    }
    
    /*When Code finish Loop*/
    document.querySelector('#cartSummary_total').innerText = totalPrice.toFixed(2);
};

const createCard = (product) => {

    const productCard = document.createElement('div');
    productCard.className = "productCard";

    const productThumbnail = document.createElement('img');
    productThumbnail.className = "productThumbnail";
    productThumbnail.src = product.thumbnail;

    const productButtomSheet = document.createElement('div');
    productButtomSheet.className = "productButtomSheet";

    const btnContainer = document.createElement('div');
    btnContainer.className = "btnContainer";

    const productInfoContainer = document.createElement('div');
    productInfoContainer.className = "productInfoContainer";

    const productName = document.createElement('strong');
    productName.className = "productName";
    productName.innerText = product.title;
    

    /*Price*/
    const productPrice = document.createElement('div');
    productPrice.className = "productPrice";
    productPrice.innerText = `$ ${product.price}`;

    /*Button Add*/
    const addToCart = document.createElement('button');
    addToCart.className = "addToCart";
    addToCart.innerText = "+";

    addToCart.addEventListener('click', ()=>{
        if(cart[product.id] === undefined) cart[product.id] = 0;
        cart[product.id] = cart[product.id] + 1;

        updateCart();
    })

    /*Button Remove*/
    const removeToCart = document.createElement('button');
    removeToCart.className = "removeToCart";
    removeToCart.innerText = "-";

    removeToCart.addEventListener('click', ()=>{
        if(cart[product.id] > 0) {
        if(cart[product.id] === undefined) cart[product.id] = 0;
        cart[product.id] = cart[product.id] - 1;

        updateCart();
        }
    })

    /* Append */
    productInfoContainer.append(productName, productPrice);
    btnContainer.append(addToCart, removeToCart);
    productButtomSheet.append(productInfoContainer, btnContainer);
    productCard.append(productThumbnail, productButtomSheet);

    document.querySelector('#productList').appendChild(productCard);

}

const hookViweSumCart = () =>{
    const checkOrderBtn = document.querySelector('#viewCart');
    checkOrderBtn.addEventListener('click',()=>{
        const cartSummary = document.querySelector('#cartSummary');
        const displayTable = cartSummary.style.display;

        if(displayTable === 'block'){
            cartSummary.style.display = 'none';
        }else{
            cartSummary.style.display = 'block';
        };
    });
}


const fetchProduct = () => {
    fetch('https://dummyjson.com/products')
        .then(res => res.json())
        .then((productRespond)=>{
            products = productRespond.products;
                     
            products.forEach(product => {
                createCard(product);
            });
        });
}


fetchProduct();
hookViweSumCart();
