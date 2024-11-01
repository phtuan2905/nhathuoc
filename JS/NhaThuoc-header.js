function showHideDangNhapModal(option) {
    var dangnhapmodal = document.getElementById("dangnhapmodal");
    if (option == true) {
        dangnhapmodal.style.display = "block";
    }
    else {
        dangnhapmodal.style.display = "none";
    }
}

function checkInputBox(boxid) {
    const inputbox = document.getElementById(boxid);
    var dangnhapmodal = document.getElementById("dangnhapmodal");
    if (inputbox.value.trim() === "") {
        alert("Số điện thoại không được để trống");
        dangnhapmodal.style.display = "block";
    }

    if (/^\d+$/.test(inputbox.value.trim())) {
        alert("Đăng nhập thành công");
    }
    else {
        alert("Số điện thoại không hợp lệ");
        dangnhapmodal.style.display = "block";
    }
}