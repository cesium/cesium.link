defmodule CesiumLink.Repo.Seeds.Links do
  alias CesiumLink.Repo
  alias CesiumLink.Links
  alias CesiumLink.Links.Link

  @links [
    %{
      name: "Calendarium",
      emoji: "date",
      url: "https://calendario.cesium.di.uminho.pt"
    },
    %{
      name: "CeSIUM Store",
      emoji: "shopping_trolley",
      url: "https://store.cesium.di.uminho.pt"
    },
    %{
      name: "CeSIUM Pelo Mundo",
      emoji: "world_map",
      url: "https://pelomundo.cesium.di.uminho.pt"
    },
    %{
      name: "CoderDojo Braga",
      emoji: "yin_yang",
      url: "https://coderdojobraga.org"
    },
    %{
      name: "Periférico",
      emoji: "studio_microphone",
      url: "https://periferico.cesium.di.uminho.pt"
    },
    %{
      name: "About Us",
      emoji: "star",
      url: "https://cesium.di.uminho.pt/about"
    }
  ]

  @archived_links [
    %{
      name: "SEI",
      emoji: "robot_face",
      url: "https://seium.org"
    },
    %{
      name: "JOIN",
      emoji: "ladybug",
      url: "https://join.di.uminho.pt"
    },
    %{
      name: "Hackathon Bugsbyte",
      emoji: "beetle",
      url: "https://bugsbyte.org"
    },
    %{
      name: "Codeweek",
      emoji: "minidisc",
      url: "https://codeweek.cesium.di.uminho.pt"
    }
  ]

  def run do
    case Repo.all(Link) do
      [] ->
        seed_links()
        seed_archived_links()

      _ ->
        Mix.shell().error("Found links, aborting seeding links.")
    end
  end

  def seed_links do
    Enum.each(@links, fn link ->
      Link.changeset(
        %Link{},
        link
        |> Map.put(:edited_at, DateTime.utc_now())
        |> Map.put(:index, Links.get_next_link_index())
        |> Map.put(:visits, :rand.uniform(1000))
      )
      |> Repo.insert()
    end)
  end

  def seed_archived_links do
    Enum.each(@archived_links, fn link ->
      Link.changeset(
        %Link{},
        link
        |> Map.put(:edited_at, DateTime.utc_now())
        |> Map.put(:visits, :rand.uniform(1000))
        |> Map.put(:archived, true)
      )
      |> Repo.insert()
    end)
  end
end

CesiumLink.Repo.Seeds.Links.run()
