var express=require("express")
var app=express()
var mongoose=require("mongoose");

const user=require("./routers/useRouter");


app.use(express.json());
//connecting to dataBase
mongoose.connect("mongodb://localhost:27017/socialMedia")
.then(function(){
    console.log("Database connected!")
})
.catch(function(err){
    console.log("Database connection ERRor1");
})

//using the routers
app.use(user);

app.listen(5000,function(err){
    if(err){
        console.log("Error in the server Running!");
    }
    else{
        console.log("server running!")
    }
});