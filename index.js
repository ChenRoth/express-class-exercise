const express = require('express');

const app = express();
const PORT = 3000;

const database = {
    'a123-if': {
        id: 'a123-if',
        name: 'Sunscreen',
        price: 29.90,
        description: 'always wear sunscreen!',
        stock: 4,
        image: 'https://images-na.ssl-images-amazon.com/images/I/81OGmoU8r3L._SX522_.jpg'
    },
    jk982: {
        id: 'jk982',
        name: 'Basketball',
        price: 59.90,
        description: 'You can\'t really beat Michael Jordan...',
        stock: 10,
        image: 'https://cdn.newsapi.com.au/image/v1/5115ef8c03f1131ad928b5e31df9901a?width=1024'
    },
    zmxnd: {
        id: 'zmxnd',
        name: 'Sunglasses',
        price: 700,
        description: 'Don\'t get eye wrinkles!',
        stock: 0,
        image: 'https://images.halloweencostumes.com/products/17205/1-2/black-eyelash-sunglasses.jpg'
    },
}

// this middleware will put the message body in request.body (if available)
app.use(express.json());

app.get('/', (req, res) => {
    res.send('hello');
});

app.get('/products', (req, res) => {
    const ids = Object.keys(database); // ['a123-if', 'jk982', 'zmxnd']
    res.send(ids.map(id => {
        const product = database[id];
        return {
            id: product.id,
            price: product.price,
            name: product.name,
            image: product.image,
        };
    }));
});

// we choose a param name we want, for example ':productId'
app.get('/products/:productId', (req, res) => {
    // now we can access the variable part of the URL through req.params.productId
    // e.g. if the client goes to /product/a-product-id,
    // req.params.productId === 'a-product-id'    
    const id = req.params.productId;
    const product = database[id];
    res.send(product);
});

app.post('/products', (req, res) => {
    const newProduct = req.body;
    
    // check if the new product has a name
    if (!newProduct.name) {
        // if the product doesn't have a name, return error 400
        res.status(400);
        res.send('product doesn\'t have a name');
        // remember to end the app.post function!!!
        return;
    }

    // generate a new id for the new product
    const id = 'a' + Date.now();

    // force the new product to have the generated id
    // so even if the client put an id, we overwrite it
    newProduct.id = id;
    database[id] = newProduct;
    res.send('product added successfully');
});

// we choose a param name we want, for example ':productId'
app.put('/products/:productId', (req, res) => {
    // now we can access the variable part of the URL through req.params.productId
    // e.g. if the client goes to /product/a-product-id,
    // req.params.productId === 'a-product-id'    
    const id = req.params.productId;
    const changes = req.body;
    const existingProduct = database[id];

    // check if product even exists
    if (!existingProduct) {
        res.status(400);
        res.send(`product ${id} doesn\'t exist!`);
        return;
    }

    // if we have conflicting fields in 'existingProduct' and 'changes',
    // updatedProduct will get the field value from 'changes'
    const updatedProduct = Object.assign(existingProduct, changes)

    // we overwrite with the original id in case changes include 'id'
    updatedProduct.id = existingProduct.id;

    // update the database
    database[id] = updatedProduct;

    res.send('product updated succesfully');
});

app.delete('/products/:productId', (req, res) => {
    const id = req.params.productId;
    delete database[id];
    res.send('product deleted successfully');
});

app.listen(PORT, () => {
    console.log(`server is now up at http://localhost:${PORT}`);
});