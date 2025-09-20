//aqui vamos juntar lista car e detalhes. depois vamos jogar pra tela

// ====== GERANDO LINKS ======

let botao = document.querySelectorAll(".button-cars") //peguei todos os elementos <a class="button-cars"> e por ser querySelectorAll, me devolveu NodeList


//usei forEach pra navegar pela NodeList
botao.forEach(botao => { //botao, variavel temporaria na function que recebe cada <a>

    //aqui seria tipo um "botao, me fala o valor do atributo data-id que ta no HTML" se la estiver data-id "uno2005", idCarro recebera "uno2005"
    let idCarro = botao.getAttribute('data-id')

    //template string. sem muito o que falar
    let novaUrl = `../public.aluguel/index.html?id=${idCarro}`

    //aqui cria ou substitui o atributo href no botao. Se o <a> estava sem link, passa a ter
    botao.setAttribute('href', novaUrl)
})

// ====== PEGANDO O ID DA URL ======

//pega os parametros da URL atual
//se a URl for index.html?id=uno2005 o parametro sera do ? em diante
let params = new URLSearchParams(window.location.search)

//aqui a variavel guarda o valor do id do parametro (no caso sera o uno2005)
let idUrl = params.get("id")

//acharCarro recebe o resultado da busca exatamente igual ao id lido no URL (busca no mini banco de dados)
let acharCarro = detalhes.find(buscar => buscar.id === idUrl)

// ====== ATUALIZANDO A TELA ======

//nomeCarro recebe todos os elementos com a class .nomeCarro (no caso h1)
let nomeCarro = document.querySelectorAll(".nomeCarro")

//forEach pra percorrer o NodeList
nomeCarro.forEach(elemento => {

    //alterar o texto do h1 (elemento puxado pelo selctorAll) e colocar a string que esta no mini banco de dados na parte de modelo
    elemento.textContent = acharCarro.modelo
})

// imagemCarro recebeu o elemento img (src) e troquei o caminho que estava o src para o outro caminho que estava guardado no mini banco de dados (caminho da foto)
let imagemCarro = document.querySelector("#imagemCarro")
imagemCarro.setAttribute('src', acharCarro.img)

let descricaoCarro = document.querySelector("#descricao")
descricaoCarro.textContent = acharCarro.descricao

let precoCarro = document.querySelector("#preco")
precoCarro.textContent = acharCarro.preco

// ====== MENSAGEM PRONTA ======
let wppCarro = document.querySelector("#wppCarro")
let mensagem = `Olá! Me interessei pelo ${acharCarro.modelo}. Poderia me passar mais informações?`
let numero = "5512988372717"
let urlFinal = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`
wppCarro.setAttribute("href", urlFinal)
//=============================

let forcaCarro = document.querySelector("#forcaCarro")
forcaCarro.textContent = acharCarro.forca

let anoCarro = document.querySelector("#ano")
anoCarro.textContent = acharCarro.ano

let corCarro = document.querySelector("#cor")
corCarro.textContent = acharCarro.cor

let combustivelCarro = document.querySelector("#combustivel")
combustivelCarro.textContent = acharCarro.combustivel

let cambioCarro = document.querySelector("#cambio")
cambioCarro.textContent = acharCarro.cambio

let portasCarro = document.querySelector("#portas")
portasCarro.textContent = acharCarro.portas