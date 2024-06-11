defmodule CesiumLinkWeb.Router do
  @moduledoc """
  The application router.
  """
  use CesiumLinkWeb, :router

  import CesiumLinkWeb.UserAuth

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_live_flash
    plug :put_root_layout, html: {CesiumLinkWeb.Layouts, :root}
    plug :protect_from_forgery
    plug :put_secure_browser_headers
    plug :fetch_current_user
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", CesiumLinkWeb do
    pipe_through :browser

    live "/", HomeLive.Index, :index

    get "/auth/google/callback", GoogleAuthController, :index

    get "/r/:slug", RedirectController, :redirect_regular
    get "/f/:slug", RedirectController, :redirect_form
  end

  # Other scopes may use custom stacks.
  # scope "/api", CesiumLinkWeb do
  #   pipe_through :api
  # end

  # Enable LiveDashboard in development
  if Application.compile_env(:cesium_link, :dev_routes) do
    # If you want to use the LiveDashboard in production, you should put
    # it behind authentication and allow only admins to access it.
    # If your application does not have an admins-only section yet,
    # you can use Plug.BasicAuth to set up some basic authentication
    # as long as you are also using SSL (which you should anyway).
    import Phoenix.LiveDashboard.Router

    scope "/dev" do
      pipe_through :browser

      live_dashboard "/dashboard", metrics: CesiumLinkWeb.Telemetry
    end
  end

  ## Authentication routes

  scope "/", CesiumLinkWeb do
    pipe_through [:browser, :redirect_if_user_is_authenticated]

    live_session :redirect_if_user_is_authenticated,
      on_mount: [{CesiumLinkWeb.UserAuth, :redirect_if_user_is_authenticated}] do
      live "/admin", AuthLive.Index, :index
    end

    post "/users/log_in", UserSessionController, :create
  end

  ## Authenticated routes

  scope "/", CesiumLinkWeb do
    pipe_through [:browser, :require_authenticated_user]

    live_session :require_authenticated_user,
      on_mount: [{CesiumLinkWeb.UserAuth, :ensure_authenticated}] do
      scope "/admin" do
        live "/links", LinkLive.Index, :index
        live "/links/new", LinkLive.Index, :new
        live "/links/archived", ArchivedLive.Index, :index
        live "/links/:id/edit", LinkLive.Index, :edit
        live "/links/archived/:id/edit", ArchivedLive.Index, :edit

        live "/redirects", RedirectLive.Index, :index
        live "/redirects/new", RedirectLive.Index, :new
        live "/redirects/:id/edit", RedirectLive.Index, :edit

        live "/qrcode", QRCodeLive.Index, :index
      end
    end
  end

  scope "/", CesiumLinkWeb do
    pipe_through [:browser]

    delete "/users/log_out", UserSessionController, :delete
  end
end
