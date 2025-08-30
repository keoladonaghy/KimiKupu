import { ORTHOGRAPHY_PATTERN } from './tokenizer'

export type CharStatus = 'absent' | 'present' | 'correct'

export type CharValue = string

// Helper function to normalize case for comparison
const normalize = (char: string) => char.toLowerCase()

export const getStatuses = (
  guesses: string[][],
  solution: string,
  orthography: string[]
): { [key: string]: CharStatus } => {
  const charObj: { [key: string]: CharStatus } = {}
  const solutionChars = solution.split(ORTHOGRAPHY_PATTERN).filter((i) => i)
  guesses.forEach((word) => {
    word.forEach((letter, i) => {
      const letterNorm = normalize(letter)
      const solutionCharNorms = solutionChars.map(l => normalize(l))

      if (!solutionCharNorms.includes(letterNorm)) {
        // make status absent
        return (charObj[letter] = 'absent')
      }

      if (letterNorm === normalize(solutionChars[i])) {
        // make status correct
        return (charObj[letter] = 'correct')
      }

      if (charObj[letter] !== 'correct') {
        // make status present
        return (charObj[letter] = 'present')
      }
    })
  })

  return charObj
}

export const getGuessStatuses = (guess: string[], solution: string): CharStatus[] => {
  const splitSolution = solution.split(ORTHOGRAPHY_PATTERN).filter((i) => i)
  const splitGuess = guess

  const solutionCharsTaken = splitSolution.map((_) => false)

  const statuses: CharStatus[] = Array.from(Array(guess.length))

  // handle all correct cases first
  splitGuess.forEach((letter, i) => {
    if (normalize(letter) === normalize(splitSolution[i])) {
      statuses[i] = 'correct'
      solutionCharsTaken[i] = true
      return
    }
  })

  splitGuess.forEach((letter, i) => {
    if (statuses[i]) return

    const splitSolutionNorms = splitSolution.map(l => normalize(l))
    if (!splitSolutionNorms.includes(normalize(letter))) {
      // handles the absent case
      statuses[i] = 'absent'
      return
    }

    // now we are left with "present"s
    const indexOfPresentChar = splitSolution.findIndex(
      (x, index) =>
        normalize(x) === normalize(letter) && !solutionCharsTaken[index]
    )

    if (indexOfPresentChar > -1) {
      statuses[i] = 'present'
      solutionCharsTaken[indexOfPresentChar] = true
      return
    } else {
      statuses[i] = 'absent'
      return
    }
  })

  return statuses
}