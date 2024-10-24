var express= require('express');
var mysql=require('mysql');
var bodyParser=require('body-parser');
var cors=require('cors');
var session=require('express-session');
var cookieParser=require('cookie-parser');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const SECRET_KEY = 'PassW0rd@3646';

var app=express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(session({
    secret:'secret',
    resave:false,
    saveUninitialized:false,
    cookie:{
        secure:false,
        maxAge:1000*60*60*24
    }
}))


var db=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'',
    database:'nodedb2'
})


app.get('/',function(req,res)
{
    res.send('I am server');
});

app.get('/api/get',function(req,res)
{
    var query="select * from userinfo";
    db.query(query, function(error,result)
    {
        if(error)
            {
                console.log("error inside server ");
            }
        res.send(result);
    })
    
})




app.post('/api/post',async function(req,res)
{
    
    var name=req.body.name;
    var contactno=req.body.contactno;
    var emailaddress=req.body.emailaddress;
    // var password=req.body.password;
    var address=req.body.address; 

    const salt=await bcrypt.genSalt(10);
    const secPass=await bcrypt.hash(req.body.password,salt);


    var query="insert into userinfo(name,contactno,emailaddress,password,address) values('"+name+"','"+contactno+"','"+emailaddress+"','"+secPass+"','"+address+"')";
    db.query(query,function(error,result)
    {
        if(error)
        {
            console.log(error);
        }
    })
});




app.delete("/delete/:id",function(req,res){
    const{id}=req.params;
    var query="delete from userinfo where id=?";
    db.query(query,id,function(error,res)
    {
        if(error)
        {
            console.log(error);
        }
    })
})

app.get("/api/get/:id",function(req,res)
{
    const{id}=req.params;
    var query="select * from userinfo where id=?";
    db.query(query,id,function(error,result)
    {
        if(error)
        {
            console.log(error);
        }
        else{
            res.send(result);
        }
    })
});

app.put("/api/put/:id",function(req,res)
{
    const {id}=req.params;
    const {name,contactno,emailaddress,address}=req.body;
    var query="update userinfo set name=?,contactno=?,emailaddress=?,address=? where id="+id;
    db.query(query,[name,contactno,emailaddress,address],function(error,result){
        if(error)
        {
            console.log(error)
        }
        res.send(result);
    });
});






app.post("/login", (req, res) => {
    const password = req.body.password;
    const emailaddress = req.body.emailaddress;

    const query = "SELECT * FROM userinfo WHERE emailaddress = ?";

    db.query(query, [emailaddress], (err, result) => {
        if (err) {
            return res.json({ Message: "Error inside Server" });
        }

        // Handle case when no user is found
        if (result.length === 0) {
            return res.json({ Login: false, Message: "User not found" });
        }

        const user = result[0];

        // Compare the password
        bcrypt.compare(password, user.password).then(function (val) {
            if (val === true) {
                const token = jwt.sign({ emailaddress, password }, SECRET_KEY, { expiresIn: '1h' });
                return res.json({ Login: true, token });
            } else {
                return res.json({ Login: false, Message: "Invalid password" });
            }
        }).catch((error) => {
            return res.json({ Login: false, Message: "Password comparison failed" });
        });
    });
});




app.listen(5010);
