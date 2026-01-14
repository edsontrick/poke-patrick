# Pokédex App - Patrick's Project

A full-stack web application for exploring and viewing Pokémon information, developed with Ruby on Rails on the backend and React + TypeScript on the frontend.

## 📋 Overview

This project implements an interactive Pokédex that allows users to:
- Authenticate in the application
- View a list of Pokémon (first 151)
- Search Pokémon by name
- Sort Pokémon by number or name
- View complete details of each Pokémon
- See statistics, types, and species information

## 🏗️ Architecture

### Backend (Ruby on Rails)
- **Framework**: Ruby on Rails 7.1.6
- **API**: RESTful JSON API
- **Authentication**: Token-based authentication (Base64)
- **External Service**: Integration with [PokeAPI](https://pokeapi.co/)
- **CORS**: Configured for frontend communication

### Frontend (React + TypeScript)
- **Framework**: React 19.2.0 with TypeScript
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **State Management**: React Hooks (useState, useEffect)
- **Styling**: CSS Modules

## 📁 Project Structure

```
poke-patrick/
├── backend/          # Rails API
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

## 🚀 How to Run

### Prerequisites
- Ruby 3.3.2
- Node.js 18+
- Bundler
- npm or yarn

### Backend

```bash
cd backend
bundle install
rails server
```

The server will be available at `http://localhost:3000`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The application will be available at `http://localhost:5173`

## 🔐 Authentication

### Login
- **Endpoint**: `POST /login`
- **Credentials**:
  - Username: `admin`
  - Password: `admin`
- **Response**: JWT Token (Base64) stored in localStorage

### Route Protection
- Protected routes require token in `Authorization: Bearer <token>` header
- Token expires after 24 hours (configurable)

## 📡 API Endpoints

### `POST /login`
Authenticates the user and returns an access token.

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
Lists all Pokémon with pagination.

**Query Parameters:**
- `limit` (optional): Number of results per page (default: 151)
- `offset` (optional): Number of results to skip (default: 0)

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
Returns detailed information of a specific Pokémon.

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

## 🧪 Testing

### Backend
```bash
cd backend
bundle exec rspec  # If using RSpec
# or
rails test         # If using Minitest
```

### Frontend
```bash
cd frontend
npm test
```

## 🎨 Design and UX

- **Responsive Design**: Adaptable to different screen sizes
- **Loading States**: Visual feedback during loading
- **Error Handling**: User-friendly error messages
- **Accessibility**: Support for ARIA labels and keyboard navigation

## 🔧 Main Technologies

### Backend
- Ruby on Rails 7.1.6
- Puma (web server)
- rack-cors (CORS)
- SQLite3 (database)
- Net::HTTP (HTTP client)

### Frontend
- React 19.2.0
- TypeScript 5.9.3
- Vite 7.2.4
- React Router DOM 6.30.3
- ESLint

## 📝 Architecture Decisions

### Separation of Concerns
- **Controllers**: Responsible only for receiving requests and returning responses
- **Services**: Business logic and external integrations (PokeApiService)
- **Concerns**: Reusable code (Authenticable)

### Frontend
- **Components**: Reusable and well-organized components
- **Hooks**: Reusable logic (usePokemon, usePokemonList)
- **Services**: API communication
- **Types**: TypeScript definitions for type safety

### Security
- Token-based authentication
- CORS configured
- Strong parameters in Rails
- Input validation

## 🚧 Future Improvements

- [ ] Implement unit and integration tests
- [ ] Add cache for PokeAPI requests
- [ ] Implement frontend pagination
- [ ] Add Pokémon favorites
- [ ] Improve error handling
- [ ] Implement real JWT instead of Base64
- [ ] Add rate limiting
- [ ] Implement internationalization (i18n)

## 📄 License

This project was developed as part of a technical selection process.

## 👤 Author

Patrick
