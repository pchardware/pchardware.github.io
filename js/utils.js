 //-*- coding: utf-8 -*-

var contactCell = "";
var contactEmail = "";
var currency = "USD";

(function ($) {

    /*[ Load page ]
        ===========================================================*/

    $(".animsition").animsition({
        inClass: 'fade-in',
        outClass: 'fade-out',
        inDuration: 1500,
        outDuration: 800,
        linkElement: '.animsition-link',
        loading: true,
        loadingParentElement: 'html',
        loadingClass: 'animsition-loading-1',
        loadingInner: '<div class="loader05"></div>',
        timeout: false,
        timeoutCountdown: 5000,
        onLoadEvent: true,
        browser: ['animation-duration', '-webkit-animation-duration'],
        overlay: false,
        overlayClass: 'animsition-overlay-slide',
        overlayParentElement: 'html',
        transition: function (url) { window.location.href = url; }
    });

    $('.js-addcart-detail').each(function () {
        $(this).on('click', function (event) {

            event.preventDefault();

            let productId = $(this).attr('product-id');
            if (productId == null)
                return;

            let qty = 1;
            let qtyInput = $(this).parent().find('[name="num-product"]');
            if (qtyInput != null) {
                qty = qtyInput.val();
            }

            addToCart(productId, $(this).attr('product-label'), qty);            
        });
    });    

    $(".js-show-cart").click(function () {
        window.location.replace("./cart.html");
    });

    window.addEventListener('storage', function (event) {    
        if (event.key === 'cart') {
            updateCartQty();
            updateAddCartIcons();
        }
    });

    $.getJSON("./data/manifest.json", function (data) {
        if (data == null)
            return;

        let parts = splitTitle(data.Title.toUpperCase());
        $('.storet1').text(parts[0]);
        $('.storet2').text(parts[1]);

        contactCell = data.Cell;
        contactEmail = data.Email;
        currency = data.Currency;

        $('.currency').text(currency);
        $('.headnotification').text(data.HeadNotification);  
        $('.foot').text(data.Foot);  

        $('.paymethod').html(data.CartPayMethod.replace(/\n/g, '<br>'));  
        $('.shipping').html(data.CartShipping.replace(/\n/g, '<br>'));  
               
        const styleSheets = document.styleSheets;
        for (let i = 0; i < styleSheets.length; i++) {
            const styleSheet = styleSheets[i];
            const rules = styleSheet.cssRules || styleSheet.rules;
            for (let j = 0; j < rules.length; j++) {
                const rule = rules[j];                
                if (rule.style && rule.style.backgroundColor === 'rgb(34, 34, 34)') {
                    //console.log(rule.style);
                    rule.style.backgroundColor = "rgb(" + data.BackgroundColor + ")";
                }
            }
        }
    });

    updateCartQty();

})(jQuery);

function splitTitle(str) {

    const words = str.split(" ");
    const wordsQty = words.length;
    const middle = Math.round(wordsQty / 2);

    const firstPart = words.slice(0, middle).join(" ");
    const secondPart = words.slice(middle).join(" ");

    if (wordsQty === 1) 
        return [str, ""];

    return [firstPart, secondPart];
}

function addToCart(productSlug, productLabel, qty = 1, autoremove = false) {
    let cart = getCart();
    let removed = false;
    const index = cart.items.findIndex(item => item.productId === productSlug);
    if (index !== -1) {
        if (autoremove) {
            cart.items.splice(index, 1);
            removed = true;
        }
        else
            cart.items[index] = { productId: productSlug, qty: qty };
    }
    else
        cart.items.push({ productId: productSlug, qty: qty.toString() });

    addStorage('cart', cart);
    updateCartQty();

    if (removed)
        swal(productLabel, "¡Fue eliminado de la carta!", "error");
    else
        swal(productLabel, "¡Fue adicionado a la carta!", "success");

    return removed;
}

function ToSlug(text) {
    if (!text) return '';

    // Convertir el texto a minúsculas
    let slug = text.toLowerCase();

    // Eliminar caracteres no alfanuméricos
    slug = slug.replace(/[^a-z0-9\s-]/g, '');

    // Reemplazar espacios en blanco con guiones
    slug = slug.replace(/ /g, '-');

    // Eliminar guiones duplicados
    slug = slug.replace(/-+/g, '-');

    // Eliminar guiones al principio y al final
    slug = slug.replace(/^-+/, '').replace(/-+$/, '');

    // Asegurarse de que el slug tenga menos de 50 caracteres
    if (slug.length > 50) {
        slug = slug.substring(0, 50);
    }

    return slug;
}

function spanishFormat(texto) {
    const replacements = {
        'á': String.fromCharCode(225),
        'é': String.fromCharCode(233),
        'í': String.fromCharCode(237),
        'ó': String.fromCharCode(243),
        'ú': String.fromCharCode(250),
        'ñ': String.fromCharCode(241),
        'Á': String.fromCharCode(193),
        'É': String.fromCharCode(201),
        'Í': String.fromCharCode(205),
        'Ó': String.fromCharCode(211),
        'Ú': String.fromCharCode(218),
        'Ñ': String.fromCharCode(209)
    };
    for (const char in replacements) 
        texto = texto.replace(new RegExp(char, 'g'), replacements[char]);
    
    return texto;
}

function normalizeText(text) {

    if (text && text.trim().length > 0) {
        text = toEnglish(text);
        text = text.replace(/[^\w-]/g, '_');
        return text.toLowerCase();
    }

    return "";
}

function toEnglish(text) {
    var caracter = {
        'á': 'a',
        'é': 'e',
        'í': 'i',
        'ó': 'o',
        'ú': 'u',
        'ü': 'u',
        'ñ': 'n',
        'Á': 'A',
        'É': 'E',
        'Í': 'I',
        'Ó': 'O',
        'Ú': 'U',
        'Ü': 'U',
        'Ñ': 'N'
    };
    return text.replace(/[áéíóúüñÁÉÍÓÚÜÑ]/g, function (match) {
        return caracter[match];
    });
}

function getFilterValues(data, target) {
    var dataArr = data.split(' ');

    var elementosObjetivo = dataArr.filter(function (elemento) {
        return elemento.startsWith(target);
    });

    var valoresObjetivo = elementosObjetivo.map(function (elemento) {
        let parts = elemento.split('-');
        parts = parts.slice(1);
        return parts.join("-");
    });

    return valoresObjetivo.length > 0 ? valoresObjetivo : [];
}

function addProductCardBase($container, product, filterClass = '') {    

    let newDiv = document.createElement("div");

    newDiv.setAttribute("class", "col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item" + filterClass);

    if (filterClass != null && filterClass.length > 0) {
        newDiv.setAttribute("data-price", product.Price);
        var dateObj = new Date(product.Update);
        var timestamp = dateObj.getTime();
        newDiv.setAttribute("data-update", timestamp);
    }   

    let newDiv2 = document.createElement("div");
    newDiv2.setAttribute("class", "block2");

    let newDiv3 = document.createElement("div");
    newDiv3.setAttribute("class", "block2-pic hov-img0");

    const slug = ToSlug(product.Label);

    let newImg = document.createElement("img");
    newImg.setAttribute("src", "./images/products/" + slug + "-1.jpg");
    newImg.setAttribute("alt", "imagen del artículo");
    newImg.setAttribute("onerror", "this.src=\'./images/unknow.jpg'");
    //newImg.setAttribute("loading", "lazy");

    newDiv3.appendChild(newImg);

    //let newA = document.createElement("a");
    //newA.setAttribute("class", "block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1");
    //newA.setAttribute("href", "#");
    //newA.textContent = spanishFormat("Vista rápida");

    //newDiv3.appendChild(newA);

    newDiv2.appendChild(newDiv3);

    newDiv3 = document.createElement("div");
    newDiv3.setAttribute("class", "block2-txt flex-w flex-t p-t-14");

    let newDiv4 = document.createElement("div");
    newDiv4.setAttribute("class", "block2-txt-child1 flex-col-l ");

    newA = document.createElement("a");
    newA.setAttribute("class", "stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6");
    newA.setAttribute("href", "product.html?id=" + slug);
    newA.textContent = spanishFormat(product.Label);

    newDiv4.appendChild(newA);

    let featuresStr = "";
    if (product.Features != null)
        featuresStr = spanishFormat(product.Features.join(", "));

    let newSpan = document.createElement("span");
    newSpan.setAttribute("class", "cl4 stext-111");
    newSpan.textContent = featuresStr;
    newDiv4.appendChild(newSpan);

    newSpan = document.createElement("span");
    newSpan.setAttribute("class", "stext-105 cl3");
    let currency = product.Price.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 });
    newSpan.textContent = currency;

    newDiv4.appendChild(newSpan);

    newDiv3.appendChild(newDiv4);

    newDiv4 = document.createElement("div");
    newDiv4.setAttribute("class", "block2-txt-child2 flex-r p-t-3");

    let pInCart = inCart(slug);
    let fontColor = pInCart ? 'cl1' : 'cl4';
    newA = document.createElement("a");
    newA.setAttribute("class", "btn-addwish-b2 dis-block pos-relative js-addcart icon-add-cart hov-cl1 trans-04 " + fontColor);
    newA.setAttribute("href", "#"); 

    /*newImg = document.createElement("img");
    newImg.setAttribute("class", "icon-heart1 dis-block trans-04");
    newImg.setAttribute("src", "images/icons/icon-heart-01.png");
    newImg.setAttribute("alt", "ICON");

    newA.appendChild(newImg);

    newImg = document.createElement("img");
    newImg.setAttribute("class", "icon-heart2 dis-block trans-04 ab-t-l");
    newImg.setAttribute("src", "images/icons/icon-heart-02.png");
    newImg.setAttribute("alt", "ICON");

    newA.appendChild(newImg);*/

    let newI = document.createElement("i");
    newI.setAttribute("class", pInCart ? "zmdi zmdi-shopping-cart" : "zmdi zmdi-shopping-cart-plus");
    newI.setAttribute("style", "vertical-align: top;");
    newA.appendChild(newI);

    newDiv4.appendChild(newA);

    newDiv3.appendChild(newDiv4);

    newDiv2.appendChild(newDiv3);

    newDiv.appendChild(newDiv2);

    $container.append(newDiv);

    $(newA).each(function () {
        var productLabel = $(this).parent().parent().find('.js-name-b2').html();
        $(this).on('click', function (event) {
            event.preventDefault();

            let removed = addToCart(slug, productLabel, 1, true);
            updateAddCartIcon($(this), !removed);
            updateCartQty();
        });
    });

}

function getStorage(key) {
    let str = localStorage.getItem(key);
    if (str != null && str.length > 0) {
        let data = JSON.parse(str);
        return data;
    }

    return null;
}

function addStorage(key, data) {
    let str = JSON.stringify(data);
    localStorage.setItem(key, str);
}

function updateCartQty() {
    let cart = getStorage('cart');
    let qty = 0;
    if (cart != null && cart.items != null && cart.items.length > 0) 
        qty = cart.items.reduce((acumulador, item) => acumulador + parseInt(item.qty, 10), 0);

    $('.js-show-cart').each(function () {
        $(this).attr('data-notify', qty);
    });
}

function getCart() {   
    let cart = getStorage('cart'); 

    if (cart == null)
        cart = { items: [] };
    else if (cart.items == null)
        cart.items = [];

    cart.items = cart.items.filter(item => {
        return (
            typeof item.productId === "string" &&
            typeof item.qty === "string"
        );
    });

    return cart;
}

function inCart(productSlug) {
    let cart = getCart();
    const index = cart.items.findIndex(item => item.productId === productSlug);
    return index !== -1;
}

function updateAddCartIcons() {
    $('.btn-addwish-b2,js-addcart').each(function () {
        let productLabel = $(this).parent().parent().find('.js-name-b2').html();
        let slug = ToSlug(productLabel);
        let removed = inCart(slug);
        updateAddCartIcon($(this), removed);
    });
}

function updateAddCartIcon($element, removed) {
    let iElement = $element.find('.zmdi');
    if (!removed) {
        iElement.removeClass('zmdi-shopping-cart');
        iElement.addClass('zmdi-shopping-cart-plus');

        $element.removeClass('cl1');
        $element.addClass('cl4');
    }
    else {
        iElement.removeClass('zmdi-shopping-cart-plus');
        iElement.addClass('zmdi-shopping-cart');

        $element.removeClass('cl4');
        $element.addClass('cl1');
    }
}

function toMoneyStr(amount) {
    if (amount == null)
        amount = 0;

    return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 });
}