const randomNumber = () => {
    let today = new Date();
    return (today.getTime()&2485)+1;
}

const initComic = (number) => {
    resetInputAndError();
    
    const comicPanel = document.querySelector(`#comic`);
    // const proxy = 'https://cors-anywhere.herokuapp.com/'
    // const link = `https://xkcd.com/${number}/info.0.json`
    const proxy = '';
    const link = `https://intro-to-js-playground.vercel.app/api/xkcd-comics/${number}`;
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

const resetInputAndError = () => {
    document.querySelector(`#userInput`).value = '';
    document.querySelector(`#errorMsg`).classList.add('hidden');
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
    //ensure comic number is valid
    let errors = false;
    if (userInput < 1 || userInput >2486 || userInput %1 !== 0) {
        errors = true;
    }
    if (errors){
        document.querySelector(`#errorMsg`).classList.remove('hidden')
    }
    else{
        initComic(userInput);
    }
}, false)

