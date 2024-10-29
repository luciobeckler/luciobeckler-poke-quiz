# PokeQuiz.APP

Aplicação front-end em React para um Quiz, utilizando React Router, Axios e Material UI.

## Índice

- [Introdução](#introdução)
- [Requisitos](#requisitos)
- [Configuração](#configuração)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Telas do projeto](#telas-do-projeto)

---

## Introdução

Esta aplicação front-end foi desenvolvida com React para interagir com a API de Quiz disponível [neste link](https://github.com/luciobeckler/poke-quiz-api). A aplicação permite aos usuários participar de quizzes, visualizar perguntas e enviar suas respostas, utilizando Axios para chamadas à API e Material UI para a interface.

### Tecnologias Utilizadas

- React v18.3.1
- React Router v6.27 
- Axios v1.7.7
- Material UI v6.1.4

## Requisitos

- **Node.js**: [link para instalação](https://nodejs.org/en/)
- **npm**: O gerenciador de pacotes do Node (já incluído com o Node.js)
- **Editor de Código**: Recomendado [Visual Studio Code](https://code.visualstudio.com/)

## Configuração
### Passo 1: Clonar o Repositório

```bash
git clone https://github.com/luciobeckler/poke-quiz-app.git
cd poke-quiz-app
```

### Passo 2: Instalar Dependências
```bash
npm install
```

### Passo 3: Rodar a Aplicação
```bash
npm start
```
A aplicação estará disponível em http://localhost:3000.

## Estrutura do Projeto
- src: Contém todos os componentes da aplicação.
  - components: Componentes reutilizáveis da interface (será implementado uma melhor modularização dos componentes e páginas).
  - pages: Páginas da aplicação (será implementado uma melhor modularização dos componentes e páginas).
  - services: Arquivo para interações com a API usando Axios.
  - hooks: Hooks globais utilziados na aplicação
  - helper: funções globais utilziadas na aplicação
  - App.js: Componente principal que define as rotas da aplicação.
  - index.js: Ponto de entrada da aplicação.

## Telas do projeto
### Login:
![image](https://github.com/user-attachments/assets/2b408779-6d26-412a-970d-dbf3ba0aac1f)
![image](https://github.com/user-attachments/assets/b09387d1-24aa-4c36-9138-b0dffcb83f9f)

### Quiz:
![image](https://github.com/user-attachments/assets/fc02170c-12d0-4421-9b0d-3b9278152d80)

### Result:
![image](https://github.com/user-attachments/assets/73ecdc8e-9ceb-48ff-a701-036da1c71576)
![image](https://github.com/user-attachments/assets/e235a686-d2b6-48d1-8344-0748b115f35e)






