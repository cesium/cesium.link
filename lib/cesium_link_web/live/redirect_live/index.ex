defmodule CesiumLinkWeb.RedirectLive.Index do
  use CesiumLinkWeb, :admin_live_view

  alias CesiumLink.Redirects
  alias CesiumLink.Redirects.Redirect

  @impl true
  def mount(_params, _session, socket) do
    {:ok, stream(socket, :redirects, Redirects.list_redirects())}
  end

  @impl true
  def handle_params(params, _url, socket) do
    {:noreply, apply_action(socket, socket.assigns.live_action, params)}
  end

  defp apply_action(socket, :edit, %{"id" => id}) do
    socket
    |> assign(:page_title, "Edit Redirect")
    |> assign(:redirect, Redirects.get_redirect!(id))
  end

  defp apply_action(socket, :new, _params) do
    socket
    |> assign(:page_title, "New Redirect")
    |> assign(:redirect, %Redirect{})
  end

  defp apply_action(socket, :index, _params) do
    socket
    |> assign(:page_title, "Listing Redirects")
    |> assign(:redirect, nil)
  end

  @impl true
  def handle_info({CesiumLinkWeb.RedirectLive.FormComponent, {:saved, redirect}}, socket) do
    {:noreply, stream_insert(socket, :redirects, redirect)}
  end

  @impl true
  def handle_event("delete", %{"id" => id}, socket) do
    redirect = Redirects.get_redirect!(id)
    {:ok, _} = Redirects.delete_redirect(redirect)

    {:noreply, stream_delete(socket, :redirects, redirect)}
  end

  defp get_redirect_url(%Redirect{slug: slug, type: type}) do
    CesiumLinkWeb.Endpoint.url() <>
      case type do
        :default -> "/r/#{slug}"
        :form -> "/f/#{slug}"
      end
  end
end
