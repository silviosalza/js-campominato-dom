// Esercizio di oggi: **Campo Minato**
// nome repo: js-campominato-dom
// **Consegna**
// Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco (attenzione: non bisogna copiare tutta la cartella dell'esercizio ma solo l'index.html, e le cartelle js/ css/ con i relativi script e fogli di stile, per evitare problemi con l'inizializzazione di git).
// ****
// Generare una griglia di gioco quadrata in cui ogni cella contiene un numero compreso tra 1 e 100.
// Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
// I numeri nella lista delle bombe non possono essere duplicati.
// [23, 65, 1, 4,78,15,....];
// In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina, altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
// La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.
// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.
// **BONUS:**
// 1 - L'utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
// con difficoltà 1 => tra 1 e 100
// con difficoltà 2 => tra 1 e 81
// con difficoltà 3 => tra 1 e 49
// **2- quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle
// ****3- quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste


//genero casella per ogni numero generato

const grid = document.querySelector(".grid")
const play = document.querySelector(".btnPlay")


play.addEventListener("click" , function(){
    
    let difficult = document.querySelector(".select")
    console.log(difficult);
    let numberOfSquare = parseInt(difficult.options[difficult.selectedIndex].value);
    console.log(numberOfSquare);
    let numbersArray = getNumberArray(numberOfSquare)
    let bombs = generateBombs(16 , 100)
    console.log(bombs);

    grid.innerHTML = ""
    for (let i = 0; i < numbersArray.length ; i++){


        const currentNumber = numbersArray[i]
        const newItem = generateGridItem(currentNumber)
        grid.append(newItem)
        newItem.addEventListener("click", handleItemClick, bombs)

        if (numberOfSquare === 81){
            newItem.classList.remove("easy")
            newItem.classList.add("normal")
        } else if (numberOfSquare === 49){
            newItem.classList.remove("easy")
            newItem.classList.add("hard")
        }
        
    }



})


//! Funzioni

// genero un array di un numbersQuantity di numeri, consecutivi.

function getNumberArray(numbersQuantity) {
    const array = [];
    
    for (let i = 1; i<=numbersQuantity; i++){
        const number = i
        array.push(number)
        
    }
    return array   
}

function generateGridItem(text) {
    const newSquare = document.createElement("div");
    newSquare.classList.add("grid-item" , "easy");
    newSquare.innerHTML = `<span>${text}</span>`;
    return newSquare;
}

//funziona che genera array di X numeri nel range da 1 a a maxnumber. I numeri sono unici
function generateBombs(bombQuantity , maxNumber){
//creo array vuoto
//finchè array.lenght < bombQuantity
//genero numero random
//se numero non incluso nell'array aggiungo
const bombArray = [];
    while (bombArray.length < bombQuantity){
        const rndBomb = getRndInteger(1 , maxNumber);
        if(!bombArray.includes(rndBomb)){
            bombArray.push(rndBomb);
        }
    }
    return bombArray;
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }


function handleItemClick() {
    
   const bombs = [1,2,3,4,5,6,7,8,9]
    //lego il testo dentro il tag span e lo affido alla costante clickednumber
    const clickedNumber = parseInt(this.querySelector("span").textContent);
     if (bombs.includes(clickedNumber)){
         this.classList.add("red");
         
    } else {
        this.classList.add("orange");
    }
   
    
    console.log(`Hai scelto il numero ${clickedNumber}`);
    
}

