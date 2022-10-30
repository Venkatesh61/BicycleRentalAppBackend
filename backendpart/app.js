const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(bodyparser.json());
app.use(cors({
    origin: "http://15.152.38.161:34267",
    credentials: true
}))

// connecting database
const db = mysql.createConnection({
    //host:'team5.cvxprhya6dqq.ca-central-1.rds.amazonaws.com',
    host:'database-team1.cvwpw8f8iba2.ap-northeast-2.rds.amazonaws.com',
    user:'root',
    password:'venkatesh123',
    //database:'bicyclerentaldatabase',
    database:'bicycle',
    port: 3306
})
app.get('/',(req,res)=>{
    res.status(200).send('Backend is working');
});

// check db connection
db.connect(err => {
    if(err){console.log(err)}
    else {
    console.log('Database connected successfully')
    }
})

//get all data from db
app.get('/bicycles',(req,res)=>{
    //console.log('get all bicycles');
    let qrr= `SELECT * FROM bicycles`;
    db.query(qrr,(err,results)=>{
        if(err){
            console.log(err,'errs');
        }
        if(results.length > 0) {
            res.send({
                message:'Get all bicycles data',
                data:results
            });
        };
    });
})

// get single data by ID
app.get('/bicycles/:id',(req,res)=>{
    // console.log("get data by id");
    // console.log(req.params.id);

    let qrrId = req.params.id;
    let qr = `SELECT * FROM bicycles where id = '${qrrId}'`;
    db.query(qr,(err,results)=>{
        if(err){
            console.log(err);
        }
        if(results.length>0){
            res.send({
                message:'Get bicycles data by id',
                data:results
            });
        }else{
            res.send({
                message:'data not found'
            })
        }
    });
})

//post data
app.post('/bicycles',(req,res)=>{
     //console.log('data posted successfully');
     //console.log(req.body,'posting data successful');

     let Name = req.body.name;
     let Cost = req.body.cost;
     let Category = req.body.category;
     let Description = req.body.description;
 
     let qr = `insert into bicycles(name,cost,category,description)value('${Name}','${Cost}','${Category}','${Description}')`;
     db.query(qr,(err,results)=>{
         if(err){
             console.log(err);
         }
         res.send({
             message: 'Data added successfully',
             data:results
         });
     });
})

//update data
app.put('/bicycles/:id',(req,res)=>{
    //console.log(req.body,"updated");
    let nameId = req.params.id;
    let Name = req.body.name;
    let Cost = req.body.cost;
    let Category = req.body.category;
    let Description = req.body.description;

    let qr = `update bicycles set name = '${Name}' ,cost = '${Cost}' , category = '${Category}' ,description = '${Description}' where id = '${nameId}'`;
    db.query(qr,(err,results)=>{
        if(err) {
            console.log(err);
        }
        res.send({
            message: 'Data updated',
            data:results
        })
    })

})

// delete data
app.delete('/bicycles/:id',(req,res)=>{
    let nameId = req.params.id;
    let qr = `delete from bicycles where id = '${nameId}'`;

    db.query(qr,(err,results)=>{
        if(err){console.log(err);}
        res.send({
            message:'Data is deleted successfully',
            data:results
        })
    })
})

// admin
app.post('/adminlogin',(req,res)=>{
    // console.log(req.body,'post data successful');
    
    let userName = req.body.username;
    let Password = req.body.password;
    
    let qr = `insert into adminlogin(username,password)value('${userName}','${Password}')`;
    db.query(qr,(err,results)=>{
        if(err){
            console.log(err);
        }
        res.send({
            message: 'Data created successfully',
            data:results
        });
    });
 })


 app.post('/userlogin',(req,res)=>{
    // console.log(req.body,'post data successful');
     
     let userName = req.body.username;
     let Password = req.body.password;
     
     let qr = `insert into userlogin(username,password)value('${userName}','${Password}')`;
     db.query(qr,(err,results)=>{
         if(err){
             console.log(err);
         }
         res.send({
             message: 'Data created successfully',
             data:results
         });
     });
 })




//get all booking data
app.get('/bookings',(req,res)=>{
    //console.log('get all user');
    let qrr= `SELECT * FROM bookings`;
    db.query(qrr,(err,results)=>{
        if(err){
            console.log(err,'errs');
        }
        if(results.length > 0) {
            res.send({
                message:'Get all booking data',
                data:results
            });
        };
    });
});


// post booking data
app.post('/bookings',(req,res)=>{
    // console.log(req.body,'post data successful');
     let Name = req.body.name;
     let Category = req.body.category;
     let Date = req.body.date;
     let Time = req.body.time;
 
     let qr = `insert into bookings(name,category,date,time)value('${Name}','${Category}','${Date}','${Time}')`;
     db.query(qr,(err,results)=>{
         if(err){
             console.log(err);
         }
         res.send({
             message: 'Booking Sucessfull',
             data:results
         });
     });
 })

 //cancel booking
 app.delete('/bookings/:id',(req,res)=>{
    let nameId = req.params.id;
    let qr = `delete from bookings where id = ${nameId}`;

    db.query(qr,(err,results)=>{
        if(err){console.log(err);}
        res.send({
            message:'Booking Cancelled',
            data:results
        })
    })
})
module.exports = app;