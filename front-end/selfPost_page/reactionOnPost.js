let starsContainer = document.getElementById('interactive-stars-container')
let allStars = starsContainer.querySelectorAll('img')

let ratedStarPath = '../static/img/ratedStar.svg'
let unratedStarPath = '../static/img/unratedStar.svg'
let currentStarsValue = 0

function getStarsOnPost(numberOfStars) {
    currentStarsValue = numberOfStars

    for (let i = 0; i < numberOfStars; i++) {
        allStars[i].src = ratedStarPath
    }
    if (numberOfStars < 5) {
        for (let j = numberOfStars; j < allStars.length; j++) {
            allStars[j].src = unratedStarPath
        }
    }
}