const express = require('express')
const app = express()
const cors = require("cors")
const dotenv = require('dotenv')
const connectDB = require('./db/connectDB')
const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')
dotenv.config()

// Support both PORT (standard) and port (original) env var
const port = process.env.PORT || process.env.port || 5000

// CORS configuration – allow all origins in development; restrict in production via env
const corsOptions = {
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}

app.use(express.json());
app.use(cors(corsOptions))

app.get('/', (req, res) => {
    res.json({ status: 'ShoeStop Backend is running', timestamp: new Date().toISOString() })
})

app.use('/', userRoutes)
app.use('/api', productRoutes)

const startServer = async () => {
    try {
        await connectDB(process.env.mongoURI || process.env.MONGO_URI)
        console.log('Connected to MongoDB successfully.');
        app.listen(port, '0.0.0.0', () => {
            console.log(`ShoeStop Backend server started on port ${port}`);
        })
    }
    catch (error) {
        console.error('Failed to connect to MongoDB:', error.message);
        process.exit(1)
    }
}

startServer()