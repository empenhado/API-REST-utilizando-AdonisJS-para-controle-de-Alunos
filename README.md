# Repositório criado para auxiliar os estudos dos colaboradores Bruno Vital e Nathan Bezerra.

Esta é uma API REST desenvolvida com o framework **AdonisJS** para o gerenciamento de cursos, alunos e notas. O projeto atende a todos os requisitos acadêmicos solicitados, incluindo persistência em banco de dados relacional, autenticação via middleware e regras de negócio estruturadas.

---

## Tecnologias Utilizadas

* Runtime: Node.js
* Framework: AdonisJS
* ORM: Lucid ORM (AdonisJS)
* Banco de Dados: PostgreSQL
* Autenticação: Middleware integrado (Opaque Access Tokens / JWT)

---

## Entidades e Relacionamentos

A arquitetura do banco de dados baseia-se em três entidades principais:

1.  **Curso:** Representa as graduações ou disciplinas ofertadas.
2.  **Aluno:** Vinculado obrigatoriamente a um curso.
3.  **Nota:** Registros numéricos de avaliações vinculados a um aluno.

### Relacionamentos (Lucid ORM):
* **Curso 1:N Alunos** (`hasMany` / `belongsTo`)
* **Aluno 1:N Notas** (`hasMany` / `belongsTo`)

---

## Pré-requisitos

Antes de iniciar, certifique-se de ter instalado em sua máquina:
* [Node.js](https://nodejs.org/) (Versão estável recomendada)
* [PostgreSQL](https://www.postgresql.org/) ativo e com um banco de dados criado para a aplicação.

---

## Passo a Passo para Configuração e Execução

### 1. Clonar o Repositório
git clone [https://github.com/seu-usuario/controle-alunos-api.git](https://github.com/seu-usuario/controle-alunos-api.git)
cd controle-alunos-api

### 2. Instalar as Dependências
npm install

### 3. Configurar as Variáveis de Ambiente
Copie o arquivo de exemplo de ambiente e preencha com as credenciais do seu banco de dados PostgreSQL:

cp .env.example .env

Abra o arquivo .env e configure os campos correspondentes:

Snippet de código
DB_CONNECTION=pg
PG_HOST=localhost
PG_PORT=5432
PG_USER=seu_usuario_postgres
PG_PASSWORD=sua_senha_postgres
PG_DB_NAME=nome_do_seu_banco

### 4. Executar as Migrations e Seeders
Crie as tabelas necessárias no PostgreSQL e popule os dados iniciais do usuário administrador padrão para testes:

node ace migration:run
node ace db:seed
Nota: O comando de seed cria um usuário padrão para fins de avaliação rápida das rotas autenticadas.

E-mail: admin@ifma.edu.br

Senha: admin123

### 5. Iniciar o Servidor
node ace serve --watch
O servidor estará rodando em: http://localhost:3333

Autenticação
Todas as rotas de manipulação de dados (CRUD) estão protegidas pelo Middleware de Autenticação.
Para testá-las, envie uma requisição POST /login para obter o token de acesso. Nas requisições seguintes, inclua o token no cabeçalho HTTP:

HTTP
Authorization: Bearer <SEU_TOKEN_AQUI>
Documentação das Rotas (End-points)
Autenticação
POST /login - Realiza a autenticação e retorna o token de acesso.

POST /logout - Invalida o token de acesso atual.

Cursos
GET /cursos - Lista todos os cursos cadastrados.

POST /cursos - Cadastra um novo curso.

PUT /cursos/:id - Atualiza os dados de um curso específico.

DELETE /cursos/:id - Remove um curso do sistema.

Alunos
GET /alunos - Lista todos os alunos (incluindo o curso ao qual pertencem).

POST /alunos - Cadastra um novo aluno associado a um curso_id.

PUT /alunos/:id - Atualiza as informações do aluno.

DELETE /alunos/:id - Remove o aluno.

Notas e Relatórios (Regras de Negócio)
POST /notas - Registra uma nota de 0 a 10 vinculada a um aluno_id.

GET /alunos/:id/media - Calcula e exibe a média aritmética das notas de um aluno específico.

GET /relatorios/desempenho - Retorna a listagem completa de alunos divididos entre Aprovados e Reprovados.

Critério estabelecido: Média igual ou superior a 7.0 para aprovação.

Estrutura dos Dados de Exemplo (JSON)
Criar Aluno (POST /alunos)
JSON
{
  "nome": "Bruno Vital",
  "email": "bruno.vital@exemplo.com",
  "curso_id": 1
}
Lançar Nota (POST /notas)
JSON
{
  "aluno_id": 1,
  "nota": 8.5
}