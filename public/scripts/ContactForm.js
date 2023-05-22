$( function () {

    // contact form logic
    $( "#index_form_btn" ).click( function () {


        // intializing Variables
        var templateParams = {
            from_name: $( "#name" ).val(),
            to_name: "Aman Bhargava",
            message: $( "#message" ).val(),
            from_email: $( "#email" ).val(),
            tel: $( "#tel" ).val(),
        };

        // sending email
        emailjs.send( "service_azx6lr4", "template_6k0fsll", templateParams ).then(
            function ( response ) {
                // toastr[ "success" ](
                // 	"We will contact you soon.",
                // 	"Email successfuly sent"
                // );
                alert( "We will contact you soon, Email successfuly sent" )
                console.log( "SUCCESS!", response.status, response.text );
            },
            function ( err ) {
                // toastr[ "error" ](
                // 	"Please send the message again.",
                // 	"Failed to sent the email"
                // );
                alert( "Please send the message again, Failed to sent the email" )
                console.log( "FAILED...", err );
            }
        );
    } );
} );