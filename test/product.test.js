import supertest from "supertest";
import { createManyTestProduct, createTestProduct, createTestUser, getTestProduct, removeAllTestProducts, removeTestUser } from "./test-util.js"
import { web } from "../src/application/web.js";
import { logger } from "../src/application/logging.js";

describe('POST /api/products', function () {
    beforeEach( async() => {
        await createTestUser();
    });

    afterEach(async() => {
        await removeAllTestProducts();
        await removeTestUser();
    })

    it('should successfully create a new product', async () => {
        const result = await supertest(web)
            .post("/api/products")
            .set('Authorization', 'test')
            .send({
                "product_name": "test",
                "price": 10,
                "stock": 1,
                "description": "test",
                "category": "test"
            });

            expect(result.status).toBe(200);
            expect(result.body.data.id).toBeDefined();
            expect(result.body.data.product_name).toBe("test");
            expect(result.body.data.price).toBe(10);
            expect(result.body.data.stock).toBe(1);
            expect(result.body.data.description).toBe("test");
            expect(result.body.data.category).toBe("test");
    });

    it('should reject if create a new product', async () => {
        const result = await supertest(web)
            .post("/api/products")
            .set('Authorization', 'test')
            .send({
                "product_name": "",
                "price": 10,
                "stock": 1,
                "description": "",
                "category": ""
            });

            expect(result.status).toBe(400);
            expect(result.body.errors).toBeDefined();
    });
});

describe('GET /api/products/:productId', function () {
    beforeEach( async() => {
        await createTestUser();
        await createTestProduct();
    });

    afterEach(async() => {
        await removeAllTestProducts();
        await removeTestUser();
    })

    it('should can get product', async () => {
        const testProduct = await getTestProduct();

        const result = await supertest(web)
            .get("/api/products/" + testProduct.id)
            .set('Authorization', 'test');

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBe(testProduct.id);
        expect(result.body.data.product_name).toBe(testProduct.product_name);
        expect(result.body.data.price).toBe(testProduct.price);
        expect(result.body.data.stock).toBe(testProduct.stock);
        expect(result.body.data.description).toBe(testProduct.description);
        expect(result.body.data.category).toBe(testProduct.category);
    });
    
    
    it('should return 400 if product id is not found', async () => {
        const testProduct = await getTestProduct();

        const result = await supertest(web)
            .get("/api/products/" + (testProduct.id + 1))
            .set('Authorization', 'test');

        expect(result.status).toBe(404);
    });
    
});

describe('PUT /api/products/:productId', function () {
    beforeEach( async() => {
        await createTestUser();
        await createTestProduct();
    });

    afterEach(async() => {
        await removeAllTestProducts();
        await removeTestUser();
    })

    it('should can update existing product', async () => {
        const testProduct = await getTestProduct();

        const result = await supertest(web)
            .put('/api/products/' + testProduct.id)
            .set('Authorization', 'test')
            .send({
                product_name: "Kipas Mini",
                price: 20,
                stock: 20,
                description: "Praktis untuk dibawa dan lebih efisien",
                category: "Eleketronik"
            });

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBe(testProduct.id);
        expect(result.body.data.product_name).toBe("Kipas Mini");
        expect(result.body.data.price).toBe(20);
        expect(result.body.data.stock).toBe(20);
        expect(result.body.data.description).toBe("Praktis untuk dibawa dan lebih efisien");
        expect(result.body.data.category).toBe("Eleketronik");
    });

    it('should reject is invalid', async () => {
        const testProduct = await getTestProduct();

        const result = await supertest(web)
            .put('/api/products/' + (testProduct.id + 1))
            .set('Authorization', 'test')
            .send({
                product_name: "",
                price: 20,
                stock: 20,
                description: "",
                category: ""
            });

        expect(result.status).toBe(400);
    });

    it('should reject if product is not found', async () => {
        const testProduct = await getTestProduct();

        const result = await supertest(web)
            .put('/api/products/' + (testProduct.id + 1))
            .set('Authorization', 'test')
            .send({
                product_name: "Kipas Mini",
                price: 20,
                stock: 20,
                description: "Praktis untuk dibawa dan lebih efisien",
                category: "Eleketronik"
            });

        logger.info(result.body)

        expect(result.status).toBe(404);
    });
});

describe('DELETE /api/products/:productId', () => {
    beforeEach( async() => {
        await createTestUser();
        await createTestProduct();
    });

    afterEach(async() => {
        await removeAllTestProducts();
        await removeTestUser();
    })

    it('should can delete product', async () => {
        let testProduct = await getTestProduct();
        const result = await supertest(web)
            .delete('/api/products/' + testProduct.id)
            .set('Authorization', 'test');

        expect(result.status).toBe(200);
        expect(result.body.data).toBe("OK");

        testProduct = await getTestProduct();
        expect(testProduct).toBeNull();
    });

    it('should reject if product is found', async () => {
        let testProduct = await getTestProduct();
        const result = await supertest(web)
            .delete('/api/products/', (testProduct.id + 1))
            .set('Authorization', 'test');

        expect(result.status).toBe(404);
        
    });
});

describe('DELETE /api/products/:productId', function () {
    beforeEach(async () => {
        await createTestUser();
        await createTestProduct();
    })

    afterEach(async () => {
        await removeAllTestProducts();
        await removeTestUser();
    })

    it('should can delete product', async () => {
        let testProduct = await getTestProduct();
        const result = await supertest(web)
            .delete('/api/products/' + testProduct.id)
            .set('Authorization', 'test');

        expect(result.status).toBe(200);
        expect(result.body.data).toBe("OK");

        testProduct = await getTestProduct();
        expect(testProduct).toBeNull();
    });

    it('should reject if product is not found', async () => {
        let testProduct = await getTestProduct();
        const result = await supertest(web)
            .delete('/api/contacts/' + (testProduct.id + 1))
            .set('Authorization', 'test');

        expect(result.status).toBe(404);
    });
});

describe('GET /api/products', function () {
    beforeEach(async () => {
        await createTestUser();
        await createManyTestProduct();
    })

    afterEach(async () => {
        await removeAllTestProducts();
        await removeTestUser();
    })

    it('should can search without parameter', async () => {
        const result = await supertest(web)
            .get('/api/products')
            .set('Authorization', 'test');

        expect(result.status).toBe(200);
        expect(result.body.data.length).toBe(10);
        expect(result.body.paging.page).toBe(1);
        expect(result.body.paging.total_page).toBe(2);
        expect(result.body.paging.total_items).toBe(15);
    });

    it('should can search to page 2', async () => {
        const result = await supertest(web)
            .get('/api/products')
            .query({
                page: 2
            })
            .set('Authorization', 'test');

        logger.info("--------------------");
        logger.info(result.body);
        logger.info("--------------------");

        expect(result.status).toBe(200);
        expect(result.body.data.length).toBe(5);
        expect(result.body.paging.page).toBe(2);
        expect(result.body.paging.total_page).toBe(2);
        expect(result.body.paging.total_items).toBe(15);
    });

    it('should can search using product name', async () => {
        const result = await supertest(web)
            .get('/api/products')
            .query({
                product_name: "test 1"
            })
            .set('Authorization', 'test');

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.length).toBe(6);
        expect(result.body.paging.page).toBe(1);
        expect(result.body.paging.total_page).toBe(1);
        expect(result.body.paging.total_items).toBe(6);
    });

    it('should can search using category', async () => {
        const result = await supertest(web)
            .get('/api/products')
            .query({
                category: "test 1"
            })
            .set('Authorization', 'test');

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.length).toBe(6);
        expect(result.body.paging.page).toBe(1);
        expect(result.body.paging.total_page).toBe(1);
        expect(result.body.paging.total_items).toBe(6);
    });
});




