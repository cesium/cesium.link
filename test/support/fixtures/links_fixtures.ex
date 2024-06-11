defmodule CesiumLink.LinksFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `CesiumLink.LinksFixtures` context.
  """

  def valid_link_attributes(attrs \\ %{}) do
    Enum.into(attrs, %{
      name: "some name",
      url: "https://example.com",
      index: 1,
      emoji: "an emoji",
      archived: false,
      edited_at: DateTime.utc_now()
    })
  end

  def link_fixture(attrs \\ %{}) do
    {:ok, link} =
      attrs
      |> valid_link_attributes()
      |> CesiumLink.Links.create_link()

    link
  end
end
