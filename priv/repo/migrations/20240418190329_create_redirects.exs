defmodule CesiumLink.Repo.Migrations.CreateRedirects do
  use Ecto.Migration

  def change do
    create table(:redirects, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :name, :string
      add :slug, :string
      add :url, :string
      add :visits, :integer
      add :type, :string
      add :edited_at, :utc_datetime

      timestamps(type: :utc_datetime)
    end

    create unique_index(:redirects, [:slug])
  end
end
