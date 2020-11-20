//// AJAX CALL to return hosts by search form submission.
// $.post("/api/host/search"); 

/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
//Wait for the document to load 

$(() => { 
    $("form#search").on("submit", getSearchFormData);

    function getSearchFormData(e) {
        e.preventDefault();
        //set an instance  of FormData
        const fd = new FormData(this);
        const searchData = {};
        for (const key of fd.keys()) {
            if (fd.get(key) === "on") {
                searchData[key] = "true";
            } else {
                searchData[key] = fd.get(key);
            }
        }
        
        //Set localStorage
        localStorage.setItem("userData", JSON.stringify(searchData));

        //call ajax get  method 
        sendSearchData();

        //reset the form fields
        $("form#search").trigger("reset");

    }

    function sendSearchData() {

        console.log("in sendsearchdata ");

        const userData = $.param(JSON.parse(localStorage.getItem("userData")));

        $.get("/result?" + userData)
            .then(() => {
                window.location.href = "/result?" + userData;
            })
            .catch((err) => {
                console.log((err.responseJSON.messsage));
            });
    }
    
});


