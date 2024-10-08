defmodule CesiumLink.MixProject do
  use Mix.Project

  def project do
    [
      app: :cesium_link,
      version: "0.1.0",
      elixir: "~> 1.14",
      elixirc_paths: elixirc_paths(Mix.env()),
      start_permanent: Mix.env() == :prod,
      aliases: aliases(),
      deps: deps()
    ]
  end

  # Configuration for the OTP application.
  #
  # Type `mix help compile.app` for more information.
  def application do
    [
      mod: {CesiumLink.Application, []},
      extra_applications: [:logger, :runtime_tools]
    ]
  end

  # Specifies which paths to compile per environment.
  defp elixirc_paths(:test), do: ["lib", "test/support"]
  defp elixirc_paths(_), do: ["lib"]

  # Specifies your project dependencies.
  #
  # Type `mix help deps` for examples and options.
  defp deps do
    [
      # core
      {:phoenix, "~> 1.7.12"},
      {:phoenix_live_view, "~> 0.20.2"},
      {:phoenix_live_reload, "~> 1.2", only: :dev},

      # database
      {:ecto_sql, "~> 3.10"},
      {:phoenix_ecto, "~> 4.4"},
      {:postgrex, ">= 0.0.0"},

      # auth
      {:elixir_auth_google, "~> 1.6.9"},

      # frontend
      {:tailwind, "~> 0.2", runtime: Mix.env() == :dev},
      {:heroicons,
       github: "tailwindlabs/heroicons",
       tag: "v2.1.1",
       sparse: "optimized",
       app: false,
       compile: false,
       depth: 1},
      {:esbuild, "~> 0.8", runtime: Mix.env() == :dev},

      # monitoring
      {:telemetry_metrics, "~> 1.0"},
      {:telemetry_poller, "~> 1.0"},
      {:phoenix_live_dashboard, "~> 0.8.3"},

      # utilities
      {:gettext, "~> 0.20"},
      {:jason, "~> 1.2"},

      # server
      {:bandit, "~> 1.2"},
      {:dns_cluster, "~> 0.1.1"},

      # testing
      {:floki, ">= 0.30.0", only: :test},

      # tools
      {:timex, "~> 3.0"},
      {:credo, "~> 1.6", only: [:dev, :test], runtime: false},
      {:tailwind_formatter, "~> 0.3.7", only: [:dev, :test], runtime: false},
      {:doctest_formatter, "~> 0.2.0", runtime: false}
    ]
  end

  # Aliases are shortcuts or tasks specific to the current project.
  # For example, to install project dependencies and perform other setup tasks, run:
  #
  #     $ mix setup
  #
  # See the documentation for `Mix` for more info on aliases.
  defp aliases do
    [
      setup: ["deps.get", "ecto.setup", "assets.setup", "assets.build"],
      "ecto.setup": ["ecto.create", "ecto.migrate", "run priv/repo/seeds.exs"],
      "ecto.seed": ["run priv/repo/seeds.exs"],
      "ecto.reset": ["ecto.drop", "ecto.setup"],
      test: ["ecto.create --quiet", "ecto.migrate --quiet", "test"],
      "assets.setup": ["tailwind.install --if-missing", "esbuild.install --if-missing"],
      "assets.build": ["tailwind cesium_link", "esbuild cesium_link"],
      "assets.deploy": [
        "tailwind cesium_link --minify",
        "esbuild cesium_link --minify",
        "phx.digest"
      ],
      lint: ["credo -C default"]
    ]
  end
end
