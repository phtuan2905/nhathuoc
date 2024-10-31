var pagesum = 1;
var currentpage = 1;

function changePage(button, listid, elementperpage, buttonclass) {
    var clickedelementtext = button.textContent;
    var list = document.getElementById(listid);
    var buttons = document.getElementsByClassName(buttonclass);
    for (let i = 0; i < list.children.length; i++){
        list.children[i].style.display = "none";
        if (i == list.children.length) {
            break;
        }
    }
    for (let i = (clickedelementtext - 1) * elementperpage; i < clickedelementtext * elementperpage; i++){
        list.children[i].style.display = "";
        if (i == list.children.length) {
            break;
        }
    }
    
    button.parentElement.children[currentpage].classList.remove("active");
    button.classList.add("active");
    currentpage = elementperpage;
}

function setPage(listid, elementperpage, buttonid) {
    let list = document.getElementById(listid);
    let elementsum = list.children.length;
    pagesum = Math.ceil(elementsum / elementperpage);
    console.debug(pagesum);
    let originalbutton = document.getElementById(buttonid);
    
    for (let i = 2; i <= pagesum; i++) {
        const clonebutton = originalbutton.cloneNode(true);
        clonebutton.id = "";
        clonebutton.classList.remove("active");
        clonebutton.textContent = i.toString();
        originalbutton.parentElement.appendChild(clonebutton);                               
    }

    if (list.children[elementperpage] !== undefined && list.children[elementperpage] !== null) {
        for (let i = elementperpage; i < elementsum; i++) {
            list.children[i].style.display = "none";
        }
    }
}