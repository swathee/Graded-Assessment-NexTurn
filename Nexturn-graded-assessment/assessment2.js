
db.customers.insertMany([
    { 
        name: "Emma Wilson", 
        email: "emma.wilson@example.com", 
        address: { street: "123 Maple Ave", city: "Fairview", zipcode: "11111" }, 
        phone: "555-1111", 
        registration_date: new Date("2023-01-01T12:00:00Z") 
    },
    { 
        name: "Liam Johnson", 
        email: "liam.johnson@example.com", 
        address: { street: "456 Oak Dr", city: "Greenville", zipcode: "22222" }, 
        phone: "555-2222", 
        registration_date: new Date("2023-02-15T12:00:00Z") 
    },
    { 
        name: "Olivia Brown", 
        email: "olivia.brown@example.com", 
        address: { street: "789 Pine St", city: "Lakewood", zipcode: "33333" }, 
        phone: "555-3333", 
        registration_date: new Date("2023-03-10T12:00:00Z") 
    },
    { 
        name: "Noah Davis", 
        email: "noah.davis@example.com", 
        address: { street: "321 Cedar Rd", city: "Hillside", zipcode: "44444" }, 
        phone: "555-4444", 
        registration_date: new Date("2023-04-20T12:00:00Z") 
    },
    { 
        name: "Ava Miller", 
        email: "ava.miller@example.com", 
        address: { street: "654 Birch Ln", city: "Sunnyvale", zipcode: "55555" }, 
        phone: "555-5555", 
        registration_date: new Date("2023-05-05T12:00:00Z") 
    }
]);

db.orders.insertMany([
    { 
        order_id: "ORD234567", 
        customer_id: ObjectId('67320c549ec744648a0d8190'), 
        order_date: new Date("2023-05-15T14:00:00Z"), 
        status: "shipped", 
        items: [
            { product_name: "Smart TV", quantity: 1, price: 500 }, 
            { product_name: "Remote Control", quantity: 2, price: 20 }
        ], 
        total_value: 540 
    },
    { 
        order_id: "ORD234568", 
        customer_id: ObjectId('67320c549ec744648a0d8191'), 
        order_date: new Date("2023-06-01T14:00:00Z"), 
        status: "pending", 
        items: [
            { product_name: "Wireless Earbuds", quantity: 1, price: 80 }
        ], 
        total_value: 80 
    },
    { 
        order_id: "ORD234569", 
        customer_id: ObjectId('67320c549ec744648a0d8192'), 
        order_date: new Date("2023-06-10T14:00:00Z"), 
        status: "delivered", 
        items: [
            { product_name: "Electric Kettle", quantity: 1, price: 30 },
            { product_name: "Coffee Mug", quantity: 2, price: 15 }
        ], 
        total_value: 60 
    },
    { 
        order_id: "ORD234570", 
        customer_id: ObjectId('67320c549ec744648a0d8193'), 
        order_date: new Date("2023-06-20T14:00:00Z"), 
        status: "shipped", 
        items: [
            { product_name: "Smartphone", quantity: 1, price: 600 }
        ], 
        total_value: 600 
    },
    { 
        order_id: "ORD234571", 
        customer_id: ObjectId('67320c549ec744648a0d8194'), 
        order_date: new Date("2023-07-05T14:00:00Z"),
        status: "processing", 
        items: [
            { product_name: "Portable Charger", quantity: 1, price: 25 },
            { product_name: "USB Cable", quantity: 1, price: 10 }
        ], 
        total_value: 35 
    }
]);


db.orders.aggregate([
    { $group: { _id: "$customer_id", total_spent: { $sum: "$total_value" } } },
    { $lookup: { from: "customers", localField: "_id", foreignField: "_id", as: "customer" } },
    { $unwind: "$customer" },
    { $project: { name: "$customer.name", total_spent: 1 } }
]);

db.orders.aggregate([
    { $group: { _id: "$status", order_count: { $sum: 1 } } }
]);


db.orders.aggregate([
    { $sort: { order_date: -1 } },
    { $group: { _id: "$customer_id", recent_order: { $first: "$$ROOT" } } },
    { $lookup: { from: "customers", localField: "_id", foreignField: "_id", as: "customer" } },
    { $unwind: "$customer" },
    { $project: { name: "$customer.name", email: "$customer.email", order_id: "$recent_order.order_id", total_value: "$recent_order.total_value" } }
]);

db.orders.aggregate([
    { $sort: { total_value: -1 } },
    { $group: { _id: "$customer_id", most_expensive_order: { $first: "$$ROOT" } } },
    { $lookup: { from: "customers", localField: "_id", foreignField: "_id", as: "customer" } },
    { $unwind: "$customer" },
    { $project: { name: "$customer.name", order_id: "$most_expensive_order.order_id", total_value: "$most_expensive_order.total_value" } }
]);


db.orders.aggregate([
    { $match: { order_date: { $gte: new Date(new Date().setMonth(new Date().getMonth() - 1)) } } },
    { $group: { _id: "$customer_id", recent_order: { $first: "$$ROOT" } } },
    { $lookup: { from: "customers", localField: "_id", foreignField: "_id", as: "customer" } },
    { $unwind: "$customer" },
    { $project: { name: "$customer.name", email: "$customer.email", order_date: "$recent_order.order_date" } }
]);


db.orders.aggregate([
    { $match: { customer_id: ObjectId('67320c549ec744648a0d8190') } },
    { $unwind: "$items" },
    { $group: { _id: "$items.product_name", total_quantity: { $sum: "$items.quantity" } } }
]);


db.orders.aggregate([
    { $group: { _id: "$customer_id", total_spent: { $sum: "$total_value" } } },
    { $sort: { total_spent: -1 } },
    { $limit: 3 },
    { $lookup: { from: "customers", localField: "_id", foreignField: "_id", as: "customer" } },
    { $unwind: "$customer" },
    { $project: { name: "$customer.name", total_spent: 1 } }
]);


db.orders.insertOne({
    order_id: "ORD234572",
    customer_id: ObjectId("67320c549ec744648a0d8191"),
    order_date: new Date("2023-08-01T14:00:00Z"),
    status: "pending",
    items: [
        { product_name: "Gaming Console", quantity: 1, price: 400 },
        { product_name: "Controller", quantity: 2, price: 60 }
    ],
    total_value: 520
});


db.customers.aggregate([
    { $lookup: { from: "orders", localField: "_id", foreignField: "customer_id", as: "orders" } },
    { $match: { "orders": { $size: 0 } } },
    { $project: { name: 1, email: 1 } }
]);


db.orders.aggregate([
    { $unwind: "$items" },
    { $group: { _id: "$items.product_name", total_quantity: { $sum: "$items.quantity" } } },
    { $sort: { total_quantity: -1 } },
    { $limit: 1 }
]);


db.orders.aggregate([
    { $group: { _id: "$customer_id", order_count: { $sum: 1 } } },
    { $lookup: { from: "customers", localField: "_id", foreignField: "_id", as: "customer" } },
    { $unwind: "$customer" },
    { $project: { name: "$customer.name", order_count: 1 } }
]);
