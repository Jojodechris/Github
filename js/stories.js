"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  console.log(storyList)
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
  const thumbsUpIcons = document.getElementsByClassName("far fa-thumbs-up");


  // Toggle a class (add if not present, remove if present)
 

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

// function changeColor(){
//   $('i').on("click", changeColor)
//   $('i').removeClass("far fa-thumbs-up");
//   $(i).classList.toggle("far fa-thumbs-up red-color");
//   // Toggle a class (add if not present, remove if present)
//   }
// $('i').on("click", changeColor)

/** Gets list of stories from server, generates their HTML, and puts on page. */
function putStoriesOnPage() {
  // console.debug("putStoriesOnPage");

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
    // here is the function where we handle putting stories into the favorited tab. We should consolidate the logic to add the red class here as well instead of having multiple 
    // on click functions. we should be asking if the story is being favorited or unfavorited (which we do in the other onclick function to determine if should get the red class or have it removed)
    // if the story is being favorited, then we should our favorite logic, which would be to add the class and to add it to the favorited-stories container, and also to then store the information in local storage.
    // if the story is being unfavorited, we should remove the red class from the icon and also remove the story from the favorited-stories container, and also remove it from the local storage

    // append the list element(<li></li>) of "i" that has been clicked  to the favorited stories 
     $("#favorited-stories").append($(this.closest('li').cloneNode(true)));
    
  });

  if (typeof(Storage) !== "undefined") {
    // Retrieve the stored value from localStorage
    var userModification = localStorage.getItem("userModification");
  
    // Check if there is a stored value
    if (userModification) {
      // Apply the stored value to the webpage
      document.getElementById(" ").value = userModification;
    }
  
    // Listen for changes on the input field
    document.getElementById("containerStories").addEventListener("input", function() {
      // Save the user's modification to localStorage
      localStorage.setItem("userModification", this.value);
    });
  } else {
    // LocalStorage is not supported
    console.log("LocalStorage is not supported by your browser.");
  }
}

async function FormSubmission(evt){
  // console.debug("FormSubmission");
  evt.preventDefault();

  const titleValue = $("#titleUser").val();
  const urlValue = $("#urlUser").val();
  const authorValue = $('#authorUser').val();
  const username = currentUser.username
  const storyData = { titleValue, urlValue, authorValue, username };
  const story = await StoryList.addStory(currentUser,storyData)

  const $story = generateStoryMarkup(story);

  $allStoriesList.prepend($story);
  putStoriesOnPage($story)
  // hide the form and reset it
  $("#myform").slideUp("slow");
  ("#myform").trigger("reset");
}
// putStoriesOnPage($story)

$('#submitButton').on('submit', FormSubmission);



