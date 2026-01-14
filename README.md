# Pokédex App - Patrick's Project

Uma aplicação web full-stack para explorar e visualizar informações sobre Pokémon, desenvolvida com Ruby on Rails no backend e React + TypeScript no frontend.

## 📋 Visão Geral

Este projeto implementa uma Pokédex interativa que permite aos usuários:
- Autenticar-se na aplicação
- Visualizar uma lista de Pokémon (151 primeiros)
- Buscar Pokémon por nome
- Ordenar Pokémon por número ou nome
- Visualizar detalhes completos de cada Pokémon
- Ver estatísticas, tipos e informações de espécie

## 🏗️ Arquitetura

### Backend (Ruby on Rails)
- **Framework**: Ruby on Rails 7.1.6
- **API**: RESTful JSON API
- **Autenticação**: Token-based authentication (Base64)
- **Serviço Externo**: Integração com [PokeAPI](https://pokeapi.co/)
- **CORS**: Configurado para comunicação com frontend

### Frontend (React + TypeScript)
- **Framework**: React 19.2.0 com TypeScript
- **Build Tool**: Vite
- **Roteamento**: React Router DOM
- **Gerenciamento de Estado**: React Hooks (useState, useEffect)
- **Estilização**: CSS Modules

## 📁 Estrutura do Projeto

```
poke-patrick/
├── backend/          # API Rails
│   ├── app/
│   │   ├── controllers/
│   │   │   ├── authentication_controller.rb
│   │   │   ├── pokemons_controller.rb
│   │   │   └── concerns/
│   │   │       └── authenticable.rb
│   │   └── services/
│   │       └── poke_api_service.rb
│   └── config/
│       └── routes.rb
└── frontend/         # React App
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── hooks/
    │   ├── services/
    │   └── types/
    └── public/
```

## 🚀 Como Executar

### Pré-requisitos
- Ruby 3.3.2
- Node.js 18+
- Bundler
- npm ou yarn

### Backend

```bash
cd backend
bundle install
rails server
```

O servidor estará disponível em `http://localhost:3000`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

## 🔐 Autenticação

### Login
- **Endpoint**: `POST /login`
- **Credenciais**:
  - Username: `admin`
  - Password: `admin`
- **Resposta**: Token JWT (Base64) armazenado no localStorage

### Proteção de Rotas
- Rotas protegidas requerem token no header `Authorization: Bearer <token>`
- Token expira após 24 horas (configurável)

## 📡 Endpoints da API

### `POST /login`
Autentica o usuário e retorna token de acesso.

**Request:**
```json
{
  "username": "admin",
  "password": "admin"
}
```

**Response:**
```json
{
  "token": "...",
  "message": "Login successful"
}
```

### `GET /pokemons`
Lista todos os Pokémon com paginação.

**Query Parameters:**
- `limit` (opcional): Número de resultados por página (padrão: 151)
- `offset` (opcional): Número de resultados a pular (padrão: 0)

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "results": [...],
  "count": 151,
  "next": "...",
  "previous": null
}
```

### `GET /pokemons/:id`
Retorna informações detalhadas de um Pokémon específico.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "pokemon": {...},
  "species": {...}
}
```

## 🧪 Testes

### Backend
```bash
cd backend
bundle exec rspec  # Se usar RSpec
# ou
rails test         # Se usar Minitest
```

### Frontend
```bash
cd frontend
npm test
```

## 🎨 Design e UX

- **Design Responsivo**: Adaptável a diferentes tamanhos de tela
- **Loading States**: Feedback visual durante carregamento
- **Error Handling**: Mensagens de erro amigáveis
- **Acessibilidade**: Suporte a ARIA labels e navegação por teclado

## 🔧 Tecnologias Principais

### Backend
- Ruby on Rails 7.1.6
- Puma (servidor web)
- rack-cors (CORS)
- SQLite3 (banco de dados)
- Net::HTTP (client HTTP)

### Frontend
- React 19.2.0
- TypeScript 5.9.3
- Vite 7.2.4
- React Router DOM 6.30.3
- ESLint

## 📝 Decisões de Arquitetura

### Separação de Concerns
- **Controllers**: Responsáveis apenas por receber requests e retornar responses
- **Services**: Lógica de negócio e integrações externas (PokeApiService)
- **Concerns**: Código reutilizável (Authenticable)

### Frontend
- **Components**: Componentes reutilizáveis e bem organizados
- **Hooks**: Lógica reutilizável (usePokemon, usePokemonList)
- **Services**: Comunicação com APIs
- **Types**: Definições TypeScript para type safety

### Segurança
- Token-based authentication
- CORS configurado
- Strong parameters no Rails
- Validação de entrada

## 🚧 Melhorias Futuras

- [ ] Implementar testes unitários e de integração
- [ ] Adicionar cache para requisições à PokeAPI
- [ ] Implementar paginação no frontend
- [ ] Adicionar favoritos de Pokémon
- [ ] Melhorar tratamento de erros
- [ ] Implementar JWT real ao invés de Base64
- [ ] Adicionar rate limiting
- [ ] Implementar internacionalização (i18n)

## 📄 Licença

Este projeto foi desenvolvido como parte de um processo seletivo técnico.

## 👤 Autor

Patrick
