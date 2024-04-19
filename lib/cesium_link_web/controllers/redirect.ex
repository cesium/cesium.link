defmodule CesiumLinkWeb.RedirectController do
  use CesiumLinkWeb, :controller

  alias CesiumLink.Redirects

  def redirect_regular(conn, %{"slug" => slug}) do
    conn
    |> redirect(slug, :default)
  end

  def redirect_form(conn, %{"slug" => slug}) do
    conn
    |> redirect(slug, :form)
  end

  defp redirect(conn, slug, type) do
    case Redirects.redirect_action(slug, type) do
      {:ok, url} -> conn |> redirect(external: url)
      {:error, _} -> conn |> put_status(404)
    end
  end
end
