import {Player} from './types'
import Tile from './Tile'

type Props = {
  player: Player
  onClick: (e: HTMLDivElement) => void
}

const Sideboard = ({player, onClick}: Props) => {
  return (
    <>
      <Tile position='sideboard-up' tile={{player: player, orientation: 'up'}} onClick={onClick} />
      <Tile position='sideboard-down' tile={{player: player, orientation: 'down'}} onClick={onClick} />
    </>
  )
}

export default Sideboard