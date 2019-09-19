const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    name: String,
    price: Number,
    amount: Number,
    userId: String,
    productId: String,
    timestamp: Number
});

const CartItem = mongoose.model('Cart', cartSchema);

exports.addNewItem = data => {
    return new Promise((resolve, reject) => {
        let item = new CartItem(data);
        return item.save().then(() => {
            resolve();
        }).catch((err) => {
            reject(err);
        });
    });
}

exports.getItemsByUser = userId => {
    return new Promise((resolve, reject) => {
        return CartItem.find({userId}, {}, {sort: {timestamp: -1}}).then(items => {
            resolve(items);
        }).catch(err => {
            reject(err);
        });
    });
}

exports.editItem = (id, newData) => {
    return new Promise((resolve, reject) => {
        return CartItem.updateOne({_id: id}, newData).then(items => {
            resolve(items);
        }).catch(err => {
            reject(err);
        });
    });
}

exports.deleteItem = id => {
    return new Promise((resolve, reject) => {
        return CartItem.findByIdAndDelete(id).then(() => {
            resolve();
        }).catch(err => {
            reject(err);
        });
    });
}
