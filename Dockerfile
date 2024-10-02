# Dockerfile
FROM node:20

# Cria um diretório de trabalho para a aplicação
WORKDIR /usr/src/app

# Copia os arquivos de configuração do npm e instala as dependências
COPY package*.json ./
RUN npm install

# Copia todo o restante do código para dentro do contêiner
COPY . .

# Compila o projeto NestJS
RUN npm run build

# Expondo a porta que a aplicação usará
EXPOSE 3000

# Executa a aplicação em produção
CMD ["node", "dist/main"]
