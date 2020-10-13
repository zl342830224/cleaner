const mongoose = require('mongoose');
//这里自定义一个function并导出
exports.connectToDB = () => {
  const { DB_HOST, DB_PORT, DB_DATABASE, DB_USER, DB_PASSWORD } = process.env;
  // if (process.env.NODE_ENV === 'production') {

  // }
  let connectionString;
  if (DB_USER && DB_PASSWORD) {
    connectionString = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_DATABASE}`;
  } else {
    connectionString = `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;
  }
  console.log(connectionString);

  const db = mongoose.connection;
  db.on('connected', () => {
    console.log('DB connected')//生产环境不能使用console.log,要用winston
  });
  db.on('error', (error) => {
    console.log('DB connection failed');
    console.error(error.message);
    process.exit(1);//0代表正常推出，超过0的都是异常退出，可以自定义，1代表什么样的异常退出，2代表什么样的异常退出
  });
  db.on('disconnect', () => {
    console.log("disconnected")
  })

  return mongoose.connect(connectionString);
}