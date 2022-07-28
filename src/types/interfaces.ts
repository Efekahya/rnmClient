export interface IEpisodeCardProps {
  episode: string
  date: string
  title: string
  description: string
  favorited: boolean
  handleSetFavorited: () => void
}
