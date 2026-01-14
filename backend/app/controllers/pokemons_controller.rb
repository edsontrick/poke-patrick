class PokemonsController < ApplicationController
  before_action :authenticate_request

  def index
    limit = params[:limit]&.to_i || 151
    offset = params[:offset]&.to_i || 0

    # Validate pagination parameters
    limit = 151 if limit <= 0 || limit > 151
    offset = 0 if offset < 0

    begin
      data = PokeApiService.fetch_pokemon_list(limit: limit, offset: offset)
      render json: {
        results: data['results'],
        count: data['count'],
        next: data['next'],
        previous: data['previous']
      }, status: :ok
    rescue Net::OpenTimeout, Net::ReadTimeout, SocketError => e
      render json: { error: 'Service temporarily unavailable. Please try again later.' }, 
             status: :service_unavailable
    rescue JSON::ParserError => e
      render json: { error: 'Invalid response from external service' }, 
             status: :bad_gateway
    rescue StandardError => e
      Rails.logger.error "Error fetching Pokemon list: #{e.message}"
      render json: { error: 'Failed to fetch Pokemon list' }, 
             status: :internal_server_error
    end
  end

  def show
    begin
      pokemon = PokeApiService.fetch_pokemon(params[:id])
      species = PokeApiService.fetch_pokemon_species(params[:id])

      render json: {
        pokemon: pokemon,
        species: species
      }, status: :ok
    rescue Net::OpenTimeout, Net::ReadTimeout, SocketError => e
      render json: { error: 'Service temporarily unavailable. Please try again later.' }, 
             status: :service_unavailable
    rescue JSON::ParserError => e
      render json: { error: 'Invalid response from external service' }, 
             status: :bad_gateway
    rescue StandardError => e
      Rails.logger.error "Error fetching Pokemon #{params[:id]}: #{e.message}"
      render json: { error: "Pokemon with ID #{params[:id]} not found" }, 
             status: :not_found
    end
  end
end

