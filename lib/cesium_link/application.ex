defmodule CesiumLink.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      CesiumLinkWeb.Telemetry,
      CesiumLink.Repo,
      CesiumLink.Standalone,
      {DNSCluster, query: Application.get_env(:cesium_link, :dns_cluster_query) || :ignore},
      {Phoenix.PubSub, name: CesiumLink.PubSub},
      # Start a worker by calling: CesiumLink.Worker.start_link(arg)
      # {CesiumLink.Worker, arg},
      # Start to serve requests, typically the last entry
      CesiumLinkWeb.Endpoint
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: CesiumLink.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    CesiumLinkWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
