const TENDA = "A";
const ARVORE = "T";

let contando = false;
let refContagem;
let segundos = 0;
let matrizResultado;

function inicializaMatriz(tamanhoDesejado){
    const matrizInterna = [];
    for (let i = 0; i < tamanhoDesejado; i++) {                                   
        const linha = [];
        for (let j = 0; j < tamanhoDesejado; j++) {
            linha.push(' ')
        }
        matrizInterna.push(linha);
    }
    return matrizInterna;
}

function calMinMaxTendas(tamanhoMatriz){
    let maxTenda;
    const minTenda = tamanhoMatriz-1;
    if(tamanhoMatriz%2 == 0){
        maxTenda = Math.pow((tamanhoMatriz/2),2)
    } else {
        maxTenda = Math.pow(((tamanhoMatriz+1)/2),2)
    }
    return{
        min: minTenda,
        max: maxTenda
    }
}

function preencheMatriz(matrizInterna,tamanho,minTenda,maxTenda){
    
    let tendasRestantes = Math.floor(Math.random() * (maxTenda - minTenda)) + minTenda;
    
    // Preenche tendas na matriz
    while(tendasRestantes > 0) {                                                  // bota tenda
        console.info("Procurando lugar da tenda")
    
        const linhaRandom = Math.floor(Math.random() * (tamanho));
        const colunaRandom = Math.floor(Math.random() * (tamanho)); 
        if (matrizInterna[linhaRandom][colunaRandom] == " ") {
    
            const linhaInicio = Math.max(linhaRandom - 1 , 0);                     // pra nao deixar cair fora da matriz
            const linhaFim = Math.min(tamanho - 1 , linhaRandom + 1);
            const colunaInicio = Math.max(colunaRandom - 1 , 0);
            const colunaFim = Math.min(tamanho - 1 , colunaRandom + 1);
            
            // Preenche arvores
            
            const ladoTendaOk = []                                                 // verificar ladoTendaOk
            if (linhaRandom > 0 && matrizInterna[linhaRandom-1][colunaRandom] == " "){                // 1
                ladoTendaOk.push (1)
            } 
            if (linhaRandom < tamanho - 1 && matrizInterna[linhaRandom+1][colunaRandom] == " "){      // 3
                ladoTendaOk.push (3)
            }
            if (colunaRandom > 0 && matrizInterna[linhaRandom][colunaRandom-1] == " "){               // 4
                ladoTendaOk.push (4)
            } 
            if (colunaRandom < tamanho - 1 && matrizInterna[linhaRandom][colunaRandom+1] == " "){     // 2
                ladoTendaOk.push (2)
            }
    
            if (ladoTendaOk.length > 0) {
                console.info("Lugar possui pelo menos um lado para arvore")
                const posiArv = Math.floor(Math.random() * (ladoTendaOk.length));   // n aleat do tamanho do array  e  bota arvore
                if (ladoTendaOk[posiArv] == 1){
                    matrizInterna[linhaRandom-1][colunaRandom] = ARVORE;
                } else if (ladoTendaOk[posiArv] == 3){
                    matrizInterna[linhaRandom+1][colunaRandom] = ARVORE;
                } else if (ladoTendaOk[posiArv] == 2){
                    matrizInterna[linhaRandom][colunaRandom+1] = ARVORE;
                } else if (ladoTendaOk[posiArv] == 4){
                    matrizInterna[linhaRandom][colunaRandom-1] = ARVORE;
                }
                
                matrizInterna[linhaRandom][colunaRandom] = TENDA;
                tendasRestantes--;
            }
            for(let AdjI = linhaInicio; AdjI <= linhaFim; AdjI++) {              // reserva espacos vazios adj tenda
                for(let AdjJ = colunaInicio; AdjJ <= colunaFim; AdjJ++) {
                    if (matrizInterna[AdjI][AdjJ] != TENDA && matrizInterna[AdjI][AdjJ] != ARVORE){
                        matrizInterna[AdjI][AdjJ] = "_";
    
                    }
                }
            }
            let espacos = 0;
            for(let linha = 0; linha < matrizInterna.length; linha++) {                  // conta espacos vazios
                for(let coluna = 0; coluna < matrizInterna[linha].length; coluna++) {
                    if (matrizInterna[linha][coluna] == " "){
                        espacos++;
                    }
                }
            }
            if (espacos == 0){
                tendasRestantes = 0;
            }
        }
    }
}

function calculaCabecalho(matrizInterna,tamanho){
    const contadorColuna = [];
    const contadorLinha = [];

    for (let i = 0; i < tamanho; i++) {
        contadorColuna.push(0);
        contadorLinha.push(0);
    }
    for (let j = 0; j < tamanho; j++) {
        for (let i = 0; i < tamanho; i++) {
            if( matrizInterna[i][j] == TENDA){
                contadorColuna[j]++;
                contadorLinha[i]++;
            }
        }
    }
    return {
        linha: contadorLinha,
        coluna: contadorColuna
    }
}

function montaTabuleiro (matrizInterna,tamanho,contadorColuna,contadorLinha){

    const tabuleiro = document.getElementById("tabuleiro");
    tabuleiro.innerHTML = '';

    const divCabecalho = document.createElement('div');
    divCabecalho.classList.add('header')
    const divQuina = document.createElement('div');
    divQuina.classList.add('celula');
    divCabecalho.appendChild(divQuina);
            
    for (let j = 0; j < tamanho; j++) {                   // imprime qtdd Tenda na COlUNA
        const celulaIndicadorColuna = document.createElement('div');
        celulaIndicadorColuna.classList.add('celula');
        celulaIndicadorColuna.classList.add('numero');
        celulaIndicadorColuna.setAttribute("data-coluna" , j);
        celulaIndicadorColuna.appendChild(document.createTextNode(contadorColuna[j]))
        if (contadorColuna[j] == 0){
            celulaIndicadorColuna.classList.add('numeroClaro');
        }
        divCabecalho.appendChild(celulaIndicadorColuna);
    }
    tabuleiro.appendChild(divCabecalho);
    
    for (let i = 0; i < tamanho; i++) {                 // imprime qtdd Tenda na Linha + linhas
    
        const divLinha = document.createElement('div');
        const divIndicadorLinha = document.createElement('div');
        divLinha.classList.add('linha');
        divIndicadorLinha.classList.add('celula');
        divIndicadorLinha.classList.add('numero');
        divIndicadorLinha.setAttribute("data-linha" , i);
        divIndicadorLinha.innerText = contadorLinha[i];
        if (contadorLinha[i] == 0){
            divIndicadorLinha.classList.add('numeroClaro');
        }
        divLinha.appendChild(divIndicadorLinha);
    
        for (let j = 0; j < tamanho; j++) {
    
            const divConteudoMatriz = document.createElement('div');
            if (matrizInterna[i][j] == " " || matrizInterna[i][j] == "_" || matrizInterna[i][j] == TENDA){
                divConteudoMatriz.classList.add('vazio');
                divConteudoMatriz.classList.add('clicavel');
                divConteudoMatriz.addEventListener('click', vazioClicado, false);
            } else if (matrizInterna[i][j] == ARVORE) {
                divConteudoMatriz.classList.add('arvore');
            } 
            divConteudoMatriz.setAttribute("data-linha" , i);
            divConteudoMatriz.setAttribute("data-coluna" , j);
            divConteudoMatriz.classList.add('celula');
            divLinha.appendChild(divConteudoMatriz);
        }
    
        tabuleiro.appendChild(divLinha);
    }

    // Imprime no console 
    // console.info('   ' + contadorColuna.join('  '))
    // for(let linha = 0; linha < matrizInterna.length; linha++) {
    //     let conteudoLinha = '';
    //     const linhaInteira = matrizInterna[linha];

    //     for(let coluna = 0; coluna < linhaInteira.length; coluna++) {
    //         conteudoLinha += '['+matrizInterna[linha][coluna] + ']'
    //     }
    //     console.info(contadorLinha[linha] + ' ' + conteudoLinha)
    // }
}

function zeraTimer(){
    pauseTimer();
    segundos = 0;
    atualizaTimer();
}

function atualizaPag() {
    const inputTamanho = document.querySelector('.tamanhoTabuleiro');
    let tamanhoDigitado = inputTamanho.value;

    const matriz = inicializaMatriz(tamanhoDigitado);
    const numTendas = calMinMaxTendas(tamanhoDigitado);
    preencheMatriz(matriz, tamanhoDigitado, numTendas.min , numTendas.max);
    const contadores = calculaCabecalho(matriz,tamanhoDigitado);
    montaTabuleiro(matriz, tamanhoDigitado, contadores.coluna, contadores.linha);
    zeraTimer();
    matrizResultado = matriz ;
    document.querySelector("#ganhou").classList.add("escondido");
}
atualizaPag();

// ______________________________________________________________verifica contadores___
function confereContadorColuna(coluna){
    let tendaOriginal = 0; 
    let gramaOriginal = 0;

    for (let i = 0 ; i < matrizResultado.length ; i++){
        if (matrizResultado[i][coluna] == TENDA){
            tendaOriginal++ ;
        } else if (matrizResultado[i][coluna] == '_'){
            gramaOriginal++ ;
        }
    }
    const espacoDisp = gramaOriginal + tendaOriginal ;
    let contadorTendaPreenchida = 0;
    let contadorGramaPreenchida = 0 ; 

    const clicaveis = document.querySelectorAll(`.clicavel[data-coluna="${coluna}"]`)
    const originalCol = document.querySelector(`.numero[data-coluna="${coluna}"]`)
   
    for (let i = 0; i < clicaveis.length; i++) {
        if (clicaveis[i].classList.contains('tenda')){
            contadorTendaPreenchida++;
        } else if (clicaveis[i].classList.contains('grama')){
            contadorGramaPreenchida++;
        }
    }

    if (contadorGramaPreenchida > gramaOriginal && contadorGramaPreenchida+contadorTendaPreenchida == espacoDisp){
        originalCol.classList.add('numeroVermelho');
        originalCol.classList.remove('numeroClaro');
    }
    if (contadorGramaPreenchida+contadorTendaPreenchida < espacoDisp){
        originalCol.classList.remove('numeroVermelho');
        originalCol.classList.add('numeroClaro');
    }

    if (contadorTendaPreenchida == originalCol.innerText){
        originalCol.classList.add('numeroClaro');
        originalCol.classList.remove('numeroVermelho');
    } else if (contadorTendaPreenchida > originalCol.innerText ){
        originalCol.classList.add('numeroVermelho');
        originalCol.classList.remove('numeroClaro');
    } else if (contadorTendaPreenchida < originalCol.innerText ){
        originalCol.classList.remove('numeroClaro');
    }
}

function confereContadorLinha(linha){
   
    let tendaOriginal = 0; 
    let gramaOriginal = 0;

    for (let j = 0 ; j < matrizResultado.length ; j++){
        if (matrizResultado[linha][j] == TENDA){
            tendaOriginal++ ;
        } else if (matrizResultado[linha][j] == '_'){
            gramaOriginal++ ;
        }
    }
    const espacoDisp = gramaOriginal + tendaOriginal ;
    let contadorTendaPreenchida = 0;
    let contadorGramaPreenchida = 0 ; 
    
    const clicaveis = document.querySelectorAll(`.clicavel[data-linha="${linha}"]`)
    const originalLin = document.querySelector(`.numero[data-linha="${linha}"]`)
    
    for (let i = 0; i < clicaveis.length; i++) {
        if (clicaveis[i].classList.contains('tenda')){
            contadorTendaPreenchida++;
        } else if (clicaveis[i].classList.contains('grama')){
            contadorGramaPreenchida++;
        }
    }

    if (contadorGramaPreenchida > gramaOriginal && contadorGramaPreenchida+contadorTendaPreenchida == espacoDisp){
        originalLin.classList.add('numeroVermelho');
        originalLin.classList.remove('numeroClaro');
    }
    if (contadorGramaPreenchida+contadorTendaPreenchida < espacoDisp){
        originalLin.classList.remove('numeroVermelho');
        originalLin.classList.add('numeroClaro');
    }
   
    if (contadorTendaPreenchida == originalLin.innerText){
        originalLin.classList.add('numeroClaro');
        originalLin.classList.remove('numeroVermelho');
    } else if (contadorTendaPreenchida > originalLin.innerText ){
        originalLin.classList.add('numeroVermelho');
        originalLin.classList.remove('numeroClaro');
    } else if (contadorTendaPreenchida < originalLin.innerText ){
        originalLin.classList.remove('numeroClaro');
    }
}
// ______________________________________________________________cliques para jogar_________
function vazioClicado(event) {
    playTimer();
    const espacoClicado = event.target;
    if (espacoClicado.classList.contains('vazio')) {
        espacoClicado.classList.add('grama');
        espacoClicado.classList.remove('vazio');
    } else if (espacoClicado.classList.contains('grama')) {
        espacoClicado.classList.add('tenda');
        espacoClicado.classList.remove('grama');
    } else if (espacoClicado.classList.contains('tenda')) {
        espacoClicado.classList.add('vazio');
        espacoClicado.classList.remove('tenda');
    }
    espacoClicado.classList.remove('erroX');
    document.querySelector("#ganhou").classList.add("escondido");
    confereContadorColuna(espacoClicado.getAttribute('data-coluna'));
    confereContadorLinha(espacoClicado.getAttribute('data-linha'));
}

// ___________________________________________________________________  RESET  _________
const resetBut = document.querySelector('.reset');

function resetTabuleiro(event) { 
    pauseTimer();
    const celulasMatriz = document.getElementsByClassName("clicavel");

    for (let i = 0; i < celulasMatriz.length; i++) {            
        const celMatriz = celulasMatriz[i]    
        celMatriz.classList.add('vazio');
        celMatriz.classList.remove('grama');
        celMatriz.classList.remove('tenda');
        celMatriz.classList.remove('erroX');
    }

    const numeros = document.getElementsByClassName("numero");
    for (let i = 0; i < numeros.length; i++) { 
        const num = numeros[i]
        if (num.innerHTML == 0){
            num.classList.add('numeroClaro');
            num.classList.remove('numeroVermelho');
        } else { 
            num.classList.remove('numeroClaro');
            num.classList.remove('numeroVermelho');
        }
    }
    document.querySelector("#ganhou").classList.add("escondido");
}
resetBut.addEventListener('click', resetTabuleiro);

// ________________________________________________________________contador de tempo________
const playBut = document.querySelector('.play');
const pauseBut = document.querySelector('.pause');

function atualizaTimer(){
    const minutos = (Math.floor(segundos/60)+ '').padStart(2,0);
    const restoSegundos = ((segundos%60) + '').padStart(2,0);
    document.querySelector('.timer > p').innerText = minutos + ':' + restoSegundos;
}

function addSegundos(){
    segundos++;
    atualizaTimer();
}

function playTimer() {
    if (contando == false){
        refContagem = setInterval(addSegundos,1000);
        contando = true;
        document.querySelector('.pause').removeAttribute("disabled");
        document.querySelector('.play').setAttribute("disabled", true);

    }
}
playBut.addEventListener('click', playTimer);

function pauseTimer() {
    contando = false;
    clearInterval(refContagem);
    document.querySelector('.play').removeAttribute("disabled");
    document.querySelector('.pause').setAttribute("disabled", true);
}
pauseBut.addEventListener('click', pauseTimer);
document.querySelector('.f5Tabuleiro').addEventListener('click', atualizaPag);

// ___________________________________________________________verifica se tabuleiro esta certo___
function fimDeJogo (){
    pauseTimer();
    const celulasMatriz = document.getElementsByClassName("clicavel");
    let temErro = 0;
    let temTenda = 0;

    for (let i = 0; i < celulasMatriz.length; i++) {            
        const celMatriz = celulasMatriz[i]    
        const linha = celMatriz.getAttribute("data-linha");
        const coluna = celMatriz.getAttribute("data-coluna");

        if (celMatriz.classList.contains('tenda') && matrizResultado[linha][coluna] != TENDA) {
            celMatriz.classList.add('erroX');
            temErro++ ;
        }
        if (celMatriz.classList.contains('tenda')) {
            temTenda++ ;
        }
    }

    let tendaOriginal = 0; 
    for (let i = 0 ; i < matrizResultado.length ; i++){
      for (let j = 0 ; j < matrizResultado.length ; j++){
            if (matrizResultado[i][j] == TENDA){
                tendaOriginal++ ;
            }
        }   
    }

    const completaGrama = document.querySelectorAll(".vazio");
    if (temErro == 0 && temTenda == tendaOriginal){
        for (let i = 0; i < completaGrama.length; i++) {    
            completaGrama[i].classList.add('grama');
            completaGrama[i].classList.remove('vazio');
        }
    }     

    const numeros = document.querySelectorAll(".numero:not(.numeroClaro)");
    const erro = document.querySelectorAll(".erroX");
    if (numeros.length == 0 && erro.length == 0){
        document.querySelector("#ganhou").classList.remove("escondido");
    }
}
document.querySelector('.resultado').addEventListener('click', fimDeJogo);