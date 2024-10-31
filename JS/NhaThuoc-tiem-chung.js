function hideShow(option, hideshowclass) {
    const hideshowelements = document.getElementsByClassName(hideshowclass);
    if (option == true) {
        for (let i = 0; i < hideshowelements.length; i++) {
            hideshowelements[i].style.display = "block";
        }
    }
    else {
        for (let i = 0; i < hideshowelements.length; i++) {
            hideshowelements[i].style.display = "none";
        }
    }
}

function hideShow_list(hideclass, selfid) {
    const hideelements = document.getElementsByClassName(hideclass);
    for (let i = 0; i < hideelements.length; i++) {
        hideelements[i].style.display = "none";
    }
    var e = document.getElementById(selfid);
    var value = e.value;
    document.getElementById(value).style.display = "block";
}

function checkFormInformation(formid, informationclass) {
    var form = document.getElementById(formid);
    var infors = document.getElementsByClassName(informationclass);
    var formvalid = true;
    let alertstr = "";
    for (let infor of infors ){
        if (infor.value.trim() === "") {
            formvalid = false;
            //alertstr = alertstr.concat(infor.placeholder, ", ");
            if (infor.tagName === "INPUT"){
                alertstr = alertstr.concat(infor.placeholder, ", ");
            }
            else if (infor.tagName === "SELECT") {
                alertstr = alertstr.concat(infor.options[infor.selectedIndex].text, ", ");
            }
        }
        
    }

    if (formvalid == false) {
        alertstr = alertstr.substring(0, alertstr.length - 2);
        alertstr = alertstr.concat(" không được để trống");
        alert(alertstr);
    }
    return formvalid;
}

function checkRadioButton(radioname) {
    var radios = document.getElementsByName(radioname);
    var ischecked = false;
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            ischecked = true;
            break;
        }
    }

    if (ischecked == false) {
        alert("Chọn nhà thuốc không được để trống");
    }
    return ischecked;
}

function checkForm(formid, informationclass, radioname) {
    if (checkFormInformation(formid, informationclass) && checkRadioButton(radioname)) {
        alert("Đăng ký thành công");
    }
}