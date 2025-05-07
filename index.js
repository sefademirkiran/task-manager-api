const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const taskRoutes = require('./routes/taskRoutes');

dotenv.config();
const app = express();

app.use(express.json());

app.use('/api/tasks', taskRoutes); // Tüm task istekleri bu route'a yönlendirilir

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB bağlantısı başarılı.');
  app.listen(PORT, () => console.log(`Server çalışıyor: http://localhost:${PORT}`));
}).catch((err) => console.error(err));
