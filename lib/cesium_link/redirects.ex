defmodule CesiumLink.Redirects do
  @moduledoc """
  The Redirects context.
  """

  import Ecto.Query, warn: false
  alias CesiumLink.Repo

  alias CesiumLink.Redirects.Redirect

  @doc """
  Returns the list of redirects.

  ## Examples

      iex> list_redirects()
      [%Redirect{}, ...]

  """
  def list_redirects do
    Repo.all(Redirect)
  end

  @doc """
  Gets a single redirect.

  Raises `Ecto.NoResultsError` if the Redirect does not exist.

  ## Examples

      iex> get_redirect!(123)
      %Redirect{}

      iex> get_redirect!(456)
      ** (Ecto.NoResultsError)

  """
  def get_redirect!(id), do: Repo.get!(Redirect, id)

  @doc """
  Creates a redirect.

  ## Examples

      iex> create_redirect(%{field: value})
      {:ok, %Redirect{}}

      iex> create_redirect(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_redirect(attrs \\ %{}) do
    %Redirect{}
    |> Redirect.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a redirect.

  ## Examples

      iex> update_redirect(redirect, %{field: new_value})
      {:ok, %Redirect{}}

      iex> update_redirect(redirect, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_redirect(%Redirect{} = redirect, attrs) do
    redirect
    |> Redirect.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a redirect.

  ## Examples

      iex> delete_redirect(redirect)
      {:ok, %Redirect{}}

      iex> delete_redirect(redirect)
      {:error, %Ecto.Changeset{}}

  """
  def delete_redirect(%Redirect{} = redirect) do
    Repo.delete(redirect)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking redirect changes.

  ## Examples

      iex> change_redirect(redirect)
      %Ecto.Changeset{data: %Redirect{}}

  """
  def change_redirect(%Redirect{} = redirect, attrs \\ %{}) do
    Redirect.changeset(redirect, attrs)
  end

  @doc """
  Increments the number of visits for a redirect.

  ## Examples

      iex> increment_redirect_visits(redirect)
      %Redirect{}

  """
  def increment_redirect_visits(%Redirect{} = redirect) do
    redirect
    |> update_redirect(%{visits: redirect.visits + 1})
  end

  @doc """
  Returns a redirect by slug.

  ## Examples

      iex> get_redirect_by_slug("slug")
      %Redirect{}

      iex> get_redirect_by_slug("slug")
      nil

  """
  def get_redirect_by_slug(slug) do
    query = from(r in Redirect, where: r.slug == ^slug)
    Repo.one(query)
  end

  @doc """
  Gets the redirect URL by slug, checks redirect type and updates view count.

  ## Examples

      iex> redirect_action("slug", :default)
      {:ok, "http://example.com"}

      iex> redirect_action("slug", :form)
      {:error, "Redirect not found"}

  """
  def redirect_action(slug, type) do
    case get_redirect_by_slug(slug) do
      %Redirect{url: url, type: redirect_type} = redirect ->
        if redirect_type == type do
          increment_redirect_visits(redirect)
          {:ok, url}
        else
          {:error, "Wrong redirect type"}
        end

      nil ->
        {:error, "Redirect not found"}
    end
  end
end
