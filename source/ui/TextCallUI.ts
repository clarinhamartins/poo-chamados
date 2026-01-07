import { ICallController } from "../funcionalidade/iCallController";
import { ICallUI } from "./iCallUI";

/**
 * Interface de usuário textual (prompt/alert) para interação com o sistema de chamados.
 * Permite abrir chamados, listar e marcar como concluídos via menu simples.
 */
export class TextCallUI implements ICallUI{
    
    callController : ICallController;

    /**
     * Inicializa a UI com um controlador de chamados.
     * @param callController instância responsável pelas regras de negócio
     */
    constructor(callController:ICallController){
        this.callController = callController;
    }

    /**
     * Inicia o loop de interação com o usuário via prompt.
     * Opções: 1) Cadastrar, 2) Listar, 3) Marcar como concluído, 0) Sair.
     * Observação: As opções de listagem e marcação podem ser expandidas pelos alunos.
     */
    start(): void {
        let op = 1;
        while(op!=0){
            op = Number(prompt(
    "Escolha uma opção:\n1 - Cadastrar\n2 - Listar\n3 - Marcar como concluído\n0 - Sair"));
            switch(op){
                case 1:
                    let nome : string = prompt('Digite seu nome')!;
                    let descricao : string = prompt('Digite a descrição do problema')!;
                    let deuCerto : boolean = this.callController.abrirChamado(nome,descricao);
                    if(deuCerto){
                        alert('Chamado cadastrado');
                    }else{
                        alert('Não foi possível cadastrar o chamado');
                    }
                    break;


                case 2:
    const lista = this.callController.listarChamado();

    if(lista.length === 0){
        alert("Nenhum chamado cadastrado ainda.");
    } else{
        let mensagem = "Lista de Chamados:\n\n";

        lista.forEach((c, index) => {
            mensagem += `${index} - Solicitante: ${c.solicitante}\n`;
            mensagem += `Problema: ${c.descricao}\n`;
            mensagem += `Status: ${c.status ? "RESOLVIDO" : "ABERTO"}\n\n`;
        });

        alert(mensagem);
    }
    break;

                case 3:
    const chamados = this.callController.listarChamado();

    if(chamados.length === 0){
        alert("Não existem chamados para concluir.");
        break;
    }

    let indice = Number(prompt("Digite o número do chamado que deseja concluir:"));

    if(isNaN(indice) || indice < 0 || indice >= chamados.length){
        alert("Índice inválido!");
        break;
    }

    const selecionado = chamados[indice];
    const concluido = this.callController.marcarComoAtendido(selecionado);

    if(concluido){
        alert("Chamado marcado como concluído com sucesso!");
    } else {
        alert("Não foi possível concluir o chamado.");
    }
    break;

                case 0:
                    break;
                default:
                    alert('Opcao Inválida');
            }
        }
    }

}
