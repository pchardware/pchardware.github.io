﻿ //-*- coding: utf-8 -*-

(function ($) {

    "use strict";

    /*[ Descargar JSON ]
    ===========================================================*/
    $.getJSON("./data/products-index.json", function (data) {

        loadData($, data);

        /*[ Codigo incrustrado en HTML ]
         ===========================================================*/

        $('.parallax100').parallax100();

        $('.gallery-lb').each(function () { // the containers for all your galleries
            $(this).magnificPopup({
                delegate: 'a', // the selector for gallery item
                type: 'image',
                gallery: {
                    enabled: true
                },
                mainClass: 'mfp-fade'
            });
        });

        /*---------------------------------------------*/

        $('.js-pscroll').each(function () {
            $(this).css('position', 'relative');
            $(this).css('overflow', 'hidden');
            var ps = new PerfectScrollbar(this, {
                wheelSpeed: 1,
                scrollingThreshold: 1000,
                wheelPropagation: false
            });

            $(window).on('resize', function () {
                ps.update();
            })
        });


        /*[ Back to top ]
        ===========================================================*/
        var windowH = $(window).height() / 2;

        $(window).on('scroll', function () {
            if ($(this).scrollTop() > windowH) {
                $("#myBtn").css('display', 'flex');
            } else {
                $("#myBtn").css('display', 'none');
            }
        });

        $('#myBtn').on("click", function () {
            $('html, body').animate({ scrollTop: 0 }, 300);
        });


        /*==================================================================
        [ Fixed Header ]*/
        var headerDesktop = $('.container-menu-desktop');
        var wrapMenu = $('.wrap-menu-desktop');

        if ($('.top-bar').length > 0) {
            var posWrapHeader = $('.top-bar').height();
        }
        else {
            var posWrapHeader = 0;
        }


        if ($(window).scrollTop() > posWrapHeader) {
            $(headerDesktop).addClass('fix-menu-desktop');
            $(wrapMenu).css('top', 0);
        }
        else {
            $(headerDesktop).removeClass('fix-menu-desktop');
            $(wrapMenu).css('top', posWrapHeader - $(this).scrollTop());
        }

        $(window).on('scroll', function () {
            if ($(this).scrollTop() > posWrapHeader) {
                $(headerDesktop).addClass('fix-menu-desktop');
                $(wrapMenu).css('top', 0);
            }
            else {
                $(headerDesktop).removeClass('fix-menu-desktop');
                $(wrapMenu).css('top', posWrapHeader - $(this).scrollTop());
            }
        });


        /*==================================================================
        [ Menu mobile ]*/
        $('.btn-show-menu-mobile').on('click', function () {
            $(this).toggleClass('is-active');
            $('.menu-mobile').slideToggle();
        });

        var arrowMainMenu = $('.arrow-main-menu-m');

        for (var i = 0; i < arrowMainMenu.length; i++) {
            $(arrowMainMenu[i]).on('click', function () {
                $(this).parent().find('.sub-menu-m').slideToggle();
                $(this).toggleClass('turn-arrow-main-menu-m');
            })
        }

        $(window).resize(function () {
            if ($(window).width() >= 992) {
                if ($('.menu-mobile').css('display') == 'block') {
                    $('.menu-mobile').css('display', 'none');
                    $('.btn-show-menu-mobile').toggleClass('is-active');
                }

                $('.sub-menu-m').each(function () {
                    if ($(this).css('display') == 'block') {
                        console.log('hello');
                        $(this).css('display', 'none');
                        $(arrowMainMenu).removeClass('turn-arrow-main-menu-m');
                    }
                });
            }
        });


        /*==================================================================
        [ Show / hide modal search ]*/
        $('.js-show-modal-search').on('click', function () {
            $('.modal-search-header').addClass('show-modal-search');
            $(this).css('opacity', '0');
        });

        $('.js-hide-modal-search').on('click', function () {
            $('.modal-search-header').removeClass('show-modal-search');
            $('.js-show-modal-search').css('opacity', '1');
        });

        $('.container-search-header').on('click', function (e) {
            e.stopPropagation();
        });


        /*==================================================================
        [ Isotope ]*/

        $('.isotope-grid').imagesLoaded({
        }, function () {
            loadIsotope();
        });

        //if (document.readyState === 'complete')
        //    onWindowsLoad();
        //else
        //    $(window).on('load', function () { onWindowsLoad(); });
        
        var isotopeButton = $('.filter-tope-group button');

        $(isotopeButton).each(function () {
            $(this).on('click', function () {
                for (var i = 0; i < isotopeButton.length; i++) {
                    $(isotopeButton[i]).removeClass('how-active1');
                }

                $(this).addClass('how-active1');
            });
        });

        /*==================================================================
        [ Filter / Search product ]*/
        $('.js-show-filter').on('click', function (event) {
            event.preventDefault();

            $(this).toggleClass('show-filter');
            $('.panel-filter').slideToggle(400);

            if ($('.js-show-search').hasClass('show-search')) {
                $('.js-show-search').removeClass('show-search');
                $('.panel-search').slideUp(400);
            }
        });

        $('.js-show-search').on('click', function (event) {
            event.preventDefault();
            $(this).toggleClass('show-search');
            $('.panel-search').slideToggle(400);

            if ($('.js-show-filter').hasClass('show-filter')) {
                $('.js-show-filter').removeClass('show-filter');
                $('.panel-filter').slideUp(400);
            }
        });

        /*==================================================================
        [ Cart ]*/
        
        /*==================================================================
        [ +/- num product ]*/
        $('.btn-num-product-down').on('click', function () {
            var numProduct = Number($(this).next().val());
            if (numProduct > 0) $(this).next().val(numProduct - 1);
        });

        $('.btn-num-product-up').on('click', function () {
            var numProduct = Number($(this).prev().val());
            $(this).prev().val(numProduct + 1);
        });
        
    });

})(jQuery);

var filterData = [];
var filterTree = [];
var currentFilter = []; 


var gTagCategory = "";
var gTagSubCategory = "";
var gTagKeyword = "";

function loadIsotope() {

    // init Isotope
    $('.isotope-grid').each(function () {

        $(this).isotope({
            itemSelector: '.isotope-item',
            layoutMode: 'fitRows',
            percentPosition: true,
            sortBy: 'update',
            sortAscending: false,
            animationEngine: 'best-available',
            masonry: {
                columnWidth: '.isotope-item'
            },
            getSortData: {
                price: '[data-price] parseFloat',
                update: '[data-update] parseFloat'
            },
            filter: function () {
                for (let groupKey in currentFilter)
                    if (!$(this).hasClass(groupKey + "-" + currentFilter[groupKey]))
                        return false;

                var searchText = $('[name="search-product"]').val();
                if (searchText != null && searchText.length > 0) {

                    let aClass = $(this).attr('class');
                    var targetData = getFilterValues(aClass, "category")
                        .concat(getFilterValues(aClass, "subcategory"))
                        .concat(getFilterValues(aClass, "feature"))
                        .concat(getFilterValues(aClass, "label"));

                    targetData = targetData.join(' ');
                    let worlds = searchText.split(' ');
                    for (let i = 0; i < worlds.length; i++) {
                        let world = normalizeText(worlds[i]);
                        if (!targetData.includes(world))
                            return false;
                    }
                }

                return true;
            }
        });
    });
}

function loadData($, data) {

    let $topeContainer = $('.isotope-grid').first();
    let $filterCategoriesTag = $('.filter-tope-group');
    let $filtersTag = $('.wrap-filter');

    let orderByFilter = addFiltersTag($filtersTag, 1, "Ordenar por");
    addFilterLi(orderByFilter, "Recientes", "orderBy", true, () => sortProducts("update", "desc", "Recientes"));
    addFilterLi(orderByFilter, "Más económicos", "orderBy", false, () => sortProducts("price", "asc", "Más económicos"));
    addFilterLi(orderByFilter, "Más costosos", "orderBy", false, () => sortProducts("price", "desc", "Más costosos"));


    var urlParams = new URLSearchParams(window.location.search);
    var categoryKeyParam = urlParams.get('category');
    if (categoryKeyParam != null && categoryKeyParam.length > 0) {
        currentFilter['category'] = categoryKeyParam;

        var subcategoryKey = urlParams.get('subcategory');
        if (subcategoryKey != null && subcategoryKey.length > 0) {
            currentFilter['subcategory'] = subcategoryKey;
        }
    }

    var searchParam = urlParams.get('search');
    $('[name="search-product"]').val(searchParam);

    addCategoryTag($filterCategoriesTag, "Todos", "*", categoryKeyParam == null || categoryKeyParam.length == 0);
    for (const categoryKey in data) {

        if (filterTree[categoryKey] == null)
            filterTree[categoryKey] = [];

        filterData[normalizeText(categoryKey)] = categoryKey;

        addCategoryTag($filterCategoriesTag, categoryKey, categoryKey, normalizeText(categoryKey) == categoryKeyParam);

        const category = data[categoryKey];
        for (const subcategoryKey in category) {
            filterData[normalizeText(subcategoryKey)] = subcategoryKey;

            if (filterTree[categoryKey][subcategoryKey] == null)
                filterTree[categoryKey][subcategoryKey] = [];

            const subcategory = category[subcategoryKey];
            for (const productKey in subcategory) {

                const product = subcategory[productKey];

                if (filterTree[categoryKey][subcategoryKey][product.Date] == null)
                    filterTree[categoryKey][subcategoryKey][product.Date] = [];

                var filterClass = "";
                var extendedFeatures = extendFeatures(product);
                for (const featureKey in extendedFeatures) {
                    const feature = extendedFeatures[featureKey];

                    const filterPart = normalizeText(feature);
                    if (filterPart.length > 0) {
                        filterClass += " feature-" + filterPart;

                        filterData[filterPart] = feature;
                        filterTree[categoryKey][subcategoryKey][product.Date].push(feature);
                    }
                }

                addProductCard($topeContainer, product, categoryKey, subcategoryKey, filterClass);
            }
        }
    }

    $topeContainer.on('arrangeComplete', updateView);

    $('[name="search-product"]').keyup(debounce(function () {
        $('.isotope-grid').isotope();
        updateViewSearch($(this));
    }, 400));

    var lazyLoadInstance = new LazyLoad({
        elements_selector: "img[data-src]",
        callback_loaded: function () {
            let iso = $('.isotope-grid');
            if (iso.data('isotope')) 
                iso.isotope('layout');
        }
    });
}

// debounce so filtering doesn't happen every millisecond
function debounce(fn, threshold) {
    var timeout;
    threshold = threshold || 100;
    return function debounced() {
        clearTimeout(timeout);
        var args = arguments;
        var _this = this;
        function delayed() {
            fn.apply(_this, args);
        }
        timeout = setTimeout(delayed, threshold);
    };
}

function updateViewSearch(searchControl = null) {

    if (searchControl == null)
        searchControl = $('[name="search-product"]');

    let searchText = searchControl.val();
    if (searchText != null && searchText.length > 0) {
        $('.js-show-search').addClass("how-active1");

        if (googleAnalyticsId != null && googleAnalyticsId.length > 0) {
            gtag('event', 'search', {
                'search_term': searchText
            });
        }
    }
    else
        $('.js-show-search').removeClass("how-active1");
}

function udpateViewFilter() {
    let anyFilter = false;
    if (currentFilter["subcategory"] != null && currentFilter["subcategory"].length > 0)
        anyFilter = true;

    if (!anyFilter && (currentFilter["feature"] != null && currentFilter["feature"].length > 0))
        anyFilter = true;

    if (anyFilter)
        $('.js-show-filter').addClass("how-active1");
    else
        $('.js-show-filter').removeClass("how-active1");
}

function updateView() {    

    let categories = [];
    let currentCategory = currentFilter["category"];
    let currentSubcategory = currentFilter["subcategory"];
    let currentTSubcategory = null;
    if (currentCategory == null) {

        for (var categoryKey in filterTree) {
            categories.push(categoryKey);

            if (currentSubcategory != null) {
                let tCategory = filterTree[categoryKey];                
                for (var subcategoryKey in tCategory) {
                    if (currentSubcategory == normalizeText(subcategoryKey))
                        currentTSubcategory = subcategoryKey;
                }
            }
        }            
    }
    else {       
        let categoryKey = filterData[currentCategory];       
        categories.push(categoryKey);

        let tCategory = filterTree[categoryKey];

        if (currentSubcategory != null) {            
            for (var subcategoryKey in tCategory) {                
                if (currentSubcategory == normalizeText(subcategoryKey))
                    currentTSubcategory = subcategoryKey;
            }
        }
    }

    let subcategories = [];
    let products = [];
    for (let i in categories) {
        let categoryKey = categories[i];
        let tCategory = filterTree[categoryKey];
        for (let subCategoryKey in tCategory)
        {
            subcategories.push(subCategoryKey);

            if (currentTSubcategory != null && currentTSubcategory != subCategoryKey)
                continue;

            let tSubcategory = tCategory[subCategoryKey];
            for (let productKey in tSubcategory) {
                let tProduct = tSubcategory[productKey];
                if (tProduct != null && tProduct.length > 0)                    
                    products.push(tProduct);                                  
            }            
        }
    }

    subcategories = subcategories.filter(function (valor, indice) {
        return subcategories.indexOf(valor) === indice;
    });
    
    updateFilters("Subcategorías", 2, subcategories.sort(), false, "subcategory");

    var keywords = getKeywords(products, 15);
    updateFilters("Palabras clave", 3, keywords, true, "feature");
    udpateViewFilter();

    if (googleAnalyticsId != null && googleAnalyticsId.length > 0) {
        if (currentCategory != null && currentCategory.length > 0 && currentCategory != gTagCategory) {
            
            gtag('event', 'apply_filters', {
                'event_category': 'Interacción del usuario',
                'event_label': 'Categoría',
                'value': currentCategory
            });

            gTagCategory = currentCategory;
        }

        if (currentSubcategory != null && currentSubcategory.length > 0 && currentSubcategory != gTagSubCategory) {

            gtag('event', 'apply_filters', {
                'event_category': 'Interacción del usuario',
                'event_label': 'Subcategoría',
                'value': currentSubcategory
            });

            gTagSubCategory = currentSubcategory;
        }

        var currentFeature = currentFilter["feature"];
        if (currentFeature != null && currentFeature.length > 0 && currentFeature != gTagKeyword) {

            gtag('event', 'apply_filters', {
                'event_category': 'Interacción del usuario',
                'event_label': 'Característica',
                'value': currentFeature
            });

            gTagKeyword = currentFeature;
        }
    }
}



function extendFeatures(product) {
    const words = product.Label.split(' ');
    let featuresExtended = (product.Features || []).concat(words);

    const splitedWords = featuresExtended
        .flatMap(element => element.split('-'))
        .filter(subword => subword.length > 1);

    return splitedWords;
}

function getKeywords(products, numKeywords) {
    // Concatenate all keywords into a single array
    const keywords = products.flatMap(product => product.map(word => word.toLowerCase()));
    
    // Create a word frequency object
    const frequency = keywords.reduce((obj, word) => {
        obj[word] = (obj[word] || 0) + 1;
        return obj;
    }, {});

    // Filter out keywords that appear too frequently or infrequently
    const numProducts = products.length;
    const minFrequency = Math.ceil(numProducts * 0.05);
    const maxFrequency = Math.floor(numProducts * 0.7);
    const filteredKeywords = Object.keys(frequency)
        .filter(word => frequency[word] >= minFrequency && frequency[word] <= maxFrequency);
    
    // Sort filtered keywords by frequency
    filteredKeywords.sort((a, b) => frequency[b] - frequency[a]);

    // Return the top N most frequent keywords
    return filteredKeywords.slice(0, numKeywords);
}

function updateFilters(title, pos, collection, forTags, prevFilter) {
    let $filtersTag = $('.wrap-filter');
    let filtersTag = addFiltersTag($filtersTag, pos, title, forTags);
    filtersTag.innerHTML = "";    

    let current = currentFilter[prevFilter];
    for (var item in collection) {
        let label = collection[item];
        if (forTags)
            addFilterDiv(filtersTag, label, prevFilter, current == normalizeText(label));
        else
            addFilterLi(filtersTag, label, prevFilter, current == normalizeText(label));
    }
}

function addCategoryTag($container, label, filterValue, active) {

    let newButton = document.createElement("button");
    let aClass = "stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5";
    if (active)
        aClass += " how-active1";

    newButton.setAttribute("class", aClass);    
    newButton.textContent = spanishFormat(label);

    newButton.addEventListener('click', () => {   

        if (filterValue == "*" && currentFilter["category"] == null)
            return;

        if (currentFilter["category"] == normalizeText(filterValue))
            return;

        currentFilter = [];
        if (filterValue != "*") 
            currentFilter["category"] = normalizeText(filterValue);

        $('.isotope-grid').isotope();
    });

    $container.append(newButton);
}

function addFiltersTag($container, col, label, forTags = false) {

    let filterCol = "filter-col" + col;
    let newDiv = $container.find("." + filterCol);
    if (newDiv != null && newDiv.length > 0)
    {
        newDiv = newDiv.first();
        if (forTags)           
            return newDiv.find("div")[1];

        return newDiv.find("ul").first().get(0);
    }
    
    newDiv = document.createElement("div");
    if (forTags) {
        newDiv.setAttribute("class", filterCol + " p-b-27");
    }
    else {
        newDiv.setAttribute("class", filterCol + " p-r-15 p-b-27");
    }

    let newDiv1 = document.createElement("div");
    newDiv1.setAttribute("class", "mtext-102 cl2 p-b-15");
    newDiv1.textContent = spanishFormat(label);

    newDiv.appendChild(newDiv1);  
    $container.append(newDiv);

    let containerElement;

    if (forTags) {
        containerElement = document.createElement("div");
        containerElement.setAttribute("class", "flex-w p-t-4 m-r--5");
        newDiv.appendChild(containerElement);
        return containerElement;
    }
  
    containerElement = document.createElement("ul");
    newDiv.appendChild(containerElement);  

    return containerElement;    
}

function addFilterLi(container, label, groupKey = null, active = false, action = null) {
    let newLi = document.createElement("li");
    newLi.setAttribute("class", "p-b-6");

    let newA = document.createElement("a");

    let aClass = "filter-link stext-106 trans-04";
    if (groupKey != null && groupKey.length > 0) {
        aClass += (" " + groupKey);

        newA.addEventListener('click', () => {
            if (action != null) {
                action();
                return;
            }

            if (currentFilter[groupKey] == normalizeText(label))
                delete currentFilter[groupKey];
            else
                currentFilter[groupKey] = normalizeText(label);

            delete currentFilter["feature"];
            $('.isotope-grid').isotope();
        });
    }

    if (active)
        aClass += " filter-link-active";

    newA.setAttribute("class", aClass);
    newA.setAttribute("href", "#"); 
    var text = spanishFormat(label);
    newA.textContent = text;

    newLi.appendChild(newA);

    container.appendChild(newLi);

    $(newA).on('click', function (event) { event.preventDefault() });
}

function addFilterDiv(container, label, groupKey = null, active = false) {
       
    let newA = document.createElement("a");

    let aClass = "flex-c-m stext-107 cl6 size-301 bor7 p-lr-15 hov-tag1 trans-04 m-r-5 m-b-5";
    if (groupKey != null && groupKey.length > 0) {
        aClass += (" " + groupKey);

        newA.addEventListener('click', () => {
            if (currentFilter[groupKey] == normalizeText(label))
                delete currentFilter[groupKey];
            else
                currentFilter[groupKey] = normalizeText(label);

            $('.isotope-grid').isotope();
        });
    }

    if (active)
        aClass = "flex-c-m stext-107 size-301 p-lr-15 hov-tag1 trans-04 m-r-5 m-b-5 filter-link-active-bor";

    newA.setAttribute("class", aClass);
    newA.setAttribute("href", "#");
    newA.textContent = spanishFormat(label);

    container.appendChild(newA);
}

function addProductCard($container, product, categoryKey, subcategoryKey, filterClass) {
    
    let filterPart = normalizeText(categoryKey);
    if (filterPart.length > 0) {
        filterClass += " category-" + filterPart;
    }

    filterPart = normalizeText(subcategoryKey);
    if (filterPart.length > 0) {
        filterClass += " subcategory-" + filterPart;
    }

    filterPart = normalizeText(product.Label);
    if (filterPart.length > 0)
        filterClass += " label-" + filterPart;

    product.Category = categoryKey;
    product.SubCategory = subcategoryKey;
    addProductCardBase($container, product, filterClass);
}

function sortProducts(sortBy, sortDirection, text) {
    $('.isotope-grid').isotope({ sortBy: sortBy, sortAscending: sortDirection == "asc" });

    $('.orderBy').each(function () {
        var item = $(this);
        item.removeClass('filter-link-active');

        if (item.text() == spanishFormat(text))
            item.addClass('filter-link-active');              
    });
}