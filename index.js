const mysql=require('mysql');
const express=require('express');
var app=express();
const bodyparser=require('body-parser');
app.use(bodyparser.json( ));
var mysqlConnection= mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Kyalo1999',
    database:'classdb',
    multipleStatements:true

});
mysqlConnection.connect((err)=>{ 
    if(!err)
    console.log('DB connection suceeded.');
    else
    console.log('DB connection failed \n Error:'+ JSON.stringify(err,undefined,2));

});
app.listen(3000 ,()=>console.log('Express server is running at port no:3000'));
app.get('/students',(req,res)=>{
mysqlConnection.query('SELECT * FROM students' , (err , rows ,fields)=>{
    if(!err)
    res.send(rows);
    else
    console.log(err);

})
});

app.get('/students/:id',(req,res)=>{
    mysqlConnection.query('SELECT * FROM students WHERE id=?' ,[req.params.id], (err , rows ,fields)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);
    
    })
    });

    app.delete('/students/:id',(req,res)=>{
        mysqlConnection.query('DELETE  FROM students' , (err , rows ,fields)=>{
            if(!err)
            res.send('Deleted successfully!');
            else
            console.log(err);
        
        })
        });
        
        app.post('/students',(req,res)=>{
            let clas=req.body;
            var sql= "SET @id=?;SET @fname= ?;SET @email =? ;SET @tel=? ;\
            CALL studentsAddOrEdit(@id,@fname ,@email ,@tel);"; 
            mysqlConnection.query(sql,[clas.id ,clas.fname,clas.email, clas.tel], (err , rows ,fields)=>{

                if(!err)
                rows.forEach(element=>{
                    if(element.constructor ==Array)
                    res.send('inserted students id : ' + element[0].id);
                });
                else
                console.log(err);
            
            })
            });        
            app.put('/students',(req,res)=>{
                let clas=req.body;
                var sql= "SET @id=?;SET @fname= ?;SET @email =? ;SET @tel=? ;\
                CALL studentsAddOrEdit(@id,@fname ,@email ,@tel);"; 
                mysqlConnection.query(sql,[clas.id ,clas.fname,clas.email, clas.tel], (err , rows ,fields)=>{
    
                    if(!err)
                    res.send('updated successfully');
                    
                    else
                    console.log(err);
                
                })
                });        