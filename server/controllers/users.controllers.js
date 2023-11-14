import User from "../models/User.js";
import LogContract from "../models/LogContract.js";
import Contract from "../models/Order.js";
import { uploadContract } from "../libs/cloudinary.js";
import fs from "fs-extra";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs'
import Order from "../models/Order.js";

let userList = [
  {
    email: "julianh@gmail.com",
    password: "admin123",
    name: "Julián",
    lastName: "Herrera",
    phone: "301522",
    role: 0
  }
]
export const loginUser = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  const query = User.find({ email: email });
  query
    .exec()
    .then((users) => {
      
      // Maneja los usuarios encontrados
      const found = users.find((user) => bcrypt.compareSync(password, user.password));
      if (found == undefined) {
        res.status(404).send("No encontrado")
      }else{
        res.status(200).send(found);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err); // Maneja el error
    });
};

export const newOrder = async (req, res) => {
  if (req.body.seller === "" || req.body.buyer ==="") {
    res.status(400).send("Formulario Inválido");
  } else {
    try {
      const order = new Order(req.body);  
      await order.save();
      console.log("orden Creado");
      res.status(201).send(order);
    } catch (error) {
      console.log(error)
      res.status(400).send(error);
    }
  }
}





export const newUser = async (req, res) => {
  if (req.body.email === "") {
    res.status(400).send("Formulario Inválido");
  } else {
    try {
      let salt = bcrypt.genSaltSync(10);
      let hash = bcrypt.hashSync(req.body.password, salt);
      req.body.password = hash;
      const user = new User(req.body);  
      await user.save();
      console.log("Usuario Creado");
      res.status(201).send(user.email);
    } catch (error) {
      console.log(error)
      res.status(400).send(error);
    }
  }
}
export const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndUpdate(id, req.body);
    res.send("Usuario Actualizado");
    console.log("Updated");
  } catch (error) {
    res.send(error)
    console.log(error);
  }
};



export const updateContract = async (req, res) => {
  try {
    const{id}=req.params
    const { ced, name, description, signed, user } = req.body;
    if (req.files.contract && ced) {

      const result = await uploadContract(req.files.contract.tempFilePath);
      await fs.remove(req.files.contract.tempFilePath);
      console.log(result);
      const url = result.secure_url;

      const public_id = result.public_id;
      const body = {ced,url,public_id,signed}
      try {
        await Contract.findByIdAndUpdate(id, body);
        
        const logcontract = new LogContract({
          ced,
          name,
          description,
          user,
          signed,
        });
        await logcontract.save();

        res.send("Update");
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log(error);
      res.status(400).send(error);
    }
  } catch (error) {
    res.status(400).send(error);
  }
};
