/**
 * Selection Sort
 * Time: O(n²) | Space: O(1)
 * Repeatedly finds the minimum and places it at the front.
 */
export function selectionSort(inputArr) {
  const arr = [...inputArr]
  const frames = []
  const n = arr.length
  let comparisons = 0
  let swaps = 0
  const sortedIndices = new Set()

  const addFrame = (hl, msg) =>
    frames.push({ arr: [...arr], hl: { ...hl }, msg, comparisons, swaps })

  addFrame({}, 'Starting selection sort...')

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i
    for (let j = i + 1; j < n; j++) {
      comparisons++
      addFrame(
        { comparing: [minIdx, j], pivot: [i] },
        `Searching for min from index ${i} — current min at ${minIdx} (${arr[minIdx]})`
      )
      if (arr[j] < arr[minIdx]) minIdx = j
    }
    if (minIdx !== i) {
      ;[arr[i], arr[minIdx]] = [arr[minIdx], arr[i]]
      swaps++
      addFrame({ swapped: [i, minIdx] }, `Placed minimum ${arr[i]} at index ${i}`)
    }
    sortedIndices.add(i)
    addFrame({ sorted: [...sortedIndices] }, `Index ${i} is now in place`)
  }

  sortedIndices.add(n - 1)
  addFrame({ sorted: [...sortedIndices] }, 'Array fully sorted!')
  return frames
}
