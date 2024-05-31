defmodule CesiumLinkWeb.LinkLive.FormComponent do
  use CesiumLinkWeb, :live_component

  alias CesiumLink.Links

  @impl true
  def render(assigns) do
    ~H"""
    <div>
      <.header>
        <%= @title %>
        <:subtitle>Links appear as highlights on the home page of the app.</:subtitle>
      </.header>

      <.simple_form for={@form} id="link-form" phx-target={@myself} phx-change="validate" phx-submit="save">
        <.input field={@form[:name]} type="text" label="Name" />
        <.input field={@form[:emoji]} type="emoji" label="Emoji" />
        <.input field={@form[:url]} type="text" label="URL" />
        <.input field={@form[:attention]} type="checkbox" label="Attention" />
        <:actions>
          <.button phx-disable-with="Saving...">Save Link</.button>
        </:actions>
      </.simple_form>
    </div>
    """
  end

  @impl true
  def update(%{link: link} = assigns, socket) do
    changeset = Links.change_link(link)

    {:ok,
     socket
     |> assign(assigns)
     |> assign_form(changeset)}
  end

  @impl true
  def handle_event("validate", %{"link" => link_params}, socket) do
    changeset =
      socket.assigns.link
      |> Links.change_link(link_params)
      |> Map.put(:action, :validate)

    {:noreply, assign_form(socket, changeset)}
  end

  def handle_event("save", %{"link" => link_params}, socket) do
    save_link(socket, socket.assigns.action, link_params)
  end

  defp save_link(socket, :edit, link_params) do
    case Links.update_link(
           socket.assigns.link,
           link_params |> Map.put_new("edited_at", Timex.now())
         ) do
      {:ok, link} ->
        notify_parent({:saved, link})

        {:noreply,
         socket
         |> put_flash(:info, "Link updated successfully")
         |> push_patch(to: socket.assigns.patch)}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply, assign_form(socket, changeset)}
    end
  end

  defp save_link(socket, :new, link_params) do
    case Links.create_link(
           link_params
           |> Map.put_new("index", Links.get_next_link_index())
           |> Map.put_new("edited_at", Timex.now())
         ) do
      {:ok, link} ->
        notify_parent({:saved, link})

        {:noreply,
         socket
         |> put_flash(:info, "Link created successfully")
         |> push_patch(to: socket.assigns.patch)}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply, assign_form(socket, changeset)}
    end
  end

  defp assign_form(socket, %Ecto.Changeset{} = changeset) do
    assign(socket, :form, to_form(changeset))
  end

  defp notify_parent(msg), do: send(self(), {__MODULE__, msg})
end
