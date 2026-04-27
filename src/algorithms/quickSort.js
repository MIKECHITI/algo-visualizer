/**
 * Quick Sort
 * Time: O(n log n) avg | Space: O(log n)
 * Partitions array around a pivot element recursively.
 */
export function quickSort(inputArr) {
  const arr = [...inputArr]
  const frames = []
  let comparisons = 0
  let swaps = 0
  const sortedIndices = new Set()

  const addFrame = (hl, msg) =>
    frames.push({ arr: [...arr], hl: { ...hl }, msg, comparisons, swaps })

  function partition(low, high) {
    const pivot = arr[high]
    let i = low - 1
    addFrame({ pivot: [high] }, `Pivot = ${pivot} at index ${high}`)

    for (let j = low; j < high; j++) {
      comparisons++
      addFrame({ comparing: [j, high], pivot: [high] }, `Compare ${arr[j]} with pivot ${pivot}`)
      if (arr[j] <= pivot) {
        i++
        ;[arr[i], arr[j]] = [arr[j], arr[i]]
        swaps++
        addFrame({ swapped: [i, j], pivot: [high] }, `Swapped ${arr[j]} and ${arr[i]}`)
      }
    }
    ;[arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]
    swaps++
    sortedIndices.add(i + 1)
    addFrame({ pivot: [i + 1], sorted: [...sortedIndices] }, `Pivot placed at index ${i + 1}`)
    return i + 1
  }

  function qs(low, high) {
    if (low < high) {
      const pi = partition(low, high)
      qs(low, pi - 1)
      qs(pi + 1, high)
    } else if (low === high) {
      sortedIndices.add(low)
    }
  }

  addFrame({}, 'Starting quick sort...')
  qs(0, arr.length - 1)
  for (let k = 0; k < arr.length; k++) sortedIndices.add(k)
  addFrame({ sorted: [...sortedIndices] }, 'Array fully sorted!')
  return frames
}
