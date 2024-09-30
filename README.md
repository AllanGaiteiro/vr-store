
# VR Store

![GitHub repo size](https://img.shields.io/github/repo-size/AllanGaiteiro/project-reply-playstation-store-web-angular?style=for-the-badge)
![GitHub language count](https://img.shields.io/github/languages/count/AllanGaiteiro/project-reply-playstation-store-web-angular?style=for-the-badge)
[![Link do Swagger](https://img.shields.io/badge/-Swagger-49BE?style=for-the-badge)](https://vr-store-app-f49680f6875e.herokuapp.com/api-docs)


Descrição breve do seu projeto e o que ele faz.

## Tecnologias Utilizadas

- NestJS
- TypeScript
- Jest (para testes)
- TypeORM (para manipulação de banco de dados)

## Requisitos

Antes de começar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [NPM](https://www.npmjs.com/) (ou Yarn)

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/AllanGaiteiro/vr-store.git
   ```

2. Navegue até o diretório do projeto:

   ```bash
   cd nome-do-repositorio
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

## Scripts

O projeto inclui os seguintes scripts para facilitar o desenvolvimento:

- `npm run build`: Compila o projeto para a pasta `dist`.
- `npm run format`: Formata o código usando Prettier.
- `npm run start`: Inicia a aplicação.
- `npm run start:dev`: Inicia a aplicação em modo de desenvolvimento (com watch).
- `npm run start:debug`: Inicia a aplicação em modo de depuração (com watch).
- `npm run start:prod`: Inicia a aplicação em modo de produção.
- `npm run lint`: Executa o ESLint para corrigir problemas no código.
- `npm run test`: Executa os testes unitários.
- `npm run test:watch`: Executa os testes unitários em modo de observação.
- `npm run test:cov`: Gera cobertura de testes.
- `npm run test:debug`: Executa os testes em modo de depuração.
- `npm run test:e2e`: Executa os testes de ponta a ponta (E2E).
- `npm run typeorm`: Executa comandos do TypeORM CLI.
- `npm run migration:run`: Executa migrações pendentes.
- `npm run migration:generate --name=NomeDaMigracao`: Gera uma nova migração.
- `npm run migration:create --name=NomeDaMigracao`: Cria uma nova migração.
- `npm run migration:revert`: Reverte a última migração.

## Como Usar

1. **Inicie a aplicação**:
   ```bash
   npm run start:dev
   ```
   A aplicação estará disponível em [http://localhost:3000](http://localhost:3000).

2. **Testes Unitarios**:
   Para executar os testes, utilize o comando:
   ```bash
   npm run test
   ```
3. **Testes e2e**:
   Para executar os testes, utilize o comando:
   ```bash
   npm run test:e2e
   ```
4. **Realizando Migrações**:
   Utilize os comandos de migração conforme necessário. Para rodar migrações, use:
   ```bash
   npm run migration:run
   ```

## Contribuição

Sinta-se à vontade para abrir uma _issue_ ou fazer um _pull request_ se desejar contribuir para este projeto.

## Licença

Este projeto está sob a [Licença MIT](LICENSE).
