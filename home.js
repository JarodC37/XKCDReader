const randomNumber = () => {
    let today = new Date();
    return (today.getTime()%2488)+1;
}


// let maxComicIndex; 

// const getMaxComicIndex = () => {
//     return fetch('https://intro-to-js-playground.vercel.app/api/xkcd-comics/')
//     .then(res => res.json())
//     .then(comic => {
//         return comic.num;
//     })
// }

// async function update() {
//     maxComicIndex = await getMaxComicIndex();
// }

// update();
// console.log(`maxcomi ${maxComicIndex}`)

const initComic = (number) => {
    resetInputAndError();
    
    const comicPanels = document.querySelectorAll("div[id^='comic']");
    let offset = Math.floor(comicPanels.length / 2);
    //const link = `https://intro-to-js-playground.vercel.app/api/xkcd-comics/${number}`;
    comicPanels.forEach((comicPanel, index) => {
        let link = `https://intro-to-js-playground.vercel.app/api/xkcd-comics/${((number+(index-offset))%2488) < 1 ? 2488 + ((number+(index-offset))%2488) : ((number+(index-offset))%2488)}`;
        fetch(link)
        .then(res => res.json())
        .then(comic => {
            // const item = document.createElement('div')
            // item.innerHTML = `<img src="${comic.img}" >`
            comicPanel.innerHTML = `<text id="comicTitle" class="comicTitle">${comic.safe_title}</text>
                                <text class="comicNumber">Comic Number: <span id="comicID">${comic.num}</span></text>
                                <img src="${comic.img}" >`;
        });
    })
    updateIndex(number)
    console.log(number)
}

const getIndexElement = () => {
    return curIndex = document.querySelector("#currentIndex")
}

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
    //ensure comic number is valid
    let errors = false;
    if (userInput < 1 || userInput >2488 || userInput %1 !== 0) {
        errors = true;
    }
    if (errors){
        document.querySelector(`#errorMsg`).classList.remove('hidden');
    }
    else{
        initComic(userInput);
    }
}, false);

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

