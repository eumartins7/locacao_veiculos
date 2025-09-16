//aqui vamos juntar lista car e detalhes. depois vamos jogar pra tela

let botao = document.querySelectorAll(".button-cars") //peguei todos os elementos <a class="button-cars"> e por ser querySelectorAll, me devolveu NodeList


//usei forEach pra navegar pela NodeList
botao.forEach(botao => { //botao, variavel temporaria na function

    //aqui seria tipo um "botao, me fala o valor do atributo data-id que ta no HTML" se la estiver data-id "uno2005", idCarro recebera "uno2005"
    let idCarro = botao.getAttribute('data-id')

    //template string. sem muito o que falar
    let novaUrl = `../page.aluguel/index.html?id=${idCarro}`

    //aqui cria ou substitui o atributo href no botao. Se o <a> estava sem link, passa a ter
    botao.setAttribute('href', novaUrl)
})

