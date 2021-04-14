var clickedIcon = false;
var closedIcon = false;
var clickedOutside = false;

document.getElementById("btn-dropdown-menu").onclick = function () {
    var dropdownContent = document.getElementById("dropdown-content");
    if (dropdownContent.style.display == "none" || dropdownContent.style.display == "") {
        dropdownContent.style.display = "block"
    } else {
        document.getElementById("btn-dropdown-menu").blur()
        dropdownContent.style.display = "none"
    }
};

document.getElementById("btn-dropdown-menu").onblur  = function () {
    if (!closedIcon && !clickedIcon) {
        clickedOutside = true;
    }

    
    document.getElementById("dropdown-content").style.display = "none";
};

document.getElementById("dropdown-icon").onclick = function () {
    var dropdownContent = document.getElementById("dropdown-content");
    if (dropdownContent.style.display == "none" && clickedIcon && !closedIcon & !clickedOutside){
        closedIcon = true;
        return;
    }

    if (dropdownContent.style.display == "none" || dropdownContent.style.display == "") {
        document.getElementById("btn-dropdown-menu").click()
        document.getElementById("btn-dropdown-menu").focus()
        clickedIcon = true;
        closedIcon = false;
        clickedOutside = false;
    } else {
        clickedIcon = false
        dropdownContent.style.display = "none";
        clickedOutside = false
    }
};