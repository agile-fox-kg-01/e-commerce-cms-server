# e-commerce-cms-server

  Deploy Here:

[E-Commerce-CMS_Server](https://e-commerce-server-app.herokuapp.com/)

## API Documentation

----
  **Login**
----
  Login as an admin in E-Commerce CMS app

* **URL**

  /login

* **Method:**

  `POST`

* **Request Headers**

  | key | value | required |
  | :---: | :---: | :---: |
  | Content-Type | application/x-www-form-urlencoded | true |

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
        "name": "Tsubasa Ozora",
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRzdWJhc2Fvem9yYUBtYWlsLmNvbSIsImlhdCI6MTU5NDg5NTgwMn0.LAs2KuBk4xeMscLU6aURVa7jLuC5yzlhCc1c6qexzHw"
    }
    ```

* **Error Response:**

    * **Code:** 400 Bad Request <br />
        **Content:**
        ```json
        {
            "error": {
                "message": "Invalid username or password"
            }
        }
        ```

    OR

    * **Code:** 500 Internal Server Error <br />
        **Content:** 
        ```json
        {
            "error": {
                "message" : "Internal Server Error"
            } 
        }
        ```

----
  **Create Product**
----
  Create a new product in E-Commerce CMS app

* **URL**

  /product

* **Method:**

  `POST`

* **Request Headers**

  | key | value | required |
  | :---: | :---: | :---: |
  | Content-Type | application/x-www-form-urlencoded | true |
  | access_token | <USER_TOKEN> | true |

* **URL Params**

   none

* **Data Params**

  | key | value | required |
  | :---: | :---: | :---: |
  | name | <PRODUCT_NAME> | true |
  | imageURL | <PRODUCT_IMAGEURL> | true |
  | price | <PRODUCT_PRICE> | true |
  | stock | <PRODUCT_STOCK> | true |

* **Success Response:**


  * **Code:** 201 Created <br />
    **Content:**
    ```json
    {
        "id": 1,
        "name": "Apple MacBook Pro MXK52ID/A [1.4GHz Intel Core i5/ 8GB RAM/ 512GB SSD/ Intel Iris Plus Graphics/ 13 Inch/ macOS]",
        "imageURL": "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//100/MTA-7473574/apple_apple_macbook_pro_mxk32_space_grey_-13_inch-_intel_iris_plus_graphics-_2-0ghz_intel_core_i5-_16gb_ram-_512gb_ssd-_macos-_full03_j8bompaz.jpg?output-format=webp",
        "price": 32740000,
        "stock": 10,
        "updatedAt": "2020-07-25T10:33:18.618Z",
        "createdAt": "2020-07-25T10:33:18.618Z"
    }
    ```

* **Error Response:**

    * **Code:** 400 Bad Request <br />
        **Content:**
        ```json
        {
            "errors": [
                {
                    "message": "Name is required"
                },
                {
                    "message": "Image URL format invalid"
                },
                {
                    "message": "Image URL is required"
                },
                {
                    "message": "Price should be in number format"
                },
                {
                    "message": "Price is required"
                },
                {
                    "message": "Stock should be in number format"
                },
                {
                    "message": "Stock is required"
                }
            ]
        }
        ```

    OR

    * **Code:** 500 Internal Server Error <br />
        **Content:** 
        ```json
        {
            "error": {
                "message" : "Internal Server Error"
            } 
        }
        ```

----
  **View all Products**
----
  View all products

* **URL**

  /product

* **Method:**

  `GET`

* **Request Headers**

  | key | value | required |
  | :---: | :---: | :---: |
  | access_token | <USER_TOKEN> | true |

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
            "name": "Apple MacBook Pro MXK52ID/A [1.4GHz Intel Core i5/ 8GB RAM/ 512GB SSD/ Intel Iris Plus Graphics/ 13 Inch/ macOS]",
            "imageURL": "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//100/MTA-7473574/apple_apple_macbook_pro_mxk32_space_grey_-13_inch-_intel_iris_plus_graphics-_2-0ghz_intel_core_i5-_16gb_ram-_512gb_ssd-_macos-_full03_j8bompaz.jpg?output-format=webp",
            "price": 32740000,
            "stock": 10,
            "createdAt": "2020-07-25T10:33:18.618Z",
            "updatedAt": "2020-07-25T10:33:18.618Z"
        },
        {
            "id": 2,
            "name": "Apple MacBook Pro MXK52ID/A [1.4GHz Intel Core i5/ 8GB RAM/ 512GB SSD/ Intel Iris Plus Graphics/ 13 Inch/ macOS]",
            "imageURL": "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//100/MTA-7473574/apple_apple_macbook_pro_mxk32_space_grey_-13_inch-_intel_iris_plus_graphics-_2-0ghz_intel_core_i5-_16gb_ram-_512gb_ssd-_macos-_full03_j8bompaz.jpg?output-format=webp",
            "price": 32000000,
            "stock": 5,
            "createdAt": "2020-07-25T10:39:55.361Z",
            "updatedAt": "2020-07-25T10:39:55.361Z"
        },
        {
            "id": 3,
            "name": "Apple MacBook Pro MXK52ID/A [1.4GHz Intel Core i5/ 8GB RAM/ 512GB SSD/ Intel Iris Plus Graphics/ 13 Inch/ macOS]",
            "imageURL": "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//100/MTA-7473574/apple_apple_macbook_pro_mxk32_space_grey_-13_inch-_intel_iris_plus_graphics-_2-0ghz_intel_core_i5-_16gb_ram-_512gb_ssd-_macos-_full03_j8bompaz.jpg?output-format=webp",
            "price": 30000000,
            "stock": 2,
            "createdAt": "2020-07-25T10:40:07.682Z",
            "updatedAt": "2020-07-25T10:40:07.682Z"
        }
    ]
    ```

* **Error Response:**

    * **Code:** 500 Internal Server Error <br />
        **Content:** 
        ```json
        {
            "error": {
                "message" : "Internal Server Error"
            } 
        }
        ```

----
  **View a Product**
----
  View a product

* **URL**

  /product/:id

* **Method:**

  `GET`

* **Request Headers**

  | key | value | required |
  | :---: | :---: | :---: |
  | access_token | <USER_TOKEN> | true |

* **URL Params**

   | key | value | required |
   | :---: | :---: | :---: |
   | id | <PRODUCT_ID> | true |

* **Data Params**

   none

* **Success Response:**


  * **Code:** 200 OK <br />
    **Content:**
    ```json
    {
        "id": 1,
        "name": "Apple MacBook Pro MXK52ID/A [1.4GHz Intel Core i5/ 8GB RAM/ 512GB SSD/ Intel Iris Plus Graphics/ 13 Inch/ macOS]",
        "imageURL": "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//100/MTA-7473574/apple_apple_macbook_pro_mxk32_space_grey_-13_inch-_intel_iris_plus_graphics-_2-0ghz_intel_core_i5-_16gb_ram-_512gb_ssd-_macos-_full03_j8bompaz.jpg?output-format=webp",
        "price": 32740000,
        "stock": 10,
        "createdAt": "2020-07-25T10:33:18.618Z",
        "updatedAt": "2020-07-25T10:33:18.618Z"
    }
    ```

* **Error Response:**

    * **Code:** 404 Not Found <br />
        **Content:** 
        ```json
        {
            "error": {
                "message" : "Product not found"
            } 
        }
        ```

    OR

    * **Code:** 500 Internal Server Error <br />
        **Content:** 
        ```json
        {
            "error": {
                "message" : "Internal Server Error"
            } 
        }
        ```

----
  **Update a Product**
----
  Update an existing product in E-Commerce CMS app

* **URL**

  /product/:id

* **Method:**

  `PUT`

* **Request Headers**

  | key | value | required |
  | :---: | :---: | :---: |
  | Content-Type | application/x-www-form-urlencoded | true |
  | access_token | <USER_TOKEN> | true |

* **URL Params**

   | key | value | required |
   | :---: | :---: | :---: |
   | id | <PRODUCT_ID> | true |
   
* **Data Params**

  | key | value | required |
  | :---: | :---: | :---: |
  | name | <PRODUCT_NAME> | true |
  | imageURL | <PRODUCT_IMAGEURL> | true |
  | price | <PRODUCT_PRICE> | true |
  | stock | <PRODUCT_STOCK> | true |

* **Success Response:**


  * **Code:** 200 OK <br />
    **Content:**
    ```json
    {
        "id": 1,
        "name": "Apel",
        "imageURL": "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//100/MTA-7473574/apple_apple_macbook_pro_mxk32_space_grey_-13_inch-_intel_iris_plus_graphics-_2-0ghz_intel_core_i5-_16gb_ram-_512gb_ssd-_macos-_full03_j8bompaz.jpg?output-format=webp",
        "price": 10000000,
        "stock": 2,
        "createdAt": "2020-07-25T10:33:18.618Z",
        "updatedAt": "2020-07-25T10:48:04.612Z"
    }
    ```

* **Error Response:**

    * **Code:** 400 Bad Request <br />
        **Content:**
        ```json
        {
            "errors": [
                {
                    "message": "Name is required"
                },
                {
                    "message": "Image URL format invalid"
                },
                {
                    "message": "Image URL is required"
                },
                {
                    "message": "Price should be in number format"
                },
                {
                    "message": "Price is required"
                },
                {
                    "message": "Stock should be in number format"
                },
                {
                    "message": "Stock is required"
                }
            ]
        }
        ```
    
    OR

    * **Code:** 404 Not Found <br />
        **Content:** 
        ```json
        {
            "error": {
                "message" : "Product not found"
            } 
        }
        ```

    OR

    * **Code:** 500 Internal Server Error <br />
        **Content:** 
        ```json
        {
            "error": {
                "message" : "Internal Server Error"
            } 
        }
        ```

----
  **Delete a Product**
----
  Delete an existing product in E-Commerce CMS app

* **URL**

  /product/:id

* **Method:**

  `DELETE`

* **Request Headers**

  | key | value | required |
  | :---: | :---: | :---: |
  | Content-Type | application/x-www-form-urlencoded | true |
  | access_token | <USER_TOKEN> | true |

* **URL Params**

   | key | value | required |
   | :---: | :---: | :---: |
   | id | <PRODUCT_ID> | true |

* **Data Params**

  none

* **Success Response:**


  * **Code:** 200 OK <br />
    **Content:**
    ```json
    {
        "id": 1,
        "name": "Apel",
        "imageURL": "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//100/MTA-7473574/apple_apple_macbook_pro_mxk32_space_grey_-13_inch-_intel_iris_plus_graphics-_2-0ghz_intel_core_i5-_16gb_ram-_512gb_ssd-_macos-_full03_j8bompaz.jpg?output-format=webp",
        "price": 10000000,
        "stock": 2,
        "createdAt": "2020-07-25T10:33:18.618Z",
        "updatedAt": "2020-07-25T10:48:04.612Z"
    }
    ```

* **Error Response:**

    * **Code:** 404 Not Found <br />
        **Content:** 
        ```json
        {
            "error": {
                "message" : "Product not found"
            } 
        }
        ```

    OR

    * **Code:** 500 Internal Server Error <br />
        **Content:** 
        ```json
        {
            "error": {
                "message" : "Internal Server Error"
            } 
        }
        ```