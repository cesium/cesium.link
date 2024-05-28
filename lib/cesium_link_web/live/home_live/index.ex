defmodule CesiumLinkWeb.HomeLive.Index do
  use CesiumLinkWeb, :live_view

  import CesiumLinkWeb.Components.{Card, Footer}

  alias CesiumLink.Links

  @impl true
  def mount(_params, _session, socket) do
    {:ok, socket}
  end

  @impl true
  def handle_params(_params, _url, socket) do
    {:noreply,
    socket
    |> assign(:page_title, "CeSIUM")
    |> assign(:links, Links.list_unarchived_links_by_index())}
  end

  @impl true
  def handle_event("click", %{"id" => id}, socket) do
    Links.increment_link_visits(Links.get_link!(id))
    {:noreply, socket}
  end
end
