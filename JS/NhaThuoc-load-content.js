function changePage(_contentfile) {
    window.location.assign('NhaThuoc-layout.html');
}

function loadContent() {
    const initialContent = "<h2>Welcome to the Home Page</h2><p>This is the main content of the homepage.</p>";
    document.getElementById('content-container').innerHTML = initialContent;
}

document.addEventListener('DOMContentLoaded', () => { loadContent(); });

