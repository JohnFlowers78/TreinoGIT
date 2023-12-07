Chat, em outra conversa que estavamos tento até agora a pouco, vimos a classe .ts de um componente Angular em node.js que é responsável pelo cadastramento de novos produtos.

Você me explicou detalhadamente e eu tirei todas as minhas dúvidas a respeito de cada detalhe da classe com vc e é isso que vamos fazer agora:

vou começar passando para você as classes do componente "Alterar-Produto":

.html:

<mat-card>
  <mat-card-header>
    <mat-card-title>Alterar Produto</mat-card-title>
    <mat-card-subtitle>&nbsp;</mat-card-subtitle>
  </mat-card-header>
  <mat-card-content>
    <mat-form-field class="input" id="id">
      <mat-label>Id do Filme</mat-label>
      <input placeholder="Ex. Bolacha" matInput type="text" [(ngModel)]="produtoId" disabled="true" />
    </mat-form-field>
    <mat-form-field class="input" id="nome">
      <mat-label>Nome</mat-label>
      <input placeholder="Ex. Bolacha" matInput type="text" [(ngModel)]="nome" />
    </mat-form-field>
    <mat-form-field class="input" id="descricao">
      <mat-label>Descrição</mat-label>
      <input placeholder="Ex. Doce" matInput type="text" [(ngModel)]="descricao" />
    </mat-form-field>
    <mat-form-field class="input" id="quantidade">
      <mat-label>Quantidade</mat-label>
      <input placeholder="Ex. 1500" matInput type="text" [(ngModel)]="quantidade" />
    </mat-form-field>
    <mat-form-field class="input" id="preco">
      <mat-label>Preço</mat-label>
      <span matPrefix>R$ &nbsp;</span>
      <input placeholder="Ex. R$ 15,00" matInput type="text" [(ngModel)]="preco" />
    </mat-form-field>
    <mat-form-field class="input" id="categoria">
      <mat-label>Categoria</mat-label>
      <mat-select [(ngModel)]="categoriaId">
        <mat-option *ngFor="let c of categorias" [value]="c.categoriaId">
          {{ c.nome }}
        </mat-option>
      </mat-select>
    </mat-form-field>
  </mat-card-content>
  <mat-card-actions>
    <button color="warn" mat-stroked-button (click)="alterar()">Alterar</button>
  </mat-card-actions>
</mat-card>



.ts:


import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { Categoria } from "src/app/models/categoria.models";
import { Produto } from "src/app/models/produto.models";

@Component({
  selector: "app-alterar-produto",
  templateUrl: "./alterar-produto.component.html",
  styleUrls: ["./alterar-produto.component.css"],
})
export class AlterarProdutoComponent {
  produtoId: number = 0;
  nome: string = "";
  descricao: string = "";
  preco: number | null = null;
  quantidade: number | null = null;
  categoriaId: number = 0;
  categorias: Categoria[] = [];

  constructor(
    private client: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (parametros) => {
        let { id } = parametros;
        this.client.get<Produto>(`https://localhost:7083/api/produto/buscar/${id}`).subscribe({
          next: (produto) => {
            this.client.get<Categoria[]>("https://localhost:7083/api/categoria/listar").subscribe({
              next: (categorias) => {
                this.categorias = categorias;

                this.produtoId = produto.produtoId!;
                this.nome = produto.nome;
                this.descricao = produto.descricao;
                this.quantidade = produto.quantidade;
                this.preco = produto.preco;
                this.categoriaId = produto.categoriaId;
              },
              error: (erro) => {
                console.log(erro);
              },
            });
          },
          error: (erro) => {
            console.log(erro);
          },
        });
      },
    });
  }

  alterar(): void {
    let produto: Produto = {
      nome: this.nome,
      descricao: this.descricao,
      preco: this.preco!,
      quantidade: this.quantidade!,
      categoriaId: this.categoriaId,
    };

    console.log(produto);

    this.client.put<Produto>(`https://localhost:7083/api/produto/alterar/${this.produtoId}`, produto).subscribe({
      next: (produto) => {
        this.snackBar.open("Produto alterado com sucesso!!", "E-commerce", {
          duration: 1500,
          horizontalPosition: "right",
          verticalPosition: "top",
        });
        this.router.navigate(["pages/produto/listar"]);
      },
      error: (erro) => {
        console.log(erro);
      },
    });
  }
}




EU não sei se você tem acesso a saber de coisas que conversamos em outras conversas, mas como eu ja estudei  risca o "cadastrar-produto.component.ts" e o "listar-produto.component.ts", eu ja tenho uma grande noção do que é muita coisa e do que são muitas estruturas na classe, então dessa vez será muito mais rápido e fácil de chegarmos a uma conclusão e uma explicação final!

Caso você consiga utilizar como base o que ja conversamos agora a pouco em outras conversas para utilizarmos de base e referência para novas explicações nesta conversa aqui, as conversas que tivemos foram a "Angular Cadastrar.ts Component" e a "Angular Listar.ts Component"!

já falamos sobre os imports, já falamos sobre o decorator @Component, já falamos sobre iniciar as variáveis vazias e já falamos sobre os constructors. Acredito que o que muda de componente para componente seja realmente os métodos ngOnInit e o método que a classe necessita, que neste caso seria o próprio alterar( ), Além é claro do que cada classe .html dos componentes requisita, mas ainda não estamos falando sobre o .html própriamente em si e sim da classe .ts do componente.

Em primeiro lugar, percebi que aqui em Alterar.ts iniciamos um atributo que antes não inciamos la em Cadastrar.ts, o "produtoId", nós o iniciamos com o valor 0 também, mas acredito que isso se dá apenas para o start inicial dessa variável mesmo, afinal ela será recebida como parâmetro la da classe .html do componente, e la em html, este campo encontra-se como "[(ngModel)]="produtoId" disabled="true""!         Ou seja, ele só existe para fins de trabalho e seleção de um componente específico.       Também percebi que o idCategoria também foi iniciado, para que ele é utilizado aqui ou em .html se nós vamos selecionar a tegoria por meio do nome na caixa de opções? isso também não estava no cadastrar.html nem .ts!

Outro ponto que temos de diferente já logo de cara é a presença da injeção de uma dependência que eu não havia visto antes em outros componentes que seria o ActivatedRoute, definido nos constructors como uma variável privada de nome "route".

Essa variável, essa dependência, já é utilizada logo em seguida pelo método ngOnInit. Neste método podemos ver que quando chamamos esta dependência com "this.route.params.subscribe" e que ele possuí um tratamento de CallBack, mas apenas o next, diferente das 2 requisições, o que já é algo novo que eu não sabia. Outra coisa nova é a utilização de 2 requisições seguidas num mesmo método, além é claro da dependencia do route, acho que podemos considerar 3 então certo? ou o "this.route.params" está apenas requisitando algo da classe .html e não se considera como uma requisição em si?

Aqui começam já minhas maiores dúvidas sobre o assunto:

porque depois de "this.route" temos um ".params"? a utilização do ".subscribe" aqui indica uma espera assíncrona também? então essa é uma requisição ao database? ou é uma requisição/espera da classe .html? pois em minha cabeça a lógica é que ele está esperando o cliente clicar no botão de alterar presente na classe .html do componente Listar, observe:

      <ng-container matColumnDef="alterar">
        <th mat-header-cell *matHeaderCellDef>Alterar</th>
        <td mat-cell *matCellDef="let produto">
          <a
            color="accent"
            mat-stroked-button
            routerLink="/pages/produto/alterar/{{ produto.produtoId }}"
          >
            Alterar
          </a>
        </td>
      </ng-container>

no "next" da requisição "this.route.params.subscribe" temos um parâmetro chamado "parâmetros", o que para mim indica que a response recem chegada da requisição será um parâmetro, certo?    e como logo na linha de baixo estamos declarando uma nova variável chamada "id", credito que este parâmet que chega, seja exatamente o id do produto do qual queremos alterar, certo?   por que na hora de declarar essa variável que ja vai receber o valor de "parametros" nós a colocamos entre chaves? ex: { id }? por que o nome dado ao parâmetro no "next" está no plural (parametros) se ele é apenas 1 id de 1 produto? que tipo de response retornará dessa requisição afinal? não temos requisição http nesta requisição então não consigo saber muito bem qual será o tipo de requisição.

Após ja termos feito as requisições de busca de produto por {id}, que retornará o produto em si e a requisição do Array de categorias ao banco de dados para que possamos ter todas as categorias necessárias que o cliente vai precisar em "<mat-option *ngFor="let c of categorias [value]="c.categoriaId">  {{ c.nome }}  </mat-option>",  nós atribuímos os valores recém chegados das responses às variáveis locais, mas a grande dúvida que não quer calar aqui é, por que diferente do que vemos em cadastrar.ts, aqui nós não convertemos os tipos de variáveis dos atributos quantidade para Number.parseInt(this.quantidade) e nem o preco para Number.parseFloat(this.preco)?  e detalhe que isso não acontece nem em ngOnInit e nem no método "alterar( )", nós apenas recebemos os valores das requisições e os passamos para o das variáveis locais, e la em baixo em alterar, nós apenas recebemos os valores da classe html e os atribuímos aos atributos de "produto" recém criado!

Talvez isso aconteça pelo fato de que são objetos que já existiam e nós apenas estamos alterando seus valores com uma requisição do tipo .put, seria isso? fica aqui em baixo um trecho da classe cadastrar.ts para você ver como foi feito e me explicar:

  cadastrar(): void {
    let produto: Produto = {
      nome: this.nome,
      descricao: this.descricao,
      preco: Number.parseFloat(this.preco),
      quantidade: Number.parseInt(this.quantidade),
      categoriaId: this.categoriaId,
    };

    this.client
      .post<Produto>("https://localhost:7083/api/produto/cadastrar", produto)
      .subscribe({
        //Se a requição funcionou retorna:
        next: (produto) => {
          this.snackBar.open("Produto cadastrado com sucesso!!", "E-commerce", {
            duration: 1500,
            horizontalPosition: "right",
            verticalPosition: "top",
          });
          this.router.navigate(["pages/produto/listar"]);
        },
        //Se a requição não funcionou retorna:
        error: (erro) => {
          console.log(erro);
        },
      });
  }
}















entendi, então o plural (parametros) no nome dado ao parametro de next do "this.route.params" é porque o parâmetro que chega pela url é o objeto inteiro? então utilizamos "let { id } = parametros;" para dizer que tudo que vamos precisar será apenas o atributo id desses parâmetros? mas então porque la na classe .html de ListarProdutoComponent, estamos passando apenas o idProduto como parâmetro ao método listar (routerLink="/pages/produto/alterar/{{ produto.produtoId }}")?



Percebi que em ngOnInit, na linha de código "this.produtoId = produto.produtoId!;" o produtoId recém chegado da requisição de busca possuí um "!" assim como la em alterar( ), as linhas de código "preco: this.preco!,"      e    "quantidade: this.quantidade!," também tem esse "!" isso tem alguma coisa relacionada com aquele fator que eu disse que diferente de em cadastrar.ts, aqui não convertemos os tipos de variável com parseInt e parseFloat para esses atributos? talvez por que eles ja foram definidos na hora do cadastro?

afinal la em cadastrar as variáveis vazias foram todas definidas como string:

export class CadastrarProdutoComponent {
  nome: string = "";
  descricao: string = "";
  preco: string = "";
  quantidade: string = "";
  categoriaId: number = 0;
  categorias: Categoria[] = [];

para depois então serem realmente convertidas:

  cadastrar(): void {
    let produto: Produto = {
      nome: this.nome,
      descricao: this.descricao,
      preco: Number.parseFloat(this.preco),
      quantidade: Number.parseInt(this.quantidade),
      categoriaId: this.categoriaId,
    };

    Aliás foi exatamente isso que você me explicou acima ao dizer "No entanto, isso pode ser aceitável se a API já fornece esses valores no formato esperado.", ou eu estou errado?

_________________________________________________________________________________________________

Beleza,
                 Agora vamos falar então sobre o método alterar em si. A primeira coisa que fazemos é declarar uma váriavel nova do tipo "Produto", que representa uma instância da classe Produto do pacote models. E essa instância não fica vazia! Logo após criá-la, já abrimos um bloco indicando os valores de seus atributos.       E aqui surge a minha maior dúvida!

para cada atributo dessa instância de produto que criamos aqui, atribuimos o valor "this.variavel"! 

la em cima, em ngOnInit, nós atribuímos os valores do produto recém chegado da requisição "get buscar" às variáveis que criamos em branco la em cima no inicio do método principal da classe.
    Esses valores atribuídos às variáveis, que chegaram da requisição "get buscar", são os que vão aparecer ao cliente assim que ele clicar em alterar algum produto, correto? 

Estou tentando entender o caminho lógico! quero entender quando é que a alteração ocorre! após a dúvida acima, surge então a minha próxima dúvida:

logo no início do método alterar, ao instanciar um novo objeto do tipo Produto, os valores que estamos atribuindo a cada um dos campos com "this.variavel", são valores que JÁ FORAM ALTERADOS PELO USUÁRIO por meio da classe html? 

porque ele imprime o produto no console (console.log(produto);)? 

esse é o poduto que será enviado a API por meio da requisição put certo?