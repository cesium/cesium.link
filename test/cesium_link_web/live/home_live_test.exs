defmodule CesiumLinkWeb.HomeLiveTest do
  use CesiumLinkWeb.ConnCase, async: true

  import Phoenix.LiveViewTest
  import CesiumLink.LinksFixtures
  alias CesiumLink.Links

  describe "Home page" do
    test "renders the home page", %{conn: conn} do
      {:ok, _, html} =
        conn
        |> live(~p"/")

      assert html =~ "Centro de Estudantes de Engenharia Informática da UMinho"
    end

    test "link click increments visits", %{conn: conn} do
      link = link_fixture()

      {:ok, view, _html} =
        conn
        |> live(~p"/")

      view |> element("##{link.id}") |> render_click()

      assert Links.get_link!(link.id).visits == 1
    end
  end
end
