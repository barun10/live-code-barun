import mongoose from "mongoose";
import app from "./app.js";
import config from "./src/config/index.js"

(async ()=>{
  try {
    await mongoose.connect("config.MONGODV_URL")
    console.log("DB CONNECTED !");

    app.on('error', (err) => {
      console.log("ERROR: ", err);
      throw err
    })

    const onListening = () => {
      console.log(`Listening on port ${config.PORT}`);
    }

    app.listen(config.PORT, onListening)
  } catch (err) {
    console.log("Error: ", err);
    throw err
  }
})()