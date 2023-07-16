"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navfavorite.show();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}


// MY LOGIC : show a favorite list when the "Favorites" navigation item is clicked.

function showFavoriteList() {
  $("#Ol-favorite-stories").show();
  const clickedLists = document.querySelectorAll(".clicked");
  $("#Ol-favorite-stories").append(clickedLists);
  $('#all-stories-list').hide();
}

$("#nav-favorites").on("click", showFavoriteList);
