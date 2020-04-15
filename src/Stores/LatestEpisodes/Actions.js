import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  // Fetch user informations
  fetchLatestEpisodes: null,
  // The operation has started and is loading
  fetchLatestEpisodesLoading: null,
  // Recent informations were successfully fetched
  fetchLatestEpisodesSuccess: ['latestEpisodes'],
  // An error occurred
  fetchLatestEpisodesFailure: ['errorMessage'],
  // clear the last episode
  clearLast: null,
})

export const LatestEpisodesTypes = Types
export default Creators
