const mongoose =require('mongoose');

const {Schema} = mongoose;

const productSchema = new Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    description: {type: String, required: true},
    image: {type: String, required: true},
    category: {type: String, required: true},
    discount: { type: Number, default: 0 },
    stock: {type: Number, required: true},
    isActive: {type: Boolean, default: true},

},
    {timestamps: true}
)

module.exports = mongoose.model('Product', productSchema, 'products');