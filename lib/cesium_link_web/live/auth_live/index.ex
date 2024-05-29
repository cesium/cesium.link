defmodule CesiumLinkWeb.AuthLive.Index do
  use CesiumLinkWeb, :live_view

  import CesiumLinkWeb.Components.GoogleOAuthButton

  @impl true
  def render(assigns) do
    ~H"""
    <div class="flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col gap-8">
        <img src={~p"/images/cesium-link.svg"} width="260" />
        <a href={@oauth_google_url}>
          <.google_oauth_button />
        </a>
      </div>
    </div>
    """
  end

  @impl true
  def mount(_params, _session, socket) do
    {:ok, socket}
  end

  @impl true
  def handle_params(_params, _url, socket) do
    {:noreply,
     socket
     |> assign(:oauth_google_url, fetch_oauth_google_url())
     |> assign(:page_title, "cesium.link - Log In")}
  end

  def fetch_oauth_google_url do
    CesiumLinkWeb.Endpoint.url()
    |> ElixirAuthGoogle.generate_oauth_url()
  end
end
