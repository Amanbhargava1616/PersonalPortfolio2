import express, { Router } from 'express';
import { setDoc, collection, getDocs, doc, getDoc } from "firebase/firestore/lite";
import { getStream, ref } from "firebase/storage";



export const router = Router();

router.use( express.static( 'public' ) );   // Serve static files (e.g. CSS , JS)


// Connecting to database.js
import imports from "../database/firebaseCofig.js";



router.get( '/', function ( req, res ) {
    res.redirect( '/index' );
} )

router.get( '/index', async function ( req, res ) {


    const projectsSnapshot = await getDocs( collection( imports.db, "projects" ) );


    const projectArray = projectsSnapshot.docs.map( ( doc ) => {

        return { projectName: doc.id, projectImageUrl: doc.data().imageUrl }
    } );

    res.render( 'index', { projectArray: projectArray } );
} )


router.get( "/project/:projectName", async function ( req, res ) {
    const projectName = req.params.projectName

    const projectRef = doc( imports.db, "projects", projectName );
    const projectSnap = await getDoc( projectRef );

    res.render( "project", { projectData: { ...projectSnap.data(), projectName: projectSnap.id } } )
} )


router.get( '/dashboard', async function ( req, res ) {


    const projectsSnapshot = await getDocs( collection( imports.db, "projects" ) );


    const projectArray = projectsSnapshot.docs.map( ( doc ) => {

        return { ...doc.data(), projectName: doc.id }
    } );

    res.render( 'dashboard', { projectArray: projectArray } );
} )


// registering a user
router.post( "/register", async function ( req, res ) {
    const toBeRegister_UserData = req.body;

    await setDoc( doc( imports.db, "Registered Users", toBeRegister_UserData.emailID ), toBeRegister_UserData ).then( () => {
        console.log( "User Added successfully !" );

        res.redirect( '/index' )
    } ).catch( ( er1 ) => {
        console.error( "Error Updating document: ", er1 );
        res.status( 500 ).send( "Error Registering the user " )
    } );
} )

router.get( '/resume', function ( req, res ) {
    try {
        const resumeStream = getStream( ref( imports.storage, 'personalPortfolio/Resume/Aman Bhargava Resume.pdf' ) );

        // Set response headers for download
        res.setHeader( "Content-Disposition", 'attachment; filename="Aman Bhargava Resume.pdf"' );
        res.setHeader( "Content-Type", "application/pdf" );

        resumeStream.pipe( res );
    } catch ( error ) {
        console.error( "Error streaming file:", error );
        res.status( 500 ).send( "Error downloading file" );
    }
} )
