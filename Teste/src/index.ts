import * as express from 'express';

const app = express();

app.get('/home',(req,res)=>{
    return res.send({hello:"Hello World"})
});

app.listen(3000,()=>console.log("Listening on port 3000 ..."))