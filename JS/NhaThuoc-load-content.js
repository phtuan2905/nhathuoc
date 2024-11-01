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

loadContent();
