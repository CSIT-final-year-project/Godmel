# GODMEL - an app for farmer empowerment

## Inspiration
Farmers are not being paid deserving amount due to involvement of middlemen in grocery market. The products are purchased in less amount from farmers by dealer and sold to consumers in high price. Also consumer are not getting fresh product in reasonable price. So with aim to solve the problem at both end we have developed a digital B2C marketplace where farmer can directly sell product to consumer. Consumer can get fresh product directly from the farm at very reasonable price.

## Features:
    All:
        -Crop Prediction
        -Crop Cure Recommendation
    Farmer
        -Create Account
        -Buy agro-supplies
        -Sell crops (Crops CRUD)
    Consumer Profile
        -Create Account
        -Browse Products 
        -Order crops
    Admin
        -Create riders
        -View Orders and status
        -Sell agro-supplies to farmer (Supplies CRUD)

## Modules
    auth
    banner
    category
    crops


## Folder Architecture
    client2 - Front end code using react js and bootstrap
    server - Backend code using node js, express and mongodb
    mlserver - Machine learning code for precision agriculture using python

## How to run
    1. Clone Project
    2. Go to server folder, rename .env.example to .env and setup your own env variable
    3. run server with 'npm start'
    4. Go to client2 folder, rename .env.example to .env and setup env variables
    5. run client2 with 'yarn dev'
    6. Go to mlserver folder
    7. run mlserver with 'python app.py'
    8. navigate 'https://localhost:5174'
        
