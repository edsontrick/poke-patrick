require 'net/http'
require 'json'

class PokeApiService
  BASE_URL = 'https://pokeapi.co/api/v2'

  def self.fetch_pokemon_list(limit: 151, offset: 0)
    uri = URI("#{BASE_URL}/pokemon?limit=#{limit}&offset=#{offset}")
    response = Net::HTTP.get_response(uri)

    if response.code == '200'
      JSON.parse(response.body)
    else
      raise StandardError, "Failed to fetch Pokemon list: HTTP #{response.code}"
    end
  end

  def self.fetch_pokemon(id_or_name)
    uri = URI("#{BASE_URL}/pokemon/#{id_or_name}")
    response = Net::HTTP.get_response(uri)

    if response.code == '200'
      JSON.parse(response.body)
    else
      raise StandardError, "Failed to fetch Pokemon: HTTP #{response.code}"
    end
  end

  def self.fetch_pokemon_species(id_or_name)
    uri = URI("#{BASE_URL}/pokemon-species/#{id_or_name}")
    response = Net::HTTP.get_response(uri)

    if response.code == '200'
      JSON.parse(response.body)
    else
      raise StandardError, "Failed to fetch Pokemon species: HTTP #{response.code}"
    end
  end
end

