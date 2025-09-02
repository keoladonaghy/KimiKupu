import { useEffect, useState } from 'react'

interface AnimationPhase {
  text: string
  duration: number
  color: string
}

interface FinalTextPart {
  text: string
  color: string
}

interface AnimationConfig {
  phases: AnimationPhase[]
  finalText: FinalTextPart[]
}

const AnimatedTitle = () => {
  const [animationState, setAnimationState] = useState<
    'initial' | 'cycling' | 'sliding' | 'complete'
  >('initial')
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)

  const animationConfig: AnimationConfig = {
    phases: [
      { text: 'Reo', duration: 2000, color: 'hsl(0 0% 96%)' },
      { text: 'ʻŌlelo', duration: 2000, color: 'hsl(0 0% 96%)' },
      { text: 'Kupu', duration: 2000, color: 'hsl(0 0% 96%)' },
      { text: 'Gagana', duration: 2000, color: 'hsl(0 0% 96%)' },
    ],
    finalText: [
      { text: 'Reo Moana', color: 'hsl(0 0% 96%)' },
      { text: 'Word Finder', color: 'hsl(35, 85%, 58%)' },
    ],
  }

  useEffect(() => {
    // Check if animation has already played this session
    const animationPlayed = sessionStorage.getItem('reoMoanaAnimationPlayed')
    if (animationPlayed) {
      setHasAnimated(true)
      setAnimationState('complete')
      return
    }

    // Start the animation sequence
    let timeoutId: NodeJS.Timeout

    const runAnimation = () => {
      setAnimationState('cycling')

      const cyclePhases = () => {
        animationConfig.phases.forEach((phase, index) => {
          setTimeout(() => {
            setCurrentPhaseIndex(index)
          }, index * phase.duration)
        })

        // After all phases, transition to final state
        const totalDuration = animationConfig.phases.reduce(
          (sum, phase) => sum + phase.duration,
          0
        )
        setTimeout(() => {
          setAnimationState('sliding')
          setTimeout(() => {
            setAnimationState('complete')
            setHasAnimated(true)
            sessionStorage.setItem('reoMoanaAnimationPlayed', 'true')
          }, 1000) // 1 second slide duration
        }, totalDuration)
      }

      // Start cycling after initial delay
      setTimeout(cyclePhases, 1000)
    }

    timeoutId = setTimeout(runAnimation, 100)

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [animationConfig.phases])

  // Static version for return visits
  if (hasAnimated || sessionStorage.getItem('reoMoanaAnimationPlayed')) {
    return (
      <>
        <style>
          {`
            .rm-gradient {
              position: absolute;
              inset: 0;
              z-index: -1;
              pointer-events: none;
              background: linear-gradient(
                180deg,
                #061428 0%,
                #0b2a3c 5%,
                #7fa9b4 50%,
                #07253a 80%,
                #020a14 100%
              );
            }

            .static-title-container {
              display: flex;
              align-items: center;
              gap: 0.5em;
              font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;
              font-size: 16pt;
              font-weight: 800;
              letter-spacing: 0.3px;
              line-height: 1em;
              margin: 40px 0 16px 20px;
            }
          `}
        </style>

        <div className="rm-gradient" />

        <div className="static-title-container">
          <span style={{ color: animationConfig.finalText[0].color }}>
            {animationConfig.finalText[0].text}
          </span>
          <span style={{ color: animationConfig.finalText[1].color }}>
            {animationConfig.finalText[1].text}
          </span>
        </div>
      </>
    )
  }

  const currentPhase = animationConfig.phases[currentPhaseIndex]

  return (
    <>
      <style>
        {`
          .rm-gradient {
            position: absolute;
            inset: 0;
            z-index: -1;
            pointer-events: none;
            background: linear-gradient(
              180deg,
              #061428 0%,
              #0b2a3c 5%,
              #7fa9b4 50%,
              #07253a 80%,
              #020a14 100%
            );
          }

          .animated-title-container {
            display: flex;
            align-items: center;
            gap: 0.5em;
            font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;
            font-size: 16pt;
            font-weight: 800;
            letter-spacing: 0.3px;
            line-height: 1em;
            margin: 32px 0 16px 40px;
            min-height: 1.2em;
          }

          .cycling-text {
            transition: opacity 0.5s ease-in-out;
            opacity: ${animationState === 'cycling' ? 1 : 0};
          }

          .final-text {
            transform: ${
              animationState === 'sliding' || animationState === 'complete'
                ? 'translateX(0)'
                : 'translateX(20px)'
            };
            opacity: ${animationState === 'complete' ? 1 : 0};
            transition: all 1s ease-in-out;
          }
        `}
      </style>

      <div className="rm-gradient" />

      <div className="animated-title-container">
        {animationState === 'cycling' && (
          <span className="cycling-text" style={{ color: currentPhase?.color }}>
            {currentPhase?.text}
          </span>
        )}

        {(animationState === 'sliding' || animationState === 'complete') && (
          <div className="final-text" style={{ display: 'flex', gap: '0.5em' }}>
            <span style={{ color: animationConfig.finalText[0].color }}>
              {animationConfig.finalText[0].text}
            </span>
            <span style={{ color: animationConfig.finalText[1].color }}>
              {animationConfig.finalText[1].text}
            </span>
          </div>
        )}
      </div>
    </>
  )
}

export default AnimatedTitle
