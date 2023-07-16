"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
      <div>
      <span class="thumb">
        <i class="far fa-thumbs-up"></i>

      </span>
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
        <div>
      </li>
    `);
}


/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
  // Load favorite story from localStorage when the page loads
$(document).ready(function() {
  const favoriteStoryHTML = localStorage.getItem("favorite");
  if (favoriteStoryHTML) {
    $("#Ol-favorite-stories").html(favoriteStoryHTML);
    console.log("Favorite story exists");
  }
});
// Add logic for favoriting the story
$('i').on("click", function() {
   // here is the function where we handle putting stories into the favorited tab. We should consolidate the logic to add the red class here as well instead of having multiple 
    // on click functions. we should be asking if the story is being favorited or unfavorited (which we do in the other onclick function to determine if should get the red class or have it removed)
    // if the story is being favorited, then we should our favorite logic, which would be to add the class and to add it to the favorited-stories container, and also to then store the information in local storage.
    // if the story is being unfavorited, we should remove the red class from the icon and also remove the story from the favorited-stories container, and also remove it from the local storage
    changeColor()
    //Add  a class name for the list whose  icon was clicked 
    $(this).closest("li").addClass("clicked");
    // get the list whose icon was clicked 
    const favoriteStory = this.closest("li").cloneNode(true);
    // put it in local storage 
    localStorage.setItem("favorite", favoriteStory);
    console.log("Favorite story added");
  });

  // Append the favorite story from local storage to the favorited stories container
  const favoriteStoryHTML = localStorage.getItem("favorite");
  if (favoriteStoryHTML) {
    $("#Ol-favorite-stories").html(favoriteStoryHTML);
    console.log("Favorite story exists");
  } else {
    $("#Ol-favorite-stories").empty();
  }

}