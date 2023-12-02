const { connect, connection } = require("mongoose");

const connectionString = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/social-network";

// Export the connect function, not the connection object
module.exports = {
    connectDB: async () => {
      await connect(connectionString);
      console.log("Connected to the database");
    },
    connection: connection,
  };