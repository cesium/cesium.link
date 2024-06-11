defmodule CesiumLink.LinksTest do
  use CesiumLink.DataCase

  alias CesiumLink.Links
  alias CesiumLink.Links.Link
  alias Ecto.UUID

  import CesiumLink.LinksFixtures

  describe "list_links/0" do
    test "returns all links" do
      link = link_fixture()
      links = Links.list_links() |> Enum.map(& &1.id)

      assert links == [link.id]
    end
  end

  describe "get_link!/1" do
    test "raises if id is invalid" do
      assert_raise Ecto.NoResultsError, fn ->
        Links.get_link!(UUID.generate())
      end
    end

    test "returns the link with the given id" do
      %{id: id} = link = link_fixture()
      assert %Link{id: ^id} = Links.get_link!(link.id)
    end
  end

  describe "archive_link/1" do
    test "archives the link" do
      link = link_fixture()
      assert not link.archived

      Links.archive_link(link)
      link = Links.get_link!(link.id)
      assert link.archived
    end
  end

  describe "unarhive_link/1" do
    test "unarchives the link" do
      link = link_fixture(archived: true)
      Links.archive_link(link)
      assert link.archived

      Links.unarchive_link(link)
      link = Links.get_link!(link.id)
      assert not link.archived
    end
  end

  describe "list_archived_links/0" do
    test "returns only archived links" do
      archived_links = Links.list_archived_links()

      assert Enum.all?(archived_links, fn link -> link.archived end)
    end
  end

  describe "list_unarchived_links/0" do
    test "returns only unarchived links" do
      unarchived_links = Links.list_unarchived_links()

      assert Enum.all?(unarchived_links, fn link -> not link.archived end)
    end
  end

  describe "get_next_link_index/0" do
    test "returns the next index" do
      link_fixture(index: 0)
      link_fixture(index: 1)
      link_fixture(index: 2)

      assert Links.get_next_link_index() == 3
    end
  end

  describe "increment_link_visits/1" do
    test "increments the number of visits" do
      link = link_fixture()
      assert link.visits == 0

      Links.increment_link_visits(link)
      link = Links.get_link!(link.id)
      assert link.visits == 1
    end
  end
end
