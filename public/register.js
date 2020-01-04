const regName=document.getElementById("regName");
const regPass=document.getElementById("regPass");
let regBtn=document.getElementById("regButton");
let regRes=document.getElementById("regRes");

function check(){
    fetch('http://localhost:8080/users')
        .then(function (response) {
            response.json().then(function (users) {
                checkValid(users);
            });
        });
}

function checkValid(users){
    let name=regName.value;
    let pass=regPass.value;

    if(regRes.firstChild){
        regRes.removeChild(regRes.firstChild);
    }

    for(var i=0;i<users.length;i++){
        if(users[i].name==name){
            let messBox=document.createElement('p');
            messBox.innerText="Username already taken.Pick another one";
            let container=document.createElement('div');

            container.appendChild(messBox);
            regRes.appendChild(container);

            return;
        }
    }

    let messBox=document.createElement('p');
    messBox.innerText="User created successfully!";
    let container=document.createElement('div');
    container.appendChild(messBox);
    regRes.appendChild(container);

    const newObj={
        name:name,
        pass:pass
    }

    fetch('http://localhost:8080/users',{
        method:'post',
        headers:{
            "Content-type": "application/json"
        },
        body:JSON.stringify(newObj)
    });
}

regBtn.onclick=check;
if(regRes.firstChild){
    regRes.removeChild(regRes.firstChild);
}

console.log(regBtn.onclick);