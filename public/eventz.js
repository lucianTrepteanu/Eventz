const addButton=document.getElementById("addButton");

let evName=document.getElementById("evName");
let evDate=document.getElementById("evDate");
let evHour=document.getElementById("evHour");

let divList=document.getElementById("event-list");
let currentUser=localStorage.getItem("currentUser");

function getEventz(){
    fetch("http://localhost:8080/eventz")
        .then(function(res){
            res.json().then(function(eventz){
                showEventz(eventz);
            });
        });
}

function showEventz(eventz){
    while(divList.firstChild){
        divList.removeChild(divList.firstChild);
    }

    for(var i=0;i<eventz.length;i++){
        let name=document.createElement('a');
        name.innerText="Name: "+eventz[i].name;
        
        let date=document.createElement('a');
        date.innerText="Date: "+eventz[i].date;

        let hour=document.createElement('a');
        hour.innerText="Hour: "+eventz[i].hour;

        let fromUser=document.createElement('a');
        fromUser.innerText="By: "+eventz[i].fromUser;

        let delBtn=document.createElement('button');
        let id=eventz[i].id;
        
        if(eventz[i].fromUser==currentUser){
            delBtn.onclick=function(){
                deleteEvent(id);
            }
        } else {
            delBtn.onclick=function(){
                window.alert("Not your event to delete!");
            }
        }
        delBtn.innerText="Delete";
        delBtn.className="box-btn";
        
        let editBtn=document.createElement('button');
        if(eventz[i].fromUser==currentUser){
            editBtn.onclick=function(){
                updateEvent(id);
            }
        } else {
            editBtn.onclick=function(){
                window.alert("Not your event to edit!");
            }
        }
        editBtn.innerText="Edit";
        editBtn.className="box-btn";

        let btnCont=document.createElement('div');
        btnCont.className='buttons-box';

        let container=document.createElement('div');
        container.className="box";
        container.appendChild(name);
        container.appendChild(date);
        container.appendChild(hour);
        container.appendChild(fromUser);
        
        btnCont.appendChild(delBtn);
        btnCont.appendChild(editBtn);

        container.appendChild(btnCont);

        divList.appendChild(container);
    }
}

function createEvent(){
    if(currentUser==""){
        window.alert("Log in first in order to create an event");
        return;
    } else if(evName.value=="" || !evName.value || evDate.value=="" || !evDate.value || evHour.value=="" || !evHour.value){
        window.alert("All fields are required!");
        return;
    }

    const newObj={
        name:evName.value,
        fromUser:currentUser,
        date:evDate.value,
        hour:evDate.value
    }

    fetch('http://localhost:8080/eventz',{
        method:"post",
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify(newObj)
    }).then(function(){
        getEventz();
        evName.value="";
        evDate.value="";
        evHour.value="";
    });
}

function deleteEvent(id){
    fetch('http://localhost:8080/eventz/'+id,{
        method:"DELETE",
    }).then(function(){
        getEventz();
    });
}

function updateEvent(id){
    if(evName.value=="" || !evName.value || evDate.value=="" || !evDate.value || evHour.value=="" || !evHour.value){
        window.alert("All fields are required!");
        return;
    }

    const newObj={
        name:evName.value,
        date:evDate.value,
        hour:evHour.value,
        fromUser:currentUser,
        id:id
    }

    console.log("CEvA");
    fetch('http://localhost:8080/eventz/'+id,{
        method:"PUT",
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify(newObj)
    }).then(function(){
        getEventz();
        addButton.disabled=false;
        evName.value="";
        evDate.value="";
        evHour.value="";
    });
}

addButton.onclick=createEvent;

getEventz();