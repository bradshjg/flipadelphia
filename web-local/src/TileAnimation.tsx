import {SlideAnimation, FlipAnimation} from "./types"

type Props = {
  animation?: SlideAnimation | FlipAnimation
}

const slide = (duration: number, endPosition: [number, number]): string => {return `
  .slide-animation {
    animation-duration: ${duration}s;
    animation-name: move-tile;
    animation-fill-mode: forwards;
  }

  @keyframes move-tile {
    from {
      translate: 0 0;
    }

    50% {
      scale: 120%;
    }

    to {
      translate: ${endPosition[0]}px ${endPosition[1]}px;
    }
  }
`}

const TileAnimation = ({animation}: Props) => {
  if (!animation) { return }
  let animationStyle: string
  switch (animation.kind) {
    case 'slide':
      animationStyle = slide(animation.duration, animation.endPosition)
      break
    default:
      animationStyle = ''
  }
  return (
    <style>{animationStyle}</style>
  )
}

export default TileAnimation