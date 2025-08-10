const fs = require('fs');

const comando = process.argv[2];
const argumento = process.argv[3];


if (comando === 'add') {
    if (!argumento) {
        console.log('Erro, você precisa fornecer a descrição da tarefa para adicionar ela.');
        process.exit(0)
    }

    if (!fs.existsSync('tarefas.json')) {
        fs.writeFileSync('tarefas.json', '[]');
    } 

    let tarefas = [];

    const dados = fs.readFileSync('tarefas.json', 'utf-8');
    tarefas = JSON.parse(dados);

    const novaTarefa = {
        id: tarefas.length + 1,
        descricao: argumento,
        concluida: false
    };

    tarefas.push(novaTarefa);

    fs.writeFileSync('tarefas.json', JSON.stringify(tarefas, null, 2));

    console.log('Tarefa Adicionada.');

} else if (comando === 'list') {
    if (!fs.existsSync('tarefas.json')) {
        console.log('Sem tarefas no momento.');
        process.exit(0);
    }

    const tarefas_list = fs.readFileSync('tarefas.json', 'utf-8');
    const tarefas = JSON.parse(tarefas_list);

    tarefas.forEach(tarefa => {
        console.log(`${tarefa.id} - ${tarefa.descricao} [${tarefa.concluida ? '✔ Concluida' : 'X Pendente'}]`)
    });

} else if(comando === 'done') {
    if (!argumento) {
        console.log('Erro, você precisa fornecer o ID da tarefa para marcar como concluida.')
        process.exit(0);
    }

    if(!fs.existsSync('tarefas.json')) {
        console.log('Não existe nenhuma tarefa no momento.');
        process.exit(0);
    }

    const tarefas_list = fs.readFileSync('tarefas.json', 'utf-8');
    const tarefas = JSON.parse(tarefas_list);

    const id = parseInt(argumento);
    const tarefa = tarefas.find(t => t.id === id);

    if (!tarefa) {
        console.log('Tarefa não encontrada.');
        process.exit(0);
    }

    tarefa.concluida = true;

    fs.writeFileSync('tarefas.json', JSON.stringify(tarefas, null, 2));
    console.log(`tarefa ${id} marcada como concluida.`);

} else {
    console.log('Comando não reconhecido. Use add, list, done.');
}