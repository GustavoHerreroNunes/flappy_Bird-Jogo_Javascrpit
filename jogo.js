console.log('[DevSoutinho] Flappy Bird');

let frames = 0;

const som_HIT = new Audio();
som_HIT.src = './efeitos/hit.wav';

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
function criarChao(){

  const chao = {
    /*Coordenadas para o objeto dentro do arquivo "sprites.png"*/
    sorceX: 0,
    sorceY: 610,
  
    /*Largura e Altura do objeto dentro do arquivo e da página*/
    itemWidth: 224,
    itemHeight: 112,
  
    /*Coordenadas para o objeto dentro de "contexto"*/
    coordX: 0,
    coordY: canvas.height - 112,
  
    /*Função que atualiza a posição do objeto*/
    atualiza(){
      const moviChao = 1;
      const repeticao = this.itemWidth / 2;
      const movimento = this.coordX - moviChao;

      // console.log('[coordX]', this.coordX);
      // console.log('[repeticao]', repeticao);
      // console.log('[movimento]', movimento % repeticao);

      this.coordX = movimento % repeticao;
    },

    /*Função para desenhar o objeto*/
    desenha(){
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
  }

  return chao;
};

/*Criando mensagem para de início do jogo*/
const messageGetReady = {
  /*Coordenadas para o objeto dentro do arquivo "sprites.png"*/
  sorceX: 134,
  sorceY: 0,

  /*Largura e Altura do objeto dentro do arquivo e da página*/
  itemWidth: 174,
  itemHeight: 152,

  /*Coordenadas para o objeto dentro de "contexto"*/
  coordX: (canvas.width / 2) - 174/2,//Metade de canvas menos a métade do objeto, logo, este fica centralizado
  coordY: (canvas.height / 2) - 152/2,

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

/*Função que indica se houve colisão do Flappy Bird com o Chão*/
function fazColisao(flappyBird, chao){
  const flappyBirdY = flappyBird.coordY + flappyBird.itemHeight;
  const chaoY = chao.coordY;

  if(flappyBirdY >= chaoY){
    return true;
  }

  return false;
}

/*Criando FlappyBird - Personagem que o player ir jogar*/
function criarFlappyBird(){
  
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

    /*Frame atual do objeto*/
    frameAtual: 0,

    /*Gravidade que o Flappy Bird sofrerá para queda, corresponde ao aumento de velocidade*/
    gravity: 0.25,

    /*Velocidade de queda do Flappy Bird*/
    speed: 0,

    /*Pulo do Flappy Bird*/
    pulo: 4.6,

    /*Movimentos realizados pelo Flappy Bird durante a animção de bater as asas, indicados pelo Y onde o se encontra o desenho de cada movimento*/
    moviBaterAsas:[
      {sorceY: 0}, //Asa para baixo (padrão)
      {sorceY: 26}, //Asa no meio
      {sorceY: 52}, //Asa para baixo
      {sorceY: 26}, //Asa no meio
    ],

    /*Função que atualiza o frame do Flappy Bird*/
    atualizaFrame(){
      const intervaloFrames = 10;
      const intervaloChegou = frames % intervaloFrames === 0;

      // console.log('[frames]', frames);
      // console.log('[intervaloFrames]', intervaloFrames);
      // console.log('[resto]', frames % intervaloFrames)
      // console.log('intervaloChegou:', intervaloChegou);
      // console.log('--------------');
      
      if(intervaloChegou){
        const bsIncremento = 1;
        const incremento = bsIncremento + this.frameAtual;
        const bsRepeticao = this.moviBaterAsas.length;
  
        // console.log('[incremento]', incremento);
  
        this.frameAtual = incremento % bsRepeticao;
        
        // console.log('[frameAtual]', this.frameAtual);

      }
    },

    /*Função que faz o Flappy Bird pular*/
    pula(){
      console.log('==============');
      console.log('[antes]', this.speed);

      this.speed = - (this.pulo);

      console.log('[depois]', this.speed);
    },

    /*Função que atualiza a posição do objeto*/
    atualiza(){
      if(fazColisao(flappyBird, globais.chao)){
        console.log('Game Over');

        som_HIT.play();
        
        setTimeout(() => { mudarTela(telas.INICIO); }, 150);//Esperando 150 miléssimos de segundo para mudar para a tela de Início

        return;
      }

      this.speed = this.speed + this.gravity;
      this.coordY = this.coordY + this.speed;
    },

    /*Função para desenhar o objeto*/
    desenha(){
      this.atualizaFrame();

      const {sorceY} = this.moviBaterAsas[this.frameAtual];
      
      contexto.drawImage(
        sprites,
        this.sorceX, sorceY,
        this.itemWidth, this.itemHeight,
        this.coordX, this.coordY,
        this.itemWidth, this.itemHeight
      );
    }
  }
  return flappyBird;
};

const globais = {};//Criando objeto para armazenar objetos do jogo que serão utilizados por várias telas

let telaAtiva = {};//Criando objeto para armazenar tela ativa do jogo

/*Função para mudar a tela ativa do jogo*/
function mudarTela(novaTela){
  telaAtiva = novaTela;

  if(telaAtiva.inicializa){
    telaAtiva.inicializa();
  }
};

/*Criando objeto para armazenar todas as telas do jogo*/
const telas = {
  /*Tela de Início*/
  INICIO:{
    /*Inicializa objeto global flappyBird*/
    inicializa(){
      globais.flappyBird = criarFlappyBird();
      globais.chao = criarChao();
    },
    /*Desenha todos os elementos da tela*/
    desenha(){
      cenario.desenha();
      globais.chao.desenha();
      globais.flappyBird.desenha();
    
      messageGetReady.desenha();
    },
    /*Atualiza os elementos da tela*/
    atualiza(){
      globais.chao.atualiza();
    },
    click(){
      mudarTela(telas.JOGO);
    }
  }
};
/*Tela com a parte jogável*/
telas.JOGO = {
  /*Desenha todos os elementos da tela*/
  desenha(){
    cenario.desenha();
    globais.chao.desenha();
    globais.flappyBird.desenha();
  },
  /*Atualiza os elementos da tela*/
  atualiza(){
    globais.flappyBird.atualiza();
  }
  ,
  click(){
    globais.flappyBird.pula();
  }
};

function loop(){
  telaAtiva.atualiza();
  telaAtiva.desenha();

  frames++;

  requestAnimationFrame(loop);
}

window.addEventListener('click', function(){
  if(telaAtiva.click){
    telaAtiva.click();
  }
});

mudarTela(telas.INICIO);//Jogo inicia com a tela de início
loop();
