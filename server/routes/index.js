// Dependencies.
import path from 'path';
import { app } from './../index.js';

// Route classes.
import mainRoutes from './route.main.js';
import googleRoutes from './route.google.js';

// Get route methods.
app.get('*', mainRoutes.Root);

// Post route methods.
app.post('/restaurants', googleRoutes.GetRestaurants);
