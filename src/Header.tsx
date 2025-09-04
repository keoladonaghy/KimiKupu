import { useEffect, useState } from 'react'

interface HeaderIcon {
  icon: React.ComponentType<{ className?: string; onClick?: () => void }>
  onClick: () => void
}

interface HeaderProps {
  // Language animation config
  languages: string[] // e.g., ['Olelo Hawaii', 'Reo Maori', 'Reo Tahiti', 'Gagana Samoa']
  languageDuration?: number // ms per language (default: 1000)

  // Right-side text config
  rightText: string // e.g., 'Tech Workshop'
  gameName: string // e.g., 'Word Finder'

  // Icons config (completely customizable per game)
  icons: HeaderIcon[] // Array of icon components with their click handlers

  // Optional styling
  centerAxisOffset?: string // CSS value for center axis position (default: '50%')
}

const Header = ({
  languages,
  languageDuration = 700,
  rightText,
  gameName,
  icons,
  centerAxisOffset = '50%',
}: HeaderProps) => {
  // Calculate the axis position based on the longest language name
  const longestLanguage = languages.reduce(
    (longest, current) => (current.length > longest.length ? current : longest),
    ''
  )

  // Approximate character width calculation (adjust multiplier as needed)
  const charWidth = 0.65 // roughly 0.65em per character for bold font with letter spacing
  const longestWidth = longestLanguage.length * charWidth
  const gapWidth = 0.5 // 0.5em gap between blocks
  const [animationState, setAnimationState] = useState<
    'initial' | 'cycling' | 'sliding' | 'complete'
  >('initial')
  const [currentLanguageIndex, setCurrentLanguageIndex] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    // Check if animation has already played this session
    const animationPlayed = sessionStorage.getItem('headerAnimationPlayed')
    if (animationPlayed) {
      setHasAnimated(true)
      setAnimationState('complete')
      return
    }

    // Start the animation sequence
    let timeoutId: NodeJS.Timeout

    const runAnimation = () => {
      setAnimationState('cycling')

      const cycleLanguages = () => {
        languages.forEach((_, index) => {
          setTimeout(() => {
            setCurrentLanguageIndex(index)
          }, index * languageDuration)
        })

        // After all languages, transition to final state
        const totalDuration = languages.length * languageDuration
        setTimeout(() => {
          setAnimationState('sliding')
          setTimeout(() => {
            setAnimationState('complete')
            setHasAnimated(true)
            sessionStorage.setItem('headerAnimationPlayed', 'true')
          }, 2000) // 2 seconds: 1000ms for Reo Moana + Tech Workshop, then 1000ms transition
        }, totalDuration)
      }

      // Start cycling after initial delay
      setTimeout(cycleLanguages, 1000)
    }

    timeoutId = setTimeout(runAnimation, 100)

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [languages, languageDuration])

  // Static version for return visits
  if (hasAnimated || sessionStorage.getItem('headerAnimationPlayed')) {
    return (
      <>
        <style>
          {`
            .header-gradient {
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              z-index: -1;
              pointer-events: none;
              background: linear-gradient(
                135deg,
                #061428 0%,
                #0b2a3c 5%,
                #6d949e 50%,
                #07253a 80%,
                #020a14 100%
              );
            }
            .static-header-container {
              display: flex;
              justify-content: space-between;
              align-items: baseline;
              width: 100%;
              padding: 8px 20px 16px 4px;
              font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;
              font-size: 16pt;
              font-weight: 800;
              letter-spacing: 0.3px;
              line-height: 1em;
              min-height: 1.2em;
              position: relative;
            }
            .static-text-container {
              display: flex;
              align-items: baseline;
              position: relative;
            }
            .static-left-text {
              color: hsl(0 0% 96%);
            }
            .static-left-text-block {
              width: ${longestWidth}em;
              text-align: right;
              margin-right: 0.5em;
              display: inline-block;
              white-space: nowrap;
              overflow: visible;
            }
            .static-right-text {
              color: hsl(35, 85%, 58%);
              text-align: left;
            }
            .static-icons-container {
              display: flex;
              align-items: center;
              gap: 4px;
            }
          `}
        </style>

        <div className="header-gradient" />

        <div className="static-header-container">
          <div className="static-text-container">
            <div className="static-left-text-block">
              <span className="static-left-text">Reo Moana</span>
            </div>
            <span className="static-right-text">{gameName}</span>
          </div>
          <div className="static-icons-container">
            {icons.map((iconConfig, index) => {
              const IconComponent = iconConfig.icon
              return (
                <IconComponent
                  key={index}
                  className="h-6 w-6 cursor-pointer text-white hover:text-gray-300"
                  onClick={iconConfig.onClick}
                />
              )
            })}
          </div>
        </div>
      </>
    )
  }

  const currentLanguage = languages[currentLanguageIndex]

  return (
    <>
      <style>
        {`
          .header-gradient {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;            
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

          .animated-header-container {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            width: 100%;
            padding: 8px 20px 16px 4px;
            font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;
            font-size: 16pt;
            font-weight: 800;
            letter-spacing: 0.3px;
            line-height: 1em;
            min-height: 1.2em;
            position: relative;
          }
          
          .animated-text-container {
            display: flex;
            align-items: baseline;
            position: relative;
          }
          
          .left-text-block {
            width: ${longestWidth}em;
            text-align: right;
            margin-right: 0.5em;
            display: inline-block;
            white-space: nowrap;
            overflow: visible;
          }
          
          .cycling-text {
            transition: opacity 0.5s ease-in-out;
            opacity: ${animationState === 'cycling' ? 1 : 0};
            color: hsl(0 0% 96%);
          }
          
          .right-text {
            opacity: ${
              animationState === 'cycling' || animationState === 'sliding'
                ? 1
                : 0
            };
            transition: opacity 0.3s ease-in-out;
            color: hsl(0 0% 96%);
            text-align: left;
          }

          .sliding-left-text {
            opacity: ${animationState === 'sliding' ? 1 : 0};
            transition: opacity 0.3s ease-in-out;
            color: hsl(0 0% 96%);
          }

          .final-text {
            transform: ${
              animationState === 'sliding' || animationState === 'complete'
                ? 'translateX(0)'
                : 'translateX(20px)'
            };
            opacity: ${animationState === 'complete' ? 1 : 0};
            transition: all 0.5s ease-in-out;
            display: flex;
            align-items: baseline;
          }
          
          .final-left-text {
            color: hsl(0 0% 96%);
          }
          
          .final-right-text {
            color: hsl(35, 85%, 58%);
            text-align: left;
          }
          
          .icons-container {
            display: flex;
            align-items: center;
            gap: 4px;
          }
        `}
      </style>

      <div className="header-gradient" />

      <div className="animated-header-container">
        <div className="animated-text-container">
          {animationState === 'cycling' && (
            <>
              <div className="left-text-block">
                <span className="cycling-text">{currentLanguage}</span>
              </div>
              <span className="right-text">{rightText}</span>
            </>
          )}

          {animationState === 'sliding' && (
            <>
              <div className="left-text-block">
                <span className="sliding-left-text">Reo Moana</span>
              </div>
              <span className="right-text">{rightText}</span>
            </>
          )}

          {animationState === 'complete' && (
            <div className="final-text">
              <div className="left-text-block">
                <span className="final-left-text">Reo Moana</span>
              </div>
              <span className="final-right-text">{gameName}</span>
            </div>
          )}
        </div>

        <div className="icons-container">
          {icons.map((iconConfig, index) => {
            const IconComponent = iconConfig.icon
            return (
              <IconComponent
                key={index}
                className="h-6 w-6 cursor-pointer text-white hover:text-gray-300"
                onClick={iconConfig.onClick}
              />
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Header
