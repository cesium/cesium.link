defmodule CesiumLink.Repo.Seeds.Redirects do
  alias CesiumLink.Repo
  alias CesiumLink.Redirects.Redirect

  @redirects [
    %{
      name: "CeSIUM Store",
      slug: "store",
      type: :default,
      url: "https://store.cesium.di.uminho.pt"
    },
    %{
      name: "SEI",
      slug: "sei",
      type: :default,
      url: "https://seium.org"
    },
    %{
      name: "LIP Script",
      slug: "lip.sh",
      type: :default,
      url: "https://raw.githubusercontent.com/cesium/LIP/master/install.sh"
    },
    %{
      name: "log/CeSIUM",
      slug: "log",
      type: :default,
      url: "https://issuu.com/cesiuminho"
    },
    %{
      name: "Recrutamento",
      slug: "recrutamento",
      type: :form,
      url: "https://docs.google.com/forms"
    },
    %{
      name: "Recrutamento de colaboradores",
      slug: "recrutamento",
      type: :form,
      url: "https://docs.google.com/forms"
    },
    %{
      name: "Inscrição de sócios",
      slug: "socios",
      type: :form,
      url: "https://docs.google.com/forms"
    },
    %{
      name: "Recrutamento CoderDojo Braga",
      slug: "coderdojo",
      type: :form,
      url: "https://docs.google.com/forms"
    },
    %{
      name: "Requisição de material",
      slug: "material",
      type: :form,
      url: "https://docs.google.com/forms"
    }
  ]

  def run do
    case Repo.all(Redirect) do
      [] ->
        seed_redirects()

      _ ->
        Mix.shell().error("Found links, aborting seeding links.")
    end
  end

  defp seed_redirects do
    Enum.each(@redirects, fn redirect ->
      Redirect.changeset(
        %Redirect{},
        redirect
        |> Map.put(:edited_at, DateTime.utc_now())
        |> Map.put(:visits, :rand.uniform(1000))
      )
      |> Repo.insert()
    end)
  end
end

CesiumLink.Repo.Seeds.Redirects.run()
