defmodule CesiumLinkWeb.Components.Footer do
  use Phoenix.Component

  def footer(assigns) do
    ~H"""
    <footer>
      <.link href="https://cesium.di.uminho.pt" target="_blank" class="my-1 flex select-none items-center py-4">
        hacked with 🧡 by <img src="/images/cesium-logo.svg" width="84" height="24" alt="CeSIUM" class="ml-2" />
      </.link>
    </footer>
    """
  end
end
