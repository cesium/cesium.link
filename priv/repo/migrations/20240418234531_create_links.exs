defmodule CesiumLink.Repo.Migrations.CreateLinks do
  use Ecto.Migration

  def change do
    create table(:links, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :name, :string
      add :emoji, :string
      add :url, :string
      add :visits, :integer
      add :index, :integer
      add :attention, :boolean, default: false, null: false
      add :archived, :boolean, default: false, null: false
      add :edited_at, :utc_datetime
      add :in_future, :boolean, default: false, null: false

      timestamps(type: :utc_datetime)
    end
  end
end
