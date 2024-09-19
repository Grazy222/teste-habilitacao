function verificarTeste() {
    // Exibir um alerta informando que o teste deve ser feito
    let confirmacao = confirm("Você precisa fazer o teste primeiro, vá para 'Consultas' no menu.");

    // Se o usuário clicar em "OK", redirecioná-lo para a página de testes
    if (confirmacao) {
        window.location.href = "/consulta.html"; // Substitua pelo link correto da página de Consultas
    }
}
function mostrarFormulario() { // Obtém o elemento do formulário
    const formulario = document.getElementById("formulario");
    // Exibe o formulário
    formulario.style.display = 'block';

    // Cria o conteúdo do formulário
    formulario.innerHTML = `
    <form>
        <label for="nome">Nome</label>
        <input type="text" id="nome" name="nome" required>
            <label for="dataNascimento">Data de Nascimento:</label>
            <input type="date" id="dataNascimento" name="dataNascimento" required>   

            <button type="submit">Agendar</button>
    </form>
`;



}

// Função para enviar o formulário 
function enviarFormulario() {
    // Lógica para enviar os dados do formulário para um servidor ou realizar outra ação
    // ...
}



// Função para validar o formulário

function validarFormulario() {
    let idade = document.getElementById('idade').value;
    let escolaridade = document.getElementById('escolaridade').value;
    let rg = document.getElementById('rg').value;
    let cpf = document.getElementById('cpf').value;

    let isvalid = true;


    //Validação de Idade

    if (idade < 1 || idade > 120 || idade === '') {
        document.getElementById('erro-idade').innerText = "Por favor, insira uma idade válida.";
        isvalid = false;
    } else {
        document.getElementById('erro=idade').innerText = "";
    }

    //Validação de Escolaridade

    if (escolaridade === "") {
        document.getElementById('erro-escolaridade').innerText = "Por favor,selecione sua escolaridade";
        isvalid = false;
    } else {
        document.getElementById('erro-escolaridade').innerText = "";
    }

    //Validação de Rg (mínina 9 digitos)
    let rgRegex = /^\d{9,12}$/;
    if (!rgRegex.test(rg)) {
        document.getElementById('erro-rg').innerText = "Por favor, insira um RG válido (somente números, 9 a 12 dígitos).";
        isvalid = false;
    } else {
        document.getElementById('erro-rg').innerText = "";
    }
    // Validação de CPF
    let cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    if (!cpfRegex.test(cpf)) {
        document.getElementById('erro-cpf').innerText = "Por favor, insira um CPF válido no formato xxx.xxx.xxx-xx.";
        isvalid = false;
    } else {
        document.getElementById('erro-cpf').innerText = "";
    }

    return isvalid;

}

// pagina de consultas

const perguntas = [
    {
        pergunta: "Qual é a idade mínima para obter a habilitação?",
        opcoes: ["16 anos", "18 anos", "20 anos", "21 anos"],
        respostaCorreta: "18 anos"
    },
    {
        pergunta: "Você precisa saber ler e escrever para tirar habilitação?",
        opcoes: ["Sim", "Não"],
        respostaCorreta: "Sim"
    },
    {
        pergunta: "Quais documentos são necessários para tirar habilitação?",
        opcoes: ["RG e CPF", "Passaporte", "Certidão de Nascimento"],
        respostaCorreta: "RG e CPF"
    },
    {
        pergunta: "Você precisa estar em boas condições de saúde mental e física?",
        opcoes: ["Sim", "Não"],
        respostaCorreta: "Sim"
    }
    // {
    //     pergunta: "Qual a velocidade máxima permitida em vias urbanas?",
    //     opcoes: ["50 km/h", "60 km/h", "70 km/h"],
    //     respostasCorreta: "60 Km/h"
    // }
];

let perguntasAtual = 0;
let pontuacao = 0;
let tentativas = 0;

// Carregar a pegunta atual

function carregarPergunta() {
    const perguntaObj = perguntas[perguntasAtual];
    document.getElementById('quiz-question').textContent = perguntaObj.pergunta;
    const quizOptions = document.getElementById('quiz-options');
    quizOptions.innerHTML = '';

    perguntaObj.opcoes.forEach(opcao => {
        const li = document.createElement('li');
        li.innerHTML = `
        <input type="radio" name="resposta" value="${opcao}">${opcao}`;
        quizOptions.appendChild(li);
    });

    document.getElementById('quiz-message').textContent = '';
}

// Verificar a resposta

function verificarResposta() {
    const opcoes = document.getElementsByName('resposta')
    let respostaSelecionada;

    for (const opcao of opcoes) {
        if (opcao.checked) {
            respostaSelecionada = opcao.value;
            break;
        }
    }

    if (!respostaSelecionada) {
        alert("Por favor, selecione uma resposta!");
        return;
    }

    const respostaCorreta = perguntas[perguntasAtual].respostaCorreta;
    const mensagem = document.getElementById("quiz-message");

    if (respostaSelecionada === respostaCorreta) {
        pontuacao++;
        mensagem.className = 'success';
        mensagem.textContent = 'Correto!';
    } else {
        mensagem.className = 'error';
        mensagem.textContent = `Errado! A resposta correta é : ${respostaCorreta}`;
    }

    //Proxima Pergunta

    perguntasAtual++;

    if (perguntasAtual < perguntas.length) {
        document.getElementById("next-question").textContent = "Próxima Pergunta";
        setTimeout(carregarPergunta, 1000);
    } else {
        mostrarResultado();
    }
}

// Exibir o resultado final

function mostrarResultado() {
    const quizContainer = document.getElementById("quiz-container");
    const mensagemFinal = document.getElementById("quiz-message");
    quizContainer.style.display = 'none';

    if (pontuacao === perguntas.length) {
        mensagemFinal.className = 'success';
        mensagemFinal.textContent = "Parabén! Você passou no teste e pode agendar sua habilitação";
    } else {
        mensagemFinal.className = 'error';
        mensagemFinal.textContent = ` Você acertou ${pontuacao} de ${perguntas.length} perguntas. Refaça o teste com atenção!`;
    }
    document.getElementById('restart-quiz').style.display = 'flex';
}

// Reiniciar o quiz

function reiniciarQuiz() {
    perguntasAtual = 0;
    potuacao = 0;
    document.getElementById('quiz-container').style.display = 'block';
    DocumentType.getElementById('restart-quiz').style.display = 'none';
    carregarPergunta();
}

//Inicializar o quiz

window.onload = carregarPergunta;

function finalizarTeste() {
    // Verifica se o teste foi completado com sucesso
    let testeCompletado = true; // Isso deve ser substituído por uma lógica real de verificação do teste

    if (testeCompletado) {
        alert("Parabéns, você completou o teste! Agora pode agendar a habilitação.");
        window.location.href = "./index.html"; // Substitua pelo link correto da página de agendamento
    } else {
        alert("Por favor, complete o teste antes de continuar.");
    }
}
















