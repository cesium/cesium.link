defmodule CesiumLinkWeb.RedirectLiveTest do
  use CesiumLinkWeb.ConnCase, async: true

  import Phoenix.LiveViewTest
  import CesiumLink.RedirectsFixtures
  import CesiumLink.AccountsFixtures

  describe "Redirects page" do
    test "renders the redirects page", %{conn: conn} do
      {:ok, _, html} =
        conn
        |> log_in_user(user_fixture())
        |> live(~p"/admin/redirects")

      assert html =~ "Redirect"
      assert html =~ "New Redirect"
    end

    test "renders the redirect form", %{conn: conn} do
      {:ok, _, html} =
        conn
        |> log_in_user(user_fixture())
        |> live(~p"/admin/redirects/new")

      assert html =~ "Name"
    end

    test "render the redirect form with a redirect", %{conn: conn} do
      redirect = redirect_fixture()

      {:ok, _, html} =
        conn
        |> log_in_user(user_fixture())
        |> live(~p"/admin/redirects/#{redirect.id}/edit")

      assert html =~ "Name"
      assert html =~ redirect.name
    end
  end
end
