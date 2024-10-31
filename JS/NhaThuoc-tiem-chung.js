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
    for (let infor of infors ){
        // if (infor)
    }
}