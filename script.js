"use strict";

const githubFormEl = document.querySelector(".github-form");

const javaWrapper = document.querySelector(".java-wrapper").childNodes;
const colorWrapperDark = document.querySelector(".color-wrapper-dark");
const colorWrapperLight = document.querySelector(".color-wrapper-light");
const noResults = document.querySelector(".github-form__no-results");
const body = document.body;

const githubProfileImg = document.querySelector(".github-profile__img");
const githubProfileName = document.querySelector(".github-profile__name");
const githubProfileAt = document.querySelector(".github-profile__at");
const githubProfileDate = document.querySelector(".github-profile__date");
const githubProfileAbout = document.querySelector(".github-profile__about");
const githubProfileStatsNumber = document.querySelector(
  ".github-profile__repos-number"
);
const githubProfileFollowersNumber = document.querySelector(
  ".github-profile__followers-number"
);
const githubProfileFollowingNumber = document.querySelector(
  ".github-profile__following-number"
);
const githubProfileLinksPMap = document.querySelector(
  ".github-profile__links__p-map"
);
const githubProfileLinksImgMap = document.querySelector(
  ".github-profile__links__img-map"
);
const githubProfileLinksPLinks = document.querySelector(
  ".github-profile__links__p-links"
);
const githubProfileLinksImgLinks = document.querySelector(
  ".github-profile__links__img-links"
);
const githubProfileLinksPTwitter = document.querySelector(
  ".github-profile__links__p-twitter"
);
const githubProfileLinksImgTwitter = document.querySelector(
  ".github-profile__links__img-twitter"
);
const githubProfileLinksPBusiness = document.querySelector(
  ".github-profile__links__p-business"
);
const githubProfileLinksImgBusiness = document.querySelector(
  ".github-profile__links__img-business"
);

let light = true;

const getJSON = function (url, errorMsg = "Something went wrong") {
  return fetch(url, { cache: "no-cache" }).then((response) => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};

async function myFunction(query) {
  try {
    if (noResults.classList.contains("active")) {
      noResults.classList.toggle("active");
      if (githubProfileLinksPMap.classList.contains("unavailable-text")) {
        githubProfileLinksPMap.classList.toggle("unavailable-text");
      }
      if (githubProfileLinksImgMap.classList.contains("unavailable-img")) {
        githubProfileLinksImgMap.classList.toggle("unavailable-img");
      }
      if (githubProfileLinksPLinks.classList.contains("unavailable-text")) {
        githubProfileLinksPLinks.classList.toggle("unavailable-text");
      }
      if (githubProfileLinksImgLinks.classList.contains("unavailable-img")) {
        githubProfileLinksImgLinks.classList.toggle("unavailable-img");
      }
      if (githubProfileLinksPTwitter.classList.contains("unavailable-text")) {
        githubProfileLinksPTwitter.classList.toggle("unavailable-text");
      }
      if (githubProfileLinksImgTwitter.classList.contains("unavailable-img")) {
        githubProfileLinksImgTwitter.classList.toggle("unavailable-img");
      }
      if (githubProfileLinksPBusiness.classList.contains("unavailable-text")) {
        githubProfileLinksPBusiness.classList.toggle("unavailable-text");
      }
      if (githubProfileLinksImgBusiness.classList.contains("unavailable-img")) {
        githubProfileLinksImgBusiness.classList.toggle("unavailable-img");
      }
    }

    const profile = await getJSON(`https://api.github.com/users/${query}`);
    console.log(profile);
    const year = profile.created_at.slice(0, 4);
    let month = Number(profile.created_at.slice(5, 7));
    const day = profile.created_at.slice(8, 10);

    switch (month) {
      case 1:
        month = "Jan";
        break;
      case 2:
        month = "Feb";
        break;
      case 3:
        month = "Mar";
        break;
      case 4:
        month = "Apr";
        break;
      case 5:
        month = "May";
        break;
      case 6:
        month = "Jun";
        break;
      case 7:
        month = "Jul";
        break;
      case 8:
        month = "Aug";
        break;
      case 9:
        month = "Sep";
        break;
      case 10:
        month = "Oct";
        break;
      case 11:
        month = "Nov";
        break;
      case 12:
        month = "Dec";
        break;
    }

    githubProfileImg.src = profile.avatar_url;
    if (profile.name != null) {
      githubProfileName.textContent = profile.name;
    } else {
      githubProfileName.textContent = profile.login;
    }
    githubProfileAt.textContent = `@${profile.login}`;
    if (profile.bio != null) {
      githubProfileAbout.textContent = profile.bio;
    } else {
      githubProfileAbout.textContent = "This profile has no bio";
    }
    githubProfileStatsNumber.textContent = profile.public_repos;
    githubProfileFollowersNumber.textContent = profile.followers;
    githubProfileFollowingNumber.textContent = profile.following;
    if (profile.location != null) {
      githubProfileLinksPMap.textContent = profile.location;
      githubProfileLinksPMap.addEventListener("click", () => {
        window.open(
          `https://www.google.com/maps/place/${profile.location.replace(
            " ",
            "+"
          )}`
        );
      });
    } else {
      githubProfileLinksPMap.textContent = "Not Available";
      githubProfileLinksPMap.classList.toggle("unavailable-text");
      githubProfileLinksImgMap.classList.toggle("unavailable-img");
    }
    if (profile.blog != "") {
      githubProfileLinksPLinks.textContent = profile.blog;
      githubProfileLinksPLinks.addEventListener("click", () => {
        window.open(profile.blog);
      });
    } else {
      githubProfileLinksPLinks.textContent = "Not Available";
      githubProfileLinksPLinks.classList.toggle("unavailable-text");
      githubProfileLinksImgLinks.classList.toggle("unavailable-img");
    }
    if (profile.twitter_username != null) {
      githubProfileLinksPTwitter.textContent = profile.twitter_username;
      githubProfileLinksPTwitter.addEventListener("click", () => {
        window.open(`https://twitter.com/${profile.twitter_username}`);
      });
    } else {
      githubProfileLinksPTwitter.textContent = "Not Available";
      githubProfileLinksPTwitter.classList.toggle("unavailable-text");
      githubProfileLinksImgTwitter.classList.toggle("unavailable-img");
    }
    if (profile.company != null) {
      githubProfileLinksPBusiness.textContent = profile.company;
    } else {
      githubProfileLinksPBusiness.textContent = "Not Available";
      githubProfileLinksPBusiness.classList.toggle("unavailable-text");
      githubProfileLinksImgBusiness.classList.toggle("unavailable-img");
    }
    githubProfileDate.textContent = `Joined ${day} ${month} ${year}`;
  } catch (err) {
    noResults.classList.toggle("active");
    console.log(err);
  }
}

githubFormEl.addEventListener("submit", function (e) {
  e.preventDefault();
  const query = githubFormEl.querySelector(".github-form__search").value;
  myFunction(query);
});

// Below code changes the light/dark modes

javaWrapper.forEach((btn) => {
  btn.addEventListener("click", () => {
    colorWrapperDark.classList.toggle("active-flex");
    colorWrapperLight.classList.toggle("active-flex");

    if (!light) {
      body.setAttribute("data-theme", "light");
      light = true;
    } else {
      body.setAttribute("data-theme", "dark");
      light = false;
    }
  });
});
