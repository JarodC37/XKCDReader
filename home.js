const randomNumber = () => {
    let today = new Date();
    return (today.getTime()&2485)+1;
}

const initComic = (number) => {
    const comicPanel = document.querySelector(`#comic`);
    const proxy = 'https://cors-anywhere.herokuapp.com/'
    const link = `https://xkcd.com/${number}/info.0.json`
    fetch(proxy+link)
    .then(res => res.json())
    .then(comic => {
        // console.log(comic.img)
        // const item = document.createElement('div')
        // item.innerHTML = `<img src="${comic.img}" >`
        // comicPanel.append(item)
        comicPanel.innerHTML = `<text id="comicTitle" class="comicTitle">${comic.safe_title}</text>
                            <text class="comicNumber">Comic Number: <span id="comicID">${comic.num}</span></text>
                            <img src="${comic.img}" >`;
    });
    updateIndex(number)
}

const getIndexElement = () => {
    return curIndex = document.querySelector("#currentIndex")
}

const updateIndex = (index) => {
    getIndexElement().innerHTML = index;
}


initComic(randomNumber());



const randomBtn = document.querySelector('#random');
const nextBtn = document.querySelector('#next');
const prevBtn = document.querySelector('#previous');
const goBtn = document.querySelector(`#go`);

randomBtn.addEventListener('click', function() {
    initComic(randomNumber());
}, false)

nextBtn.addEventListener('click', function() {
    let currentIndex = + getIndexElement().innerHTML;
    initComic(currentIndex + 1);
}, false)

prevBtn.addEventListener('click', function() {
    let currentIndex = + getIndexElement().innerHTML;
    initComic(currentIndex -1);
}, false)

goBtn.addEventListener('click', function() {
    let userInput = + document.querySelector(`#userInput`).value;
    initComic(userInput);
}, false)