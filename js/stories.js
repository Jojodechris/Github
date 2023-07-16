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


  
  $('i').on("click", function() {
    console.log("ok")
    // $("#favorited-stories").append($(this));

    // append the list element(<li></li>) of "i" that has been clicked  to the favorited stories 
     $("#favorited-stories").append($(this.closest('li').cloneNode(true)));
    
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