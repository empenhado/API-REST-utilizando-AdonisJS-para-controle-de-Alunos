# Repositório criado para auxiliar os estudos dos colaboradores Bruno Vital e Nathan Bezerra.

Esta é uma API REST desenvolvida com o framework **AdonisJS** para o gerenciamento de cursos, alunos e notas. O projeto atende a todos os requisitos acadêmicos solicitados, incluindo persistência em banco de dados relacional, autenticação via middleware e regras de negócio estruturadas.

---

## Tecnologias Utilizadas

* **Runtime:** Node.js
* **Framework:** AdonisJS
* **ORM:** Lucid ORM (AdonisJS)
* **Banco de Dados:** PostgreSQL
* **Autenticação:** Middleware integrado (Opaque Access Tokens / JWT)
* **Documentação:** Swagger UI

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
```bash
git clone https://github.com/seu-usuario/controle-alunos-api.git
cd controle-alunos-api
```

### 2. Instalar as Dependências
```bash
npm install
```

### 3. Configurar as Variáveis de Ambiente
Copie o arquivo de exemplo de ambiente e preencha com as credenciais do seu banco de dados PostgreSQL:
```bash
cp .env.example .env
```
Abra o arquivo `.env` e configure os campos correspondentes:
```env
DB_CONNECTION=pg
PG_HOST=localhost
PG_PORT=5432
PG_USER=seu_usuario_postgres
PG_PASSWORD=sua_senha_postgres
PG_DB_NAME=nome_do_seu_banco
```

### 4. Executar as Migrations e Seeders
Crie as tabelas necessárias no PostgreSQL e popule os dados iniciais do usuário administrador padrão para testes:
```bash
node ace migration:run
node:ace db:seed
```
> **Nota:** O comando de seed cria um usuário padrão para fins de avaliação rápida das rotas autenticadas.
> * **E-mail:** `admin@ifma.edu.br`
> * **Senha:** `admin123`

### 5. Iniciar o Servidor
```bash
npm run dev
```
O servidor estará rodando em: `http://localhost:3333`

---

## Documentação Interativa (Swagger)

Para facilitar os testes e a visualização visual dos endpoints, implementamos a documentação automática da API com o **Swagger UI**.

Após iniciar o servidor (Passo 5), acesse no seu navegador:
[http://localhost:3333/docs](http://localhost:3333/docs)

### Como testar as rotas protegidas pelo Swagger:
1. Faça o login na rota `POST /login` (pelo próprio Swagger ou via plataforma externa) e copie o token gerado.
2. No topo da página do Swagger, clique no botão verde **Authorize**.
3. Cole o seu token no campo de texto e clique em **Authorize**.
4. Pronto! Agora você pode expandir qualquer rota, clicar em **Try it out** e testar a API diretamente pelo navegador, sem precisar de ferramentas adicionais.

---

## Autenticação

Todas as rotas de manipulação de dados (CRUD) estão protegidas pelo **Middleware de Autenticação**. 
Para testá-las externamente (via Bruno/Postman), envie uma requisição `POST /login` para obter o token de acesso. Nas requisições seguintes, inclua o token no cabeçalho HTTP:
```http
Authorization: Bearer <SEU_TOKEN_AQUI>
```

---

## Documentação das Rotas (End-points)

### Cursos
* `GET /cursos` - Lista todos os cursos cadastrados.
* `POST /cursos` - Cadastra um novo curso.
* `PUT /cursos/:id` - Atualiza os dados de um curso específico.
* `DELETE /cursos/:id` - Remove um curso do sistema.

### Alunos
* `GET /alunos` - Lista todos os alunos (incluindo o curso ao qual pertencem).
* `POST /alunos` - Cadastra um novo aluno associado a um `curso_id`.
* `PUT /alunos/:id` - Atualiza as informações do aluno.
* `DELETE /alunos/:id` - Remove o aluno.

### Notas e Relatórios (Regras de Negócio)
* `POST /notas` - Registra uma nota de `0` a `10` vinculada a um `aluno_id`.
* `GET /alunos/:id/media` - Calcula e exibe a média aritmética das notas de um aluno específico.
* `GET /relatorios/desempenho` - Retorna a listagem completa de alunos divididos entre **Aprovados** e **Reprovados**.
    * *Critério estabelecido:* Média igual ou superior a **7.0** para aprovação.

---

## Estrutura dos Dados de Exemplo (JSON)

### Criar Aluno (`POST /alunos`)
```json
{
  "nome": "Bruno Vital",
  "email": "bruno.vital@exemplo.com",
  "curso_id": 1
}
```

### Lançar Nota (`POST /notas`)
```json
{
  "aluno_id": 1,
  "nota": 8.5
}
```

---

## Autores

* **Estudantes:** Bruno Vital e Nathan Bezerra