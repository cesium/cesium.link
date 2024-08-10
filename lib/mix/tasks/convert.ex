defmodule Mix.Tasks.Convert do
  @moduledoc """
  Task to read data exported (in CSV files, one for each table) from the old cesium.link project and import it to database following the new schemas.
  """
  use Mix.Task

  alias CesiumLink.Redirects.Redirect
  alias CesiumLink.Repo
  alias CesiumLink.Links.Link

  def run(files) do
    case length(files) do
      3 ->
        Mix.Task.run("app.start")

        convert_links(Enum.at(files, 0))
        convert_redirects(Enum.at(files, 1))
        convert_forms(Enum.at(files, 2))

      _ ->
        Mix.shell().error("Invalid number of arguments")
    end
  end

  defp convert_links(file) do
    file
    |> parse_csv()
    |> Enum.each(fn [
                      _id,
                      _version,
                      archived,
                      attention,
                      visits,
                      created_at,
                      emoji,
                      index,
                      _slug,
                      title,
                      updated_at,
                      url
                    ] ->
      %Link{
        archived: to_bool(archived),
        attention: to_bool(attention),
        visits: String.to_integer(visits),
        inserted_at: to_datetime(created_at),
        emoji: to_emoji(emoji),
        index: String.to_integer(index),
        name: title,
        edited_at: to_datetime(updated_at),
        url: url
      }
      |> Repo.insert()
    end)
  end

  defp convert_redirects(file) do
    file
    |> parse_csv()
    |> Enum.each(fn [_id, _version, created_at, name, slug, updated_at, url, visits] ->
      %Redirect{
        inserted_at: to_datetime(created_at),
        name: name,
        slug: slug,
        edited_at: to_datetime(updated_at),
        url: url,
        visits: String.to_integer(visits),
        type: :default
      }
      |> Repo.insert()
    end)
  end

  defp convert_forms(file) do
    file
    |> parse_csv()
    |> Enum.each(fn [_id, _version, created_at, name, slug, updated_at, url, visits] ->
      %Redirect{
        inserted_at: to_datetime(created_at),
        name: name,
        slug: slug,
        edited_at: to_datetime(updated_at),
        url: url,
        visits: String.to_integer(visits),
        type: :form
      }
      |> Repo.insert()
    end)
  end

  defp parse_csv(path) do
    case path |> File.read() do
      {:ok, content} ->
        content
        |> String.replace(~r/\r\n/, "\n")
        |> String.split("\n")
        |> Enum.map(&String.split(&1, ","))
        |> Enum.drop(-1)

      {:error, reason} ->
        raise reason
    end
  end

  defp to_bool("true"), do: true
  defp to_bool("false"), do: false

  defp to_datetime(date) do
    case Timex.parse(date, "{ISO:Extended}") do
      {:ok, date} -> date |> DateTime.truncate(:second)
      {:error, _} -> Timex.now() |> DateTime.truncate(:second)
    end
  end

  defp to_emoji(emoji) do
    emoji
    |> String.replace(":", "")
    |> String.trim(" ")
  end
end
