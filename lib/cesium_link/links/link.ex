defmodule CesiumLink.Links.Link do
  use Ecto.Schema
  import Ecto.Changeset

  @required_fields ~w(name emoji url attention edited_at)a
  @optional_fields ~w(index archived visits)a

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
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
    |> validate_format(:url, ~r{^https?://}, message: "must start with http:// or https://")
  end
end
