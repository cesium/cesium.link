defmodule CesiumLink.RedirectsTest do
  use CesiumLink.DataCase

  alias CesiumLink.Redirects
  alias CesiumLink.Redirects.Redirect
  alias Ecto.UUID

  import CesiumLink.RedirectsFixtures

  describe "list_redirects/0" do
    test "returns all redirects" do
      redirect = redirect_fixture()
      redirects = Redirects.list_redirects() |> Enum.map(& &1.id)

      assert redirects == [redirect.id]
    end
  end

  describe "get_redirect!/1" do
    test "raises if id is invalid" do
      assert_raise Ecto.NoResultsError, fn ->
        Redirects.get_redirect!(UUID.generate())
      end
    end

    test "returns the redirect with the given id" do
      %{id: id} = redirect = redirect_fixture()
      assert %Redirect{id: ^id} = Redirects.get_redirect!(redirect.id)
    end
  end

  describe "get_redirect_by_slug/1" do
    test "returns the redirect with the given slug" do
      %{slug: slug} = redirect = redirect_fixture()
      assert %Redirect{slug: ^slug} = Redirects.get_redirect_by_slug(redirect.slug)
    end
  end
end
