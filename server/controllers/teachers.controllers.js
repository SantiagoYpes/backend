import User from "../models/User.js";
import Book from "../models/Book.js";
import { uploadContract } from "../libs/cloudinary.js";
import Contract from "../models/Contract.js";
import LogContract from "../models/LogContract.js";
import jwt from "jsonwebtoken";
import fs from "fs-extra";
import bcrypt from "bcryptjs";

let bookList =[
  {
    id: 'sa120320322', 
    name: 'El caballo de troya',
    urlImage: 'https://islandpress.org/sites/default/files/default_book_cover_2015.jpg',
    isbn: '454545402032231', 
    author: 'J.j Benitez', 
    quality: 5, 
    selleruser: 'santiyezu8@hotmail.com', 
    quantity: 10, 
    price: 50000,
    description:'No hay', 
    observations:'Pagina 3 rota', 
    onSale:'true' }
]
export const getBooks = async (req, res) => {
  try {
    const list = await Book.find();
    let listBooks = list
      .filter(function (book) {
        return book.onSale === "true";
      })
      .map(function (book) {
        return book;
      });
    listBooks.forEach(function (objeto) {
      delete objeto.propiedad;
    });
    res.status(200).send(listBooks);
  } catch (error) {
    console.log(error);
    res.status(400).error(error);
  }
};

export const getContracts = async (req, res) => {
  try {
    jwt.verify(req.token, "secret", async (err, data) => {
      if (err) {
        res.status(401).send("Token Inválido");
      } else {
        const list = await Contract.find();
        let listContracts = list;
        res.status(200).send(listContracts);
      }
    });
  } catch (error) {
    res.status(400).error(error);
  }
};

export const getLogContract = async (req, res) => {
  jwt.verify(req.token, "secret", async (err, data) => {
    if (err) {
      res.status(401).send("Token Inválido");
    } else {
      try {
        const { id } = req.params;
        console.log(id);
        const query = LogContract.find({ ced: id });
        query
          .exec()
          .then((logs) => {
            // Maneja los usuarios encontrados
            res.send(logs);
            console.log("Busqueda Logs de Contrato");
          })
          .catch((err) => {
            console.log(err);
            res.status(500).send(err); // Maneja el error
          });
      } catch (error) {
        res.status(400).send(error);
      }
    }
  });
};
export const newLogContract = async (req, res) => {
  jwt.verify(req.token, "secret", async (err, data) => {
    if (err) {
      res.status(401).send("Token Inválido");
    } else {
      try {
        if (req.body.ced === "") {
          res.status(400).send("error");
        } else {
          console.log(req.body);
          const logcontract = new LogContract(req.body);
          await logcontract.save();
          console.log("Log de contrato Creado");
          res.status(201).send(logcontract._id);
        }
      } catch (error) {
        res.status(400).send(error);
      }
    }
  });
};
export const newBook = async (req, res) => {
  /*if (req.body.ced === "") {
    res.status(400).send("Formulario Inválido");
  } else {*/
    try {
      
      //var salt = bcrypt.genSaltSync(10);
      //var hash = bcrypt.hashSync(req.body.password, salt);
      //req.body.password = hash;
      const book = new Book(bookList[0]);
      await book.save();
      console.log("Libro Creado");
      res.status(201).send(book._id);
    } catch (error) {
      res.status(400).send(error);
    }
  }

export const updateTeacher = (req, res) => res.send("Teacher updated");

export const deleteTeacher = async (req, res) => {
  jwt.verify(req.token, "secret", async (err, data) => {
    if (err) {
      res.status(401).send("Token Inválido");
    } else {
      try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        res
          .status(200)
          .send("Profesor con ID" + id + "Correctamente eliminado");
      } catch (error) {
        console.log(error);
        res.status(400).send("Ocurrió un error", error);
      }
    }
  });
};

export const deleteContract = async (req, res) => {
  jwt.verify(req.token, "secret", async (err, data) => {
    if (err) {
      res.status(401).send("Token Inválido");
    } else {
      try {
        const { id } = req.params;
        console.log(id);
        try {
          await Contract.findByIdAndDelete(id);
          res.send("Contrato correctamente eliminado");
        } catch (error) {
          res.status(400).send("Ocurrió un error", error);
        }
      } catch (error) {
        res.status(400).send("Ocurrió un error", error);
      }
    }
  });
};

export const teacherId = async (req, res) => {
  jwt.verify(req.token, "secret", async (err, data) => {
    if (err) {
      res.status(401).send("Token Inválido");
    } else {
      try {
        const { id } = req.params;
        const teacher = await User.findById(id);
        const { _id, ced, type, cell, email, name, lastname, valuehour } =
          teacher;
        const response = {
          _id,
          ced,
          type,
          cell,
          email,
          name,
          lastname,
          valuehour,
        };
        res.json(response);
      } catch (error) {
        res.status(400).send(error);
      }
    }
  });
};

export const getContract = async (req, res) => {
  jwt.verify(req.token, "secret", async (err, data) => {
    if (err) {
      res.status(401).send("Token Inválido");
    } else {
      try {
        const { id } = req.params;
        const query = Contract.find({ ced: id });
        query
          .exec()
          .then((contracts) => {
            console.log(contracts);
            res.status(200).send(contracts);
            console.log("Busqueda Contrato");
          })
          .catch((err) => {
            console.log(err);
            res.status(500).send(err); // Maneja el error
          });
      } catch (error) {
        res.status(400).send(error);
      }
    }
  });
};

export const newContract = async (req, res) => {
  jwt.verify(req.token, "secret", async (err, data) => {
    if (err) {
      res.status(401).send("Token Inválido");
    } else {
      try {
        console.log(req.body);
        const { ced, name, description, signed, user } = req.body;
        if (req.files.contract && ced) {
          const result = await uploadContract(req.files.contract.tempFilePath);
          console.log(result);
          await fs.remove(req.files.contract.tempFilePath);
          const url = result.secure_url;

          const public_id = result.public_id;
          try {
            const contract = new Contract({ ced, url, public_id, signed });
            await contract.save();
            const logcontract = new LogContract({
              ced,
              name,
              description,
              user,
              signed,
            });
            await logcontract.save();

            res.status(201).send(contract._id);
          } catch (error) {
            console.log(error);
          }
        } else {
          res.status(400).send("Formulario Inválido");
        }
      } catch (error) {
        res.status(400).send("Formulario Inválido");
      }
    }
  });
};