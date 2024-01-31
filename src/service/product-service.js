import { createProductValidation, getProductValidation, searchProductValidation, updateProductValidation } from "../validation/product-validation.js";
import { validate } from "../validation/validation.js";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { request } from "express";
import { logger } from "../application/logging.js";

const create =  async (user, request) => {
    const product = validate(createProductValidation, request);
    product.username = user.username;

    return prismaClient.product.create({
        data: product,
        select:{

            "id": true,
            "product_name": true,
            "price": true,
            "stock": true,
            "description": true,
            "category": true
        }
    });
}

const get = async (user, productId) => {
    productId = validate(getProductValidation, productId);

    const product = await prismaClient.product.findFirst({
        where: {
            username: user.username,
            id: productId
        },

        select: {
            "id": true,
            "product_name": true,
            "price": true,
            "stock": true,
            "description": true,
            "category": true
        }
    });

    if (!product) {
        throw new ResponseError(404, "product is not found")
    }

    return product;
}

const update = async (user, request) => {
    const product = validate(updateProductValidation, request);

    const totalProductInDatabase = await prismaClient.product.count({
        where : {
            username: user.username,
            id: product.id
        }
    });

    if (totalProductInDatabase !== 1) {
        throw new ResponseError(404, "product is not found")
    }

    return prismaClient.product.update({
        where : {
            id : product.id
        },
        data: {
            product_name: product.product_name,
            price: product.price,
            stock: product.stock,
            description: product.description,
            category: product.category,
        },
        select : {
            id: true,
            product_name: true,
            price: true,
            stock: true,
            description: true,
            category: true
        }
    })
}

const remove = async (user, productId) => {
    productId = validate(getProductValidation, productId);

    const totalIndDatabase = await prismaClient.product.count({
        where: {
            username: user.username,
            id: productId
        }
    });

    if (totalIndDatabase !== 1) {
        throw new ResponseError(404, "product is not found");
    }

    return prismaClient.product.delete({
        where: {
            id: productId
        }
    });
}

const search = async (user, request) => {
    request = validate(searchProductValidation, request);

    const skip = (request.page - 1) * request.size;

    const filters = [];

    filters.push({
        username: user.username
    })

    if(request.product_name) {
        filters.push({
            product_name: {
                contains: request.product_name
            }
        });
    }

    if(request.category) {
        filters.push({
            category: {
                contains: request.category
                }
            });
    }

    const products = await prismaClient.product.findMany({
        where : {
            AND: filters
        },
        take: request.size,
        skip: skip
    });

    const totalItems = await prismaClient.product.count({
        where : {
            AND: filters
        }
    });

    return ({
        data: products,
        paging: {
            page: request.page,
            total_items: totalItems,
            total_page: Math.ceil(totalItems / request.size)
        }
    })
}

export default {
    create,
    get,
    update,
    remove,
    search
}