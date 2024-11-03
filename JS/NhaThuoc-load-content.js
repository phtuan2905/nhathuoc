// function changePage(_contentfile) {
//     window.location.assign(_contentfile);
// }

function loadContent() {
    fetch('NhaThuoc-layout.html')
            .then(response => response.text())
            .then(data => {
                // Tạo một thẻ div tạm để chứa nội dung được tải
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = data;

                // Chọn phần tử trong nội dung đã tải với selector và chèn vào targetElement
                const contentToLoad = tempDiv.querySelector('#header-to-load');
                if (contentToLoad) {
                    document.getElementById('header-to-here').innerHTML = contentToLoad.innerHTML;
                }
            })
            .catch(error => console.error("Error loading HTML:", error));
    
    fetch('NhaThuoc-layout.html')
            .then(response => response.text())
            .then(data => {
                // Tạo một thẻ div tạm để chứa nội dung được tải
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = data;

                // Chọn phần tử trong nội dung đã tải với selector và chèn vào targetElement
                const contentToLoad = tempDiv.querySelector('#footer-to-load');
                if (contentToLoad) {
                    document.getElementById('footer-to-here').innerHTML = contentToLoad.innerHTML;
                }
            })
            .catch(error => console.error("Error loading HTML:", error));
}

async function loadItems(itemclass) {
    var items = document.getElementsByClassName(itemclass);
    var itemslink = document.getElementsByClassName("link-sp");
    var itemspic = document.getElementsByClassName("img-sp");
    var itemsten = document.getElementsByClassName("ten-sp");
    var itemsgtgg = document.getElementsByClassName("gia-tien-giam-gia-sp");
    var itemsgtg = document.getElementsByClassName("gia-tien-goc-sp");
    var itemssl = document.getElementsByClassName("so-luong-sp");
    var itemsdv = document.getElementsByClassName("don-vi-sp");
    var itemsgg = document.getElementsByClassName("giam-gia-sp");
    var itemsbtnchonmua = document.getElementsByClassName("btn-chon-mua");
    
    for (let i = 0; i < items.length; i++) {
        var outerdoc = await fetchFile(itemslink[i].href);
        loadImgFromOuterDoc(outerdoc, "#img-sp", itemspic[i]);
        loadTextFromOuterDoc(outerdoc, "#ten-sp", itemsten[i]);
        loadTextFromOuterDoc(outerdoc, "#gia-tien-giam-gia-sp", itemsgtgg[i]);
        let str = itemsgtgg[i].innerText;
        let finalNumber = 0;
        let matches = str.match(/\d+/g);
        if (matches) {
            let combinedNumber = matches.join("");
            finalNumber = parseInt(combinedNumber, 10);
            console.log(finalNumber.toString());
        }
        if (items[i].hasAttribute("data-price")) {
            items[i].setAttribute("data-price", finalNumber.toString());
        }
        if (itemsgtg.length > 0){
            loadTextFromOuterDoc(outerdoc, "#gia-tien-goc-sp", itemsgtg[i]);
        }
        loadTextFromOuterDoc(outerdoc, "#so-luong-sp", itemssl[i]);
        if (itemsgg.length > 0) {
            loadTextFromOuterDoc(outerdoc, "#giam-gia-sp", itemsgg[i]);
        }
        if (document.getElementsByClassName("btn-chon-mua").length > 0) {
            itemsbtnchonmua[i].setAttribute("data-link", itemslink[i].href.trim());
        }
    }
}

async function fetchFile(url) {
    // Tải nội dung của file HTML bên ngoài
    const response = await fetch(url);
    const htmlText = await response.text();

    // Phân tích HTML thành đối tượng DOM
    const parser = new DOMParser();
    const outerdoc = parser.parseFromString(htmlText, 'text/html');

    return outerdoc;
}

function loadTextFromOuterDoc(outerdoc, selectorid, targetElement) {
    try {
        // Tìm phần tử trong file HTML bên ngoài
        const sourceElement = outerdoc.querySelector(selectorid);
        if (sourceElement) {
            targetElement.textContent = sourceElement.textContent;
        } else {
            targetElement.textContent = "";
        }
    } catch (error) {
        console.error("Lỗi khi tải nội dung:", error);
    }
}

function loadImgFromOuterDoc(outerdoc, selectorid, targetElement) {
    try {
        // Tìm phần tử trong file HTML bên ngoài
        const sourceElement = outerdoc.querySelector(selectorid);
        if (sourceElement) {
            targetElement.src = sourceElement.src;
        }
    } catch (error) {
        console.error("Lỗi khi tải nội dung:", error);
    }
}

function addToGioHang(item) {
    var keyname = "@@@@@".concat(item.getAttribute("data-link"));
    var keyvalue = "1";
    if (document.getElementById("don-vi-sp")) {
        keyvalue = document.getElementById("don-vi-sp").textContent;
    }
    if (localStorage.getItem(keyname) !== null) {
        var newvalue = Number(keyvalue) + Number(localStorage.getItem(keyname));
        keyvalue = newvalue.toString();
    }
    localStorage.setItem(keyname, keyvalue);
}

function loadShoppingCart() {
    if (document.getElementsByClassName("shopping-cart").length <= 0) return;
    var itemindex = 0;
    var items = document.getElementsByClassName("sanpham");
    // var itemorigin = document.getElementById("sanpham-origin");
    var itemslink = document.getElementsByClassName("link-sp");
    var itemsdvi = document.getElementsByClassName("don-vi-sp");
    if (localStorage.length > 0) {
        for (let i = 0; i < localStorage.length; i++) {
            if (localStorage.key(i).substring(0, 5) === "@@@@@") {
                var newitem = items[i].cloneNode(true);
                items[itemindex].insertAdjacentElement("afterend", newitem);
            }    
        }
    }

    items[0].parentNode.removeChild(items[0]);

    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i).substring(0, 5) === "@@@@@") {
            itemslink[i].href = localStorage.key(i).slice(5);
            itemsdvi[i].value = localStorage.getItem(localStorage.key(i));
            // console.log(itemsgtgg[i].innerText.replace(/^\D+/g, ''));
            // var giatien = "1@1@1".textContent.replace(/^\D+/g, '');
            // console.log(giatien);
            // items[i].setAttribute("data-price", "100");
        }
    }
}

function setGiaTien() {
    if (document.getElementsByClassName("shopping-cart").length <= 0) return;
    if (document.getElementsByClassName("sanpham").length <= 0) return;
    var items = document.getElementsByClassName("sanpham");
    var itemsgtgg = document.getElementsByClassName("gia-tien-giam-gia-sp");

    for (let i = 0; i < items.length; i++) {
        let str = itemsgtgg[i].innerText; 
        console.log(str);
        let matches = str.match(/\d+/g);
        if (matches) {
            let combinedNumber = matches.join("");
            let finalNumber = parseInt(combinedNumber, 10);
            console.log(finalNumber);
        }
    }
}

// localStorage.clear();    
loadContent();
loadShoppingCart();
loadItems("sanpham");
// setGiaTien();