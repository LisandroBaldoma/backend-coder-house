// Primer entrega
class ProductManager{
    products
    constructor(){
        this.products = []
    }
    getProduct(){
       return this.products
    }
    addProduct(newProduct){
        const product = this.products.find((product) => product.code === newProduct.code)
        if(product){
            console.log("El producto que quiere agregar ya existe en la BD")
        }else{
            this.products.push(newProduct)
            console.log("El producto se creo con exito")
        }               
    }
    getProductById(id){
        const product = this.products.find((product) => product.id === id);
        if(product){
            console.log("El producto consultado es: ", product)
        }else{
            console.log("El producto no existe")
        }
    }
}

class Product{
    constructor(title, description, price, thumbnail, code, stock, id = this.generarId() ) {
        this.id = id,
        this.title = title,
        this.description = description,
        this.price = price,
        this.thumbnail = thumbnail,
        this.code = code,
        this.stock = stock
    }
    // Metodo para generar ID alfanumerico unico, copiado de internet.
    generarId (){
        let d = new Date().getTime();
        let uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
    }
}

//PRUEBAS

//Creo la instancia.
const manejadorEventos = new ProductManager;

// Muestra array vacio, no hay productos cargados. 
console.log( manejadorEventos.getProduct());

// Agrego un poducto al no existir se agrega con exito
manejadorEventos.addProduct(new Product("producto prueba", "Esto es un producto de prueba", 200, "Sin Imagen", "abc123", 25))

// Muestro todos los productos
console.log(manejadorEventos.getProduct());

// Agrego el mismo producto el cual es rechazado por existir en la BD
manejadorEventos.addProduct(new Product("producto prueba", "Esto es un producto de prueba", 200, "Sin Imagen", "abc123", 25))

// Otengo un id existente para poder consultarlo
const productoAgregado = manejadorEventos.getProduct()
const idExistente = productoAgregado[0].id;
const idNoexiste = "fdlfld2726272sdlfkskdlmkds"

// Consulto un id existente
manejadorEventos.getProductById(idExistente);

// Consulto un id inexistente
manejadorEventos.getProductById(idNoexiste);