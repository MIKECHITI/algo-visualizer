/**
 * Bubble Sort
 * Time: O(n²) | Space: O(1)
 * Repeatedly swaps adjacent elements if they are in the wrong order.
 */
export function bubbleSort(inputArr) {
  const arr = [...inputArr]
  const frames = []
  const n = arr.length
  let comparisons = 0
  let swaps = 0
  const sortedIndices = new Set()

  const addFrame = (hl, msg) =>
    frames.push({ arr: [...arr], hl: { ...hl }, msg, comparisons, swaps })

  addFrame({}, 'Starting bubble sort...')

  for (let i = 0; i < n - 1; i++) {
    let swapped = false
    for (let j = 0; j < n - 1 - i; j++) {
      comparisons++
      addFrame({ comparing: [j, j + 1] }, `Comparing index ${j} (${arr[j]}) and ${j + 1} (${arr[j + 1]})`)

      if (arr[j] > arr[j + 1]) {
        ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
        swaps++
        swapped = true
        addFrame({ swapped: [j, j + 1] }, `Swapped ${arr[j + 1]} and ${arr[j]}`)
      }
    }
    sortedIndices.add(n - 1 - i)
    addFrame({ sorted: [...sortedIndices] }, `Pass ${i + 1} complete — largest bubbled to end`)
    if (!swapped) break
  }

  for (let k = 0; k < n; k++) sortedIndices.add(k)
  addFrame({ sorted: [...sortedIndices] }, 'Array fully sorted!')
  return frames
}
