defmodule CesiumLinkWeb.LinkLive.Index do
  use CesiumLinkWeb, :admin_live_view

  alias CesiumLink.Links
  alias CesiumLink.Links.Link

  @impl true
  def mount(_params, _session, socket) do
    {:ok, stream(socket, :links, Links.list_unarchived_links())}
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

  defp apply_action(socket, :archive, %{"id" => id}) do
    socket
    |> assign(:page_title, "Archive Link")
    |> assign(:link, Links.get_link!(id))
  end

  defp apply_action(socket, :new, _params) do
    socket
    |> assign(:page_title, "New Link")
    |> assign(:link, %Link{})
  end

  defp apply_action(socket, :index, _params) do
    socket
    |> assign(:page_title, "Links")
    |> assign(:link, nil)
  end

  @impl true
  def handle_info({CesiumLinkWeb.LinkLive.FormComponent, {:saved, link}}, socket) do
    {:noreply, stream_insert(socket, :links, link)}
  end

  @impl true
  def handle_event("archive", %{"id" => id}, socket) do
    link = Links.get_link!(id)
    {:ok, _} = Links.archive_link(link)

    {:noreply,
     stream_delete(socket, :links, link)
     |> push_patch(to: ~p"/admin/links")
     |> put_flash(:info, "Link archived successfully")}
  end

  @impl true
  def handle_event("update-sorting", %{"ids" => ids}, socket) do
    ids
    |> Enum.with_index(0)
    |> Enum.each(fn {"links-" <> id, index} ->
      id
      |> Links.get_link!()
      |> Links.update_link(%{index: index})
    end)

    {:noreply, socket}
  end

  def handle_event("end-time", _, socket) do
    {:noreply, socket |> push_navigate(to: ~p"/admin/links")}
  end

  def published?(%Link{publish_at: nil}), do: true

  def published?(%Link{publish_at: publish_at}),
    do: DateTime.compare(publish_at, DateTime.utc_now()) == :lt

  defp publish_in_future?(link), do: not published?(link)
end
