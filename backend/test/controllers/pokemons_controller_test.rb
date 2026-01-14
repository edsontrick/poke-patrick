require "test_helper"

class PokemonsControllerTest < ActionDispatch::IntegrationTest
  def setup
    # Generate a valid token for authentication
    payload = { username: "admin", timestamp: Time.current.to_i }
    @token = Base64.encode64(payload.to_json).strip
    @auth_headers = { "Authorization" => "Bearer #{@token}" }
  end

  test "should require authentication for index" do
    get pokemons_path

    assert_response :unauthorized
    json_response = JSON.parse(response.body)
    assert_equal "Unauthorized", json_response["error"]
  end

  test "should get pokemons list with authentication" do
    # Mock the PokeAPI response
    mock_response = {
      "count" => 151,
      "next" => nil,
      "previous" => nil,
      "results" => [
        { "name" => "bulbasaur", "url" => "https://pokeapi.co/api/v2/pokemon/1/" },
        { "name" => "ivysaur", "url" => "https://pokeapi.co/api/v2/pokemon/2/" }
      ]
    }

    PokeApiService.stub(:fetch_pokemon_list, mock_response) do
      get pokemons_path, headers: @auth_headers

      assert_response :success
      json_response = JSON.parse(response.body)
      assert json_response["results"].present?
      assert_equal 151, json_response["count"]
    end
  end

  test "should get pokemons list with pagination params" do
    mock_response = {
      "count" => 151,
      "next" => nil,
      "previous" => nil,
      "results" => []
    }

    PokeApiService.stub(:fetch_pokemon_list, mock_response) do
      get pokemons_path, params: { limit: 20, offset: 40 }, headers: @auth_headers

      assert_response :success
    end
  end

  test "should require authentication for show" do
    get pokemon_path(1)

    assert_response :unauthorized
    json_response = JSON.parse(response.body)
    assert_equal "Unauthorized", json_response["error"]
  end

  test "should get pokemon details with authentication" do
    mock_pokemon = {
      "id" => 1,
      "name" => "bulbasaur",
      "height" => 7,
      "weight" => 69,
      "types" => []
    }

    mock_species = {
      "id" => 1,
      "name" => "bulbasaur",
      "flavor_text_entries" => []
    }

    PokeApiService.stub(:fetch_pokemon, mock_pokemon) do
      PokeApiService.stub(:fetch_pokemon_species, mock_species) do
        get pokemon_path(1), headers: @auth_headers

        assert_response :success
        json_response = JSON.parse(response.body)
        assert json_response["pokemon"].present?
        assert json_response["species"].present?
      end
    end
  end

  test "should handle PokeAPI errors gracefully" do
    PokeApiService.stub(:fetch_pokemon_list, -> { raise StandardError, "API Error" }) do
      get pokemons_path, headers: @auth_headers

      assert_response :internal_server_error
      json_response = JSON.parse(response.body)
      assert json_response["error"].present?
    end
  end

  test "should return 404 for invalid pokemon" do
    PokeApiService.stub(:fetch_pokemon, -> { raise StandardError, "Not found" }) do
      get pokemon_path(99999), headers: @auth_headers

      assert_response :not_found
      json_response = JSON.parse(response.body)
      assert json_response["error"].present?
    end
  end

  test "should not accept invalid token" do
    invalid_headers = { "Authorization" => "Bearer invalid_token" }
    get pokemons_path, headers: invalid_headers

    assert_response :unauthorized
  end

  test "should not accept missing token" do
    get pokemons_path, headers: {}

    assert_response :unauthorized
  end
end

