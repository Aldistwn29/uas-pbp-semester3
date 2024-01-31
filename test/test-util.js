import { prismaClient } from "../src/application/database.js"
import bcrypt from "bcrypt";

export const removeTestUser = async () => {
    await prismaClient.user.deleteMany({
        where: {
            username: "test"
        }
    })
}

export const createTestUser = async () => {
    await prismaClient.user.create({
        data: {
            username: "test",
            password: await bcrypt.hash("rahasia", 10),
            name: "test",
            token: "test"
        }
    })
}

export const getTestUser = async () => {
    return prismaClient.user.findUnique({
        where: {
            username: "test"
        }
    });
}

export const removeAllTestProducts = async () => {
    await prismaClient.product.deleteMany({
        where: {
            username: 'test'
        }
    });
}

export const createTestProduct = async () => {
    await prismaClient.product.create({
        data: {
            username: "test",
            product_name: "test",
            price: 10,
            stock: 1,
            description: "test",
            category: "test"
        }
    })
}

export const getTestProduct = async () => {
    
    return prismaClient.product.findFirst({
        where : {
            username: "test"
        }
    })
}

export const createManyTestProduct = async () => {
    for (let i = 0; i < 15; i++) {
        await prismaClient.product.create({
            data: {
                username: `test`,
                product_name: `test ${i}`,
                stock: 20 * i,
                price: 20.00 * i,
                description: `test ${i}`,
                category: `test ${i}`,
            }
        })
    }
}