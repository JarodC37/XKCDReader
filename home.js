// generate random seed
const randomNumber = () => {
    let today = new Date();
    return (today.getTime()%2496)+1;
}


let maxComicIndex; 

// get largest comic index using default api page
const getMaxComicIndex = () => {
    return fetch('https://intro-to-js-playground.vercel.app/api/xkcd-comics/')
    .then(res => res.json())
    .then(comic => {
        return comic.num;
    })
}

// updates line in HTML to indicate largest comic index
async function update() {
    maxComicIndex = await getMaxComicIndex();
    let max = document.querySelector(`#max`);
    max.innerHTML = "Max comic index = " + maxComicIndex;
}

update();

// function to reload the comic with the comic index as a parameter
const initComic = (number) => {
    resetInputAndError();
    getMaxComicIndex().then(res => {
        const comicPanels = document.querySelectorAll("div[id^='comic']");
        // offset to get comic panels to right and left of centre comic
        let offset = Math.floor(comicPanels.length / 2);
        comicPanels.forEach((comicPanel, index) => {
            // if index <1, rollback to 2497 etc.
            let link = `https://intro-to-js-playground.vercel.app/api/xkcd-comics/${((number+(index-offset))%res) < 1 ? res + ((number+(index-offset))%res) : ((number+(index-offset))%res)}`;
            fetch(link)
            .then(res => res.json())
            .then(comic => {
                comicPanel.innerHTML = `<text id="comicTitle" class="comicTitle">${comic.safe_title}</text>
                                    <text class="comicNumber">Comic Number: <span id="comicID">${comic.num}</span></text>
                                    <img src="${comic.img}" >`;
            });
        })
        updateIndex(number)
        console.log(`res = ${res}`)
    });
}

// get the current comic index displayed
const getIndexElement = () => {
    return curIndex = document.querySelector("#currentIndex")
}

// updates the HTML element with the comic's index
const updateIndex = (index) => {
    getIndexElement().innerHTML = index;
}

const resetInputAndError = () => {
    document.querySelector(`#userInput`).value = '';
    document.querySelector(`#errorMsg`).classList.add('hidden');
}


initComic(randomNumber());



const randomBtn = document.querySelector('#random');
const nextBtn = document.querySelector('#next');
const prevBtn = document.querySelector('#previous');
const goBtn = document.querySelector(`#go`);
const changeBtn = document.querySelector(`#changeDisplay`)

randomBtn.addEventListener('click', function() {
    initComic(randomNumber());
}, false);

// stores current number of comics displayed (1/3/5) and advances by that number
nextBtn.addEventListener('click', function() {
    let currentIndex = + getIndexElement().innerHTML;
    let numberItemsDisplayed = + document.querySelector(`#numberItemsDisplayed`).innerHTML;
    initComic(currentIndex + numberItemsDisplayed);
}, false);

prevBtn.addEventListener('click', function() {
    let currentIndex = + getIndexElement().innerHTML;
    let numberItemsDisplayed = + document.querySelector(`#numberItemsDisplayed`).innerHTML;
    initComic(currentIndex - numberItemsDisplayed);
}, false);

goBtn.addEventListener('click', function() {
    let userInput = + document.querySelector(`#userInput`).value;
    let errors = false;
    if (userInput < 1 || userInput >2497 || userInput %1 !== 0) {
        errors = true;
    }
    if (errors){
        document.querySelector(`#errorMsg`).classList.remove('hidden');
    }
    else{
        initComic(userInput);
    }
}, false);


// hides comic panels based on how many to show
changeBtn.addEventListener('click', function() {
    let numComicsToShow = + document.querySelector('#numberComics').value;
    document.querySelector(`#numberItemsDisplayed`).innerHTML = numComicsToShow;

    const comicPanels = document.querySelectorAll("div[id^='comic']");
    if (numComicsToShow === 1){
        comicPanels.forEach((panel, index) => {
            if(index !== 2){
                panel.classList.add('hidden')
            }
        });
    }
    else if (numComicsToShow === 3){
        comicPanels.forEach((panel, index) => {
            if(index === 0 || index === 4){
                panel.classList.add('hidden')
            }
            else{
                panel.classList.remove('hidden')
            }
        });
    }
    else{
        comicPanels.forEach(panel => {
            panel.classList.remove('hidden')
        });
    }
}, false);

