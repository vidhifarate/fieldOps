import multer from "multer";

const imageFilter= ['image/jpeg', 'image/png', 'image/jpg'];

 export const imageUpload = multer({

  storage:multer.memoryStorage(),

  fileFilter:(req, file, cb)=>{
    if(imageFilter.includes(file.mimetype)){
      cb(null,true);
    }else{
      cb(new Error("Only image files are allowed!"));
    }
  }

});


export default { imageUpload };
