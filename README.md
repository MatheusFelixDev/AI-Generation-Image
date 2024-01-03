# Geração de Imagens com OpenAI

Este projeto possibilita a geração de imagens artificialmente a partir de um prompt de comando utilizando a biblioteca da OpenAI. Abaixo, apresentamos informações relevantes sobre a estrutura do projeto, dependências utilizadas, scripts disponíveis e pontos essenciais para seu uso.

## Projeto Cliente (Frontend)

### Estrutura do Projeto

- **name**: client
- **private**: true
- **version**: 0.0.0
- **type**: module

### Scripts Disponíveis

- **dev**: `npm run dev`
- **build**: `npm run build`
- **preview**: `npm run preview`

### Dependências Principais

- [React](https://reactjs.org/) 18.2.0
- [React Router DOM](https://reactrouter.com/web/guides/quick-start) 6.8.0
- [File Saver](https://github.com/eligrey/FileSaver.js) 2.0.5

### Pontos Destacados

- **Desenvolvimento Reactivo**: Utiliza o Vite para um desenvolvimento rápido e reativo.
- **Roteamento com React Router**: Implementa roteamento de páginas com React Router DOM.
- **Download de Arquivos**: Possui a capacidade de salvar arquivos localmente utilizando a biblioteca File Saver.

## Projeto Servidor (Backend)

### Estrutura do Projeto

- **name**: server
- **version**: 1.0.0
- **engines**: { "node": "14.x" }

### Scripts Disponíveis

- **start**: `npm start`
- **dev**: `npm run dev`

### Dependências Principais

- [Express](https://expressjs.com/) 4.18.2
- [Mongoose](https://mongoosejs.com/) 6.9.0
- [Cloudinary](https://cloudinary.com/) 1.33.0
- [OpenAI](https://platform.openai.com/docs/api-reference) 3.1.0
- [Cors](https://www.npmjs.com/package/cors) 2.8.5
- [Dotenv](https://www.npmjs.com/package/dotenv) 16.0.3
- [Nodemon](https://nodemon.io/) 2.0.20

### Pontos Destacados

- **Servidor Express**: Implementa um servidor Express para gerenciar solicitações HTTP.
- **Persistência de Dados com Mongoose**: Utiliza o Mongoose para interagir com um banco de dados MongoDB.
- **Integração com Cloudinary e OpenAI**: Permite a manipulação de imagens na nuvem e interação com a API da OpenAI.
- **Configuração com Dotenv**: Utiliza variáveis de ambiente para proteger informações sensíveis.

## Observações

Certifique-se de configurar corretamente as variáveis de ambiente no servidor, incluindo as chaves de API necessárias para o Cloudinary e OpenAI.

**Desfrute da geração de imagens com a OpenAI!**
