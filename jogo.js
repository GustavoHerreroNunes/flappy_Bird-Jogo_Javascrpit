console.log('[DevSoutinho] Flappy Bird');

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

/*Criando o Cenário - Plano de fundo do jogo*/
const cenario = {
  /*Coordenadas para o objeto dentro do arquivo "sprites.png"*/
  sorceX: 390,
  sorceY: 0,

  /*Largura e Altura do objeto dentro do arquivo e da página*/
  itemWidth: 275,
  itemHeight: 204,

  /*Coordenadas para o objeto dentro de "contexto"*/
  coordX: 0,
  coordY: canvas.height - 204,

  /*Função para desenhar o objeto*/
  desenha(){

    contexto.fillStyle = '#70c5ce';
    contexto.fillRect(0,0, canvas.width, canvas.height);

    contexto.drawImage(
      sprites,
      this.sorceX, this.sorceY,
      this.itemWidth, this.itemHeight,
      this.coordX, this.coordY,
      this.itemWidth, this.itemHeight
      );
    
    contexto.drawImage(
      sprites,
      this.sorceX, this.sorceY,
      this.itemWidth, this.itemHeight,
      (this.coordX + this.itemWidth), this.coordY,
      this.itemWidth, this.itemHeight
      );

    }
    
  };

  /*Criando Chão - Chão do cénario*/
  const chao = {
    /*Coordenadas para o objeto dentro do arquivo "sprites.png"*/
    sorceX: 0,
    sorceY: 610,

    /*Largura e Altura do objeto dentro do arquivo e da página*/
    itemWidth: 320,
    itemHeight: 112,

    /*Coordenadas para o objeto dentro de "contexto"*/
    coordX: 0,
    coordY: canvas.height - 112,

    /*Função para desenhar o objeto*/
    desenha(){
      contexto.drawImage(
        sprites,
        this.sorceX, this.sorceY,
        this.itemWidth, this.itemHeight,
        this.coordX, this.coordY,
        this.itemWidth, this.itemHeight
      );

    }
  };

  /*Criando FlappyBird - Personagem que o player ir jogar*/
  const flappyBird = {
    /*Coordenadas para o objeto dentro do arquivo "sprites.png"*/
    sorceX: 0,
    sorceY: 0,

    /*Largura e Altura do objeto dentro do arquivo e da página*/
    itemWidth: 34,
    itemHeight: 24,

    /*Coordenadas para o objeto dentro de "contexto"*/
    coordX: 10,
    coordY: 50,

    /*Função para desenhar o objeto*/
    desenha(){
      contexto.drawImage(
        sprites,
        this.sorceX, this.sorceY,
        this.itemWidth, this.itemHeight,
        this.coordX, this.coordY,
        this.itemWidth, this.itemHeight
      );
    }
  };

function loop(){
  cenario.desenha();
  chao.desenha();
  flappyBird.desenha();

  requestAnimationFrame(loop);
}
loop();
