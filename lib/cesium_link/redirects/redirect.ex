defmodule CesiumLink.Redirects.Redirect do
  @moduledoc """
  Redirect schema.
  """
  use CesiumLink.Schema

  @required_fields ~w(name slug url type edited_at)a
  @optional_fields ~w(visits)a

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
    |> validate_url(:url)
    |> validate_format(:slug, ~r{^[a-z0-9-]+$},
      message: "must contain only lowercase letters, numbers, and hyphens"
    )
    |> unique_constraint([:slug, :type], message: "already in use")
  end
end
