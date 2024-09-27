defmodule CesiumLink.Repo.Migrations.AddLinkScheduling do
  use Ecto.Migration

  def change do
    alter table(:links) do
      add :publish_at, :utc_datetime
    end
  end
end
