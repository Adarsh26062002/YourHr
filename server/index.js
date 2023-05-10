const express = require("express");
require("./db");
const userRouter = require("./routers/user");
const app = express();
const cors = require("cors"); 
const fileUpload = require("express-fileupload");
const PORT = process.env.PORT || 3030;

// Setting up middleware 
app.use(express.json());
app.use(cors());
app.use(userRouter);
app.use(fileUpload());

app.post("/",(req,res)=>{
  const filename = Date.now() + "_" + req.files.screenshot.name;
  const file = req.files.screenshot;
  let uploadPath = __dirname + "/uploads/" + filename;
  file.mv(uploadPath,(err)=>{
      if(err){
          return res.send(Err);
      }
  })
  res.send(200);
})

app.listen(PORT,()=>{
  console.log(`server started on ${PORT}`);
})