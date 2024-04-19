defmodule CesiumLinkWeb.GoogleAuthController do
  use CesiumLinkWeb, :controller

  @doc """
  `index/2` handles the callback from Google Auth API redirect.
  """
  def index(conn, %{"code" => code}) do
    {:ok, token} = ElixirAuthGoogle.get_token(code, CesiumLinkWeb.Endpoint.url())
    {:ok, profile} = ElixirAuthGoogle.get_user_profile(token.access_token)
    IO.inspect(profile)
    conn
    |> redirect("/admin/links")
  end
end
