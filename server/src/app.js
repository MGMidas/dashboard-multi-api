const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const connectionsRoutes = require('./routes/connections.routes');
const errorHandler = require('./middlewares/errorHandler');
const { generalLimiter, authLimiter } = require('./middlewares/rateLimiter');
const dashboardRoutes = require('./routes/dashboard.routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(generalLimiter); // s'applique à toute l'API
app.use('/api/auth', authLimiter, authRoutes); // limite plus stricte en plus, sur auth

app.get('/', (req, res) => res.json({ message: 'API dashboard-multi-api en ligne' }));
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/connections', connectionsRoutes);

app.use(errorHandler);

module.exports = app;