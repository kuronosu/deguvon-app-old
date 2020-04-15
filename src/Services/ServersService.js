import { API_URL } from "../Config"

// server: 'natsuki' | 'fembed'
// lang?: 'sub' | 'lat'
export const getVideo = async (animeId, episode, server, lang) => {
  const request = await fetch(
    `${API_URL}/animes/${animeId}/episodes/${episode}/${server}/${lang ? lang : ''}`)
  if (!request.ok) {
    throw Error("Error al obtener el video")
  }
  const videoData = await request.json()
  return videoData
}