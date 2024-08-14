defmodule CesiumLink.RedirectsFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `CesiumLink.RedirectsFixtures` context.
  """

  def valid_redirect_attributes(attrs \\ %{}) do
    Enum.into(attrs, %{
      name: "some name",
      slug: "slug",
      url: "https://example.com",
      type: "default",
      edited_at: DateTime.utc_now()
    })
  end

  def redirect_fixture(attrs \\ %{}) do
    {:ok, redirect} =
      attrs
      |> valid_redirect_attributes()
      |> CesiumLink.Redirects.create_redirect()

    redirect
  end
end
