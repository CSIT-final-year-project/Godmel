# GODMEL - an app for farmer empowerment

## Inspiration
Farmers are not being paid deserving amount due to involvement of middlemen in grocery market. The products are purchased in less amount from farmers by dealer and sold to consumers in high price. Also consumer are not getting fresh product in reasonable price. So with aim to solve the problem at both end we have developed a digital B2C marketplace where farmer can directly sell product to consumer. Consumer can get fresh product directly from the farm at very reasonable price.

## Features:
    Farmer
        -Create Account
        -Buy agro-supplies
        -Sell crops (Crops CRUD)
        -Equipment/helper renting
        (optional)
        -precision agriculture
    Consumer Profile
        -Create Account
        -Browse Products 
        -Order crops
    Supplier Profile
        -Create Account
        -Sell agro-supplies to farmer (Supplies CRUD)
    Rider Profile
        -Register By Admin
        -Dashboard for order placed
        -Get notified on order placed with farms address and consumer address (or farm address and supplier address)
    Admin
        -Create riders
        -View Orders and status

## Modules
    auth
    banner
    category
    crops


## Folder Architecture
    client - Front end code using react js and bootstrap
    server - Backend code using node js, express and mongodb
    mlserver - Machine learning code for precision agriculture using python
        