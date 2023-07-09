
(function ($) {
    "use strict";

    $(document).ready(function () {
        
        var urlParams = new URLSearchParams(window.location.search);
        var productId = urlParams.get('id');
        $.getJSON('./data/products/' + productId + '.json', function (product) {

            let title = spanishFormat(product.Label);
            document.title = title;
          
            $('head').append('<meta property="og:title" content="' + spanishFormat(title) + '">');
            $('head').append('<meta property="og:image" content="./images/products/' + productId +'-0.webp">');
            
            whatsappMessage = 'Hola, me interesa el art\u00EDculo \"' + title + '\" que vi en tu sitio web. \u00BFPodr\u00EDas darme m\u00E1s informaci\u00F3n?';
            whatsappMessage = spanishFormat(whatsappMessage);

            buildBreadCrumb(product);
            buildGallery(product);

            var first = true; 
            $('.product-label').each(function (index, element) {
                element.textContent = title;

                if (first && productStatus != null && productStatus.length > 0) {
                    $(element).addClass("pstatus");
                    $(element).attr("data-pstatus", productStatus);
                    first = false;
                }
            });

            let currency = toMoneyStr(product.Price);
            $('.product-price').each(function (index, element) {
                element.textContent = currency;

                if (product.Discount > 0) {
                    let discountStr = product.Discount.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 });
                    $(element).addClass("pdiscount");
                    $(element).attr("data-pdiscount", '- ' + discountStr);
                }
            });

            let featuresStr = spanishFormat(product.Features.join(', '));
            $('head').append('<meta property="og:description" content="' + featuresStr +'">');
            $('.product-features').each(function (index, element) {
                element.textContent = featuresStr;
            });

            let description = spanishFormat(product.Description);
            $('.product-description').each(function (index, element) {
                element.innerHTML = description.replace(/\n/g, '<br>');;
            });

            $('.js-addcart-detail').each(function (index, element) {                
                element.setAttribute('product-label', title);
                element.setAttribute('product-id', productId);                
            });

            buildRelatedProducts(product);
        });
    });

})(jQuery);

function buildBreadCrumb(product) {

    $container = $('.bread-crumb');
    let href = 'catalog.html?category=' + normalizeText(product.Category);
    addBreadCrumb($container, product.Category, href);

    if (product.SubCategory != null && product.SubCategory.length > 0) {
        href += '&subcategory=' + normalizeText(product.SubCategory);
        addBreadCrumb($container, product.SubCategory, href);
    }
    
    addBreadCrumb($container, product.Label);
}

function addBreadCrumb($container, label, href = null) {
    if (href == null) {
        let spanElement = document.createElement("span");
        spanElement.setAttribute("class", "stext-109 cl4");
        spanElement.textContent = spanishFormat(label);

        $container.append(spanElement);
        return;
    }

    let aElement = document.createElement("a");
    aElement.setAttribute("href", href);
    aElement.setAttribute("class", "stext-109 cl8 hov-cl1 trans-04");
    aElement.textContent = spanishFormat(label);

    let iElement = document.createElement("i");
    iElement.setAttribute("class", "fa fa-angle-right m-l-9 m-r-10");
    iElement.setAttribute("aria-hidden", 'true');

    aElement.appendChild(iElement);

    $container.append(aElement);
}

function buildGallery(product) {

    $container = $('.gallery-lb');

    product.Images.forEach(function (item) {
        addGalleryItem($container, item);
    });

    $container.each(function () { // the containers for all your galleries
        $(this).magnificPopup({
            delegate: 'a', // the selector for gallery item
            type: 'image',
            gallery: {
                enabled: true
            },
            mainClass: 'mfp-fade'
        });
    });
}

function addGalleryItem($container, src) {

    src = "." + src;

    let divElement = document.createElement("div");    
    divElement.setAttribute("class", "item-slick3");
    divElement.setAttribute("data-thumb", src);   

    let div2Element = document.createElement("div");
    div2Element.setAttribute("class", "wrap-pic-w pos-relative");

    let imgElement = document.createElement("img");
    imgElement.setAttribute("src", src);
    imgElement.setAttribute("alt", 'imagen del art�culo');

    div2Element.appendChild(imgElement);

    let aElement = document.createElement("a");
    aElement.setAttribute("class", 'flex-c-m size-108 how-pos1 bor0 fs-16 cl10 bg0 hov-btn3 trans-04');
    aElement.setAttribute("href", src);

    let iElement = document.createElement("i");
    iElement.setAttribute("class", 'fa fa-expand');

    aElement.appendChild(iElement);

    div2Element.appendChild(aElement);

    divElement.appendChild(div2Element);

    $container.append(divElement);
}

function buildRelatedProducts(product) {

    if (product == null || product.Category == null || product.Category.length == 0 || product.SubCategory == null || product.SubCategory.length == 0)
        return;
            
    $.getJSON("./data/products-index.json", function (data) {

        if (data == null)
            return;

        let subcategories = data[product.Category];
        if (subcategories == null)
            return;

        let products = subcategories[product.SubCategory];
        if (products == null)
            return;

        products = getCiclon(products, product.Label);
        $container = $('.slick2');        
        products.forEach(function (item) {
            item.Category = product.Category;
            item.SubCategory = product.SubCategory;
            addProductCardBase($container, item, '', 2);    
        });

        $.getScript('./js/slick-custom.js', function () {
            
        });

        var lazyLoadInstance = new LazyLoad({
            elements_selector: "img[data-src]"            
        });
    });
}

function getCiclon(products, label) {

    const newProducts = [];
    if (products == null || products.length == 0)
        return newProducts;

    let orderProducts = products.sort((a, b) => a.Price - b.Price);
    let index = orderProducts.findIndex(product => product.Label === label);

    if (index < 0)
        return orderProducts;

    orderProducts.splice(index, 1);   

    if (index + 1 == products.length)
        return products.sort((a, b) => b.Price - a.Price);

    let sign = -1;    
     
    let count = 12; 
    while (orderProducts.length > 0 && count > 0) {

        if (index >= orderProducts.length)
            index = orderProducts.length - 1;
        else if (index < 0)
            index = 0;

        newProducts.push(orderProducts[index]);
        orderProducts.splice(index, 1);
        
        if (sign == -1)
            index--;

        sign *= -1;
        count--;
    }

    return newProducts;
}

function addRelatedItem($container, item) {
    let divElement = document.createElement("div");
    divElement.setAttribute("class", "item-slick2 p-l-15 p-r-15 p-t-15 p-b-15");

    let div2Element = document.createElement("div");
    div2Element.setAttribute("class", "block2");

    let div3Element = document.createElement("div");
    div3Element.setAttribute("class", "block2-pic hov-img0");

    const slug = ToSlug(item.Label);

    let imgElement = document.createElement("img");
    imgElement.setAttribute("src", "./images/products/" + slug + "-0.webp");
    imgElement.setAttribute("alt", 'imagen del art�culo');

    div3Element.appendChild(imgElement);

    div2Element.appendChild(div3Element);

    div3Element = document.createElement("div");
    div3Element.setAttribute("class", "block2-txt flex-w flex-t p-t-14");

    div4Element = document.createElement("div");
    div4Element.setAttribute("class", "block2-txt-child1 flex-col-l ");

    let aElement = document.createElement("a");
    aElement.setAttribute("href", "product.html?id=" + slug);
    aElement.setAttribute("class", "stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6");
    aElement.innerText = spanishFormat(item.Label);

    div4Element.appendChild(aElement);

    let spanElement = document.createElement("span");
    spanElement.setAttribute("class", "stext-105 cl3");
    spanElement.innerText = spanishFormat(item.Label);

    div4Element.appendChild(spanElement);

    div3Element.appendChild(div4Element);

    div2Element.appendChild(div3Element);

    divElement.appendChild(div2Element);

    $container.append(divElement);
}
