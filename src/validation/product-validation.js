import Joi from "joi";


const createProductValidation = Joi.object({
    product_name: Joi.string().max(100).required(),
    price: Joi.number().required(), 
    stock: Joi.number().integer().required(),
    description: Joi.string().max(100).required(),
    category: Joi.string().max(100).required()
});

const getProductValidation = Joi.number().positive().required();

const updateProductValidation = Joi.object({
    id: Joi.number().positive().required(),
    product_name: Joi.string().max(100).required(),
    price: Joi.number().required(), 
    stock: Joi.number().integer().required(),
    description: Joi.string().max(100).required(),
    category: Joi.string().max(100).required()
});

const searchProductValidation = Joi.object({
    page: Joi.number().min(1).positive().default(1),
    size: Joi.number().min(1).positive().max(100).default(10),
    product_name: Joi.string().optional(),
    category: Joi.string().optional()
});


export {
    createProductValidation,
    getProductValidation,
    updateProductValidation,
    searchProductValidation
}
