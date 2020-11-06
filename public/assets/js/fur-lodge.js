//// AJAX CALL to return hosts by search form submission.
// $.post("/api/host/search"); 

/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
//Wait for the document to load 

$(() => { 

    const searchForm = $("form#search");
    const cityInput = $("input#city-input");

    //Set variables getting from input events for hostData
    let city, isDog, isCat, isShortTerm, isLongTerm, petAmount, rate, isSmall, isMedium, isLarge, isGiant;

    $("#city-input").on("change", function() {
        city = $(this).val();
    });
    
    //is_pup
    $("#dogCare").on("change", function() {
        isDog = $(this).is(":checked") ? true : false;
    });

    //is_cat
    $("#catCare").on("change", function() {
        isCat = $(this).is(":checked") ? true : false;
    });

    //short_term
    $("#short-term").on("change", function() {
        isShortTerm = $(this).is(":checked") ? true : false;
    });

    //long_term
    $("#long-term").on("change", function() {
        isLongTerm = $(this).is(":checked") ? true : false;
    });

    //pet_amt
    $("#pet-amount").on("keyup mouseup", function() {
        petAmount = $(this).val();
    });

    //rate
    $("#rate").on("keyup mouseup", function() {
        rate = $(this).val();
    });

    //Size - Small
    $("#small").on("change", function() {
        isSmall = $(this).is(":checked") ? true : false;
    });

    //Size - Medium
    $("#medium").on("change", function() {
        isMedium = $(this).is(":checked") ? true : false;
    });

    //Size - Large
    $("#large").on("change", function() {
        isLarge = $(this).is(":checked") ? true : false;
    });

    //Size - Giant
    $("#giant").on("change", function() {
        isGiant = $(this).is(":checked") ? true : false;
    });

    searchForm.on("submit", (event) => {
        event.preventDefault();
        localStorage.clear();

        const userData = {
            city: city,
            is_pup: isDog ? isDog : false, 
            is_cat: isCat ? isCat : false,
            short_term: isShortTerm ? isShortTerm : false,
            long_term: isLongTerm ? isLongTerm : false,
            pet_amt: petAmount,
            rate: rate,
            small: isSmall ? isSmall : false,
            med: isMedium ? isMedium : false,
            large: isLarge ? isLarge : false,
            giant: isGiant ? isGiant : false
        };
        
        localStorage.setItem("userData",JSON.stringify(userData));

        //Call signupHost function 
        seekHost();
        //Empty input fields
        $("#city-input").prop("checked", false);
        $("#dog").prop("checked", false);
        $("#cat").prop("checked", false);
        $("#short-term").prop("checked", false);
        $("#long-term").prop("checked", false);
        $("#pet-amount").val("");
        $("#small").prop("checked", false);
        $("#medium").prop("checked", false);
        $("#large").prop("checked", false);
        $("#giant").prop("checked", false);
        $("#rate").val("");
    });

    function seekHost() {

        const userData = $.param(JSON.parse(localStorage.getItem("userData")));
        
        $.get("/result?"+ userData)
            .then((data) => {
                window.location.href = "/result?"+userData;
            })
            .catch((err) => {
                console.log((err.responseJSON));
            });
    }
    
});


