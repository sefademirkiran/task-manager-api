const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');

const swaggerSetup = require('./swagger');
const app = express();

swaggerSetup(app);

app.use(express.json());
app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB bağlantısı başarılı.');
  app.listen(PORT, () => console.log(`Server çalışıyor: http://localhost:${PORT}`));
}).catch((err) => console.error(err));
