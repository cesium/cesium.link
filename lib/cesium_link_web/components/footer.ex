defmodule CesiumLinkWeb.Components.Footer do
  use Phoenix.Component

  def footer(assigns) do
    ~H"""
    <footer class="border-t-[1px] border-[#eaeaea] w-full py-5">
      <!-- Socials -->
      <div class="flex w-full justify-center gap-6 pb-2">
        <.link href="https://instagram.com/cesiuminho" target="_blank">
          <img src="/images/socials/instagram.svg" width="24" height="24" alt="Instagram" />
        </.link>
        <.link href="https://facebook.com/cesiuminho" target="_blank">
          <img src="/images/socials/facebook.svg" width="24" height="24" alt="Facebook" />
        </.link>
        <.link href="https://x.com/cesiuminho" target="_blank">
          <img src="/images/socials/x.svg" width="24" height="24" alt="X" />
        </.link>
        <.link href="https://github.com/cesium" target="_blank">
          <img src="/images/socials/github.svg" width="24" height="24" alt="GitHub" />
        </.link>
      </div>
      <!-- Credits -->
      <.link href="https://cesium.pt" target="_blank" class="flex w-full select-none items-center justify-center py-4">
        hacked with 🧡 by <img src="/images/cesium-logo.svg" width="84" height="24" alt="CeSIUM" class="ml-2" />
      </.link>
    </footer>
    """
  end
end
