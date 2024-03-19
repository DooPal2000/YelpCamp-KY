
const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');
require('dotenv').config({ path: '../.env' });


mongoose
  .connect(
    process.env.MONGODB_URI
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((e) => {
    console.log("Connection failed!");
    console.error("Connection failed:", e);
  });

// mongoose.connect('mongodb://localhost:27017/yelp-camp',{
//     useNewUrlParser: true,
//     useUnifiedTopology: true     
// });
// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", () => {
//     console.log("Database connected");
// });

const sample = array => 
    array[Math.floor(Math.random()* array.length)]


    const seedDB = async () => {
      await Campground.deleteMany({});
      for (let i = 0; i < 50; i++) {
          const random1000 = Math.floor(Math.random() * 1000);
          const price = Math.floor(Math.random() * 20) + 10;
          const camp = new Campground({
              author: '65d8d4df776940930bf1222e',
              location: `${cities[random1000].city}, ${cities[random1000].state}`,
              title: `${sample(descriptors)} ${sample(places)}`,
              image: 'https://source.unsplash.com/collection/483251',
              description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
              price,
              images: [
                {
                  url: 'https://res.cloudinary.com/dwtgvozjf/image/upload/v1710860831/YelpCamp/zz9ynoe3px884li9zkkk.jpg',
                  filename: 'YelpCamp/zz9ynoe3px884li9zkkk',
                }
              ]
          })
          await camp.save();
      }
  }
  
  seedDB().then(() => {
      mongoose.connection.close();
  })