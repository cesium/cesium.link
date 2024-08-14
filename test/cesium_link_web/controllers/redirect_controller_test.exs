defmodule CesiumLinkWeb.RedirectControllerTest do
  use CesiumLinkWeb.ConnCase

  import CesiumLink.RedirectsFixtures

  setup do
    %{redirect: redirect_fixture()}
  end

  test "redirects to the redirect's url", %{conn: conn, redirect: redirect} do
    conn = get(conn, ~p"/r/#{redirect.slug}")
    assert redirected_to(conn) == redirect.url
  end
end
