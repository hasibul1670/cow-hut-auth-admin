#### cow-hut server-auth assignment - 4 

### Live Link(vercel): https://cow-hut-ten.vercel.app/

### Github Repository Link: https://github.com/Porgramming-Hero-web-course/l2b1a4-cow-hut-admin-auth-hasibul1670

### Application Routes:

### Sample Login User [POST]

```json
{
  "password": "110220",
  "phoneNumber": "01575444"
}
```
### sample json for User loggin successfully

```json
{
  "statusCode": 200,
  "success": true,
  "message": "User Loggedin successfully !",
  "data": {
    "logInUserRole": "seller",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6IjAxNTc1NDQ0Iiwicm9sZSI6InNlbGxlciIsImlhdCI6MTY4NzYyMjE2OCwiZXhwIjoxNjg3NzA4NTY4fQ.QFXp7oUmwLjzjs83r89ZubMduKjyb8pN3zlpAlyJECU"
  }
}
```


### sample json for creating a new seller

```json
{
  "password": "110220",
  "phoneNumber": "01575222",
  "seller": {
    "name": {
      "firstName": "ami seller 002",
      "lastName": "seller"
    },

    "address": "123 Main St, cumilla, dhaka",
    "income": 0
  }
}
```

### sample json for Seller created successfully

```json
{
  "statusCode": 200,
  "success": true,
  "message": "Seller created successfully!",
  "data": {
    "_id": "64970f1f5a4e21267fac5d35",
    "id": "S-00002",
    "role": "seller",
    "phoneNumber": "01575444",
    "seller": {
      "_id": "64970f1f5a4e21267fac5d32",
      "id": "S-00002",
      "name": {
        "firstName": "ami seller 002",
        "lastName": "seller",
        "_id": "64970f1f5a4e21267fac5d33",
        "id": "64970f1f5a4e21267fac5d33"
      },
      "address": "123 Main St, cumilla, dhaka",
      "income": 0,
      "createdAt": "2023-06-24T15:43:27.541Z",
      "updatedAt": "2023-06-24T15:43:27.541Z",
      "__v": 0
    }
  }
}
```

### sample json for creating a new Buyer

```json
{
  "password": "110220",
  "phoneNumber": "01575333",
  "buyer": {
    "name": {
      "firstName": "King after deploy test",
      "lastName": "buyer"
    },

    "address": "123 Main St, cumilla, dhaka",
    "budget": 15000
  }
}
```

### sample json for Buyer created successfully

```json
{
  "statusCode": 200,
  "success": true,
  "message": "Buyer created successfully!",
  "data": {
    "_id": "64970e915a4e21267fac5d2a",
    "id": "B-00001",
    "role": "buyer",
    "phoneNumber": "01575333",
    "buyer": {
      "_id": "64970e915a4e21267fac5d27",
      "id": "B-00001",
      "name": {
        "firstName": "King after deploy test",
        "lastName": "buyer",
        "_id": "64970e915a4e21267fac5d28",
        "id": "64970e915a4e21267fac5d28"
      },
      "address": "123 Main St, cumilla, dhaka",
      "budget": 15000,
      "createdAt": "2023-06-24T15:41:05.535Z",
      "updatedAt": "2023-06-24T15:41:05.535Z",
      "__v": 0
    },
    "createdAt": "2023-06-24T15:41:05.538Z",
    "updatedAt": "2023-06-24T15:41:05.538Z",
    "__v": 0
  }
}
```



### Sample create Admin [POST]

```json
{
  "password": "110220",
  "role": "admin",
  "name": {
    "firstName": "Mr. Admin",
    "lastName": "Bhai"
  },
  "phoneNumber": "015750000",
  "address": "DHAKA"
}
```

### Response: The newly created admin Response Sample Pattern:

```json
{
  "statusCode": 200,
  "success": true,
  "message": "Admin created successfully!",
  "data": {
    "id": "A-00004",
    "role": "admin",
    "name": {
      "firstName": "Mr. Admin",
      "lastName": "Bhai",
      "_id": "6495575ccfc0ce99ccf1a504"
    },
    "phoneNumber": "015754444",
    "address": "DHAKA",
    "_id": "6495575ccfc0ce99ccf1a503",
    "createdAt": "2023-06-23T08:27:08.956Z",
    "updatedAt": "2023-06-23T08:27:08.956Z",
    "__v": 0
  }
}
```

### Sample Login ADMIN [POST]

```json
{
  "password": "110330",
  "phoneNumber": "015751111"
}
```

### Sample Login ADMIN Response type

```json
{
  "statusCode": 200,
  "success": true,
  "message": "Admin Loggedin successfully !",
  "data": {
    "logInUserRole": "admin",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6IjAxNTc1MTExMSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY4NzYyMjM2OSwiZXhwIjoxNjg3NzA4NzY5fQ.YsKHQfZtjBAdfx_NW7LihBGixVs2PmkZdBp28ZmRUCM"
  }
}
```


### Sample Cow Data for create a cow

```json
{
  "name": "tiger",
  "age": 4,
  "price": 17800,
  "location": "Dhaka",
  "breed": "Brahman",
  "weight": 400,
  "label": "for sale",
  "category": "Beef",
  "seller": "64970dfa5a4e21267fac5d19"
}
```


#### User [AUTH]

- https://cow-hut-ten.vercel.app/api/v1/auth/signup/seller [create/signup a seller] (POST)
- https://cow-hut-ten.vercel.app/api/v1/auth/signup/buyer [create/signup a buyer] (POST)
- https://cow-hut-ten.vercel.app/api/v1/auth/login [POST]
- https://cow-hut-ten.vercel.app/api/v1/auth/refresh-token [POST]


#### Admin [AUTH]

- https://cow-hut-ten.vercel.app/api/v1/admins/create-admin [POST]
- https://cow-hut-ten.vercel.app/api/v1/admins/login [POST]


#### User

- https://cow-hut-ten.vercel.app/api/v1/users (GET)
- https://cow-hut-ten.vercel.app/api/v1/users/648c804e7a84270cec0b4546 (get Single User) (GET)
- https://cow-hut-ten.vercel.app/api/v1/users/648c804e7a84270cec0b4546 (Update Single User) (PATCH)
- https://cow-hut-ten.vercel.app/api/v1/users/648c804e7a84270cec0b4546 (Update  a Single USER both seller/buyer) (DELETE)

#### Seller

- https://cow-hut-ten.vercel.app/api/v1/sellers [get all users] (GET)
- https://cow-hut-ten.vercel.app/api/v1/sellers/648c80887a84270cec0b4566 (get Single Seller) (GET)
- https://cow-hut-ten.vercel.app/api/v1/sellers/648c80887a84270cec0b4566 (Update Single Seller) (PATCH)

#### Cows
- https://cow-hut-ten.vercel.app/api/v1/cows/create-cow [create a cow] (POST)
- https://cow-hut-ten.vercel.app/api/v1/cows [get all cows] (GET)
- https://cow-hut-ten.vercel.app/api/v1/cows/6497140ae8ef9f0fe76c0346 [create a single cow] (GET)
- https://cow-hut-ten.vercel.app/api/v1/cows/6497140ae8ef9f0fe76c0346 [Update a single cow] (PATCH)
- https://cow-hut-ten.vercel.app/api/v1/cows/6497140ae8ef9f0fe76c0346 [Delete a single cow] (DELETE)


#### Orders

- https://cow-hut-ten.vercel.app/api/v1/orders [create order] (POST)
- https://cow-hut-ten.vercel.app/api/v1/orders [Get all Uers ] (GET)
- https://cow-hut-ten.vercel.app/api/v1/orders/649715b3e8ef9f0fe76c035b [Get a single Order] (GET)

#### My Profile

- https://cow-hut-ten.vercel.app/api/v1/my-profile [GET]
- https://cow-hut-ten.vercel.app/api/v1/my-profile [PATCH]

### Sample Cow Order Data to create a Order

```json
{
  "cow": "648dbe893f8caeacd1d92178",
  "buyer": "648dbdd53f8caeacd1d92154"
}
```
# cow-hut-auth-admin
