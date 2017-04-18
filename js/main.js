/*global $, console*/
$(document).ready(function () {
    "use strict";
    
    var contents, url, nm, em, sb, ms, dt, err, collect, i;

    dt = {};
    err = [];
    
    contents = {};
    // Use load method to load the home.html into index.html
    $(".main-content .box").load("./partials/home.html", function (pageRsp) {
        contents["./partials/home.html"] = pageRsp;
    });
       
    function handleResponse(rsp) {
        $(".feedback").html(rsp);
    }

    function handleError(jqXHR, textStatus, errorThrown) {
        console.log("textStatus: " + textStatus + "\n" +
                "errorThrown: " + errorThrown);
    }

    function validateForm(ev) {

        ev.preventDefault();

        nm = $("#full-name").val();
        em = $("#email").val();
        sb = $("#subject").val();
        ms = $("#message").val();

    // evaluate full name:
        if (nm !== "") {
            dt.full_name = nm;
        } else {
            err.push("Full Name?");
        }

    // evaluate email:
        if (em !== "") {
            dt.email = em;
        } else {
            err.push("Email?");
        }
    // evaluate subject:
        if (sb !== "") {
            dt.subject = sb;
        } else {
            err.push("Subject?");
        }
    // evaluate message:
        if (ms !== "") {
            dt.message = ms;
        } else {
            err.push("Message?");
        }

      // Check if the data is ready
        if (err.length === 0) {

            // handle ajax request
            $.ajax({
                type: "post",
                url: "./server-side-script/web-service.php",
                data: dt,
                dataType: "text"
            }).done(handleResponse).fail(handleError);

        } else {

            // report error(s)
            collect = "Please fix the following errors:";
            for (i = 0; i < err.length; i += 1) {
                collect += err[i];
            }
            $(".feedback").html(collect);
        }
    }
    
    
    // add event listener to your form to listen for submit event

  
    /*Use $.trim() method to remove eventual white space 
    from form elements */
    

    /*
    ---------------------
    LOADING HTML PARTIALS
    --------------------- */

    /* 
    Define function storeContents. This function
    will have parameter - container. This is the HTML
    element that receives content from HTML partials. */

    function storeContents(urlParam) {
        // if content already exists inside contents
        if (contents[urlParam]) {
            // load the content from contents
            $(".main-content .box").html(contents[urlParam]);
            //console.log("Loaded from array!");
        } else {
            // load the content by ajax request
            $(".main-content .box").load(urlParam, function (pageRsp) {
                contents[urlParam] = pageRsp;
                //console.log("Loaded by ajax request!");
            });
        }
    }
             
       /* 
       if object contents doesn't contain the currently
       loaded HTML partial (use url as key): 
       */
 
          /* 
          Use container as selector and load() method as
          action to load the content of HTML partial. 
          The first parameter of load() method is already 
          saved in variable url once contact-page nav-bar 
          item is selected. Second parameter of load()
          method is anonymous callback function which 
          contains a parameter itself - pageRsp. pageRsp 
          contains entire content from HTML partial */
             /* 
             Pass pageRsp to contents object 
             with the key url (contents[url]) */
          /*
          End load method here */
       /* 
       End if
       Otherwise: */
    /* 
          Use container as selector and html() 
          method as action to display the content 
          from object contents (contents[url])*/
       /* 
       End else*/
    /* 
    End function storeContents.*/

    /* 
    HANDLE NAV-BAR CLICK */

    $('.bg-nav .box a').on("click", function (ev) {
        ev.preventDefault();
        url = $(this).attr("href");
        /*
        // test
        console.log(url); */
        storeContents(url);
        $(".main-content .box").on("submit", "form", validateForm);
    });
    /*
    Use nav-bar link element as selector and 
    on() method for click-event. This event 
    handler needs to use event object to prevent 
    default behaviour of link element.*/
       /* 
       Prevent default behaviour of link element */
       /* 
       Use $(this) as selector and attr() method
       to catch the relative path stored in href
       attribute of clicked link tag. Pass that 
       value to variable url.*/
	
       /* 
       Call function storeContents. Assign its
       parameter container with the CSS selector 
       that points to HTML element which
       receives the page-content.*/

       /* 
       Add event listener - register validateForm 
       function to the form element to listen for 
       submit event.*/

    /* 
    End on() method */
/* 
End ready() method */
});