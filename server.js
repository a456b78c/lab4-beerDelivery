const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//const errorHandler = require('./global/error-handler');
const validator = require('validator');
const pathRoutes = require('./routes/path-routes')

const app = express();
app.use(express.json());
app.use(pathRoutes);
//app.use(errorHandler);
const PORT = 3000;
const URL = "mongodb://127.0.0.1:27017/beers";

const handlerError = (req,error) => {
    res.status(500).json({ error });
}

mongoose
    .connect(URL)
    .then(() => console.log("connected to db is succesfull"))
    .catch((err) => console.log(`db connection error: ${err}`));

app.listen(PORT, (err) => {
    err ? console.log(err) : console.log(`server run on port ${PORT}`)
});

const userSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validator.isEmail, 'Invalid email address'],
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      validate: {
        validator: (value) => {
          return /[A-Z]/.test(value);
        },
        message: 'Password must be at least 8 characters and contain at least one uppercase letter',
      },
    },
  });
  const User = mongoose.model('User', userSchema);


  app.post('/register', async (req, res) => {
    try {
      const { email, password } = req.body;

      const saltRounds = 10;

      // Хешування пароля перед збереженням в базу даних
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const user = new User({ email, password: hashedPassword });
      await user.save();

      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});
  
  // Вход пользователя
  app.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
  
      if (user && await bcrypt.compare(password, user.password)) {
        // Генерация JWT токена при успешной аутентификации
        const token = jwt.sign({ userId: user._id, email: user.email }, 'secret_key', { expiresIn: '3h' });
  
        res.status(200).json({ token });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    } catch (error) {
        
      res.status(500).json({ error: error.message });
    }
  });
  
  function authenticateToken(req, res, next) {
    const token = req.header('Authorization');
  
    if (!token) return res.status(401).json({ error: 'unauthorized' });
  
    jwt.verify(token, 'secret_key', (err, user) => {
      if (err) return res.status(403).json({ error: 'Invalid token' });
  
      req.user = user;
      next();
    });
  }
  // Защищенный маршрут
  app.get('/protected', authenticateToken, (req, res) => {
    res.status(200).json({ message: 'Protected route accessed successfully' });
  }); 
  
  // Проверка и декодирование токенаc