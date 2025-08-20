class ProductDTO {
    constructor(product){
        this.id = product._id;
        this.name = product.name;
        this.price = product.price;
        this.description = product.description;
        this.image = product.image;
        this.category = product.category;
        this.stock = product.stock;
        this.discount = product.discount;
        this.isActive = product.isActive;
    }
}

module.exports = ProductDTO;

