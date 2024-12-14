# Use a imagem oficial do Node.js
FROM node:20

# Configure o diretório de trabalho
WORKDIR /app

# Copie os arquivos de dependências
COPY package*.json ./

# Instale todas as dependências (incluindo devDependencies)
RUN npm install

# Copie o restante do código
COPY . .

# Exponha a porta do servidor
EXPOSE 3000

# Comando para iniciar o servidor em desenvolvimento
CMD ["npm", "run", "dev"]
