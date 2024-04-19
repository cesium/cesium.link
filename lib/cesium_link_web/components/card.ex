defmodule CesiumLinkWeb.Components.Card do
  use Phoenix.Component

  attr :link, :map, required: true

  def card(assigns) do
    ~H"""
    <.link href={@link.url} class="group relative overflow-hidden cursor-pointer basis-[45%] p-[1.5rem] min-w-[20rem] text-left m-[1rem] border-[1px] rounded-[10px] transition-all ease-out duration-[0.45s] select-none hover:left-0 lg:w-[85%] w-full lg:mx-[0.8rem] mx-0">
      <div class="w-full h-[5px] mt-[10px] self-end left-[-100%] bg-brand absolute transition-all ease-out duration-[0.3s] bottom-0 group-hover:left-0"/>
        <h3 class="m-0 text-[1.5rem] font-bold">
          <%= @link.emoji %>
          <%= @link.name %>
        </h3>
    </.link>
    """
  end
end
