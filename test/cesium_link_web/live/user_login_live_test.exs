defmodule CesiumLinkWeb.UserLoginLiveTest do
  use CesiumLinkWeb.ConnCase, async: true

  import Phoenix.LiveViewTest
  import CesiumLink.AccountsFixtures

  describe "Log in page" do
    test "renders log in page", %{conn: conn} do
      {:ok, _lv, html} = live(conn, ~p"/admin")

      assert html =~ "Sign in with Google"
    end

    test "redirects if already logged in", %{conn: conn} do
      result =
        conn
        |> log_in_user(user_fixture())
        |> live(~p"/admin")
        |> follow_redirect(conn, "/admin/links")

      assert {:ok, _conn} = result
    end
  end
end
