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

function displayData(){
    fetch('/getRecords', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(userData => {
            console.log(userData.Message)
            if (userData.Success) { 
                let userDataObj=JSON.parse(JSON.stringify(userData))                
                userDataObj.Message.forEach(element => {                    
                    let text = document.getElementById("userDataField").cloneNode(true)                      
                    for(var i=0; i< text.childNodes.length;i++){
                        // if(text.childNodes[i].class=="td record-id")
                        // {

                        // }
                        if(text.childNodes[i].className=="td domain-url"){
                            console.log('here')
                            text.childNodes[i].childNodes[0].placeholder = element[0]  

                        }
                        if(text.childNodes[i].className=="td username")
                        {
                            text.childNodes[i].childNodes[0].placeholder = element[1]                     

                        }
                        if(text.childNodes[i].className=="td password"){
                            text.childNodes[i].childNodes[0].placeholder = element[3]

                        }
                                               
                    }              
                    
                    document.getElementById('inputTable').appendChild(text)
                });
            // })
            }
            else {
                alert('No data was found' + userData.Message)
            }
        })
}