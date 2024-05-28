defmodule CesiumLinkWeb.Components.Card do
  use Phoenix.Component

  alias Phoenix.LiveView.JS

  import CesiumLinkWeb.Components.Emoji

  attr :id, :string, required: true
  attr :link, :map, required: true

  def card(assigns) do
    ~H"""
    <.link id={@id} phx-update="ignore" phx-click={JS.push("click", value: %{id: @link.id})} href={@link.url} class="group relative overflow-hidden cursor-pointer basis-[45%] p-[1.5rem] min-w-[20rem] text-left m-[1rem] border-[1px] rounded-[10px] transition-all ease-out duration-[0.45s] select-none hover:left-0 lg:w-[85%] w-full lg:mx-[0.8rem] mx-0">
      <div class="w-full h-[5px] mt-[10px] self-end left-[-100%] bg-brand absolute transition-all ease-out duration-[0.3s] bottom-0 group-hover:left-0"/>
        <h3 class="flex m-0 text-[1.5rem] font-bold">
          <.emoji code={@link.emoji} class="flex h-full pr-3"/>
          <%= @link.name %>
        </h3>
    </.link>
    """
  end
end
