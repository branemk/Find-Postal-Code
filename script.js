     /*global $ */
     /* jshint browser: true */
     /*jshint devel:true */

     $("#button").click(function () {

         var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + encodeURIComponent($("#Adress").val()) + "+" +
             encodeURIComponent($("#Number").val()) + "+" + encodeURIComponent($("#City").val()) + "+" + encodeURIComponent($("#Country").val()) +
             "&key=YOUR_API_KEY";
         $(".mdl-textfield").hide();
         $("#spinner").toggleClass("is-active");

         $("#button").hide();
         $("#buttontryagain").fadeToggle();
         fetchData(url);



     });

     $("#buttontryagain").click(function () {
         $("#result").hide();
         $(".mdl-textfield").fadeToggle();
         $("#buttontryagain").hide();
         $("#button").fadeToggle();

     });




     function fetchData(url) {
         $.ajax({
             url: url,
             type: "GET",
             success: function (data) {
                 if (data.status != "OK") {

                     $("#spinner").toggleClass("is-active");
                     $("#result").fadeToggle().text("Code not found");

                 } else {
                     console.log(data);
                     var postal_code_exists = false;
                     
                     $.each(data.results[0].address_components, function (key, value) {
                         console.log(value);
                         if (value.types[0] == "postal_code") {
                             //alert(value['long_name']);
                             postal_code_exists = true;
                             var postcode = value.long_name;
                             setTimeout(showResults, 1000, postcode);
                         }



                     });
                     //        *******************************************************************************
                     //                 API sometimes retuns results without postal code,
                     //                 so we are checking if postal code exist to show error
                     //        *******************************************************************************
                     if (!postal_code_exists) {
                         $("#spinner").toggleClass("is-active");
                         $("#result").fadeToggle().text("Code not found");
                     }

                 }
             }

         });
     }

     function showResults(postcode) {
         $("#spinner").toggleClass("is-active");
         $("#result").fadeToggle().text(postcode);

     }


    