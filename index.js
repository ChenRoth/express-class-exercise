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

app.get('/', (req, res) => {
    res.send('hello');
});

app.get('/products', (req, res) => {
    const ids = Object.keys(database); // ['a123-if', 'jk982', 'zmxnd']
    res.send(ids.map(id => {
        const product = database[id];
        return {
            price: product.price,
            name: product.name,
            image: product.image,
        };
    }));
});

app.listen(PORT, () => {
    console.log(`server is now up at http://localhost:${PORT}`);
});