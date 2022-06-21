const formulario = document.getElementById('formulario');
const cadastros = document.getElementById('cadastro')



popularTabelaAoCarrregarPagina();

formulario.addEventListener('submit',(evento) => {
    evento.preventDefault();


    let endereco = $('#formulario').serializeArray();
    let endereco2 = arrayToObject(endereco);

    adicionarProdutoNaTabela(endereco2);

    let produtos = JSON.parse(localStorage.getItem('endereco')) || []

    
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
        </tr>    
    `;
    cadastros.appendChild(tr)


}



function popularTabelaAoCarrregarPagina(){
    let produtosDoLocalStorage = JSON.parse(localStorage.getItem('endereco'))|| [];
    produtosDoLocalStorage.forEach(endereco =>{
        endereco = JSON.parse(endereco);
        adicionarProdutoNaTabela(endereco);
    })

}