"use strict";

/******************************************************************************
 * Handling navbar s and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  // console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  // console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  // console.("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}

function navbarlink(){
    var form = document.getElementById('myForm');
    form.style.display = 'block';
    var container = document.getElementsByClassName("stories-container container")
    container.remove()
}

document.getElementById('nav-submit').addEventListener('click', navbarlink);


function favorites() {
  $('#all-stories-list').hide();
  $('#all-stories-list').css('background-color', 'red');
  $(".hidden-stories-list").css('display',"block");
  // if there is not a list (<li></li>) inside the favorited-list("#nav-favorites") ,Show the message
  // to tell the user he has not added anything 
  if ($("#nav-favorites li").length === 0) {
    $("#hiddenH").show();
  } else {
    $("#hiddenH").hide();
  }
}
  // $("#hiddenH").show();


$body.on('click', '#nav-favorites', favorites);

function putForwardStories() {
  location.reload();

}

$body.on('click', '#nav-user-profile', putForwardStories);

let originalElement= document.querySelectorAll("li")
let copiedElement = originalElement.cloneNode(true);

$('li').on("click", function() {
  console.log("ok")
  $("#favorited-stories").append($(this.cloneNode(true)));
  
});


// $("nav-favorites").on('click',function(){

//   $('all-stories-list').hide()
// })

// $body.on("click", "#nav-submit", navbarlink);
// $body.on("submit", "#nav-submit", submitform);