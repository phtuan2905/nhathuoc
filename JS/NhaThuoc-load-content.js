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
    
    for (let i = 0; i < items.length; i++) {
        var itemlink = items[i].querySelector("#link-sp").href;
        var itempic = items[i].querySelector("#img-sp");
        var itemten = items[i].querySelector("#ten-sp");
        var itemgtgg = items[i].querySelector("#gia-tien-giam-gia-sp");
        var itemgtg = items[i].querySelector("#gia-tien-goc-sp");
        var itemsl = items[i].querySelector("#so-luong-sp");
        var itemdv = items[i].querySelector("#don-vi-sp");
        var itemgg = items[i].querySelector("#giam-gia-sp");

        loadImgFromExternalHTML(itemlink, "#img-sp", "#img-sp");
        loadTextFromExternalHTML(itemlink, "#ten-sp", "#ten-sp");
        loadTextFromExternalHTML(itemlink, "#gia-tien-giam-gia-sp", "#gia-tien-giam-gia-sp")
        loadTextFromExternalHTML(itemlink, "#gia-tien-goc-sp", "#gia-tien-goc-sp")
        loadTextFromExternalHTML(itemlink, "#so-luong-sp", "#so-luong-sp")
        var donvispan = document.createElement("span");
        donvispan.id = "#don-vi-sp";
        // donvispan.textContent = donvispan.textContent.concat(" / ");
        itemgtgg.appendChild(donvispan);
        loadTextFromExternalHTML(itemlink, "#don-vi-sp", "#don-vi-sp")
    }
}

async function loadTextFromExternalHTML(url, selector, targetSelector) {
    try {
        // Tải nội dung của file HTML bên ngoài
        const response = await fetch(url);
        const htmlText = await response.text();

        // Phân tích HTML thành đối tượng DOM
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, 'text/html');

        // Tìm phần tử trong file HTML bên ngoài
        const sourceElement = doc.querySelector(selector);
        if (sourceElement) {
            // Gán văn bản từ phần tử bên ngoài vào phần tử trong file hiện tại
            document.querySelector(targetSelector).textContent = sourceElement.textContent;
        } else {
            console.error("Phần tử không tồn tại trong file HTML bên ngoài.");
        }
    } catch (error) {
        console.error("Lỗi khi tải nội dung:", error);
    }
}

async function loadImgFromExternalHTML(url, selector, targetSelector) {
    try {
        // Tải nội dung của file HTML bên ngoài
        const response = await fetch(url);
        const htmlText = await response.text();

        // Phân tích HTML thành đối tượng DOM
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, 'text/html');

        // Tìm phần tử trong file HTML bên ngoài
        const sourceElement = doc.querySelector(selector);
        if (sourceElement) {
            // Gán văn bản từ phần tử bên ngoài vào phần tử trong file hiện tại
            const relativePath = sourceElement.src;
            const absolutePath = `${window.location.origin}/${relativePath}`;
            document.querySelector(targetSelector).src = absolutePath;
        } else {
            console.error("Phần tử không tồn tại trong file HTML bên ngoài.");
        }
    } catch (error) {
        console.error("Lỗi khi tải nội dung:", error);
    }
}

loadContent();
loadItems("sanpham");