
const meuTitulo = document.getElementById('titulo');
const botao = document.getElementById('btn')

botao.addEventListener('click', ()=>{
    let aluno = prompt("informe o nome do aluno: ");
    if (!aluno){
        return alert("É preciso informar o nome do aluno para calcular")
    }

    let somaNotas = 0;
    let somaPesos = 0;
    let nota = 0;
    let peso = 0;
    let media = 0;

    while (confirm("Deseja lançar uma nota?")){
        nota = Number(prompt('informe a nota!'));
        peso = Number(prompt('informe o peso!'));
        somaNotas += nota * peso;
        somaPesos += peso; 

    }
    if (somaPesos > 0){
        media = somaNotas / somaPesos
        alert(`A media do aluno ${aluno} foi de ${media.toFixed(2)}`)
    }else{
        alert ("Nenhuma nota informada");
    }
})