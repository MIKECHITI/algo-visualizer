/**
 * Merge Sort
 * Time: O(n log n) | Space: O(n)
 * Divides the array in half recursively then merges sorted halves.
 */
export function mergeSort(inputArr) {
  const arr = [...inputArr]
  const frames = []
  let comparisons = 0
  let swaps = 0

  const addFrame = (a, hl, msg) =>
    frames.push({ arr: [...a], hl: { ...hl }, msg, comparisons, swaps })

  function merge(a, l, m, r) {
    const left = a.slice(l, m + 1)
    const right = a.slice(m + 1, r + 1)
    let i = 0, j = 0, k = l

    while (i < left.length && j < right.length) {
      comparisons++
      addFrame(a, { comparing: [l + i, m + 1 + j] }, `Merging [${l}..${m}] and [${m + 1}..${r}]`)
      if (left[i] <= right[j]) {
        a[k++] = left[i++]
      } else {
        a[k++] = right[j++]
        swaps++
        addFrame(a, { swapped: [k - 1] }, `Picked from right subarray`)
      }
    }
    while (i < left.length) a[k++] = left[i++]
    while (j < right.length) a[k++] = right[j++]
    addFrame(a, {}, `Merged segment [${l}..${r}]`)
  }

  function ms(a, l, r) {
    if (l >= r) return
    const m = Math.floor((l + r) / 2)
    addFrame(a, { comparing: [l, r] }, `Splitting [${l}..${r}] at midpoint ${m}`)
    ms(a, l, m)
    ms(a, m + 1, r)
    merge(a, l, m, r)
  }

  addFrame(arr, {}, 'Starting merge sort — divide and conquer')
  ms(arr, 0, arr.length - 1)
  addFrame(arr, { sorted: [...Array.from({ length: arr.length }, (_, k) => k)] }, 'Array fully sorted!')
  return frames
}
