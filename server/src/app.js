import express from 'express';
import http from 'http';
import routes from './routes/index.js'
import {v2 as cloudinary} from 'cloudinary';
import connectDB from './config/connection.js';
import serverConfig from './config/serverConfig.js';
import expressConfig from './middleware/express.js';
import dotENV from 'dotenv';
dotENV.config()


const app = express()
const server = http.createServer(app)

// Middlewares
expressConfig(app)

// Routes to different requests
routes(app)

// Cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

// Mongodb connection
connectDB()

// Connect Server
serverConfig(server)