var productSlugs = [];

(function ($) {
    "use strict";

    $.getJSON("./data/products-index.json", function (data) {

        if (data == null)
            return;
        
        productSlugs = [];
        for (let categoryKey in data) {
            let category = data[categoryKey];
            for (let subCategoryKey in category) {
                let subcategory = category[subCategoryKey];
                for (let product of subcategory) {
                    let slug = ToSlug(product.Label);
                    product.slug = slug;
                    productSlugs[slug] = product;
                }
            }
        }

        updateCart(); 

        $('button.pointer').on('click', function (event) {
            event.preventDefault();
            sendOrder();   
        });

        $('.clearcart').on('click', function (event) {           
            clearCart();
        });
    });

    window.addEventListener('storage', function (event) {
        if (event.key === 'cart')
            updateCart();
    });
})(jQuery);

function addCartItem($container, item, product) {

    if ($container == null || item == null || product == null)
        return false;

    let trElement = document.createElement("tr");
    trElement.setAttribute("class", "table_row");

    let tdElement = document.createElement("td");
    tdElement.setAttribute("class", "column-1");

    let divElement = document.createElement("div");
    divElement.setAttribute("class", "how-itemcart1");
    divElement.addEventListener("click", () => removeCartItemFromView(product.slug, $(trElement)));

    let imgElement = document.createElement("img");
    imgElement.setAttribute("src", "./images/products/" + product.slug + "-0.webp");
    imgElement.setAttribute("alt", "im�gen del art�culo");
    imgElement.setAttribute("loading", "lazy");

    divElement.appendChild(imgElement);

    tdElement.appendChild(divElement);

    trElement.appendChild(tdElement);

    tdElement = document.createElement("td");
    tdElement.setAttribute("class", "column-2");

    aElement = document.createElement("a");
    aElement.setAttribute("class", "cl3");
    aElement.setAttribute("href", "product.html?id=" + product.slug);
    aElement.textContent = product.Label;

    tdElement.appendChild(aElement);

    trElement.appendChild(tdElement);


    tdElement = document.createElement("td");
    tdElement.setAttribute("class", "column-3");
    tdElement.textContent = toMoneyStr(product.Price);

    trElement.appendChild(tdElement);

    tdElement = document.createElement("td");
    tdElement.setAttribute("class", "column-4");

    divElement = document.createElement("div");
    divElement.setAttribute("class", "wrap-num-product flex-w m-l-auto m-r-0");

    let div2Element = document.createElement("div");
    div2Element.setAttribute("class", "btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m");
    
    let iElement = document.createElement("i");
    iElement.setAttribute("class", "fs-16 zmdi zmdi-minus");

    div2Element.appendChild(iElement);

    divElement.appendChild(div2Element);

    let inputElement = document.createElement("input");
    inputElement.setAttribute("class", "mtext-104 cl3 txt-center num-product");
    inputElement.setAttribute("type", "number");
    inputElement.setAttribute("name", "num-" + product.slug);
    inputElement.setAttribute("value", item.qty);
    inputElement.setAttribute("min", 0);
    inputElement.setAttribute("max", 99);
    inputElement.setAttribute("price", product.Price);
    inputElement.setAttribute("label", product.Label);
    
    inputElement.addEventListener("input", () => updateCartTotals());

    divElement.appendChild(inputElement);


    div2Element = document.createElement("div");
    div2Element.setAttribute("class", "btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m");

    iElement = document.createElement("i");
    iElement.setAttribute("class", "fs-16 zmdi zmdi-plus");

    div2Element.appendChild(iElement);
  
    divElement.appendChild(div2Element);

    tdElement.appendChild(divElement);

    trElement.appendChild(tdElement);

    tdElement = document.createElement("td");
    tdElement.setAttribute("class", "column-5");
    tdElement.textContent = toMoneyStr(product.Price * item.qty);

    trElement.appendChild(tdElement);

    $container.append(trElement);

    return true;
}

function updateCart() {

    let $container = $('.table-shopping-cart');
    $container.empty();

    let trElement = document.createElement("tr");
    trElement.setAttribute("class", "table_head");

    let thElement = document.createElement("th");
    thElement.setAttribute("class", "column-1");
    thElement.textContent = spanishFormat("Articulo");
    trElement.appendChild(thElement);

    thElement = document.createElement("th");
    thElement.setAttribute("class", "column-2");
    trElement.appendChild(thElement);

    thElement = document.createElement("th");
    thElement.setAttribute("class", "column-3");
    thElement.textContent = "Precio";
    trElement.appendChild(thElement);

    thElement = document.createElement("th");
    thElement.setAttribute("class", "column-4");
    thElement.textContent = "Cantidad";
    trElement.appendChild(thElement);

    thElement = document.createElement("th");
    thElement.setAttribute("class", "column-5");
    thElement.textContent = "Total";
    trElement.appendChild(thElement);

    $container.append(trElement);

    let cart = getCart();
    let toRemove = [];
    for (let item of cart.items) 
        if (!addCartItem($container, item, productSlugs[item.productId]))
            toRemove.push(item.productId);        

    for (let slug of toRemove)
        removeCartItem(cart, slug);
            
    $('.btn-num-product-down').on('click', function () {
        let input = $(this).next();
        var numProduct = Number(input.val());
        if (numProduct > 0) {
            input.val(numProduct - 1).change();
            updateCartTotals();
        }
    });

    $('.btn-num-product-up').on('click', function () {
        let input = $(this).prev();
        var numProduct = Number(input.val());
        if (numProduct < 99) {
            input.val(numProduct + 1).change();
            updateCartTotals();
        }
    });

    updateCartTotals(false);
}

function clearCart() {
    let cart = getCart();  
    cart.items = [];  
    addStorage('cart', cart);
    updateCart();
}

function updateCartTotals(autosave = true) {

    let cart = { items: [] };
    let ttPrice = 0;
    $('.num-product').each(function (index, element) {
        
        let slug = $(element).attr('name').substring(4);;
        let qty = $(element).val();
        let price = $(element).attr('price');
        let tPrice = price * qty;

        cart.items.push({ productId: slug, qty: qty });
        
        let parentTd = $(this).parent().parent();
        let tPriceTd = parentTd.next();
        let tPriceStr = toMoneyStr(tPrice);
        tPriceTd.text(tPriceStr);

        ttPrice += tPrice;
    });

    let mySpan = $('span.mtext-110.cl2');
    let ttPriceStr = toMoneyStr(ttPrice);
    mySpan.text(ttPriceStr);

    if (autosave)
        addStorage('cart', cart);
}

function removeCartItemFromView(productSlug, $trElement) {
    let cart = getCart();  
    $trElement.remove();
    removeCartItem(cart, productSlug);
}

function removeCartItem(cart, productSlug) {
    cart.items = cart.items.filter(function (item) {
        return item.productId !== productSlug;
    });

    addStorage('cart', cart);
    updateCartTotals(false);
}

function sendOrder() {
    let message = "Hola, quiero esta orden:\n";
    message += "------------------------------\n";
    let total = 0;

    $('.num-product').each(function (index, element) {

        let label = $(element).attr('label');
        let qty = $(element).val();

        if (qty <= 0)
            return;

        let price = $(element).attr('price');

        message += '- ' + qty + 'x $' + price + ' ' + label + '\n';
        
        let tPrice = price * qty;

        total += tPrice;
    });

    message += "\nTotal: $" + total;    
    let enlace = "https://wa.me/+" + contactCell + "?text=" + encodeURIComponent(message);
    window.open(enlace);
}