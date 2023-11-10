import { Router } from "express";
import {loginUser, updateContract, updateUser} from "../controllers/users.controllers.js";
const router = Router()


router.post('/login', loginUser)
router.post('/updateuser/:id',ensureToken, updateUser)
router.post('/updatecontract/:id',ensureToken, updateContract)
export default router


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