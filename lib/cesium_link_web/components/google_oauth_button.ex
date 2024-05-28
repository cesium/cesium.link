defmodule CesiumLinkWeb.Components.GoogleOAuthButton do
  use Phoenix.Component

  def google_oauth_button(assigns) do
    ~H"""
      <div class="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent">
        <img src="/images/google.svg" class=""/>
        <p class="text-sm font-semibold leading-6">Sign in with Google</p>
      </div>
    """
  end
end
