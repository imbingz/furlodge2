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
    
});


