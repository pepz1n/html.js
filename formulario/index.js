const formulario = document.getElementById('formulario');
const cadastros = document.getElementById('cadastroTabela')



popularTabelaAoCarregarPagina();
adicionarEventosDosBotoesDeExclusao();

formulario.addEventListener('submit',(evento) => {
    evento.preventDefault();


    let endereco = $('#formulario').serializeArray();
    let endereco2 = arrayToObject(endereco);

    

    let produtos = JSON.parse(localStorage.getItem('endereco')) || []
    
    
    let produtosDuplicados = produtos
        .map(produtos => (JSON.parse(produtos)).cep)
        .includes(endereco2.cep);

    if(produtosDuplicados){
        alert(`Já existe um CEP cadastrado, não e possivel continuar!!`);
        return
    }
    
    adicionarProdutoNaTabela(endereco2);
    adicionarEventosDosBotoesDeExclusao();

    
    produtos.push(JSON.stringify(endereco2))
    
    
    
    
    localStorage.setItem('endereco', JSON.stringify(produtos))



})    
    // o parametro 'array' deve ser gerado a partir de funcao
    // .serializeArray() do jQuery para funcionar corretamente
function arrayToObject(array){
    let object = {};
    array.forEach(campo => {
        object[campo.name] = campo.value;
    });
    return object
}

function adicionarProdutoNaTabela(endereco3){
    //cria um novo elemnto tr e atribui para a variavel tr
    let tr = document.createElement('tr');
    tr.innerHTML = `
        <tr>
            <td>${endereco3.nome}</td>
            <td>${endereco3.bairro}</td>
            <td>${endereco3.rua}</td>
            <td>${endereco3.numero}</td>
            <td>${endereco3.cep}</td>
            <td>${endereco3.estado}</td> 
            <td>
                <button class="btn btn-outline-danger exclusao" data-produto="${endereco3.cep}">
                    Excluir
                </button> 
            </td>           
        </tr>    
    `;
    cadastros.appendChild(tr)


}



function popularTabelaAoCarregarPagina(){
    let produtosDoLocalStorage = JSON.parse(localStorage.getItem('endereco'))|| [];
    produtosDoLocalStorage.forEach(endereco =>{
        endereco = JSON.parse(endereco);
        adicionarProdutoNaTabela(endereco);
    })

}


function adicionarEventosDosBotoesDeExclusao(){

    $('.exclusao').toArray().forEach(botaoExclusao => {
        botaoExclusao.removeEventListener('click', (evento) => excluirRegistro(evento))

    })


    $('.exclusao').toArray().forEach(botaoExclusao => {
        botaoExclusao.addEventListener('click', (evento) => excluirRegistro(evento))
    })


}

function excluirRegistro(evento) {
    console.log(evento);
    let cepParaExcluir = evento.target.dataset.endereco2;
    if(confirm(`Deseja excluir o produto ${cepParaExcluir}`)){
        let enderecos = JSON.parse(localStorage.getItem('endereco')) || [];
       
       
        //percorremos o array de produtos cadastrados e transformamos
        //cada produto em um objeto (JSON.parse()) por que a gente precisa
        //acessar as propriedades do produto. sem o JSON.parse() o produto seria
        //uma string.



        enderecos = enderecos.map(A => JSON.parse(A))

        let index = enderecos.findindex(enderecos => enderecos.cep == cepParaExcluir)

        enderecos.splice(index, 1);

        enderecos = enderecos.map(endereco3 => JSON.stringify(endereco3));
        localStorage.setItem('endereco', JSON.stringify(enderecos));
        document.location.reload(true);

    }
}