require "test_helper"
require "net/http"

class PokeApiServiceTest < ActiveSupport::TestCase
  test "fetch_pokemon_list should return parsed JSON" do
    mock_response_body = {
      "count" => 151,
      "next" => nil,
      "previous" => nil,
      "results" => [
        { "name" => "bulbasaur", "url" => "https://pokeapi.co/api/v2/pokemon/1/" }
      ]
    }.to_json

    mock_http_response = Net::HTTPResponse.new("1.1", "200", "OK")
    mock_http_response.body = mock_response_body

    Net::HTTP.stub :get_response, mock_http_response do
      result = PokeApiService.fetch_pokemon_list(limit: 151, offset: 0)

      assert result.is_a?(Hash)
      assert_equal 151, result["count"]
      assert result["results"].is_a?(Array)
    end
  end

  test "fetch_pokemon_list should raise error on non-200 response" do
    mock_http_response = Net::HTTPResponse.new("1.1", "500", "Internal Server Error")
    mock_http_response.body = "{}"

    Net::HTTP.stub :get_response, mock_http_response do
      assert_raises(StandardError) do
        PokeApiService.fetch_pokemon_list(limit: 151, offset: 0)
      end
    end
  end

  test "fetch_pokemon should return parsed JSON" do
    mock_response_body = {
      "id" => 1,
      "name" => "bulbasaur",
      "height" => 7,
      "weight" => 69
    }.to_json

    mock_http_response = Net::HTTPResponse.new("1.1", "200", "OK")
    mock_http_response.body = mock_response_body

    Net::HTTP.stub :get_response, mock_http_response do
      result = PokeApiService.fetch_pokemon(1)

      assert result.is_a?(Hash)
      assert_equal "bulbasaur", result["name"]
      assert_equal 1, result["id"]
    end
  end

  test "fetch_pokemon should raise error on non-200 response" do
    mock_http_response = Net::HTTPResponse.new("1.1", "404", "Not Found")
    mock_http_response.body = "{}"

    Net::HTTP.stub :get_response, mock_http_response do
      assert_raises(StandardError) do
        PokeApiService.fetch_pokemon(99999)
      end
    end
  end

  test "fetch_pokemon_species should return parsed JSON" do
    mock_response_body = {
      "id" => 1,
      "name" => "bulbasaur",
      "flavor_text_entries" => []
    }.to_json

    mock_http_response = Net::HTTPResponse.new("1.1", "200", "OK")
    mock_http_response.body = mock_response_body

    Net::HTTP.stub :get_response, mock_http_response do
      result = PokeApiService.fetch_pokemon_species(1)

      assert result.is_a?(Hash)
      assert_equal "bulbasaur", result["name"]
    end
  end

  test "fetch_pokemon_species should raise error on non-200 response" do
    mock_http_response = Net::HTTPResponse.new("1.1", "404", "Not Found")
    mock_http_response.body = "{}"

    Net::HTTP.stub :get_response, mock_http_response do
      assert_raises(StandardError) do
        PokeApiService.fetch_pokemon_species(99999)
      end
    end
  end
end

