defmodule CesiumLinkWeb.GoogleAuthController do
  use CesiumLinkWeb, :controller

  alias CesiumLink.Accounts
  alias CesiumLinkWeb.UserAuth

  @doc """
  Handles the callback from Google Auth API redirect.
  """
  def index(conn, %{"code" => code}) do
    case ElixirAuthGoogle.get_token(code, CesiumLinkWeb.Endpoint.url()) do
      {:ok, token} ->
        handle_google_auth(conn, token)

      {:error, _} ->
        conn
        |> put_flash(:error, "Error logging in with Google Auth")
        |> redirect(to: "/")
    end
  end

  defp handle_google_auth(conn, token) do
    {:ok, profile} = ElixirAuthGoogle.get_user_profile(token.access_token)

    case get_user_by_email(profile.email) do
      {:ok, user} ->
        conn
        |> UserAuth.log_in_user(user, %{email: user.email})

      {:error, _} ->
        conn
        |> put_flash(:error, "Error logging in with Google Auth")
        |> redirect(to: "/")
    end
  end

  # Returns an account for the given email (if one doesn't exist, it creates it)
  defp get_user_by_email(email) do
    Accounts.get_user_by_email(email)
    |> case do
      nil -> Accounts.register_user(%{email: email})
      user -> {:ok, user}
    end
  end
end
