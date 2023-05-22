import express, { Router } from 'express';
import { setDoc, collection, getDocs, doc, getDoc } from "firebase/firestore";



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

    console.log( projectSnap.data() )


    res.render( "project", { projectData: { ...projectSnap.data(), projectName: projectSnap.id } } )
} )


router.get( '/dashboard', async function ( req, res ) {


    const projectsSnapshot = await getDocs( collection( imports.db, "projects" ) );


    const projectArray = projectsSnapshot.docs.map( ( doc ) => {

        return { ...doc.data(), projectName: doc.id }
    } );

    console.log( projectArray )



    res.render( 'dashboard', { projectArray: projectArray } );
} )


// registering a user
router.post( "/register", async function ( req, res ) {
    const toBeRegister_UserData = req.body;

    console.table( toBeRegister_UserData )

    await setDoc( doc( imports.db, "Registered Users", toBeRegister_UserData.emailID ), toBeRegister_UserData ).then( () => {
        console.log( "User Added successfully !" );

        res.redirect( '/index' )
    } ).catch( ( er1 ) => {
        console.error( "Error Updating document: ", er1 );
    } );

} )
