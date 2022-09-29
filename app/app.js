import * as MODEL from "./model.js";

// routes links to data for pages
function route() {
  // hash information from the url bar -> #lock
  let hashTag = window.location.hash;

  // replace the hashtag with an empty space -> lock
  let pageID = hashTag.replace("#", "");

  // create an array that split the link by the /
  let pageIDArray = pageID.split("/");

  // pageID is equal to whatever was before the fslash
  pageID = pageIDArray[0];

  // subPageID is equal to whatever was after the fslash
  let subPageID = pageIDArray[1];

  // if the pageID is empty, reset to the home page (lock), else if the pageID and subPageID are the same pass over pageID and subPageID
  if (pageID == "" || pageID == "signIn") {
    MODEL.changePage("signIn", null, submit);
  } else {
    if (pageID == subPageID) {
      MODEL.changePage(pageID);
    } else {
      // calls over to model to retrieve the data for the page
      MODEL.changePage(pageID, subPageID);
    }
  }
}

function initListeners() {}

function submit() {
  $("#submit").click(() => {
    console.log("clicked");

    // get user email and password
    let email = $("#email").val();
    let password = $("#password").val();

    // console.log(email, password);
    if (email != "" && password == "") {
      //   console.log("please enter your password");
      Swal.fire({
        title: "Please enter your password",
        icon: "info",
        html:
          "If you forgot your password, you can recover it " +
          '<a href="https://www.disneyplus.com/" style="text-decoration: none; color: lavendar;">here</a>',
        showCancelButton: false,
        showConfirmButton: true,
      });
    } else if (email == "" && password != "") {
      Swal.fire({
        title: "Please enter your email",
        icon: "info",
        showCancelButton: false,
        showConfirmButton: true,
      });
    } else if (email != "" && password != "") {
      $(".header").html("Sign Out");
      $("#email").hide();
      $("#password").hide();
      $("#submit").html("Sign out");
      Swal.fire({
        position: "center",
        icon: "success",
        title: "You are signed in!",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        title: "Uh oh!",
        text: "Please enter your credentials to sign in",
        icon: "warning",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Okay",
      });
    }
    $("#email").val("");
    $("#password").val("");
  });
}

// function executes route when there is a change in hash of url
function initApp() {
  $(window).on("hashchange", route);
  route();
}

$(document).ready(function () {
  initApp();
  initListeners();
});
