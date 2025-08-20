const Joi = require('joi');
const Order = require('../models/order');

const orderController = {
    // Create Order

    async create(req, res, next) {
        const schema = Joi.object({
            user: Joi.object({
                name: Joi.string().min(2).max(100).required(),
                email: Joi.string().email().required(),
                phone: Joi.string().min(5).max(20).required()
            }).required(),
            shippingAddress: Joi.object({
                address: Joi.string().min(3).max(200).required(),
                city: Joi.string().min(2).max(100).required(),
                postalCode: Joi.string().min(2).max(20).required(),
                country: Joi.string().min(2).max(100).required()
            }).required(),
            items: Joi.array().items(
                Joi.object({
                    id: Joi.string().required(),
                    name: Joi.string().required(),
                    price: Joi.number().min(0).required(),
                    quantity: Joi.number().integer().min(1).required()
                })
            ).min(1).required()
        });

        const { error } = schema.validate(req.body);
        if (error) return next(error);

        const { user, shippingAddress, items } = req.body;

        // compute total from items to ensure integrity
        const computedTotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        try {
            const order = await new Order({
                user,
                shippingAddress,
                items,
                total: computedTotal
            }).save();

            return res.status(201).json({
                message: 'Order placed successfully',
                order: {
                    id: order._id,
                    user: order.user,
                    shippingAddress: order.shippingAddress,
                    items: order.items,
                    total: order.total,
                    createdAt: order.createdAt
                }
            });
        } catch (err) {
            return next(err);
        }
    },

    // Get All Orders

    async getAllOrder(req, res, next) {
        try {
            const orders = await Order.find().sort({ createdAt: -1 });

            return res.status(200).json({
                message: 'Orders fetched successfully',
                orders
            });
        } catch (err) {
            return next(err);
        }
    },

    // Get Single Order by ID

    async getOrderById(req, res, next) {
        try {
            const order = await Order.findById(req.params.id);
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }
            return res.status(200).json(order);
        } catch (err) {
            return next(err);
        }
    },

     // Approve Order
     async approveOrder(req, res, next) {
        try {
            const { id } = req.params;

            // Find the order by ID
            const order = await Order.findById(id);
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }

            // Update status to approved
            order.status = "approved";
            await order.save();

            return res.status(200).json({
                message: "Order approved successfully",
                order
            });
        } catch (err) {
            return next(err);
        }
    }
    
};

module.exports = orderController;
