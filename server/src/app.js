import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config.js';
import express from 'express';
import corsOptions from './config/corsOptions.js';
import connectPostgreSQL from './config/PostgreSQLConnection.js';
import createExpensesTable from './data/operations/createExpensesTable.js';
import createIncomesTable from './data/operations/createIncomesTable.js';
import createUsersTable from './data/operations/createUsersTable.js';
import credentials from './middleware/credentials.js';
import errorHandler from './middleware/errorHandler.js';
import verifyJwt from './middleware/verifyJwt.js';

const app = express();
const PORT = process.env.APP_PORT || 3000;

/* Connect to PostgreSQL */
connectPostgreSQL();

/* Middleware */
app.use(credentials); // Middleware to set CORS credentials

app.use(cors(corsOptions)); // Middleware to enable CORS (Cross-Origin Resource Sharing)

// Serve static files from the public folder in the root directory - Mounts the public folder to the root URL
// app.use(express.static(path.join(__dirname, 'public'))); // Middleware to serve static files from the public directory

app.use(express.urlencoded({ extended: false })); // Middleware to parse URL-encoded data (form submissions)

app.use(express.json()); // Middleware to parse JSON data (API requests)

app.use(cookieParser()); // Middleware to parse cookies from the request headers

/* Routes */
app.use('/auth', (await import('./routes/authRouter.js')).default);
app.use('/api/users', (await import('./routes/api/usersRouter.js')).default);
app.use(verifyJwt); // JWT verification middleware for protected routes
app.use('/api/dashboard', (await import('./routes/api/dashboardRouter.js')).default);
app.use('/api/expenses', (await import('./routes/api/expensesRouter.js')).default);
app.use('/api/incomes', (await import('./routes/api/incomesRouter.js')).default);

// Test PostgreSQL Connection Route
/* app.use('/api/test-pg', async (req, res) => {
  const response = await pool.query('SELECT current_database()');
  res.status(200).json({ message: `PostgreSQL is connected and working! Current database: ${response.rows[0].current_database}` });
}); */

/* Error Handler Middleware */
app.use(errorHandler);

// Create tables if they do not exist

(async () => {
  await createUsersTable();
  await createExpensesTable();
  await createIncomesTable();
})();

app.listen(PORT, () => {
  console.log(`✅ Server is running on 🌐 http://localhost:${PORT}`);
});
