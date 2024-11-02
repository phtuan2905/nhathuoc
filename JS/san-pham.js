document.getElementById("thugon").addEventListener("click", function () {
    const a = document.querySelectorAll(".thugon");
    a.forEach((thugon) => {
        thugon.classList.toggle("xemthem");
    });
    if (this.textContent === "thu gọn") {
        this.textContent = "xem thêm";
    } else {
        this.textContent = "thu gọn";
    }
});

function setTitle() {
    document.title.textContent = document.getElementById("ten-sp").textContent;
}

setTitle();