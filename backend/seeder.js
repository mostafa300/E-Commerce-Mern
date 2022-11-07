import dotenv from 'dotenv'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'



dotenv.config()
connectDB()

const importData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        const createUsers = await User.insertMany(users);
        const adminUser = createUsers[0]._id;

        const ProductsSample = products.map((product) => {
            return { ...product, user: adminUser }
        })
        console.log("User is", adminUser);
        console.log("type of : ", typeof (adminUser));

        const createProducts = await Product.insertMany(ProductsSample);

        console.log("Data Imported Successfully");
        process.exit()

    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

const destroyData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log("Data Destroyed Successfully");
        process.exit()

    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

if (process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}