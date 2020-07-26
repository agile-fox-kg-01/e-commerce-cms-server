# E-Commerce-CMS-Server

Deploy Here:

[Ecommerce/CMS-Server](https://ecommerce-cms-fd3f9.web.app/login)

## API Documentation

----
**Admin Login**
---
  
  * **URL**
   
   /login

  * **Method**

    `POST`

  * **Request Headers**

    | key | value | required |
    | :--- | :---: | :---:|
    | Content-Type | application/x-www-form-urlencoded | true |

  * **URL Params**

    none

  * **Data Params**
    
    | key | value | required |
    | :--: | :--: | :--: |
    | email | admin@mail.com| true |
    | password | enkripsi("1234") |true |

  * **Success Response**


    * **Code:** 200 OK <br />
    **Content:**
    ```json
      {
       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im51cmZpYWhpZHJpczA5OEBnbWFpbC5jb20iLCJpYXQiOjE1OTQwNzg5NjV9.Q8JSD8HhZqRRjPFahSnqDYfjUIHvjMbaSWICxEk_Hv4"
      }
      ```
  * **Errors Response**

    * **Code:** 400 BAD REQUEST <br />
      **Content**
      ```json
      {
        "status": 400,
        "error": "invalid username/password"
      }
      
      ```

**Admin Add New Product**
---

* **URL**

  /products

* **Method**

  `POST`

* **Request Headers**

  | key | value | required |
  | :--- | :---: | :---:|
  | Content-Type | application/x-www-form-urlencoded | true |
  | access_token | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im51cmZpYWhpZHJpczA5OEBnbWFpbC5jb20iLCJpYXQiOjE1OTQwNzg5NjV9.Q8JSD8HhZqRRjPFahSnqDYfjUIHvjMbaSWICxEk_Hv4 | true |

* **URL Params**

  none

* **Data Params**

  | key | value | required |
  | :---: | :---: | :---: |
  | name | "Bear Tumbler" | true |   
  | price | 20000 | true |   
  | stock | 3 | true |
  | image_url | "https://ecs7.tokopedia.net/img/cache/700/product-1/2017/5/14/14367652/14367652_7b2cccf9-8843-421f-b3fe-b6bd94ffc091_753_752.png" | true |

* **Success Response**

  * **Code:** 201 CREATED <br />
    **Content:**
    ```json
     {
      "id": 3,
      "name": "Bear Tumbler",
      "image_url": "https://ecs7.tokopedia.net/img/cache/700/product-1/2017/5/14/14367652/14367652_7b2cccf9-8843-421f-b3fe-b6bd94ffc091_753_752.png",
      "price": 20000,
      "stock": 3,
      "createdAt": "2020-07-26T07:31:36.041Z",
      "updatedAt": "2020-07-26T07:31:36.041Z"
    }
    ```

* **Error Response**

  * **Code:** 400 BAD REQUEST <br />
    **Content**
    ```json
     {
        "status": 400,
        "error":[ "Name is required" ]
    }
    ```

    OR

    ```json
    {
        "status": 400,
        "error":[ "Price must be greater than 0" ]
    }
    ```
    
      OR

    ```json
    {
        "status": 400,
        "error":[ "Stock must be greater than 0" ]
    }
    ```
    
  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content**
    ```json
    {
        "status": 500,
        "error":"internal server error"
    }
    ```
**Admin Edit Product By Id**
---
* **URL**

  /products/:id

* **Method**

  `PUT`

* **Request Headers**

  | key | value | required |
  | :--- | :---: | :---:|
  | Content-Type | application/x-www-form-urlencoded | true |
  | access_token | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im51cmZpYWhpZHJpczA5OEBnbWFpbC5jb20iLCJpYXQiOjE1OTQwNzg5NjV9.Q8JSD8HhZqRRjPFahSnqDYfjUIHvjMbaSWICxEk_Hv4 | true |

* **URL Params**
 ```json
  {
    "id": 3
  }
  ```
  
* **Data Params**

  | key | value | required |
  | :---: | :---: | :---: |
  | name | "Bear Tumbler" | true |   
  | price | 30000 | true |   
  | stock | 2 | true |
  | image_url | "https://www.columbiactlibrary.org/wp-content/uploads/2012/10/books.png" | true |  

* **Success Response**

  * **Code:** 200 OK <br />
    **Content:**
    ```json
     {
      "id": 3,
      "name": "Bear Tumbler",
      "image_url": "https://ecs7.tokopedia.net/img/cache/700/product-1/2017/5/14/14367652/14367652_7b2cccf9-8843-421f-b3fe-b6bd94ffc091_753_752.png",
      "price": 30000,
      "stock": 2,
      "createdAt": "2020-07-26T07:31:36.041Z",
      "updatedAt": "2020-07-26T07:31:36.041Z"
    }
    ```

* **Error Response**

  * **Code:** 400 BAD REQUEST <br />
    **Content**
    ```json
     {
        "status": 400,
        "error":[ "Name is required" ]
    }
    ```

    OR

    ```json
    {
        "status": 400,
        "error":[ "Price must be greater than 0" ]
    }
    ```
    
      OR

    ```json
    {
        "status": 400,
        "error":[ "Stock must be greater than 0" ]
    }
    ```
    
  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content**
    ```json
    {
        "status": 500,
        "error":"internal server error"
    }
    ```

**Admin Request All Products**
---
* **URL**

  /products

* **Method**

  `GET`

* **Request Headers**

  | key | value | required |
  | :--- | :---: | :---:|
  | Content-Type | application/x-www-form-urlencoded | true |
  | access_token | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im51cmZpYWhpZHJpczA5OEBnbWFpbC5jb20iLCJpYXQiOjE1OTQwNzg5NjV9.Q8JSD8HhZqRRjPFahSnqDYfjUIHvjMbaSWICxEk_Hv4 | true |

* **URL Params**

  none

* **Data Params**

  none  

* **Success Response**

  * **Code:** 200 OK <br />
    **Content:**
    ```json
    {
      "id": 3,
      "name": "Bear Tumbler",
      "image_url": "https://ecs7.tokopedia.net/img/cache/700/product-1/2017/5/14/14367652/14367652_7b2cccf9-8843-421f-b3fe-b6bd94ffc091_753_752.png",
      "price": 30000,
      "stock": 2,
      "createdAt": "2020-07-26T07:31:36.041Z",
      "updatedAt": "2020-07-26T07:31:36.041Z"
    }
    ```

* **Error Response**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content**
    ```json
     {
        "status": 500,
        "error":"internal server error"
    }
    ```

**Admin Delete Product By Id**
---
* **URL**

  /products/:id

* **Method**

  `DELETE`

* **Request Headers**

  | key | value | required |
  | :--- | :---: | :---:|
  | Content-Type | application/x-www-form-urlencoded | true |
  | access_token | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im51cmZpYWhpZHJpczA5OEBnbWFpbC5jb20iLCJpYXQiOjE1OTQwNzg5NjV9.Q8JSD8HhZqRRjPFahSnqDYfjUIHvjMbaSWICxEk_Hv4 | true | 

* **URL Params**
 ```json
  {
    "id": 3
  }
  ```

* **Data Params**

  none

* **Success Response**

  * **Code:** 200 OK <br />
    **Content:**
    ```json
      [1]
    ```

* **Error Response**

  * **Code:** 404 NOT FOUND <br />
    **Content**
    ```json
    {
      "status": 404,
      "error": "not found"
    }
    ```

    
  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content**
    ```json
    {
      "status":500,
      "error": "internal server error"
    }
    ```
    