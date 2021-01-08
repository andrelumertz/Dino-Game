const dino = document.querySelector(".dino");
const background = document.querySelector(".background");

let isJumping = false;
let isGameOver = false;
let position = 0;   // 



function handleKeyUp(event) {
  if (event.keyCode === 13) {

    if (!isJumping) {
      jump();
    }
  }
}

function jump() { // FUNÇAO RESPONSAVEL PELO PULO DO DINO 
  isJumping = true;
  // SUBINDO DINO
  let upInterval = setInterval(() => {   // DEFINIR INTERVALOS 
    if (position >= 150) {  // VAI SUBIR 150PX 
      clearInterval(upInterval);
      
      // Descendo
      let downInterval = setInterval(() => {  // INTERVALO DE DESCIDA 
        if (position <= 0) { // VAI PARAR DE DESCER
          clearInterval(downInterval); // VAI PARAR DE DESCER
          isJumping = false;
        } else {
          position -= 20;
          dino.style.bottom = position + "px";
        }
      }, 20);
    } else {
      // Subindo
      position += 20;
      dino.style.bottom = position + "px";
    }
  }, 20);
}

function createCactus() {
  const cactus = document.createElement("div");
  let cactusPosition = 1000;
  let randomTime = Math.random() * 6000;   // GERANDO NUMERO ALEATORIO PARA A QUANTIDADE DE CACTOS QUE IRAM APARECER 

  if (isGameOver) return;

  cactus.classList.add("cactus");
  background.appendChild(cactus);
  cactus.style.left = cactusPosition + "px";

  let leftTimer = setInterval(() => {
    if (cactusPosition < -60) {
      // Saiu da tela
      clearInterval(leftTimer);
      background.removeChild(cactus);
    } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {  // VENDO QUANDO O DINO VAI BATER NO CACTUS 
      // Game over
      clearInterval(leftTimer);  // LIMPANDO O INTERVALO DE IR PARA A ESQUERDA 
      isGameOver = true;
      document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>';
    } else {
      cactusPosition -= 10;
      cactus.style.left = cactusPosition + "px";
    }
  }, 20);

  setTimeout(createCactus, randomTime);  // FUNÇAO SE INVOCANDO COM A RECURSIVIDADE PARA IR CREANDO CACTUS
}

createCactus();
document.addEventListener("keyup", handleKeyUp);
