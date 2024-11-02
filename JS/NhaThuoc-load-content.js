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
    
    for (let i = 0; i < items.length; i++) {
        var outerdoc = await fetchFile(itemslink[i].href);
        loadImgFromOuterDoc(outerdoc, "#img-sp", itemspic[i]);
        loadTextFromOuterDoc(outerdoc, "#ten-sp", itemsten[i]);
        loadTextFromOuterDoc(outerdoc, "#gia-tien-giam-gia-sp", itemsgtgg[i]);
        loadTextFromOuterDoc(outerdoc, "#gia-tien-goc-sp", itemsgtg[i]);
        loadTextFromOuterDoc(outerdoc, "#so-luong-sp", itemssl[i]);
        loadTextFromOuterDoc(outerdoc, "#giam-gia-sp", itemsgg[i]); 
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

async function loadTextFromOuterDoc(outerdoc, selectorid, targetElement) {
    try {
        // Tìm phần tử trong file HTML bên ngoài
        const sourceElement = outerdoc.querySelector(selectorid);
        if (sourceElement) {
            targetElement.textContent = sourceElement.textContent;
        } else {
            targetElement.textContent = null;
        }
    } catch (error) {
        console.error("Lỗi khi tải nội dung:", error);
    }
}

async function loadImgFromOuterDoc(outerdoc, selectorid, targetElement) {
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

loadContent();
loadItems("sanpham");