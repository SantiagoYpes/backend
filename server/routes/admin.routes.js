import { Router } from "express";
import { deleteContract, deleteTeacher, getUserBooks, getBuyerUsers, getLogContract, getBooks, newContract, newLogContract, newBook, getUserByEmail, updateUser, getAllUsers} from "../controllers/teachers.controllers.js";
const router = Router()

router.get('/hello', (req,res) => res.send("Hello World"))

router.get('/logcontract/:id',ensureToken, getLogContract)
router.post('/newlogcontract',ensureToken, newLogContract)

router.get('/books', getBooks)
router.get('/newBook', newBook)
router.put('/updateUser', updateUser)
router.delete('/deleteTeacher/:id',ensureToken, deleteTeacher)

router.get('/userByEmail/:email', getUserByEmail)
router.post('/newContract',ensureToken, newContract)
router.get('/getUsersBooks/:email', getUserBooks)
router.get('/getAllUsers', getAllUsers)
router.get('/getBuyerUsers', getBuyerUsers)
router.delete('/deletecontract/:id',ensureToken, deleteContract)

function ensureToken(req, res, next){
    const bearerHeader = req.headers['authorization']
    console.log(bearerHeader);
    if (bearerHeader){
        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1]
        req.token = bearerToken
        next()
    }else{
        res.status(403).send("No autorizado, no hay Token")
        console.log("No hay token");
    }
}

export default router