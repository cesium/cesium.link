defmodule CesiumLink.Standalone do
  @moduledoc """
  Standalone redis cache.
  """
  use Nebulex.Cache,
    otp_app: :safira,
    adapter: NebulexRedisAdapter
end
