import { API_URL } from '../Config'

function createObjectFromGeneric(list/*: Generic[]*/) {
  let tmp/*: { [id: number]: string }*/ = {}
  list.forEach(el => {
    tmp[el.id] = el.name
  })
  return tmp
}

export async function fetchLatestEpisodes()/*: Promise<RecentEpisode[]> */{
  const base = `${API_URL}/recents`
  const query = await fetch(base)
  const recent/*: RecentEpisode[]*/ = await query.json()
  return recent
}

export async function getAnimeDetails(aid) {
  const base = `${API_URL}/animes/${aid}`
  const query = await fetch(base)
  const anime = await query.json()
  return anime
}

export async function fetchDirectory() {
  const base = `${API_URL}/directory/`
  const query = await fetch(base)
  const directory = await query.json()
  return {
    genres: createObjectFromGeneric(directory.genres),
    states: createObjectFromGeneric(directory.states),
    types: createObjectFromGeneric(directory.types),
    animes: directory.animes
  }
}


// export async function fetchEpisode(anime_id){
  
// }

export async function fetchEpisode(animeId, episode) {
  const servers = await fetch(`${API_URL}/animes/${animeId}/episodes/${episode}/`)
  if (!servers.ok) {
    throw Error("Error al obtener informacion de servidores")
  }
  return await servers.json()
}
