# Blis---Teste-técnico

## Instruções

<details>
  <summary>
    <strong>Como executar o projeto</strong>
  </summary><br>

  1. Clone o repositório
    `
    git@github.com:JackS1o/Blis---Teste-t-cnico.git
    `
  2. Instale as dependências
    `
    npm install
    `
  3. Na raíz do projeto, execute o comando `docker-compose up --build` para subir o container da aplicação e do banco de dados. O servidor estará disponível na porta `3000`.

  4. Acesse o projeto em http://localhost:3000
</details>

<details>
  <summary>
    <strong>Rotas desenvolvidas</strong>
  </summary><br>
  
  - `POST /users` - Cria um novo usuário. O corpo da requisição deve conter o `name`, `birthdate`, `email` e `password` desejados. Exemplo de corpo de requisição:
  ```json
  {
    "name": "Jack",
    "birthdate": "2000-12-15",
    "email": "jack@gmail.com",
    "password": "123456789"
  }
  ```
  a resposta será um objeto com o seguinte formato:
  ```json
  {
    "message": "User created successfully"
  }
  ```

  - `POST /users/login` - Realiza o login de um usuário. O corpo da requisição deve conter o `email` e `password` que existam no banco de dados. O retorno dessa requisição tabém gera um `token`. Exemplo de corpo de requisição:
  ```json
  {
    "email": "jack@gmail.com",
    "password": "123456",
  }
  ```
  a resposta será um objeto com o seguinte formato:
  ```json
  {
    "message": "Login successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI2NTQxMTU0LWJkNmQtNDgzNC04N2RlLTc0ZTQyMjczMmZiMCIsImVtYWlsIjoiamFja0BnbWFpbC5jb20iLCJpYXQiOjE3MzQzNTIxMDEsImV4cCI6MTczNDM1NTcwMX0.6dpuKRclgogXkKt6pGyVDG_zWv-pI6hnEKfLw_fssOg",
    "user": {
        "id": "b6541154-bd6d-4834-87de-74e422732fb0",
        "email": "jack@gmail.com",
        "name": "Jack"
    }
  }
  ```

  - `POST /users/documents` - Permite fazer o upload de um documento do usuário. O corpo da requisição deve conter o `name` do documento desejado. Exemplo de corpo de requisição:

  ![alt text](./README/image.png)

  a resposta será um objeto com o seguinte formato:

  ```json
  {
    "message": "Document created successfully",
    "document": {
        "id": "4c81e50d-5fdc-41b9-a3f7-0e2dd5be7a5d",
        "name": "teste",
        "url": "/uploads/1734352778796-648562658-test_document.pdf",
        "user_id": "b6541154-bd6d-4834-87de-74e422732fb0",
        "createdAt": "2024-12-16T12:39:38.800Z",
        "updatedAt": "2024-12-16T12:39:38.800Z"
    }
  }
  ```

  - `GET /uploads/document.pdf` - Rota estática que permite visualizar o documento do usuário. Exemplo de requisição:

  ```json
  /uploads/1734287051299-845511958-test_document.pdf
  ```

  - `POST /abilities` - Permite criar uma habilidade. O corpo da requisição deve conter o `name` da habilidade desejada. Exemplo de corpo de requisição:

  ```json
  {
    "name": "pedreiro"
  }
  ```

  a resposta será um objeto com o seguinte formato:

  ```json
  {
    "id": "5a93ad0b-781b-4c09-83ec-e46a70e3a31a",
    "name": "pedreiro",
    "active": true,
    "createdAt": "2024-12-16T12:42:47.453Z",
    "updatedAt": "2024-12-16T12:42:47.453Z"
  }
  ```

  - `PUT /abilities/:id` - Permite atualizar uma habilidade. O corpo da requisição deve conter o `active` da habilidade desejada. Exemplo de corpo de requisição:

  ```json
  {
    "active": true
  }
  ```
  a resposta será um objeto com o seguinte formato:

  ```json
  {
      "id": "5a93ad0b-781b-4c09-83ec-e46a70e3a31a",
      "name": "pedreiro",
      "active": true,
      "createdAt": "2024-12-16T12:42:47.453Z",
      "updatedAt": "2024-12-16T12:44:48.029Z"
  }
  ```

  - `POST /users/abilities` - Permite associar uma habilidade a um usuário. O corpo da requisição deve conter o `ability_id` e `years_experience` desejados. Exemplo de corpo de requisição:

  ```json
  {
    "ability": "pedreiro",
    "years_experience": 4
  }
  ```

  a resposta é um objeto com o seguinte formato:

  ```json
  {
    "message": "Ability added successfully"
  }
  ```

  - `DELETE /users/abilities` - Permite remover uma ou mais habilidades de um usuário. O corpo da requisição deve conter o `ability` desejado. Exemplo de corpo de requisição:

  ```json
  {
    "abilities": [
        "pedreiro",
        "padeiro"
    ]
  }
  ```
  a resposta é um objeto com o seguinte formato:

  ```json
  {
      "message": "Ability deleted successfully"
  }
  ```

  - `GET /users/abilities` - Permite obter as habilidades de um usuário de forma paginada e ordenada por ordem de criação decrescente. A url da requisição deve conter o `page` e `limit` desejados. Exemplo de url de requisição:

  ```json
    "/users/abilities?page=1&limit=10"
  ```

  a resposta é um objeto com o seguinte formato:

  ```json
  {
    "count": 1,
    "rows": [
        {
            "user_id": "b6541154-bd6d-4834-87de-74e422732fb0",
            "name": "Jack",
            "email": "jack@gmail.com",
            "birthdate": "2000-12-15T00:00:00.000Z",
            "ability": "pedreiro",
            "years_experience": 4,
            "profilePicture": "https://images.dog.ceo/breeds/terrier-scottish/n02097298_9085.jpg"
        }
    ]
  }
  ```
</details>

<details>
    <summary>
      <strong>Atividade Extra</strong>
    </summary><br>

  Atividade extra desenvolvida foi usar a API `https://dog.ceo/api/breeds/image/random` para obter uma imagem de cachorro aleatória e adiciona-la ao perfil do usuário ao criar um novo usuário.
  Essa imagem de cachorro foi adicionada ao banco de dados na tablea `dog_profile_pictures`.

  No retorno da rota - `GET /users/abilities` - foi adicionado o campo `profilePicture` com o link da imagem do cachorro.

  ```json
  {
    "count": 1,
    "rows": [
        {
            "user_id": "b6541154-bd6d-4834-87de-74e422732fb0",
            "name": "Jack",
            "email": "jack@gmail.com",
            "birthdate": "2000-12-15T00:00:00.000Z",
            "ability": "pedreiro",
            "years_experience": 4,
            "profilePicture": "https://images.dog.ceo/breeds/terrier-scottish/n02097298_9085.jpg"
        }
    ]
  }
  ```

</details>

<details>
  <summary>
    <strong>Tecnologias Usadas no Projeto</strong>
  </summary><br>

  - TypeScript
  - Node.js
  - Express
  - Prisma
  - MySQL
  - Docker
  - Docker-Compose
  - Joi
  - Argon2
  - axios
  - dotenv
  - Multer
  - jsonwebtoken
</details>

<details>
  <summary>
    <strong>Scripts do Projeto</strong>
  </summary><br>

  - `docker-compose up --build` - Subir o container da aplicação e do banco de dados.
  - `npm run dev` - Subir o servidor local.
  - `npm run prisma:migrate` - Migrar as tabelas do banco de dados.
  - `npm run format` - Formatar o código.
  - `npm run build` - Compilar o código typescript para o javascript.
</details>
