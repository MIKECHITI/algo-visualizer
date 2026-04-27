export { bubbleSort } from './bubbleSort.js'
export { selectionSort } from './selectionSort.js'
export { insertionSort } from './insertionSort.js'
export { mergeSort } from './mergeSort.js'
export { quickSort } from './quickSort.js'

export const ALGORITHMS = {
  bubble: {
    name: 'Bubble Sort',
    fn: 'bubbleSort',
    time: 'O(n²)',
    space: 'O(1)',
    description: 'Repeatedly swaps adjacent elements that are out of order. Simple but slow — great for learning.',
    worstCase: 'O(n²)',
    bestCase: 'O(n)',
    stable: true,
  },
  selection: {
    name: 'Selection Sort',
    fn: 'selectionSort',
    time: 'O(n²)',
    space: 'O(1)',
    description: 'Finds the minimum element each pass and places it at the front. Always O(n²) regardless of input.',
    worstCase: 'O(n²)',
    bestCase: 'O(n²)',
    stable: false,
  },
  insertion: {
    name: 'Insertion Sort',
    fn: 'insertionSort',
    time: 'O(n²)',
    space: 'O(1)',
    description: 'Builds a sorted section one element at a time. Very fast on nearly-sorted data.',
    worstCase: 'O(n²)',
    bestCase: 'O(n)',
    stable: true,
  },
  merge: {
    name: 'Merge Sort',
    fn: 'mergeSort',
    time: 'O(n log n)',
    space: 'O(n)',
    description: 'Divides array in half recursively, then merges sorted halves. Guaranteed O(n log n) always.',
    worstCase: 'O(n log n)',
    bestCase: 'O(n log n)',
    stable: true,
  },
  quick: {
    name: 'Quick Sort',
    fn: 'quickSort',
    time: 'O(n log n)',
    space: 'O(log n)',
    description: 'Partitions around a pivot element. Very fast in practice — the real-world favourite.',
    worstCase: 'O(n²)',
    bestCase: 'O(n log n)',
    stable: false,
  },
}
