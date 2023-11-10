import { Router } from "express";
import { deleteContract, deleteTeacher, getContract, getContracts, getLogContract, getTeachers, newContract, newLogContract, newTeacher, teacherId, updateTeacher} from "../controllers/teachers.controllers.js";
const router = Router()

router.get('/hello', (req,res) => res.send("Hello World"))

router.get('/logcontract/:id',ensureToken, getLogContract)
router.post('/newlogcontract',ensureToken, newLogContract)

router.get('/teachers', getTeachers)
router.post('/newTeacher', newTeacher)
router.put('/putTeacher',ensureToken, updateTeacher)
router.delete('/deleteTeacher/:id',ensureToken, deleteTeacher)

router.get('/teacher/:id',ensureToken, teacherId)
router.post('/newContract',ensureToken, newContract)
router.get('/contract/:id',ensureToken, getContract)
router.get('/contracts',ensureToken, getContracts)
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