export function changePage(pageID, subPage, callBack) {
  if (subPage == undefined) {
    // path to pageID (pageID is whatever you click on)
    $.get(`${pageID}.html`, function (data) {
      $("#app").html(data);
      if (pageID == "signIn") {
        callBack();
      }
   
    }).fail((error) => {
      if (error.status == "404") {
        // alert("Page not found, please check the URL")
      }
      console.log("ERROR", error);
    });
  }
}
