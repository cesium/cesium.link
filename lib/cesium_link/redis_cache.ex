defmodule CesiumLink.Standalone do
  @moduledoc """
  Standalone redis cache.
  """
  use Nebulex.Cache,
    otp_app: :cesium_link,
    adapter: NebulexRedisAdapter
end
