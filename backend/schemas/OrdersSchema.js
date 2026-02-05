 const {schema}= require("mongoose");

 const OrdersSchema=new schema({
    name: String,
    qty: Number,
    price: Number,
    mode: String,
 });

 module.exports={OrdersSchema};