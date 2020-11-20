/* eslint-disable camelcase */
//Wait for the document to load
$(() => {
    $("form.signup").on("submit", getFormData);

    function getFormData (e) {
        e.preventDefault();
        //use FormData Constructor
        const fd = new FormData (e.target);
        //set req body obj
        const data = {};
        for (const key of fd.keys()) {
            if(fd.get(key) === "on") {
                data[key] = "true";
            } else {
                data[key] = fd.get(key);
            }
        }
        // console.log(data);
        postData(data);

        //clear form field
        $("form.signup").trigger("reset");
    }
        

    //A POST request sending the host Signup Email, Password to Route handler
    function postData(data){
        $.post("/api/signup", data)
            .then(() => {
                window.location.href = "/profile";
            })
            .catch((err) => {
                console.log((err.responseJSON.message));
            });
    }
});