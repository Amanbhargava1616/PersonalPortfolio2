import express from "express";
import { dirname, join } from "path";
import { fileURLToPath } from 'url';


// connecting to routing files
import { router } from "./routes/portfolioRoutes.js";


// deploying
let port = 3000;
if ( process.env.PORT ) {
    port = process.env.PORT
}


const app = express();


app.set( 'view engine', 'ejs' );       // Activate ejs engine

const __dirname = dirname( fileURLToPath( import.meta.url ) );
app.set( 'views', join( __dirname, 'views' ) );


app.use( express.urlencoded( { extended: true } ) );      // Parse incoming request bodies
app.use( express.static( 'public' ) );   // Serve static files (e.g. CSS , JS)
app.use( express.static( 'node_modules' ) );   // Serve static files (e.g. CSS , JS)


app.use( router );




app.listen( port );