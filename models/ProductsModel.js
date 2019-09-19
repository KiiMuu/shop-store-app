const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: String,
    image: String,
    price: Number,
    description: String,
    category: String
});

const Product = mongoose.model('Product', productSchema);

exports.getAllProducts = () => {
    // get products and then disconnect
    return new Promise((resolve, reject) => {
        return Product.find({}).then(products => {
            resolve(products);
        }).catch(err => {
            reject(err);
        });
    });
}

exports.getProductsByCategory = category => {
    return new Promise((resolve, reject) => {
        return Product.find({category: category}).then(products => {
            resolve(products);
        }).catch(err => {
            reject(err);
        });
    });
}

exports.getProductById = id => {
    return new Promise((resolve, reject) => {
        return Product.findById(id).then(product => {
            resolve(product);
        }).catch(err => {
            reject(err);
        });
    });
}

exports.getFirstProduct = () => {
    return new Promise((resolve, reject) => {
        return Product.findOne({}).then(product => {
            resolve(product);
        }).catch(err => {
            reject(err);
        });
    });
}

exports.addNewProduct = data => {
    return new Promise((resolve, reject) => {
        let newProduct = new Product(data);
        return newProduct.save().then(products => {
            resolve(products);
        }).catch((err) => {
            reject(err);
        });
    });
}