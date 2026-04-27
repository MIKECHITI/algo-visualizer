/**
 * Insertion Sort
 * Time: O(n²) | Space: O(1)
 * Builds a sorted portion by inserting one element at a time.
 */
export function insertionSort(inputArr) {
  const arr = [...inputArr]
  const frames = []
  const n = arr.length
  let comparisons = 0
  let swaps = 0
  const sortedIndices = new Set([0])

  const addFrame = (hl, msg) =>
    frames.push({ arr: [...arr], hl: { ...hl }, msg, comparisons, swaps })

  addFrame({ sorted: [0] }, 'Starting insertion sort — first element is trivially sorted')

  for (let i = 1; i < n; i++) {
    const key = arr[i]
    let j = i - 1
    addFrame({ pivot: [i], sorted: [...sortedIndices] }, `Inserting element ${key} (index ${i}) into sorted portion`)

    while (j >= 0) {
      comparisons++
      addFrame({ comparing: [j, j + 1], sorted: [...sortedIndices] }, `Comparing ${arr[j]} with key ${key}`)
      if (arr[j] > key) {
        arr[j + 1] = arr[j]
        swaps++
        j--
        addFrame({ swapped: [j + 1, j + 2], sorted: [...sortedIndices] }, `Shifted ${arr[j + 2]} right`)
      } else {
        break
      }
    }
    arr[j + 1] = key
    sortedIndices.add(i)
    addFrame({ sorted: [...sortedIndices] }, `Inserted ${key} at position ${j + 1}`)
  }

  addFrame({ sorted: [...Array.from({ length: n }, (_, k) => k)] }, 'Array fully sorted!')
  return frames
}
