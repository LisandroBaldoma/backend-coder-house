// Primer entrega
//import {fs} from 'fs';
const fs = require("fs/promises");

class ProductManager {
  constructor(path) {
    this.path = path;
  }
  async getProduct() {
    const data = await fs.readFile(this.path, "utf-8");
    this.products = JSON.parse(data);
    
  }
  async showAllProducts (){
    await this.getProduct()
    console.log(this.products)

  }  
  async saveProduct () {
    const json = JSON.stringify(this.products, null, 2);
      await fs.writeFile(this.path, json);
  }
  async addProduct(newProduct) {
    const products = await this.getProduct();    
    if (this.products.length === 0) {
      this.products.push(newProduct);
      await this.saveProduct()
      console.log("El producto se agrego con exito");      
    } else {
      const product = this.products.find(
        (prod) => prod.code === newProduct.code
      );
      if (product) {
        console.log("El producto que quiere agregar ya existe en la BD");
      } else {
        this.products.push(newProduct);
        await this.saveProduct()        
        console.log("El producto se agrego con exito"); 
      }
    }
  } 
  async getProductById(id) {
    const products = await this.getProduct();
    const product = this.products.find((prod) => prod.id === id);
    if (product) {
      console.log("El producto consultado es: ", product);
    } else {
      console.log("El producto no existe");
    }
  }
  async updateProduct(id, campos) {
    if(Object.hasOwn(campos, 'id')){
      delete  campos.id      
    }
    const products = await this.getProduct();
    const product = this.products.find((prod) => prod.id === id);
    if(product){
      const newProduct = {... product, ...campos }
      const newProducts = this.products.filter((prod) => prod.id !== id)
      newProducts.push(newProduct)
      const json = JSON.stringify(newProducts, null, 2);
      await fs.writeFile(this.path, json);
      console.log("El producto se actualizo con exito")  
    }else{
      console.log("El id no existe")
    }   
    
  }
  async deletedPoduct(id) {    
    const products = await this.getProduct();
    const newProducts = this.products.filter((prod) => prod.id !== id);
    if(newProducts.length === this.products.length){
      console.log(`No existe un usuario con el ID: ${id}, para eliminar`)
    }else{      
      const json = JSON.stringify(newProducts, null, 2);
      await fs.writeFile(this.path, json);
      console.log(`El Usuario ID: ${id}, fue eliminado de la base de datos` )
    }    
  }
}

class Product {
  constructor(
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
    id = this.generarId()
  ) {
    (this.id = id),
      (this.title = title || "sin valor"),
      (this.description = description || "sin valor"),
      (this.price = price || 0),
      (this.thumbnail = thumbnail || "sin valor"),
      (this.code = code || "sin valor"),
      (this.stock = stock || 0);
  }
  //Metodo para generar ID alfanumerico unico, copiado de internet.
  generarId() {
    let d = new Date().getTime();
    let uuid = "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        let r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
    return uuid;
  }

  generarIdAutoIncrement() {}
}

// DESAFÍO ENTREGABLE - PROCESO DE TESTING

//Creo la instancia.
const manejadorEventos = new ProductManager("./data/products.json");

const id = manejadorEventos.getProduct();

manejadorEventos.addProduct( 
new Product(
    "Producto prueba",
    "Esto es un producto de prueba",
    200,
    "Sin Imagen",
    "abc1234343",
    25
  )  
);

const product = manejadorEventos.showAllProducts();

manejadorEventos.getProductById("139d8133610a4225aea6731b4922f81f");

manejadorEventos.updateProduct("139d8133610a4225aea6731b4922f81f", {title:"Josefina", price:10000});

manejadorEventos.showAllProducts();

manejadorEventos.deletedPoduct("139d8133610a4225aea6731b4922f81f")


