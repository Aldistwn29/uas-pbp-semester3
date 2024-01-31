# Contact API Spec

## Create Product API 

Endpoint :  POST /api/produts

Headers : 
- Authorization : token

Request Body :

```json
{
  "product_name": "Kipas Mini",
  "price": 20.00,
  "stock": 20,
  "description": "Praktis untuk dibawa dan lebih efisien",
  "category": "Elektronik"
}
```

Response Body Success : 

```json
{
  "data" : {
    
    "id": 1,
    "product_name": "Kipas Mini",
    "price": 20.00,
    "stock": 20,
    "description": "Praktis untuk dibawa dan lebih efisien",
    "category": "Elektronik"
  }
}
```

Response Body Error :

```json
{
  
    "errors" : "Failed to add product. Please check the data sent"
}
```

## Update product API

Endpoint : PUT /api/products/:id

Headers :
- Authorization : token

Request Body :

```json
{
  "product_name": "Kipas Mini",
    "price": 20.00,
    "stock": 20,
    "description": "Praktis untuk dibawa dan lebih efisien",
    "category": "Elektronik"
}
```

Response Body Success :

```json
{
  "data" : {
    "id" : 1,
        "product_name": "Kipas Mini",
        "price": 20.00,
        "stock": 20,
        "description": "Praktis untuk dibawa dan lebih efisien",
        "category": "Eleketronik"
  }
}
```

Response Body Error :

```json
{
  "errors" : "Failed to add product. Please check the data sent"
}
```

## Get Product API

Endpoint : GET /api/products/:id

Headers :
- Authorization : token

Response Body Success :

```json
{
  "data" : {
    "id" : 1,
        "product_name": "Kipas Mini",
        "price": 20.00,
        "stock": 20,
        "description": "Praktis untuk dibawa dan lebih efisien",
        "category": "Eleketronik"
  }
}
```

Response Body Error :

```json
{
  "errors" : "Failed to add product. Please check the data sent"
}
```

## Search Product API

Endpoint : POST /api/products
Headers :
- Authorization : token

Query params :
- nama_product : Search by nama_product, using like,
- category : Search by category, using like,

Response Body Success :

```json
{
  "data" : [
    {
        "id" : 1,
        "name_product": "Kipas Mini",
        "price": 20.00,
        "stock": 20,
        "description": "Praktis untuk dibawa dan lebih efisien",
        "category": "Eleketronik"
    },
    {
      "name_product": "Meja Belajar",
      "price": 20.00,
      "stock": 10,
      "description": "Hemat energi",
      "category": "Eleketronik"
    }
  ],
  "paging" : {
    "page" : 1,
    "total_page" : 3,
    "total_item" : 30
  }
}
```

Response Body Error :

## Remove Product API 

Endpoint : DELETE /api/products/:id

Headers :
- Authorization : token

Response Body Success :

```json
{
  "data" : "OK"
}
```

Response Body Error :

```json
{
  "errors" : "The product with the ID provided was not found"
}
```
