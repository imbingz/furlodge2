/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
//Wait for the document to load

$(() => {
    //Set changeData obj
    let prop, value;
    const changeData = {} ;

    //Set event listener on input elements and get values of change fields 
    $("form.editProfile").on("change", "input", function() {
        prop = $(this).attr("name");
        if ($(this).val() === "true") {
            value = 0;
        } else if ($(this).val() === "false") {
            value = 1;
        } else {
            value = $(this).val();  
        }
        changeData[prop] = value;
    });

    //Set Event listener on textarea elements and get value if changed
    $("form.editProfile").on("change", "textarea", function() {
        prop = $(this).attr("name");
        value = $(this).val();
        changeData[prop] = value;
    });

    //Set Event listener on select elements and get value if changed
    $("form.editProfile").on("change", "select#city", function() {
        prop = $(this).attr("name");
        value = $(this).val();
        changeData[prop] = value; 
    });

    //Submit button event listener, send PUT request with changeData.
    $("#submit-btn").on("click", getChanges);

    function getChanges(event) {    
        event.preventDefault();
        //Put Request
        $.ajax({  
            url: "/api/profile",  
            type: "PUT",  
            dataType: "json",  
            data: changeData,  
            success: function (data) {  
                window.location.href = "/profile";
            },  
            error: function () {  
                console.log("Error in Operation");  
            }  
        });
    }

}); // =====> END