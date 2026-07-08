# Repositório criado para auxiliar os estudos dos colaboradores Bruno Vital e Nathan Bezerra.

Esta é uma API REST desenvolvida com o framework **AdonisJS** para o gerenciamento de cursos, alunos e notas. O projeto atende a todos os requisitos acadêmicos solicitados, incluindo persistência em banco de dados relacional, autenticação via middleware e regras de negócio estruturadas.

---
# Entidades

* Curso
* Estudante
* Nota

# Regras de negócio

* Cadastrar cursos e estudantes. (/app)
* Cada estudante pertence a um curso. (/models)
* Cada estudante possui uma matrícula única. (/controllers)
* Registrar notas de 0 a 10. (/validator)
* Calcular média do estudante. (/app)
* Listar estudantes aprovados e reprovados. (/app)

# Relacionamentos

Curso 1:N Estudantes | Estudante 1:N Notas

# Requisitos obrigatórios
* Utilizar Migrations.
* Utilizar Models.
* Implementar Controllers para CRUD.
* Implementar Middleware de autenticação.
* Utilizar relacionamentos do Lucid ORM.
* Utilizar PostgreSQL.
* Organizar rotas seguindo o padrão do AdonisJS.

## Tecnologias Utilizadas

* **Runtime:** Node.js
* **Framework:** AdonisJS
* **ORM:** Lucid ORM (AdonisJS)
* **Banco de Dados:** PostgreSQL
* **Autenticação:** Middleware integrado com Opaque Access Tokens
* **Documentação:** Swagger UI

---

## Entidades e Relacionamentos

A arquitetura do banco de dados baseia-se em três entidades principais:

1.  **Curso:** Representa os cursos cadastrados no sistema.
2.  **Estudante:** Vinculado obrigatoriamente a um curso.
3.  **Nota:** Registro numérico de uma avaliação vinculada a um estudante

### Relacionamentos (Lucid ORM):
* **Curso 1:N Estudantes** (`hasMany` / `belongsTo`)
* **Estudante 1:N Notas** (`hasMany` / `belongsTo`)

---

## Pré-requisitos

Antes de iniciar, certifique-se de ter instalado em sua máquina:
* [Node.js](https://nodejs.org/) (Versão estável recomendada)
* [PostgreSQL](https://www.postgresql.org/) ativo e com um banco de dados criado para a aplicação.

---

## Passo a Passo para Configuração e Execução

### 1. Clonar o Repositório
```bash
git clone https://github.com/empenhado/API-REST-utilizando-AdonisJS-para-controle-de-Alunos.git
cd API-REST-utilizando-AdonisJS-para-controle-de-Alunos/controle-alunos-api
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
DB_HOST=127.0.0.1
DB_PORT=5433
DB_USER=postgres
DB_PASSWORD=docker
DB_DATABASE=controle_alunos
```

### 4. Executar as Migrations e Seeders
Com o PostgreSQL em execução, crie as tabelas necessárias:
```bash
node ace migration:run
```

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

```markdown
### Como testar as rotas protegidas pelo Swagger:
1. Cadastre um usuário na rota `POST /register`.
2. Faça login na rota `POST /login` e copie o token gerado.
3. No topo da página do Swagger, clique no botão verde **Authorize**.
4. Cole somente o valor do token, sem aspas e sem escrever `Bearer`.
5. Clique em **Authorize**.
6. Agora você pode expandir qualquer rota, clicar em **Try it out** e testar a API diretamente pelo navegador.
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
* `GET /cursos/:id` - Exibe os dados de um curso específico.
* `PUT /cursos/:id` - Atualiza os dados de um curso específico.
* `DELETE /cursos/:id` - Remove um curso do sistema.

### Estudantes

* `GET /estudantes` - Lista todos os estudantes, incluindo seus cursos e notas.
* `POST /estudantes` - Cadastra um novo estudante associado a um `curso_id`.
* `GET /estudantes/:id` - Exibe os dados de um estudante específico.
* `PUT /estudantes/:id` - Atualiza as informações do estudante.
* `DELETE /estudantes/:id` - Remove o estudante.

### Notas

* `GET /notas` - Lista todas as notas cadastradas.
* `POST /notas` - Registra uma nota de `0` a `10` vinculada a um `estudante_id`.
* `GET /notas/:id` - Exibe os dados de uma nota específica.
* `PUT /notas/:id` - Atualiza uma nota.
* `DELETE /notas/:id` - Remove uma nota.

### Regras de Negócio

* `GET /estudantes/:id/media` - Calcula e exibe a média aritmética das notas de um estudante específico.
* `GET /estudantes/aprovados` - Lista todos os estudantes aprovados.
* `GET /estudantes/reprovados` - Lista todos os estudantes reprovados.

  * *Critério estabelecido:* média igual ou superior a **7.0** para aprovação.

---

## Estrutura dos Dados de Exemplo (JSON)

### Criar Curso (`POST /cursos`)
```json
{
  "nome": "Sistemas para Internet",
  "descricao": "Curso superior de tecnologia"
}
```

### Criar Estudante (`POST /estudantes`)
```json
{
  "nome": "Bruno Vital",
  "matricula": "2026001",
  "curso_id": 1
}
```

### Lançar Nota (`POST /notas`)
```json
{
  "valor": 8.5,
  "estudante_id": 1
}
```

---

## Autores

* **Estudantes:** Bruno Vital e Nathan Bezerra
