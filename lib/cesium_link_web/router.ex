defmodule CesiumLinkWeb.Router do
  use CesiumLinkWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_live_flash
    plug :put_root_layout, html: {CesiumLinkWeb.Layouts, :root}
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", CesiumLinkWeb do
    pipe_through :browser

    live "/", HomeLive.Index, :index

    get "/r/:slug", RedirectController, :redirect_regular
    get "/f/:slug", RedirectController, :redirect_form

    scope "/admin" do
      live "/links", LinkLive.Index, :index
      live "/links/new", LinkLive.Index, :new
      live "/links/:id/edit", LinkLive.Index, :edit

      live "/redirects", RedirectLive.Index, :index
      live "/redirects/new", RedirectLive.Index, :new
      live "/redirects/:id/edit", RedirectLive.Index, :edit
    end
  end

  # Other scopes may use custom stacks.
  # scope "/api", CesiumLinkWeb do
  #   pipe_through :api
  # end

  # Enable LiveDashboard and Swoosh mailbox preview in development
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
      forward "/mailbox", Plug.Swoosh.MailboxPreview
    end
  end
end
