defmodule CesiumLinkWeb.Components.GoogleOAuthButton do
  use Phoenix.Component

  def google_oauth_button(assigns) do
    ~H"""
      <div class="h-[50px] w-[240px] flex items-center ring-1 rounded-lg ring-zinc-600">
        <img src="/images/google.svg" class="p-4"/>
        <p class="self-center">Sign in with Google</p>
      </div>
    """
  end
end
