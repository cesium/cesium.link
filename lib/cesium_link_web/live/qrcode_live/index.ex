defmodule CesiumLinkWeb.QRCodeLive.Index do
  use CesiumLinkWeb, :admin_live_view

  @impl true
  def render(assigns) do
    ~H"""
    <div id="qr-code-generator" phx-hook="QRCodeGenerator" class="m-auto max-w-xl">
      <div class="px-5">
        <.input id="qr-code-input" name="URL" label="URL" placeholder="URL to encode" value="cesium.link" spellcheck="false" />
      </div>
      <div id="qr-code-view"></div>
    </div>
    """
  end

  @impl true
  def mount(_params, _session, socket) do
    {:ok, socket}
  end

  @impl true
  def handle_params(params, _url, socket) do
    {:noreply,
     socket
     |> assign(:page_title, "QR Code Generator")}
  end
end
