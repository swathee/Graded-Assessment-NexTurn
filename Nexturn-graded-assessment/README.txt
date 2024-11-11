Graded Assessment-1: Working with JSON Data
Problem:
You are tasked with implementing a product management system. The system will use JSON data for storing information about products. Each product has the following properties:
•	id: Unique identifier for the product.
•	name: Name of the product.
•	category: Category of the product.
•	price: Price of the product.
•	available: Boolean indicating if the product is in stock.
The tasks below involve reading JSON data, adding new products, updating product information, and filtering products based on certain conditions.

Tasks:
1. Parse the JSON data:
Write a function that reads the JSON data (in the format above) and converts it into a usable data structure. You will need to parse the JSON into a JavaScript object.
2. Add a new product:
Write a function to add a new product to the catalog. This product will have the same structure as the others and should be appended to the products array.
3. Update the price of a product:
Write a function that takes a product ID and a new price and updates the price of the product with the given ID. If the product doesn’t exist, the function should return an error message.
4. Filter products based on availability:
Write a function that returns only the products that are available (i.e., available: true).
5. Filter products by category:
Write a function that takes a category name (e.g., "Electronics") and returns all products in that category.


Graded Assessment-2: MongoDB Scripts with Relationships
Scenario Overview:
You are working with an e-commerce platform. The platform has two collections:
1.	Customers collection: Contains information about each customer.
2.	Orders collection: Contains information about orders placed by customers.
Each customer can have multiple orders, but each order is linked to only one customer.
Customer Document Structure:
{ "_id": ObjectId("unique_id"), "name": "John Doe", "email": "johndoe@example.com", "address": { "street": "123 Main St", "city": "Springfield", "zipcode": "12345" }, "phone": "555-1234", "registration_date": ISODate("2023-01-01T12:00:00Z") }
Order Document Structure:
{ "_id": ObjectId("unique_id"), "order_id": "ORD123456", "customer_id": ObjectId("unique_customer_id"), // Reference to a Customer document "order_date": ISODate("2023-05-15T14:00:00Z"), "status": "shipped", "items": [ { "product_name": "Laptop", "quantity": 1, "price": 1500 }, { "product_name": "Mouse", "quantity": 2, "price": 25 } ], "total_value": 1550 }
Part 1: Basic MongoDB Commands and Queries
Objective: Understand and demonstrate basic CRUD operations on collections with relationships.
Instructions: Write MongoDB scripts for the following tasks:
1.	Create the Collections and Insert Data:
o	Create two collections: customers and orders.
o	Insert 5 customer documents into the customers collection.
o	Insert 5 order documents into the orders collection, each linked to a customer using the customer_id field (the _id of a customer document).
2.	Find Orders for a Specific Customer:
o	Write a script to find all orders placed by a customer with the name “John Doe”. Use the customer’s _id to query the orders collection.
3.	Find the Customer for a Specific Order:
o	Write a script to find the customer information for a specific order (e.g., order_id = “ORD123456”).
4.	Update Order Status:
o	Write a script to update the status of an order to “delivered” where the order_id is “ORD123456”.
5.	Delete an Order:
o	Write a script to delete an order where the order_id is “ORD123456”.
Part 2: Aggregation Pipeline
Objective: Use MongoDB’s aggregation framework to perform more advanced queries, including working with related data across collections.
Instructions: Use the aggregation framework to solve the following tasks:
1.	Calculate Total Value of All Orders by Customer:
o	Write a script to calculate the total value of all orders for each customer. This should return each customer’s name and the total order value.
2.	Group Orders by Status:
o	Write a script to group orders by their status (e.g., “shipped”, “delivered”, etc.) and count how many orders are in each status.
3.	List Customers with Their Recent Orders:
o	Write a script to find each customer and their most recent order. Include customer information such as name, email, and order details (e.g., order_id, total_value).
4.	Find the Most Expensive Order by Customer:
o	Write a script to find the most expensive order for each customer. Return the customer’s name and the details of their most expensive order (e.g., order_id, total_value).
Part 3: Real-World Scenario with Relationships
Objective: Apply MongoDB operations to a real-world problem involving two related collections.
Scenario: You are working as a MongoDB developer for an e-commerce platform. The system needs to track customer orders, including the customer’s name, email, and address, as well as the items they ordered.
1.	Find All Customers Who Placed Orders in the Last Month:
o	Write a script to find all customers who have placed at least one order in the last 30 days. Return the customer name, email, and the order date for their most recent order.
2.	Find All Products Ordered by a Specific Customer:
o	Write a script to find all distinct products ordered by a customer with the name “John Doe”. Include the product name and the total quantity ordered.
3.	Find the Top 3 Customers with the Most Expensive Total Orders:
o	Write a script to find the top 3 customers who have spent the most on orders. Sort the results by total order value in descending order.
4.	Add a New Order for an Existing Customer:
o	Write a script to add a new order for a customer with the name “Jane Smith”. The order should include at least two items, such as “Smartphone” and “Headphones”.
Part 4: Bonus Challenge
Objective: Demonstrate the ability to work with advanced MongoDB operations and complex relationships.
1.	Find Customers Who Have Not Placed Orders:
o	Write a script to find all customers who have not placed any orders. Return the customer’s name and email.
2.	Calculate the Average Number of Items Ordered per Order:
o	Write a script to calculate the average number of items ordered per order across all orders. The result should return the average number of items.
3.	Join Customer and Order Data Using $lookup:
o	Write a script using the $lookup aggregation operator to join data from the customers collection and the orders collection. Return customer name, email, order details (order_id, total_value), and order date.





