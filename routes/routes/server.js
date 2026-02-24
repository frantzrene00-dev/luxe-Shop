const express = require('express');
const path = require('path');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
const liveRoutes = require('./routes/live');
const adminRoutes = require('./routes/admin');
const apiRoutes = require('./routes/api');

app.use('/live', liveRoutes);
app.use('/admin', adminRoutes);
app.use('/api', apiRoutes);

// Home page
app.get('/', (req, res) => {
  res.render('index');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Luxe Shop server running on port ${PORT}`);
});
