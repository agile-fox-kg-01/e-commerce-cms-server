# e-commerce-cms-server

  Deploy Here:

[ecommerce-server](https://e-comm-sandi.herokuapp.com)

## API Documentation

----
  **Login User**
----
  login existed user

* **URL**
  login

* **Method:**
  `POST`

* **Request Headers**
  None

* **URL Params**
  None

* **Data Params**

  | key | value | required |
  | :---: | :---: | :---: |
  | email | <user_email> | true |
  | password | <user_password> | true |

* **Success Response:**

  * **Code:**200 OK <br />
    **Content:**
    ```json
    {
        "token": "user-token"
    }
    ```

* **Error Response:**
    * **Code:** 400 Bad Request <br />
        **Content:**
        ```json
        { "errors" : "invalid username/password" }
        ```
    
    * **Code:** 500 Internal Server Error <br />
        **Content:** 
        ```json
        { "error" : "Internal Server Error" }
        ```

----
  **Register User**
----
  register new User and send message to email address

* **URL**
  /register

* **Method:**
  `POST`

* **Request Headers**
  None

* **URL Params**
  None

* **Data Params**

  | key | value | required |
  | :---: | :---: | :---: |
  | email | <user_email> | true |
  | password | <user_password> | true |
  | role | <user_role> | true |

* **Success Response:**

  * **Code:**201 CREATED <br />
    **Content:**
    ```json
    {
        "token": "user_token"
    }
    ```

* **Error Response:**
    * **Code:** 400 Bad Request <br />
        **Content:**
        ```json
        { "errors" : "invalid username/password" }
        ```
    
    * **Code:** 500 Internal Server Error <br />
        **Content:** 
        ```json
        { "error" : "Internal Server Error" }
        ```

----
  **Signin or Register User with Google**
----
  SignIn with google email or if user not exist automatically register and send message to email address

* **URL**
  /login/google

* **Method:**
  `POST`

* **Request Headers**
  | key | value | required |
  | :---: | :---: | :---: |
  | Token | <GOOGLE_TOKEN> | true |

* **URL Params**
  None

* **Data Params**
  None

* **Success Response:**
  * **Code:**200 OK <br />
    **Content:**
    ```json
    {
        "token": "user_token"
    }
    ```
    OR

  * **Code:**201 CREATED <br />
    **Content:**
    ```json
    {
        "token": "user_token"
    }
    ```

* **Error Response:**
    
    * **Code:** 500 Internal Server Error <br />
        **Content:** 
        ```json
        { "error" : "Internal Server Error" }
        ```

----
  **Read All Products**
----
  see all the admin products

* **URL**
  /products

* **Method:**
  `GET`

* **Request Headers**
  | key | value | required |
  | :---: | :---: | :---: |
  | Token | <USER_TOKEN> | true |

* **URL Params**
  None

* **Data Params**
  None

* **Success Response:**

  * **Code:**200 OK <br />
    **Content:**
    ```json
    [
        {
            "id": 2,
            "name": "laptop",
            "image_url": "https://www.notebookcheck.net/uploads/tx_nbc2/MicrosoftSurfaceLaptop3-15__1__02.JPG",
            "price": 10000,
            "stock": 5,
            "createdAt": "2020-07-25T10:43:47.456Z",
            "updatedAt": "2020-07-25T10:43:47.456Z"
        },
        {
            "id": 3,
            "name": "laptop2",
            "image_url": "https://www.notebookcheck.net/uploads/tx_nbc2/MicrosoftSurfaceLaptop3-15__1__02.JPG",
            "price": 500000,
            "stock": 5,
            "createdAt": "2020-07-25T10:43:47.456Z",
            "updatedAt": "2020-07-25T10:43:47.456Z"
        }
    ]
    ```

* **Error Response:**
    * **Code:** 401 Unauthorized <br />
        **Content:**
        ```json
        { "error" : "login first" }
        ```
    
    * **Code:** 500 Internal Server Error <br />
        **Content:** 
        ```json
        { "error" : "Internal Server Error" }
        ```
----
  **Read one task**
----
  see one the admin product

* **URL**
  /products/:id

* **Method:**
  `GET`

* **Request Headers**
  | key | value | required |
  | :---: | :---: | :---: |
  | Token | <USER_TOKEN> | true |

* **URL Params**

  | key | value | required |
  | :---: | :---: | :---: |
  | id | <TASK_ID> | true |

* **Data Params**
  None

* **Success Response:**

  * **Code:**200 OK <br />
    **Content:**
    ```json
    {
        "id": 2,
        "name": "laptop",
        "image_url": "https://www.notebookcheck.net/uploads/tx_nbc2/MicrosoftSurfaceLaptop3-15__1__02.JPG",
        "price": 10000,
        "stock": 5,
        "createdAt": "2020-07-25T10:43:47.456Z",
        "updatedAt": "2020-07-25T10:43:47.456Z"
    }
    ```
* **Error Response:**
    * **Code:** 401 Unauthorized <br />
        **Content:**
        ```json
        { "error" : "login first" }
        ```
  
    * **Code:** 401 Unauthorized <br />
        **Content:**
        ```json
        { "error" : "Not Authorized to Access this" }
        ```

    * **Code:** 404 NotFound <br />
        **Content:** 
        ```json
        { "error" : "Task not Found" }
        ```

    * **Code:** 500 Internal Server Error <br />
        **Content:** 
        ```json
        { "error" : "Internal Server Error" }
        ```
----
  **Add a Task**
----
  Create a new task

* **URL**
  /task/add

* **Method:**
  `POST`

* **Request Headers**
  | key | value | required |
  | :---: | :---: | :---: |
  | Token | <USER_TOKEN> | true |

* **URL Params**
  None

* **Data Params**

  | key | value | required |
  | :---: | :---: | :---: |
  | name | <Product_Name> | true |
  | image_url | <Product_imageurl> | true |
  | price | <Product_price> | true |
  | stock | <Product_stock> | true |

* **Success Response:**

  * **Code:**201 CREATED <br />
    **Content:**
    ```json
    {
        "id": 2,
        "name": "laptop",
        "image_url": "https://www.notebookcheck.net/uploads/tx_nbc2/MicrosoftSurfaceLaptop3-15__1__02.JPG",
        "price": 10000,
        "stock": 5,
        "createdAt": "2020-07-25T10:43:47.456Z",
        "updatedAt": "2020-07-25T10:43:47.456Z"
    }
    ```
* **Error Response:**
    * **Code:** 401 Unauthorized <br />
        **Content:**
        ```json
        { "error" : "login first" }
        ```

    * **Code:** 400 Bad Request <br />
        **Content:**
        ```json
        { "errors" : "title cannot be empty" }
        ```

    * **Code:** 500 Internal Server Error <br />
        **Content:** 
        ```json
        { "error" : "Internal Server Error" }
        ```
----
  **Edit a Task**
----
  Edit a admin's product

* **URL**
  /products/edit/:id'

* **Method:**
  `PUT`

* **Request Headers**
  | key | value | required |
  | :---: | :---: | :---: |
  | Token | <USER_TOKEN> | true |

* **URL Params**

  | key | value | required |
  | :---: | :---: | :---: |
  | id | <Product_id> | true |

* **Data Params**

  | key | value | required |
  | :---: | :---: | :---: |
  | name | <Product_Name> | true |
  | image_url | <Product_imageurl> | true |
  | price | <Product_price> | true |
  | stock | <Product_stock> | true |

* **Success Response:**

  * **Code:**201 CREATED <br />
    **Content:**
    ```json
    {
        "id": 2,
        "name": "laptop",
        "image_url": "https://www.notebookcheck.net/uploads/tx_nbc2/MicrosoftSurfaceLaptop3-15__1__02.JPG",
        "price": 10000,
        "stock": 5,
        "createdAt": "2020-07-25T10:43:47.456Z",
        "updatedAt": "2020-07-25T10:43:47.456Z"
    }
    ```
* **Error Response:**
    * **Code:** 401 Unauthorized <br />
        **Content:**
        ```json
        { "error" : "login first" }
        ```

    * **Code:** 401 Unauthorized <br />
        **Content:**
        ```json
        { "error" : "Not Authorized to Access this" }
        ```

    * **Code:** 400 Bad Request <br />
        **Content:**
        ```json
        { "errors" : "name cannot be empty" }
        ``` 
    
    * **Code:** 404 NotFound <br />
        **Content:** 
        ```json
        { "error" : "Product not Found" }
        ```

    * **Code:** 500 Internal Server Error <br />
        **Content:** 
        ```json
        { "error" : "Internal Server Error" }
        ```
----
  **Delete a Task**
----
  Delete a admin's Product

  * **URL**
  /products/delete/:id

* **Method:**
  `DELETE`

* **Request Headers**
  | key | value | required |
  | :---: | :---: | :---: |
  | Token | <USER_TOKEN> | true |

* **URL Params**

  | key | value | required |
  | :---: | :---: | :---: |
  | id | <Productid> | true |

* **Data Params**
  None

* **Success Response:**

  * **Code:**200 OK <br />
    **Content:**
    ```json
    {
      "title": "product kesatu"
    }
    ```
* **Error Response:**
    * **Code:** 401 Unauthorized <br />
        **Content:**
        ```json
        { "error" : "login first" }
        ```

    * **Code:** 401 Unauthorized <br />
        **Content:**
        ```json
        { "error" : "Not Authorized to Access this" }
        ```

    * **Code:** 404 NotFound <br />
        **Content:** 
        ```json
        { "error" : "Product not Found" }
        ```

    * **Code:** 500 Internal Server Error <br />
        **Content:** 
        ```json
        { "error" : "Internal Server Error" }
        ```
