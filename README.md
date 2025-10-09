# Sistema de Autenticação em Node.js

Este é um projeto de API de autenticação e autorização construído com Node.js e TypeScript. O objetivo é fornecer uma base sólida e segura para gerenciamento de usuários, incluindo cadastro, login e acesso a rotas protegidas, que neste projeto foram feitas mais para estudo.

A arquitetura foi pensada para ser limpa, escalável e fácil de manter, separando as responsabilidades de forma clara, obviamente para uma simples autenticação, não seria necessário todo o desaclopamento, mas como o intuito é colocar em prática, achei interesse fazer dessa forma.

## Destaques e Arquitetura

Este projeto foi construído com uma **arquitetura em camadas**, inspirada em **alguns** princípios como a *Clean Architecture*, o que traz grandes vantagens:

*   **Código Organizado:** As responsabilidades são divididas em `application` (regras de negócio), `infra` (detalhes técnicos como banco de dados) e `server` (configurações do framework, ou, neste caso, microframewrok (Express)).
*   **Facilidade para Testar:** A lógica de negócio (`useCases`) não depende diretamente do framework ou do banco de dados, tornando os testes unitários mais simples e rápidos.
*   **Inversão de Dependência + Injeção de dependência:** Usei *factories* para "injetar" as dependências (como o repositório do banco de dados) nos casos de uso. Isso desacopla o código e facilita a troca de implementações no futuro.
*   **Padrões de Projeto:** Utilizamos padrões como **Repository** (para abstrair o acesso a dados) e **Adapter** (para desacoplar o Express dos nossos controllers e middlewares).

## Tecnologias Utilizadas

*   **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
*   **Micro Framework:** [Express.js](https://expressjs.com/pt-br/)
*   **Banco de Dados:** [PostgreSQL](https://www.postgresql.org/) (com o driver `pg`)
*   **Autenticação:** [JSON Web Tokens (JWT)](https://jwt.io/) para sessões seguras.
*   **Hashing de Senhas:** [BcryptJS](https://github.com/dcodeIO/bcrypt.js) para proteger as senhas dos usuários.
*   **Validação de Dados:** [Zod](https://zod.dev/) para garantir que os dados de entrada sejam válidos e seguros.
*   **Executor de TypeScript:** [tsx](https://github.com/esbuild-kit/tsx) para rodar o projeto em desenvolvimento sem a necessidade de compilação manual.

## Como Rodar o Projeto

Siga os passos abaixo para configurar e executar o projeto em seu ambiente local.

### 1. Pré-requisitos

*   [Node.js](https://nodejs.org/en/) (versão 18 ou superior)
*   [Yarn](https://yarnpkg.com/) (ou `npm`)
*   Uma instância do [PostgreSQL](https://www.postgresql.org/download/) rodando.

### 2. Clone o Repositório

```bash
git clone <URL_DO_SEU_REPOSITORIO>
cd <NOME_DA_PASTA>
```

### 3. Instale as Dependências

```bash
yarn install
```

### 4. Configure as Variáveis de Ambiente

Crie um arquivo chamado `.env` na raiz do projeto. Ele guardará as credenciais e chaves secretas. Copie o conteúdo abaixo e substitua com seus dados.

```env
# Configurações do Banco de Dados
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=auth
DB_PORT=5432

# Chave secreta para gerar os tokens JWT
SECRET_KEY=secretooo

# Porta da aplicação
PORT=3001
```

### 5. Prepare o Banco de Dados

Execute o script `schema.sql` (localizado em `src/infra/database/`) no seu banco de dados PostgreSQL para criar a tabela `accounts`.

### 6. Execute a Aplicação

Para iniciar o servidor em modo de desenvolvimento (com recarregamento automático):

```bash
yarn dev
```

O servidor estará disponível em `http://localhost:3001`.

## Scripts disponíveis

*   `yarn dev`: Inicia o servidor em modo de desenvolvimento.
*   `yarn build`: Compila o código TypeScript para JavaScript no diretório `dist/`.
*   `yarn start`: Executa a versão compilada do projeto (ideal para produção).
