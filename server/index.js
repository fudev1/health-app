// importer express, mongoose, cors, dotenv, helmet, morgan
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';

// Importer les routes :
import clientRoutes from './routes/client.js';
import generalRoutes from './routes/general.js';
import managementRoutes from './routes/management.js';

// Configuration : 
dotenv.config(); // Charge les variables d'environnement depuis le fichier .env
const app = express(); // Creer une application express

app.use(express.json()); // Middleware pour analyser le corps de la requête entrante en JSON
app.use(helmet()); // Securiser l'application
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' })); // Permet de charger des ressources à partir de différentes origines.
app.use(morgan('common')); // Journaliser les requests HTTP ('common' : format spécifique pour les méthodes)
app.use(cors()); // Permet à l'API d'être appelée depuis d'autres domaines


// Routes :
app.use("/client", clientRoutes); // Les différentes vues client
app.use("/general", generalRoutes); // Dashboard général, page accueil
app.use("/management", managementRoutes); // Management des comptes Admin etc

// Mongoose setup : 
const PORT = process.env.PORT || 9000; // Port de notre application
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
}).catch((error) => console.log(`${error} did not connect`));


