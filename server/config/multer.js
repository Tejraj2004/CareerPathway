import multer from "multer";
//parse form data that we get from user
const storage = multer.diskStorage({})

const upload = multer({storage})

export default upload