defmodule CesiumLink.Redirects.Redirect do
  use Ecto.Schema
  import Ecto.Changeset

  @required_fields ~w(name slug url type edited_at)a
  @optional_fields ~w(visits)a

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "redirects" do
    field :name, :string
    field :slug, :string
    field :type, Ecto.Enum, values: [:default, :form]
    field :url, :string
    field :visits, :integer, default: 0
    field :edited_at, :utc_datetime

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(redirect, attrs) do
    redirect
    |> cast(attrs, @required_fields ++ @optional_fields)
    |> validate_required(@required_fields)
    |> validate_format(:url, ~r{^https?://}, message: "must start with http:// or https://")
    |> validate_format(:slug, ~r{^[a-z0-9-]+$}, message: "must contain only lowercase letters, numbers, and hyphens")
  end
end
