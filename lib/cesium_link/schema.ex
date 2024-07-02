defmodule CesiumLink.Schema do
  import Ecto.Changeset

  defmacro __using__(_) do
    quote do
      use Ecto.Schema
      import Ecto.Changeset

      @primary_key {:id, :binary_id, autogenerate: true}
      @foreign_key_type :binary_id

      def validate_url(changeset, field) do
        changeset
        |> validate_format(
          :url,
          ~r/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
          message: "must start with http:// or https:// and have a valid domain"
        )
      end
    end
  end
end
