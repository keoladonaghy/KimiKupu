export type CharStatus = 'absent' | 'present' | 'correct'

const normalize = (char: string) => char?.toLowerCase() || ''

export const getStatuses = (
  guesses: string[][],
  solution: string,
  orthography: string[]
): { [key: string]: CharStatus } => {
  const charObj: { [key: string]: CharStatus } = {}
  const orthographyPattern = new RegExp(`(${orthography.join('|')})`, 'gi')
  const solutionChars = solution.split(orthographyPattern).filter((i) => i)
  
  guesses.forEach((word) => {
    word.forEach((letter, i) => {
      const letterNorm = normalize(letter)
      const solutionCharNorms = solutionChars.map(l => normalize(l))
      if (!solutionCharNorms.includes(letterNorm)) {
        return (charObj[letter] = 'absent')
      }
      if (letterNorm === normalize(solutionChars[i])) {
        return (charObj[letter] = 'correct')
      }
      if (charObj[letter] !== 'correct') {
        return (charObj[letter] = 'present')
      }
    })
  })
  return charObj
}

export const getGuessStatuses = (
  guess: string[],
  solution: string,
  orthography: string[]
): CharStatus[] => {
  const orthographyPattern = new RegExp(`(${orthography.join('|')})`, 'gi')
  const splitSolution = solution.split(orthographyPattern).filter((i) => i)
  const splitGuess = guess
  const solutionCharsTaken = splitSolution.map((_) => false)
  const statuses: CharStatus[] = Array.from(Array(guess.length))

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
      statuses[i] = 'absent'
      return
    }

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