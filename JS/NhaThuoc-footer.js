let contentLoaded = false; // Biến kiểm tra xem nội dung đã được tải chưa
let originalContent = ''; // Biến lưu trữ nội dung gốc
let currentFile = ''; // Biến lưu file hiện tại đang tải

function loadContent(file) {
    // Kiểm tra nếu nội dung đã được tải, tránh tải lại
    if (contentLoaded && file === currentFile) {
        console.warn('Content has already been loaded.');
        return;
    }

    // Hiển thị thông báo đang tải
    const contentDiv = document.getElementById('content');
    originalContent = contentDiv.innerHTML; // Lưu nội dung gốc
    contentDiv.innerHTML = '<p>Loading...</p>'; // Thay đổi nội dung để hiển thị thông báo đang tải

    fetch(file) // Tải file HTML được chỉ định
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text(); // Chuyển đổi phản hồi thành văn bản
        })
        .then(data => {
            contentDiv.innerHTML = data; // Chèn nội dung vào phần tử #content
            contentLoaded = true; // Đánh dấu là đã tải nội dung
            currentFile = file; // Lưu file hiện tại

            // Cập nhật lịch sử, lưu cả file và trạng thái contentLoaded
            history.pushState({ content: contentDiv.innerHTML, file: file, contentLoaded: true }, 'Title', '');

            // Cập nhật liên kết trong nội dung mới để chúng hoạt động
            updateLinks();
        })
        .catch(error => {
            console.error('Error loading content:', error);
            contentDiv.innerHTML = '<p>Error loading content. Please try again later.</p>';
        });
}

function updateLinks() {
    const links = document.querySelectorAll('#content a');
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const file = this.getAttribute('href'); // Lấy URL từ href của liên kết
            loadContent(file); // Tải nội dung tương ứng với liên kết
        });
    });
}

// Xử lý sự kiện popstate để khôi phục trạng thái trang khi quay lại
window.onpopstate = function(event) {
    const contentDiv = document.getElementById('content');
    
    // Nếu có trạng thái trước đó trong lịch sử
    if (event.state) {
        // Nếu đã tải một file khác thì tải lại file đó
        if (event.state.file && event.state.file !== currentFile) {
            loadContent(event.state.file);
        } else {
            // Khôi phục nội dung từ trạng thái lịch sử
            contentDiv.innerHTML = event.state.content;
            contentLoaded = event.state.contentLoaded;
            currentFile = event.state.file;
            updateLinks(); // Cập nhật liên kết
        }
    } else {
        contentDiv.innerHTML = originalContent; // Nếu không có trạng thái, phục hồi nội dung gốc
        contentLoaded = false;
        currentFile = '';
        updateLinks(); // Cập nhật liên kết
    }
};
