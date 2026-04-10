import  jwt  from "jsonwebtoken"

const SECRET = "mysecret123"

const verifyToken = (req,res, next) =>{
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send("Access denied")
  }
  const token = authHeader.split(" ")[1];
  
  try {
    const decode = jwt.verify(token, SECRET);
    req.user = decode;
    next();
  } catch (err) {
    return res.status(401).send("Invalid token")
  }
  
};

export default verifyToken;