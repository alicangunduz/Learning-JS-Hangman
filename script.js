promt()
const word_el = document.getElementById('word')
const popup = document.getElementById('popup-container') 
const message_el = document.getElementById('success-message') 
const wrongLetters_el = document.getElementById('wrong-letters')
const items = document.querySelectorAll('.item')
const messageEl = document.getElementById('message')
const playAgain = document.getElementById('play-again')
const correctLetters = [] 
const wrongLetters = [] 
let selectedWord = getRandomWord() 

function getRandomWord() {
    const words = ["javascript","react","nodejs"] 
    return words[Math.floor(Math.random() * words.length)] 
}

function displayWord() {    
    word_el.innerHTML = `
        ${selectedWord.split('').map(letter => `
            <div class="letter">
                ${correctLetters.includes(letter) ? letter: ''}
            </div>
        `).join('')}
    
    ` 

    const w = word_el.innerText.replace(/\n/g,'') 
    if (w === selectedWord) {
        popup.style.display = 'flex' 
        message_el.innerText = 'Tebrikler kazandınız.' 
    }
    }

function updateWrongLettersEl() {
    wrongLetters_el.innerHTML = `
        ${wrongLetters.length > 0 ? '<h3>Yanlış Harfler</h3>' : ''}
        ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `

    items.forEach((item,index) => {
        const errors = wrongLetters.length 

        if (index < errors) {
            item.style.display = 'block' 
        } else {
            item.style.display = 'none' 
        }
    })

    if (wrongLetters.length === items.length) {
        popup.style.display = 'flex' 
        message_el.innerText = 'Kaybettiniz.' 
    }
  
}

function displayMessage() {
    messageEl.classList.add('show')
    setTimeout(() => {
        messageEl.classList.remove('show')
    }
    ,2000)

}

playAgain.addEventListener('click', function(){
    correctLetters.splice(0)
    wrongLetters.splice(0)

    selectedWord = getRandomWord()
    
    displayWord()
    updateWrongLettersEl()
    popup.style.display = 'none'
})


window.addEventListener('keydown', function(e) {
    if (e.keyCode >= 65 && e.keyCode <= 90) {        
        const letter = e.key 

        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter) 
                displayWord() 
            } else {
              displayMessage()  
            }
        } else {
            if(!wrongLetters.includes(letter)) {
                wrongLetters.push(letter) 
                updateWrongLettersEl()
            }else {
                displayMessage()
            }
        }

    }
}) 

displayWord()
