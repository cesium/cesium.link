defmodule CesiumLink.Links.Link do
  @moduledoc """
  Link schema.
  """
  use CesiumLink.Schema

  @required_fields ~w(name emoji url attention edited_at)a
  @optional_fields ~w(index archived visits)a

  schema "links" do
    field :archived, :boolean, default: false
    field :attention, :boolean, default: false
    field :emoji, :string
    field :index, :integer
    field :name, :string
    field :url, :string
    field :visits, :integer, default: 0
    field :edited_at, :utc_datetime

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(link, attrs) do
    link
    |> cast(attrs, @required_fields ++ @optional_fields)
    |> unique_constraint(:index)
    |> validate_required(@required_fields)
    |> validate_url(:url)
  end
end
