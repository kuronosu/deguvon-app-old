import React, { Component, useState, useEffect } from 'react'
import {
  View,
  ScrollView,
  Image,
} from 'react-native'
import { connect } from 'react-redux'
import { Chip, Text, Subheading, List, Paragraph, Card, Divider, Caption, IconButton } from 'react-native-paper'

import GeneralLayout from '../../../Utils/components/general-layout'
import { API_HOST } from '../../../Config'
import { PORTRAIT } from '../../../Stores/App/InitialState'
import AnimeActions from '../../../Stores/Anime/Actions'
import { getAnimeDetails } from '../../../Services/ApiService'

const AnimeDetail = ({ anime, aid, genres, types, states, found, mode, dispatch }) => {
  useEffect(() => {
    if (!found) {
      getAnimeDetails(aid).then(newAnime =>
        dispatch(AnimeActions.setAnimeData(newAnime, aid))
      ).catch(() => console.error("Error"))
      // fetch
    }
  }, [])

  let tmp_genres = found ? anime?.genres : []
  tmp_genres.sort((a, b) => genres[a].length - genres[b].length)

  if (found) {
    return (
      <GeneralLayout>
        <ScrollView style={{ margin: 5 }}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', marginBottom: 10 }}>
            <Image
              source={{ uri: `${API_HOST}${anime.cover}` }}
              style={{ width: mode ? '36%' : '19.65%', height: mode ? 180 : 210, resizeMode: 'contain' }}
            />
            <View style={{ flex: 1, marginHorizontal: 10 }}>
              <View style={{ flexDirection: 'row', paddingBottom: 10, justifyContent: 'space-between' }}>
                <View>
                  <Subheading >{`${types[anime.typea]}: ${states[anime.state]}`}</Subheading >
                  <Caption>{`Calificación: ${anime.score}`}</Caption>
                </View>
                <IconButton
                  icon='dots-vertical'
                  size={30}
                />
              </View>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                {
                  tmp_genres.map(g => (
                    <Chip
                      style={{ marginBottom: 5, marginHorizontal: 2.5 }}
                      key={`genre_${g}`}
                      textStyle={{ fontSize: 13 }}
                    >
                      {genres[g]}
                    </Chip>
                  ))
                }
              </View>
            </View>
          </View>
          <Card>
            <Card.Title title={anime.name} />
            <Divider />
            <Paragraph style={{ margin: 7 }}>{anime.synopsis}</Paragraph>
          </Card>
          <List.Section title="Animes Relacionados">
            {
              anime.relations.length == 0 ?
                <List.Item
                  style={{ paddingVertical: 0, marginVertical: 0 }}
                  title='No tiene anime relacionados'
                /> :
                anime.relations.map(r => (
                  <List.Item
                    style={{ paddingVertical: 0, marginVertical: 0 }}
                    title={r.ra_name}
                    description={r.relation}
                    key={r.animeflv_url}
                  />
                ))
            }
          </List.Section>
        </ScrollView>
      </GeneralLayout>
    )
  }
  return (
    <GeneralLayout style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Text>Cargando</Text>
    </GeneralLayout>
  )
}

const mapStateToProps = state => ({
  found: state.anime.data != undefined,
  anime: state.anime.data,
  aid: state.anime.aid,
  genres: state.directory.data.genres,
  types: state.directory.data.types,
  states: state.directory.data.states,
  mode: state.app.device.orientation == PORTRAIT ? true : false,
})

export default connect(mapStateToProps)(AnimeDetail)