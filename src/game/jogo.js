/*Este é o script que contem as especificações e funcionalidades do jogo*/

/*Apresentação do Jogo*/
console.info('--------------------------------------------------');
console.info('Flappy Bird');
console.info('');
console.info('Feito por:');
console.info('GustavoHerreroNunes');
console.info('');
console.info('Baseado no projeto da série de vídeos de:');
console.info('DevSoutinho');

let frames = 0;

/*Pontuação do usuário*/
let pontos = 0;

const som_HIT = new Audio();
som_HIT.src = '../../efeitos/hit.wav';

const sprites = new Image();
sprites.src = '../img/sprites.png';

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

/*Criando Placar - Placar com a pontuação do usuário*/
function criarPlacar(){

  const placar = {

    /*Função que atualiza o valor da pontuação*/
    atualiza(){
      if(frames % 20 === 0){
        pontos += 1;
      }
    },

    /*Função que desenha a pontuação na tela*/
    desenha(){
      contexto.font = '15px "Press Start 2P"';
      contexto.textAlign = 'right';
      contexto.fillStyle = 'white';
      contexto.fillText(`${pontos}`, canvas.width - 10, 25);
    }
  }

  return placar;
}

/*Criando Medalha - Medalha que o usuário ganhou pela pontuação*/
function criarMedalha(){

  const medalha = {
    /*Coordenadas para o objeto dentro do arquivo "sprites.png"*/
    sorceX: 0,
    sorceY: 0,
  
    /*Largura e Altura do objeto dentro do arquivo e da página*/
    itemWidth: 44,
    itemHeight: 44,
  
    /*Coordenadas para o objeto dentro de "contexto"*/
    coordX: messageGameOver.coordX + 27,
    coordY: messageGameOver.coordY + 87,

    /*Nome da Medalha*/
    nome: {
      text: '',//Nome
      color: ''//Cor do texto
    },

    /*Função para desenhar o objeto*/
    desenha(){
      /*0 - 20 pontos: Participação :)*/
      if(pontos <= 20){
        this.sorceX = 0;
        this.sorceY = 78;

        this.nome.text = 'Participou';
        this.nome.color = 'white';
      }
      /*21 - 50 pontos: Bronze ;)*/
      else if(pontos <= 50){
        this.sorceX = 48;
        this.sorceY = 124;

        this.nome.text = 'Bronze';
        this.nome.color = '#CF862B';
      }
      /*51 - 199 pontos: Prata :o*/
      else if(pontos <= 200){       
        this.sorceX = 48;
        this.sorceY = 78;

        this.nome.text = 'Prata';
        this.nome.color = '#8C8686';
      }
      /*200 - ? pontos: Ouro =D*/
      else{
        this.sorceX = 0;
        this.sorceY = 124;

        this.nome.text = 'Ouro';
        this.nome.color = '#C19C25';
      }

      /*Medalha*/
      contexto.drawImage(
        sprites,
        this.sorceX, this.sorceY,
        this.itemWidth, this.itemHeight,
        this.coordX, this.coordY,
        this.itemWidth, this.itemHeight
      );
      
      /*Nome da Medalha*/
      contexto.font = '8px "Press Start 2P"';
      contexto.textAlign = 'center';
      contexto.fillStyle = `${this.nome.color}`;
      contexto.fillText(`${this.nome.text}`, this.coordX + (this.itemWidth/2), this.coordY + this.itemHeight + 12);
    }
  }

  return medalha;
}

/*Criando Chão - Chão do cénario*/
function criarChao(){

  const chao = {
    /*Coordenadas para o objeto dentro do arquivo "sprites.png"*/
    sorceX: 0,
    sorceY: 610,
  
    /*Largura e Altura do objeto dentro do arquivo e da página*/
    itemWidth: 210,
    itemHeight: 112,
  
    /*Coordenadas para o objeto dentro de "contexto"*/
    coordX: 0,
    coordY: canvas.height - 112,
  
    /*Função que atualiza a posição do objeto*/
    atualiza(){
      const moviChao = 1;
      const repeticao = this.itemWidth / 3;
      const movimento = this.coordX - moviChao;

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

/*Criando Canos - Obstáculos para o Flappy Bird durante o jogo*/
function criarCanos(){
  const canos = {
    /*Coordenadas para o objeto dentro do arquivo "sprites.png*/
    chao:{//Cano do chão
      sorceX: 0,
      sorceY: 169,
    },
    ceu:{//Cano do céu
      sorceX: 52,
      sorceY: 169,
    },    
  
    /*Largura e Altura do objeto dentro do arquivo e da página*/
    itemWidth: 52,
    itemHeight: 400,

    /*Espaço entre os canos do céu e do chão*/
    espaco: 110,

    /*Pares de canos na carregados no navegador*/
    pares: [],

    /*Função para desenhar o objeto*/
    desenha(){
      canos.pares.forEach(function(par){
        const yRandom = par.y;
        
        /*Cano do céu*/
        const canoCeuX = par.x;
        const canoCeuY = yRandom;
        contexto.drawImage(
          sprites,
          canos.ceu.sorceX, canos.ceu.sorceY,
          canos.itemWidth, canos.itemHeight,
          canoCeuX, canoCeuY,
          canos.itemWidth, canos.itemHeight
        );

        /*Cano do chão*/
        const canoChaoX = par.x;
        const canoChaoY = yRandom + canos.itemHeight + canos.espaco;//Posição do cano do céu + altura do cano do céu + espaço padrão entre canos
        contexto.drawImage(
          sprites,
          canos.chao.sorceX, canos.chao.sorceY,
          canos.itemWidth, canos.itemHeight,
          canoChaoX, canoChaoY,
          canos.itemWidth, canos.itemHeight
        );
        
        par.canoCeu = {
          x: canoCeuX,
          y: canos.itemHeight + canoCeuY
        }
        par.canoChao = {
          x: canoChaoX,
          y: canoChaoY
        }
      })
    },

    /*Função que verifica se houve uma colisão entre o Flappy Bird e um dos canos*/
    fazColisaoCanos(par){
      const cabeca = globais.flappyBird.coordY;
      const pe = globais.flappyBird.coordY + globais.flappyBird.itemHeight;//Do topo até a base do personagem
      const bico = globais.flappyBird.coordX + globais.flappyBird.itemWidth;
      

      if(bico >= par.x && globais.flappyBird.coordX < (par.x + globais.canos.itemWidth + 1)){
        if(cabeca <= par.canoCeu.y){
          console.log('Ceu');
          return true;
        }

        if(pe >= par.canoChao.y){
          console.log('Chao');
          return true;
        }
      }

      return false;
    },

    atualiza(){
      const intervaloChegou = frames % 100 === 0;

      if(intervaloChegou){
        canos.pares.push({
          x: canvas.width,
          y: -150 * (Math.random() + 1)
        });
      }

      canos.pares.forEach(function(par){
        par.x = par.x -2;

        if(canos.fazColisaoCanos(par)){
          console.log('Game Over');
          
          mudarTela(telas.GAMEOVER);
        }

        if(par.x + canos.itemHeight <= 0){
          canos.pares.shift();
        }
        
      });
    }
  }

  return canos;
}

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

/*Criando mensagem para fim de jogo*/
const messageGameOver = {
  /*Coordenadas para o objeto dentro do arquivo "sprites.png"*/
  sorceX: 134,
  sorceY: 153,

  /*Largura e Altura do objeto dentro do arquivo e da página*/
  itemWidth: 226,
  itemHeight: 160,

  /*Coordenadas para o objeto dentro de "contexto"*/
  coordX: (canvas.width / 2) - 226/2,//Metade de canvas menos a métade do objeto, logo, este fica centralizado
  coordY: (canvas.height / 2) - 160/2,

  /*Função para desenhar o objeto*/
  desenha(){
    contexto.drawImage(
      sprites,
      this.sorceX, this.sorceY,
      this.itemWidth, this.itemHeight,
      this.coordX, this.coordY,
      this.itemWidth, this.itemHeight
    );

    /*Desenhando pontuação do usuário*/
    contexto.font = '10px "Press Start 2P"';
    contexto.textAlign = 'right';
    contexto.fillStyle = 'black';
    contexto.fillText(`${pontos}`, this.coordX + this.itemWidth - 21, this.coordY + 92);
    contexto.font = '10px "Press Start 2P"';
    contexto.textAlign = 'right';
    contexto.fillStyle = 'white';
    contexto.fillText(`${pontos}`, this.coordX + this.itemWidth - 21, this.coordY + 90);
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
      {sorceY: 0}, //Asa para cima (padrão)
      {sorceY: 26}, //Asa no meio
      {sorceY: 52}, //Asa para baixo
      {sorceY: 26}, //Asa no meio
    ],

    /*Função que atualiza o frame do Flappy Bird*/
    atualizaFrame(){
      const intervaloFrames = 10;
      const intervaloChegou = frames % intervaloFrames === 0;
      
      if(intervaloChegou){
        const bsIncremento = 1;
        const incremento = bsIncremento + this.frameAtual;
        const bsRepeticao = this.moviBaterAsas.length;
  
        this.frameAtual = incremento % bsRepeticao;

      }
    },

    /*Função que faz o Flappy Bird pular*/
    pula(){      
      this.speed = - (this.pulo);
      
    },

    /*Função que atualiza a posição do objeto*/
    atualiza(){
      if(fazColisao(flappyBird, globais.chao)){
        console.info('Game Over');

        mudarTela(telas.GAMEOVER);
        
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
    /*Inicializa todos os objetos globais*/
    inicializa(){
      globais.flappyBird = criarFlappyBird();
      globais.canos = criarCanos();
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
  /*Inicializa o placar do jogo*/
  inicializa(){
    globais.placar = criarPlacar();
  },
  /*Desenha todos os elementos da tela*/
  desenha(){
    cenario.desenha();
    globais.canos.desenha();
    globais.chao.desenha();
    globais.flappyBird.desenha();
    globais.placar.desenha();
  },
  /*Atualiza os elementos da tela*/
  atualiza(){
    globais.flappyBird.atualiza();
    globais.canos.atualiza();
    globais.chao.atualiza();
    globais.placar.atualiza();
  },
  click(){
    globais.flappyBird.pula();
  }
};
/*Tela de Game Over*/
telas.GAMEOVER = {
  
  ativa: false,//Indica se esta tela esta ativa

  delay: false,//Indica se houve uma espera para mudar para a "telas.INICIO"

  inicializa(){
    globais.medalha = criarMedalha();
  },
  desenha(){
    if(frames % 20 === 0){
      messageGameOver.desenha();
      globais.medalha.desenha();
    }
  },
  atualiza(){
    /*Verificando se a tela não estava ativa*/
    if(!this.ativa){
      som_HIT.play();
      this.ativa = true;
    }
    /*Verificando se passaram 170 frames para poder trocar para a "telas.INICIO"*/
    if(frames % 170 === 0){
      this.delay = true;
    }

  },
  click(){
    /*Verificando se passou o delay de 170 frames*/
    if(this.delay){
      this.delay = false;
      this.ativa = false;
      pontos = 0;
      mudarTela(telas.INICIO);
    }
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
