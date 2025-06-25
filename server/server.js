// import './config/instrument.js'
// import express from 'express'
// import cors from 'cors'
// import 'dotenv/config'
// import connectDB from './config/db.js'
// import * as Sentry from "@sentry/node";
// import { clerkWebhooks } from './controllers/webhook.js'

// //initialise express
// const app = express()

// //connect to database

// await connectDB()

// //MiddlewARES
// app.use(cors())
// app.use(express.json())

// //Routes
// app.get('/',(req,res)=>res.send("API Working"))
// app.get("/debug-sentry", function mainHandler(req, res) {
//   throw new Error("My first Sentry error!");
// });

// app.post('/webhooks',clerkWebhooks)

// //Port
// const PORT = process.env.PORT || 5000

// Sentry.setupExpressErrorHandler(app);

// app.listen(PORT,()=>{
//     console.log(`Server is running on port ${PORT}`)
// })
import './config/instrument.js';
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js';
import * as Sentry from "@sentry/node";
import { clerkWebhooks } from './controllers/webhook.js';
import companyRoutes from './routes/companyRoutes.js'
import connectCloudinary from './config/cloudinary.js';


// Initialise Express
const app = express();

// Connect to MongoDB
await connectDB()
await connectCloudinary()


// Middleware
app.use(cors());

// ✅ Clerk requires raw body for webhook signature validation
app.use('/webhooks', express.raw({ type: 'application/json' }));

// For all other JSON requests
app.use(express.json());

// Routes
app.get('/', (req, res) => res.send("API Working"));

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

app.post('/webhooks', clerkWebhooks);
app.use('/api/company',companyRoutes)

// Error handler
Sentry.setupExpressErrorHandler(app);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
