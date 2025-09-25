// =====================
// ELEMENTOS DO MODAL
// =====================
let abrirModal = document.querySelector('#button-add')
let modal = document.querySelector('.modal')
let fecharModal = document.querySelector('.close-button')

const inputNome = document.getElementById('nome')
const inputCpf = document.getElementById('cpf')
const inputTelefone = document.getElementById('telefone')
const inputCarro = document.getElementById('veiculo')
const inputTempo = document.getElementById('tempo')
const botaoSalvar = document.getElementById('salvar')
const salvarEdit = document.getElementById('salvarEdit')

// =====================
// ABRIR / FECHAR MODAL
// =====================
abrirModal.addEventListener('click', () => {
    modal.classList.add('active')
    // Limpa inputs
    inputNome.value = ''
    inputCpf.value = ''
    inputTelefone.value = ''
    inputCarro.value = ''
    inputTempo.value = ''
    
    botaoSalvar.style.display = 'inline-block'
    salvarEdit.style.display = 'none'
})

fecharModal.addEventListener('click', () => modal.classList.remove('active'))

window.addEventListener('click', (evento) => {
    if(evento.target === modal)
        modal.classList.remove('active')
})

// =====================
// FUNÇÃO CRIAR CARD
// =====================
function criarCard(cliente) {
    const container = document.getElementById('card-container')

    const card = document.createElement('div')
    card.classList.add('card')
    card.dataset.id = cliente.id

    // Avatar
    const avatarDiv = document.createElement('div')
    avatarDiv.classList.add('avatar')
    const img = document.createElement('img')
    img.src = '/imgs/avatar.png'
    avatarDiv.appendChild(img)

    // Infos
    const infos = document.createElement('div')
    infos.classList.add('infos-clientes')
    infos.innerHTML = `
        <p>CONDUTOR: ${cliente.nome}</p>
        <p>CPF: ${cliente.cpf}</p>
        <p>CONTATO: ${cliente.telefone}</p>
        <p>VEÍCULO: ${cliente.carro}</p>
        <p>TEMPO: ${cliente.tempo_locacao}</p>
    `

    // Botão Editar
    const btnEditar = document.createElement('button')
    btnEditar.textContent = 'Editar'
    btnEditar.classList.add('edit-button')

    btnEditar.addEventListener('click', () => {
        modal.classList.add('active')

        inputNome.value = cliente.nome
        inputCpf.value = cliente.cpf
        inputTelefone.value = cliente.telefone
        inputCarro.value = cliente.carro
        inputTempo.value = cliente.tempo_locacao

        modal.dataset.editingId = cliente.id

        botaoSalvar.style.display = 'none'
        salvarEdit.style.display = 'inline-block'
    })

    // Botão Remover
    const btnRemover = document.createElement('button')
    btnRemover.textContent = 'Remover'
    btnRemover.classList.add('delete-button')

    btnRemover.addEventListener('click', () => {
        if (!confirm(`Tem certeza que deseja remover ${cliente.nome}?`)) return

        fetch(`/api/clientes/${cliente.id}`, {
        method: 'DELETE'
        })
        .then(resp => {
        if (resp.status === 204) {
            card.remove() // tira o card da tela
        } else {
            alert('Erro ao remover cliente')
        }
        })
        .catch(err => {
        console.error(err)
        alert('Erro ao remover cliente')
    })
})

    // Adiciona elementos no card
    card.appendChild(avatarDiv)
    card.appendChild(infos)
    card.appendChild(btnEditar)
    card.appendChild(btnEditar)
    card.appendChild(btnRemover)
    container.appendChild(card)
}

// =====================
// EVENTO BOTÃO ADICIONAR CLIENTE
// =====================
botaoSalvar.addEventListener('click', (e) => {
    e.preventDefault()

    const dados = {
        nome: inputNome.value,
        cpf: inputCpf.value,
        telefone: inputTelefone.value,
        carro: inputCarro.value,
        tempo_locacao: inputTempo.value
    }

    fetch('/api/clientes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    })
    .then(resp => {
        if (resp.status !== 201 && resp.status !== 200) throw new Error('Erro ao adicionar')
        return resp.json()
    })
    .then(clienteCriado => {
        criarCard(clienteCriado)
        modal.classList.remove('active')
    })
    .catch(err => {
        console.error(err)
        alert('Erro ao adicionar cliente')
    })
})

// =====================
// EVENTO BOTÃO SALVAR EDIÇÃO
// =====================
salvarEdit.addEventListener('click', (e) => {
    e.preventDefault()

    const id = modal.dataset.editingId

    const dadosAtualizados = {
        nome: inputNome.value,
        cpf: inputCpf.value,
        telefone: inputTelefone.value,
        carro: inputCarro.value,
        tempo_locacao: inputTempo.value
    }

    fetch(`/api/clientes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosAtualizados)
    })
    .then(resp => resp.json())
    .then(clienteAtualizado => {
        const card = document.querySelector(`.card[data-id="${id}"]`)
        card.querySelector('.infos-clientes').innerHTML = `
            <p>CONDUTOR: ${clienteAtualizado.nome}</p>
            <p>CPF: ${clienteAtualizado.cpf}</p>
            <p>CONTATO: ${clienteAtualizado.telefone}</p>
            <p>VEÍCULO: ${clienteAtualizado.carro}</p>
            <p>TEMPO: ${clienteAtualizado.tempo_locacao}</p>
        `

        modal.classList.remove('active')
        delete modal.dataset.editingId

        botaoSalvar.style.display = 'inline-block'
        salvarEdit.style.display = 'none'
    })
})

// =====================
// CARREGAMENTO INICIAL
// =====================
window.addEventListener('DOMContentLoaded', () => {
    fetch('/api/clientes')
    .then(resp => resp.json())
    .then(clientes => clientes.forEach(c => criarCard(c)))
    .catch(err => console.error('Erro ao carregar clientes'))
})