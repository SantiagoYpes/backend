import User from "../models/User.js";
import Book from "../models/Book.js";
import { uploadContract } from "../libs/cloudinary.js";
import Contract from "../models/Order.js";
import LogContract from "../models/LogContract.js";
import jwt from "jsonwebtoken";
import fs from "fs-extra";
import bcrypt from "bcryptjs";
import Order from "../models/Order.js";

let bookList = [
  {
    id: "sa20131458",
    name: "Don Quijote de la Mancha",
    urlImage:
      "https://images.cdn1.buscalibre.com/fit-in/360x360/a6/18/a618be10eae5c2a608ec6e22e6917e29.jpg",
    isbn: "644232800858454",
    author: "Miguel de Cervantes",
    quality: 5,
    selleruser: "juliann4567@hotmail.com",
    quantity: 1,
    price: 35000,
    description:
      "El Quijote es una obra literaria escrita por Miguel de Cervantes Saavedra. Es considerada una de las obras más influyentes de la literatura española y se le considera la primera novela moderna",
    observations: "Ninguna",
    onSale: "true",
  },
  {
    id: "sa12931741",
    name: "La emperatriz de los etéreos",
    urlImage: "https://imagessl6.casadellibro.com/a/l/t5/06/9788420472706.jpg",
    isbn: "569939226888700",
    author: "Laura Gallego García",
    quality: 4,
    selleruser: "juliann4567@hotmail.com",
    quantity: 1,
    price: 15000,
    description:
      "La historia sigue a Bipa, quien vive en las Cuevas con su gente y no cree en los cuentos de hadas.",
    observations: "Portada algo rasguñada",
    onSale: "true",
  },
  {
    id: "sa219137134745",
    name: "El extraño caso del Dr. Jekyll y Mr. Hyde",
    urlImage:
      "https://images.cdn2.buscalibre.com/fit-in/360x360/ba/a9/baa984f1c8c486cf2587c37b339ebc0b.jpg",
    isbn: "698098928794686",
    author: "Robert Louis Stevenson",
    quality: 4,
    selleruser: "juliann4567@hotmail.com",
    quantity: 1,
    price: 60000,
    description:
      "Es una novela corta publicada por primera vez en inglés en 1886. La historia trata sobre un abogado, Gabriel John Utterson, que investiga la extraña relación entre su viejo amigo, el Dr. Henry Jekyll, y el misántropo Edward Hyde.",
    observations: "Anotación en la página 15",
    onSale: "true",
  },
  {
    id: "sa89932327",
    name: "Cuentos de la selva",
    urlImage:
      "https://image.cdn1.buscalibre.com/5b58191a8863b5ce6c8b4567.RS500x500.jpg",
    isbn: "049817956037864",
    author: "Horacio Quiroga",
    quality: 5,
    selleruser: "santiyezu8@hotmail.com",
    quantity: 1,
    price: 10000,
    description: "Es un conjunto de 8 cuentos cortos relacionado a la selva",
    observations: "Ninguna",
    onSale: "true",
  },
  {
    id: "sa927438146",
    name: "El Cuervo",
    urlImage:
      "https://images.cdn3.buscalibre.com/fit-in/360x360/82/54/8254f97525fefd437779e36786312678.jpg",
    isbn: "952739239644789",
    author: "Edgar Alan Poe",
    quality: 5,
    selleruser: "santiyezu8@hotmail.com",
    quantity: 1,
    price: 10000,
    description: "Es un poema corto",
    observations: "Ninguna",
    onSale: "true",
  },
  {
    id: "sa92137812631",
    name: "La llamada de Cthulhu",
    urlImage:
      "https://images.cdn1.buscalibre.com/fit-in/360x360/b3/8e/b38eda3c48608c1c9c1f04089865ba32.jpg",
    isbn: "956757564136394",
    author: "Howard Phillips Lovecraft",
    quality: 4,
    selleruser: "santiyezu8@hotmail.com",
    quantity: 1,
    price: 100000,
    description:
      "El relato es uno de los más conocidos de Lovecraft y es considerado como el inicio del horror cósmico de los Mitos de Cthulhu",
    observations: "Ninguna",
    onSale: "true",
  },
];

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

export const getAllUsers = async (req, res) => {
  try {
    const list = await User.find();
    console.log(list);
    res.status(200).send(list);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getOrdersUser = async (req, res) => {
  const { buyer } = req.params;
  try {
    const list = await Order.find({buyer:buyer});
    let listUser = list;
    res.status(200).send(listUser);
  } catch (error) {
    res.status(400).send(error);
  }
};
export const getBuyerUsers = async (req, res) => {
  try {
    const list = await User.find();
    let listUser = list;
    listUser = listUser.filter((user) => user.role == 0);
    console.log(listUser);
    res.status(200).send(listUser);
  } catch (error) {
    res.status(400).send(error);
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
  console.log(req.body);
  if (req.body.selleruser === "") {
    res.status(400).send("Formulario Inválido");
  } 
  try {
    const book = new Book(req.body);
    await book.save();
    console.log("Libro Creado");
    res.status(201).send(book);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const updateUser = async(req, res) =>{
  try{
    let book = req.body
    console.log(book)
    try{
      let user = User.findOneAndUpdate({email:book.email},{name:book.name})
      res.send(user);
    }catch(error){
      console.log(error);
      res.status(400).send(error)
    }
    
  }
  catch(error){
    res.status(400).send(error)
  }

}

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

export const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const book = await User.find({ email: email });
    if (book.length != 0) {
      res.json(book);
    } else {
      res.status(404).send("No se encontraron resultados");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

export const getUserBooks = async (req, res) => {
  try {
    const { email } = req.params;
    console.log(email);
    const query = Book.find({ selleruser: email });
    query
      .exec()
      .then((books) => {
        console.log(books);
        res.status(200).send(books);
        console.log("Busqueda de los libros de un usuario");
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send(err); // Maneja el error
      });
  } catch (error) {
    res.status(400).send(error);
  }
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
