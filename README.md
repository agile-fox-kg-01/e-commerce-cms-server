# E-Commerce CMS Server

  Deploy Here:

[CMS-server](https://project-3-cms-server.herokuapp.com/)

## API Documentation

----
  **Create New Product**
----
  Create New Product

* **URL**

  /product

* **Method:**
  
  `POST`

* **Request Headers**

  | key | value | required |
  | :---: | :---: | :---: |
  | access_token | application/x-www-form-urlencoded | true |
  
* **URL Params**

   none

* **Data Params**

  | key | value | required |
  | :---: | :---: | :---: |
  | name | <YOUR_NAME> | true |
  | image_url | <YOUR_IMAGE_URL> | true |
  | price | <YOUR_PRICE> | true |
  | stock | <YOUR_STOCK> | true |

* **Success Response:**
  
  
  * **Code:** 201 CREATED <br />
    **Content:** 
    ```json
    {
    "id": 6,
    "name": "baju baru",
    "image_url": "www.google.com",
    "price": 1000,
    "stock": 10,
    "updatedAt": "2020-07-30T04:48:41.447Z",
    "createdAt": "2020-07-30T04:48:41.447Z"
    }
    ```
 
* **Error Response:**

    * **Code:** 400 BAD REQUEST <br />
        **Content:** 
        ```json
        {
          "code": "400",
          "message": [
              "Name is required!"
          ]
        }
        ```

        OR

        ```json
        {
          "code": "400",
          "message": [
              "Image URL is required!"
          ]
        }
        ```

        OR

        ```json
        {
          "code": "400",
          "message": [
              "Please input correct URL format"
          ]
        }
        ```

        OR

        ```json
        {
          "code": "400",
          "message": [
              "Price is required!"
          ]
        }
        ```

        OR

        ```json
        {
          "code": "400",
          "message": [
              "Minimum price is 1!"
          ]
        }
        ```
        
        OR

        ```json
        {
          "code": "400",
          "message": [
              "Stock is required!"
          ]
        }
        ```
    OR

    * **Code:** 401 UNAUTHORIZED <br />
        **Content:** 
        ```json
        {
          "code": "401",
          "message": "Please login to use this application!"
        }
        ```

    OR

    * **Code:** 500 INTERNAL SERVER ERROR <br />
        **Content:** 
        ```json
        {
          "code": "500",
          "message": "Internal Server Error"
        }
        ```

----
  **Read All Product**
----
  Read All Product in Database

* **URL**

  /product

* **Method:**
  
  `GET`

* **Request Headers**

  | key | value | required |
  | :---: | :---: | :---: |
  | access_token | application/x-www-form-urlencoded | true |
  
* **URL Params**

   none

* **Data Params**

  none

* **Success Response:**
  
  
  * **Code:** 200 OK <br />
    **Content:** 
    ```json
    [
        {
        "id": 1,
        "name": "White Shirt",
        "image_url": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80",
        "price": 150000,
        "stock": 10,
        "createdAt": "2020-07-29T08:17:39.635Z",
        "updatedAt": "2020-07-29T08:17:39.635Z"
        }
    ]
    
    ```
 
* **Error Response:**

    * **Code:** 500 INTERNAL SERVER ERROR <br />
        **Content:** 
        ```json
        {
          "code": "500",
          "message": "Internal Server Error"
        }
        ```

----
  **Read Product by ID**
----
  Read Product by ID

* **URL**

  /product/:id

* **Method:**
  
  `GET`

* **Request Headers**

  | key | value | required |
  | :---: | :---: | :---: |
  | access_token | application/x-www-form-urlencoded | true |
  
* **URL Params**

    | key | value | required |
  | :---: | :---: | :---: |
  | id | <YOUR_ID> | true |

* **Data Params**

  none

* **Success Response:**
  
  
  * **Code:** 200 OK <br />
    **Content:** 
    ```json
    {
        "id": 1,
        "name": "White Shirt",
        "image_url": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80",
        "price": 150000,
        "stock": 10,
        "createdAt": "2020-07-29T08:17:39.635Z",
        "updatedAt": "2020-07-29T08:17:39.635Z"
    }
    
    ```
 
* **Error Response:**

    * **Code:** 401 UNAUTHORIZED <br />
        **Content:** 
        ```json
        {
          "code": "401",
          "message": "Please login to use this application!"
        }
        ```

    OR

    * **Code:** 403 FORBIDDEN <br />
        **Content:** 
        ```json
        {
          "code": "403",
          "message": "You are unauthorized to modify this data!"
        }
        ```

    OR

    * **Code:** 500 INTERNAL SERVER ERROR <br />
        **Content:** 
        ```json
        {
          "code": "500",
          "message": "Internal Server Error"
        }
        ```

    OR

    * **Code:** 404 NOT FOUND <br />
        **Content:** 
        ```json
        {
          "code": "404",
          "message": "Product not found!"
        }
        ``` 

----
  **Update Product**
----
  Update product by ID

* **URL**

  /product/:id

* **Method:**
  
  `PUT`

* **Request Headers**

  | key | value | required |
  | :---: | :---: | :---: |
  | access_token | application/x-www-form-urlencoded | true |
  
* **URL Params**

    | key | value | required |
  | :---: | :---: | :---: |
  | id | <YOUR_ID> | true |

* **Data Params**

  | key | value | required |
  | :---: | :---: | :---: |
  | name | <YOUR_NAME> | true |
  | image_url | <YOUR_IMAGE_URL> | true |
  | price | <YOUR_PRICE> | true |
  | stock | <YOUR_STOCK> | true |

* **Success Response:**
  
  
  * **Code:** 200 OK <br />
    **Content:** 
    ```json
    {
    "id": 1,
    "name": "asdabc",
    "image_url": "www.google.com/asd",
    "price": 12345,
    "stock": 123123,
    "createdAt": "2020-07-29T08:17:39.635Z",
    "updatedAt": "2020-07-30T04:54:17.468Z"
    }
    ```
 
* **Error Response:**

    * **Code:** 401 UNAUTHORIZED <br />
        **Content:** 
        ```json
        {
          "code": "401",
          "message": "Please login to use this application!"
        }
        ```

    OR

    * **Code:** 403 Forbidden <br />
        **Content:** 
        ```json
        {
          "code": "403",
          "message": "You are unauthorized to modify this data!"
        }
        ```

    OR

    * **Code:** 400 BAD REQUEST <br />
        **Content:** 
        ```json
        {
          "code": "400",
          "message": [
              "Name is required!"
          ]
        }
        ```

        OR

        ```json
        {
          "code": "400",
          "message": [
              "Image URL is required!"
          ]
        }
        ```

        OR

        ```json
        {
          "code": "400",
          "message": [
              "Please input correct URL format"
          ]
        }
        ```

        OR

        ```json
        {
          "code": "400",
          "message": [
              "Price is required!"
          ]
        }
        ```

        OR

        ```json
        {
          "code": "400",
          "message": [
              "Minimum price is 1!"
          ]
        }
        ```
        
        OR

        ```json
        {
          "code": "400",
          "message": [
              "Stock is required!"
          ]
        }
        ```

----
  **Delete Product**
----
  Delete Product by ID

* **URL**

  /product/:id

* **Method:**
  
  `DELETE`

* **Request Headers**

  | key | value | required |
  | :---: | :---: | :---: |
  | access_token | application/x-www-form-urlencoded | true |
  
* **URL Params**

    | key | value | required |
  | :---: | :---: | :---: |
  | id | <YOUR_ID> | true |

* **Data Params**

  none

* **Success Response:**
  
  
  * **Code:** 200 OK <br />
    **Content:** 
    ```json
    {
    "message": "product deleted"
    }
    ```
 
* **Error Response:**

    * **Code:** 401 UNAUTHORIZED <br />
        **Content:** 
        ```json
        {
          "code": "401",
          "message": "Please login to use this feature!"
        }
        ```

    OR

    * **Code:** 403 FORBIDDEN <br />
        **Content:** 
        ```json
        {
          "code": "403",
          "message": "You are unauthorized to modify this data!"
        }
        ```

    OR

    * **Code:** 404 NOT FOUND <br />
        **Content:** 
        ```json
        {
          "code": "404",
          "message": "Product Not Found"
        }
        ```

    OR

    * **Code:** 500 INTERNAL SERVER ERROR <br />
        **Content:** 
        ```json
        {
          "code": "500",
          "message": "Internal Server Error"
        }
        ```
----
  **User Register**
----
  Register a new User to use application feature

* **URL**

  /user/register

* **Method:**
  
  `POST`

* **Request Headers**

  none
  
* **URL Params**

  none

* **Data Params**

  | key | value | required |
  | :---: | :---: | :---: |
  | email | <YOUR_EMAIL> | true |
  | password | <YOUR_PASSWORD> | true |

* **Success Response:**
  
  
  * **Code:** 201 CREATED <br />
    **Content:** 
    ```json
    {
    "id": 1,
    "email": "test1@mail.com"
    }
    ```
 
* **Error Response:**

    * **Code:** 400 BAD REQUEST <br />
        **Content:** 
        ```json
        {
          "code": "400",
          "message": [
              "Email is required!"
          ]
        }
        ```

        OR

        ```json
        {
          "code": "400",
          "message": [
              "Please input a valid email!"
          ]
        }
        ```

        OR

        ```json
        {
          "code": "400",
          "message": [
              "Password is required!"
          ]
        }
        ```
    OR

    * **Code:** 500 INTERNAL SERVER ERROR <br />
        **Content:** 
        ```json
        {
          "code": "500",
          "message": "Internal Server Error"
        }
        ```
----
  **User Login**
----
  Login to use application feature

* **URL**

  /user/login

* **Method:**
  
  `POST`

* **Request Headers**

  none
  
* **URL Params**

  none

* **Data Params**

  | key | value | required |
  | :---: | :---: | :---: |
  | email | <YOUR_EMAIL> | true |
  | password | <YOUR_PASSWORD> | true |

* **Success Response:**
  
  
  * **Code:** 200 OK <br />
    **Content:** 
    ```json
    {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXI0IiwiaWF0IjoxNTk0MTE5NDQyfQ.N9zq3FCzHqRIaNwL7P3-tdm9Drs40jhw_zWZRtgF078"
    }
    ```
 
* **Error Response:**

    * **Code:** 400 BAD REQUEST <br />
        **Content:** 
        ```json
        {
          "code": "400",
          "message": "invalid email/password"
        }
        ```
    OR

    * **Code:** 500 INTERNAL SERVER ERROR <br />
        **Content:** 
        ```json
        {
          "code": "500",
          "message": "Internal Server Error"
        }
        ```
----