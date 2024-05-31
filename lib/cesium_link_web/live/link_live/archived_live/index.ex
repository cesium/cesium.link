defmodule CesiumLinkWeb.ArchivedLive.Index do
  use CesiumLinkWeb, :admin_live_view

  alias CesiumLink.Links
  alias CesiumLink.Links.Link

  @impl true
  def mount(_params, _session, socket) do
    {:ok, stream(socket, :links, Links.list_archived_links())}
  end

  @impl true
  def handle_params(params, _url, socket) do
    {:noreply, apply_action(socket, socket.assigns.live_action, params)}
  end

  defp apply_action(socket, :edit, %{"id" => id}) do
    socket
    |> assign(:page_title, "Edit Link")
    |> assign(:link, Links.get_link!(id))
  end

  defp apply_action(socket, :index, _params) do
    socket
    |> assign(:page_title, "Listing Links")
    |> assign(:link, nil)
  end

  @impl true
  def handle_info({CesiumLinkWeb.LinkLive.FormComponent, {:saved, link}}, socket) do
    {:noreply, stream_insert(socket, :links, link)}
  end

  @impl true
  def handle_event("delete", %{"id" => id}, socket) do
    link = Links.get_link!(id)
    {:ok, _} = Links.delete_link(link)

    {:noreply, stream_delete(socket, :links, link)}
  end

  @impl true
  def handle_event("unarchive", %{"id" => id}, socket) do
    link = Links.get_link!(id)
    {:ok, _} = Links.unarchive_link(link)

    {:noreply, stream_delete(socket, :links, link)}
  end
end
