let tweetList = document.querySelector("#tweet-list");

const tweetFunctionality = document
  .getElementById("form")
  .addEventListener("submit", evnt => {
    event.preventDefault();
    document.addEventListener("DOMContentLoaded", localtoConsol);
    //Get value from tweet field
    const tweetValue = document.getElementById("tweet").value;

    // const abc = "Something";
    // console.log(tweetValue);

    function addTweet(tweetValue) {
      let tweets = retriveTweet();
      console.log(tweetValue);
      tweets.push(tweetValue);

      //Converts tweets array into string
      localStorage.setItem("Tweets", JSON.stringify(tweets));
      //   console.log("worked");
    }

    //Retrive tweets
    function retriveTweet() {
      let tweets;
      let twtLS = localStorage.getItem("tweets");

      if (twtLS === null) {
        tweets = [];
      } else {
        tweets = JSON.parse(twtLS);
        // console.log(tweets);
      }
      return tweets;
    }

    addTweet();
    //Create li items
    const list = document.createElement("li");

    //Create removeBtn
    const removeBtn = document.createElement("a");
    removeBtn.className = "remove-tweet";
    removeBtn.textContent = "x";

    //Assign value to the list
    list.textContent = tweetValue;
    //Add remove sign to the the list
    list.appendChild(removeBtn);

    //Show value in the tweet sction
    tweetList.appendChild(list);

    //Delete Tweet
    const delTweet = tweetList.addEventListener("click", evnt => {
      if (evnt.target.classList.contains("remove-tweet")) {
        console.log(evnt.target.parentElement.remove());
      }
      removeStorage(evnt.target.parentElement.textContent);
    });

    function removeStorage(tweetValue) {
      //Retrive tweets from stroage
      let tweets = retriveTweet();

      const tweetDelete = tweetValue.substring(0, tweetValue.lenth - 1);
    }
  });

function localtoConsol() {
  let tweets = retriveTweet();
  tweets.forEach(tweet => {
    console.log(tweet);
  });
}
