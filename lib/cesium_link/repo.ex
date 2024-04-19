defmodule CesiumLink.Repo do
  use Ecto.Repo,
    otp_app: :cesium_link,
    adapter: Ecto.Adapters.Postgres
end
