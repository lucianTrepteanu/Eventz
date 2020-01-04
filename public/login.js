const logName=document.getElementById("logName");
const logPass=document.getElementById("logPass");
let logButton=document.getElementById("logButton");
let logRes=document.getElementById("logRes");

localStorage.setItem("currentUser","");

function check(){
    fetch("http://localhost:8080/users")
        .then(function(res){
            res.json().then(function(users){
                checkUser(users);
            });
        });
}

function checkUser(users){
    let name=logName.value;
    let pass=logPass.value;

    if(logRes.firstChild){
        logRes.removeChild(logRes.firstChild);
    }

    for(var i=0;i<users.length;i++){
        if(users[i].name==name && users[i].pass==pass){
            let messBox=document.createElement('p');
            messBox.innerText="Logged in successfully";
            let container=document.createElement('div');
            container.appendChild(messBox);
            logRes.appendChild(container);
            
            localStorage.setItem("currentUser",name);

            return;
        }
    }

    let messBox=document.createElement('p');
    messBox.innerText="Username or password are incorrect";
    let container=document.createElement('div');
    container.appendChild(messBox);
    logRes.appendChild(container);
}

logButton.onclick=check;

if(logRes.firstChild){
    logRes.removeChild(logRes.firstChild);
}