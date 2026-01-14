# Backend Pokédex API

Backend API for the Pokédex application, developed with Ruby on Rails.

## Requirements

- Ruby 3.3.2
- Bundler

## Setup

1. Install dependencies:
```bash
bundle install
```

2. Configure .rvmrc (if using RVM):
```bash
rvm use ruby-3.3.2@poke-patrick-backend --create
```

3. Start the server:
```bash
rails server
```

The server will be available at `http://localhost:3000`

## Endpoints

### POST /login
User authentication.

**Request:**
```json
{
  "username": "admin",
  "password": "admin"
}
```

**Response (success):**
```json
{
  "token": "...",
  "message": "Login successful"
}
```

**Response (error):**
```json
{
  "error": "Invalid credentials"
}
```

### GET /pokemons
List all pokémons with pagination.

**Query Parameters:**
- `limit` (optional): Number of results per page (default: 151)
- `offset` (optional): Number of results to skip (default: 0)

**Response:**
```json
{
  "results": [...],
  "count": 151,
  "next": "...",
  "previous": null
}
```

### GET /pokemons/:id
Returns detailed information for a specific pokémon.

**Response:**
```json
{
  "pokemon": {...},
  "species": {...}
}
```

## Technologies

- Ruby on Rails 7.1.6
- Puma (web server)
- rack-cors (CORS)
- PokeAPI (data source)
