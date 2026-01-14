Rails.application.routes.draw do
  # Health check
  get "up" => "rails/health#show", as: :rails_health_check

  # Authentication
  post "login", to: "authentication#login"

  # Pokemons
  get "pokemons", to: "pokemons#index"
  get "pokemons/:id", to: "pokemons#show"
end
