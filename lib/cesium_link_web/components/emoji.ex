defmodule CesiumLinkWeb.Components.Emoji do
  use Phoenix.Component

  attr :code, :string, required: true
  attr :class, :string, default: ""

  def emoji(assigns) do
    ~H"""
    <span>
      <em-emoji id={@code} set="twitter" class={@class} />
    </span>
    """
  end
end
