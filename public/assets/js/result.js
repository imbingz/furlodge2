/* eslint-disable camelcase */
//Wait for page to finish loading
$(() => {
    //Add Event listener to booking-button 
    $(".bookingBtn").on("click", function() {
        const userData = JSON.parse(localStorage.getItem("userData"));
        userData.host_id = $(this).data("id");
        localStorage.setItem("userData",JSON.stringify(userData));
    });

    //Add event listener to submit-booking-buttoon
    $("form.booking").on("submit", $("#submitBooking-btn"), getSeekerInfo);

    //Get seeker info 
    function getSeekerInfo(event) {
        event.preventDefault();

        //get userData from localStorage
        const seekerSearchInfo = JSON.parse(localStorage.getItem("userData"));

        //Set seeker info obj
        const seekerInfo = {
            first_name: $("#first-name").val().trim(),
            last_name: $("#last-name").val().trim(),
            email: $("#email").val().trim(),
            phone: $("#phone").val().trim(),
            ...seekerSearchInfo
        };
        //Call senderSeerkerInfo function
        sendSeekerInfo(seekerInfo);
    }
    
    function hostUnavailable(seekerInfo) {
        return $.ajax({
            url: "/api/host",
            type: "PUT",
            data: {host_id: seekerInfo.host_id, available: false},
            success: function(data) {
                console.log("success", data);   
            }
        });
    }
    

    function sendSeekerInfo(seekerInfo) {
        //ajax call
        $.post("/booking",seekerInfo)
            // eslint-disable-next-line no-unused-vars
            .then((data) => {
                hostUnavailable(seekerInfo);
            })
            .then(() => {
                localStorage.clear();
            })
            .catch((err) => {
                console.log((err.responseJSON));
            });
    }
});