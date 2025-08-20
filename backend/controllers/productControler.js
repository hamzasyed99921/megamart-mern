const Joi = require('joi');
const Product = require('../models/product');
const ProductDTO = require('../dto/products');
const fs = require('fs');
const { BACKEND_SERVER_PATH } = require('../config');


const mongodbIdPattern = /^[0-9a-fA-F]{24}$/;

const productController = {
    // create product
    async create(req,res,next){
        // validate input
        const productSchema = Joi.object({
            name: Joi.string().required(),
            price: Joi.number().required(),
            description: Joi.string().required(),
            image: Joi.string().required(),
            category: Joi.string().required(),
            stock: Joi.number().required(),
            discount: Joi.number().default(0),
            isActive: Joi.boolean().default(true),
        })

        const {error} = productSchema.validate(req.body);

        if(error){
            return next(error)
        }

        const {name,price,description,image,category,stock,discount,isActive} = req.body;
        
        // handling image upload
        const base64Data = image.replace(/^data:image\/\w+;base64,/, '');   
        const imageBuffer = Buffer.from(base64Data, 'base64');

        // alot a random name 
        const safeName = name.replace(/\s+/g, '-').toLowerCase(); 
        const imagePath = `${Date.now()}-${safeName}.png`;
         // save locally
         let response;
         try {
             fs.writeFileSync(`storage/${imagePath}`, imageBuffer);
           } catch (error) {
             return next(error);
           }

        //    add product to db
           let product;
           try {
            product = new Product({name,price,description,image: `${BACKEND_SERVER_PATH}/storage/${imagePath}`,category,stock,discount,isActive});
            await product.save();
           } catch (error) {
            return next(error);
           }

           // return product
           const productDTO = new ProductDTO(product);
           res.status(201).json(productDTO);
    },

    async getAllProducts(req,res,next){
        try {
            const products = await Product.find({});
            const productDTOs = products.map(product => new ProductDTO(product));
            res.status(200).json(productDTOs);
        } catch (error) {
            return next(error);
        }
    },

    async getProductById(req,res,next){
        // validate id
        const getByIdSchema = Joi.object({
            id: Joi.string().regex(mongodbIdPattern).required()
        })
        const {error} = getByIdSchema.validate(req.params);
        if(error){
            return next(error);
        }

        const {id} = req.params;
        try {
            const product = await Product.findOne({_id: id});
            if(!product){
                return next(new Error('Product not found'));
            }
            const productDTO = new ProductDTO(product);
            res.status(200).json(productDTO);
        } catch (error) {
            return next(error);
        }
    },


    async  updateProduct(req, res, next) {
    // Validate ID
    const id = req.params.id;
    const idSchema = Joi.object({
        id: Joi.string().regex(mongodbIdPattern).required()
    });
    const { error: idError } = idSchema.validate({ id });
    if (idError) return next(idError);

    // Validate body
    const updateSchema = Joi.object({
        name: Joi.string().required(),
        price: Joi.number().required(),
        description: Joi.string().required(),
        image: Joi.string().optional(),
        category: Joi.string().required(),
        stock: Joi.number().required(),
        discount: Joi.number().default(0),
        isActive: Joi.boolean().default(true),
    });

    const { error: bodyError } = updateSchema.validate(req.body);
    if (bodyError) return next(bodyError);

    const { name, price, description, image, category, stock, discount, isActive } = req.body;

    let product;
    try {
         product = await Product.findOne({ _id: id });
        if (!product) return next(new Error('Product not found'));
        
    } catch (error) {
        return next(error);
    }
 
      // If new image is provided, delete old one and save new one
      if (image) {
        // Delete old image
        let previousImage = product.image;
        previousImage = previousImage.split('/').at(-1)

        // delete image
        fs.unlinkSync(`storage/${previousImage}`);

        // read buffer
        const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
        const imageBuffer = Buffer.from(base64Data, 'base64');

        // alot a random name 
        const safeName = name.replace(/\s+/g, '-').toLowerCase(); 
        const imagePath = `${Date.now()}-${safeName}.png`;

        // save locally

        try {
            fs.writeFileSync(`storage/${imagePath}`, imageBuffer)
        } catch (error) {
            return next(error)
        }

        await Product.updateOne({_id: id},
            {name,price,description,image: `${BACKEND_SERVER_PATH}/storage/${imagePath}`,category,stock,discount,isActive}
        )    
    }else{
        await Product.updateOne({_id: id},
            {name,price,description,category,stock,discount,isActive}
        )
    }

    res.status(200).json({message: 'Product Updated!'});

},

async deleteProduct(req,res,next){
    // validate id
    const deleteProductId = Joi.object({
        id: Joi.string().regex(mongodbIdPattern).required()
    })

    const {error} = deleteProductId.validate(req.params);

    if(error){
        return next(error)
    }

    const {id} = req.params;

    try {
        await Product.deleteOne({_id: id});
        res.status(200).json({message: 'Product Deleted!'});
    } catch (error) {
        return next(error)
    }

}

    

}

module.exports = productController;