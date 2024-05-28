defmodule CesiumLink.Links do
  @moduledoc """
  The Links context.
  """

  import Ecto.Query, warn: false
  alias CesiumLink.Repo

  alias CesiumLink.Links.Link

  @doc """
  Returns the list of links.

  ## Examples

      iex> list_links()
      [%Link{}, ...]

  """
  def list_links() do
    Link
    |> order_by(asc: :index)
    |> Repo.all()
  end

  @doc """
  Returns the list of unarchived links.

  ## Examples

      iex> list_unarchived_links()
      [%Link{}, ...]

  """
  def list_unarchived_links_by_index do
    Repo.all(from l in Link, where: l.archived == false, order_by: [asc: l.index])
  end

  @doc """
  Gets a single link.

  Raises `Ecto.NoResultsError` if the Link does not exist.

  ## Examples

      iex> get_link!(123)
      %Link{}

      iex> get_link!(456)
      ** (Ecto.NoResultsError)

  """
  def get_link!(id), do: Repo.get!(Link, id)

  @doc """
  Creates a link.

  ## Examples

      iex> create_link(%{field: value})
      {:ok, %Link{}}

      iex> create_link(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_link(attrs \\ %{}) do
    %Link{}
    |> Link.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a link.

  ## Examples

      iex> update_link(link, %{field: new_value})
      {:ok, %Link{}}

      iex> update_link(link, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_link(%Link{} = link, attrs) do
    link
    |> Link.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a link.

  ## Examples

      iex> delete_link(link)
      {:ok, %Link{}}

      iex> delete_link(link)
      {:error, %Ecto.Changeset{}}

  """
  def delete_link(%Link{} = link) do
    Repo.delete(link)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking link changes.

  ## Examples

      iex> change_link(link)
      %Ecto.Changeset{data: %Link{}}

  """
  def change_link(%Link{} = link, attrs \\ %{}) do
    Link.changeset(link, attrs)
  end

  @doc """
  Returns the next index a link should have.

  ## Examples

      iex> get_next_link_index()
      5
  """
  def get_next_link_index do
    (Repo.aggregate(from(l in Link), :max, :index) || -1) + 1
  end

  @doc """
  Increments the number of visits for a link.

  ## Examples

      iex> increment_link_visits(link)
      %Link{}

  """
  def increment_link_visits(%Link{} = link) do
    link
    |> update_link(%{visits: link.visits + 1})
  end
end
