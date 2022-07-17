const { Console } = require('console');
const { name } = require('ejs');
//this app has all the functionalities 
const express = require('express');
const path = require('path');
const { title } = require('process');
const port = 7000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();

app.set('view engine' , 'ejs');
app.set('views', path.join(__dirname,'views'));

app.use(express.urlencoded());
app.use(express.static('assets'));

app.get('/' , function(req , res){

    Contact.find({},function(err,contacts){
        if(err){
            console.log('Error in fetching contacts from db');
            return;
        }
        return res.render('home', {
            title:"Contact List",
            Contact_List : contacts
        });
    });
   
});

app.get('/practice' , function(req , res){
    return res.render('practice',{
        title : "practice with ejs"
    });
});
 
app.post('/create-contact', function(req , res){

    Contact.create({
        name : req.body.name,
        phone : req.body.phone
    } , function(err, newContact){
        if(err){console.log('error is creating a contact!'); return;}

        console.log('*******',newContact);
        return res.redirect('back');
    });
});

app.get('/delete-contact/', function(req , res ){
 
    let id=req.query.id;
    Contact.findByIdAndDelete(id ,function(err){
        if(err){
            console.log('Error in deleting an Object from database');
            return;
        }
        return res.redirect('back');
    });

});

app.listen(port, function(err){
    if(err){
        console.log("Error is Running the Server",err);

    }
    console.log('Yup !My Exprees Server is running on Port :',port);

});