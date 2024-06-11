defmodule CesiumLinkWeb.LinkLiveTest do
  use CesiumLinkWeb.ConnCase, async: true

  import Phoenix.LiveViewTest
  import CesiumLink.LinksFixtures
  import CesiumLink.AccountsFixtures

  describe "Links page" do
    test "renders the links page", %{conn: conn} do
      {:ok, _, html} =
        conn
        |> log_in_user(user_fixture())
        |> live(~p"/admin/links")

      assert html =~ "Link"
      assert html =~ "New Link"
    end

    test "renders the link form", %{conn: conn} do
      {:ok, _, html} =
        conn
        |> log_in_user(user_fixture())
        |> live(~p"/admin/links/new")

      assert html =~ "Name"
    end

    test "render the link form with a link", %{conn: conn} do
      link = link_fixture()

      {:ok, _, html} =
        conn
        |> log_in_user(user_fixture())
        |> live(~p"/admin/links/#{link.id}/edit")

      assert html =~ "Name"
      assert html =~ "some name"
    end
  end
end
