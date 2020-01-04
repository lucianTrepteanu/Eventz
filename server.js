const express=require("express");
const cors=require("cors");
const fs=require("fs");
const uuidv4=require("uuid/v4");
const bodyParser=require("body-parser");
const morgan=require("morgan");

const app=express();

app.use(cors());
app.use(bodyParser.json());
app.use(morgan("tiny"));

app.use(express.static(__dirname+"/public"));

app.post("/users",function(req,res){
    const userList=JSON.parse(fs.readFileSync("login.json"))["users"];
    const newUser=req.body;
    newUser.id=uuidv4();
    userList.push(newUser);
    writeJSON(userList,"login.json");
    res.json(newUser);
});

app.get("/users",function(req,res){
    const userList=JSON.parse(fs.readFileSync("login.json"))["users"];
    res.json(userList);
});

app.get("/eventz",function(req,res){
    const eventList=JSON.parse(fs.readFileSync("eventz.json"))["eventz"];
    res.json(eventList);
});

app.post("/eventz",function(req,res){
    const eventList=JSON.parse(fs.readFileSync("eventz.json"))["eventz"];
    const newEvent=req.body;
    newEvent.id=uuidv4();
    eventList.push(newEvent);
    writeJSON(eventList,"eventz.json");
    res.json(newEvent);
});

function writeJSON(data,path){
    if(path=="login.json"){
        fs.writeFileSync(
            path,
            JSON.stringify({users:data}),
            "utf8"
        );
    } else {
        fs.writeFileSync(
            path,
            JSON.stringify({eventz:data}),
            "utf8"
        );
    }
}

app.get("/eventz/:id",function(req,res){
    const eventList=JSON.parse(fs.readFileSync("eventz.json"))["eventz"];
    const linkId=req.params.id;

    let event;
    let found=false;
    for(var i=0;i<eventList.length;i++){
        if(eventList[i].id==linkId){
            event=eventList[i];
            found=true;
        }
    }

    if(found==true){
        res.json(event);
    } else {
        res.status(404).send("Event not found!");
    }
});

app.delete("/eventz/:id",function(req,res){
    const eventList=JSON.parse(fs.readFileSync("eventz.json"))["eventz"];
    const linkId=req.params.id;

    const newList=[];
    for(var i=0;i<eventList.length;i++){
        if(eventList[i].id!=linkId){
            newList.push(eventList[i]);
        }
    }

    console.log(linkId);

    if(newList.length!=eventList.length){
        res.status(200).send("Event was found and removed");
        writeJSON(newList,"eventz.json");
    } else {
        res.status(404).send("Event was not found");
    }
});

app.put("/eventz/:id",function(req,res){
    const eventList=JSON.parse(fs.readFileSync("eventz.json"))["eventz"];
    const id=req.params.id;
    const newObj=req.body;

    const newList=[];
    let found=false;

    for(var i=0;i<eventList.length;i++){
        if(eventList[i].id!=newObj.id){
            newList.push(eventList[i]);
        } else {
            newList.push(newObj);
            found=true;
        }
    }

    writeJSON(newList,"eventz.json");

    if(found==true){
        res.json(newObj);
    } else {
        res.status(404).send("Event was not found");
    }
});

app.listen("8080",()=>
    console.log("Server started at 8080\n")
);