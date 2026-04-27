# Algorithm Visualizer

> An interactive web app that animates classic sorting algorithms step by step.

![Algorithm Visualizer](https://img.shields.io/badge/React-18-blue) ![Vite](https://img.shields.io/badge/Vite-5-purple) ![TailwindCSS](https://img.shields.io/badge/Tailwind-3-teal)

## Live Demo

🔗 [Deploy your own on Vercel — free in 2 minutes](#deploy)

## Features

- **5 sorting algorithms** — Bubble, Selection, Insertion, Merge, Quick Sort
- **Step-through mode** — go forward and backward one frame at a time
- **Live stats** — comparisons, swaps, and current step tracked in real time
- **Big O info** — time complexity, space complexity, best/worst cases per algorithm
- **Controls** — adjustable array size (10–100 bars) and animation speed
- **Color coding** — blue = unsorted, orange = comparing, red = swapping, pink = pivot, teal = sorted

## Screenshots

> Add a GIF here after deploying — use [LICEcap](https://www.cockos.com/licecap/) or [Kap](https://getkap.co/)

## Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 | UI and state management |
| Vite | Fast dev server and bundler |
| Tailwind CSS | Styling |
| Vercel | Deployment |

## Project Structure

```
src/
├── algorithms/
│   ├── bubbleSort.js       # Pure sorting logic → returns frames[]
│   ├── selectionSort.js
│   ├── insertionSort.js
│   ├── mergeSort.js
│   ├── quickSort.js
│   └── index.js            # Exports + ALGORITHMS metadata
├── components/
│   ├── BarCanvas.jsx       # Renders the animated bar chart
│   ├── Controls.jsx        # Play/pause/step/shuffle/sliders
│   ├── AlgoInfo.jsx        # Complexity info cards
│   ├── Stats.jsx           # Live comparisons/swaps counter
│   └── Legend.jsx          # Color key
├── hooks/
│   └── useVisualizer.js    # All animation state and logic
└── App.jsx                 # Root layout
```

## Run Locally

```bash
git clone https://github.com/MIKECHITI/algo-visualizer
cd algo-visualizer
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Deploy

### Vercel (recommended)

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
3. Click Deploy — done. No configuration needed.

```bash
npm run build   # Build for production
```

## Adding a New Algorithm

1. Create `src/algorithms/mySort.js` — export a function that returns a `frames[]` array
2. Each frame: `{ arr: [...], hl: { comparing, swapped, sorted, pivot }, msg, comparisons, swaps }`
3. Add it to `src/algorithms/index.js` in both the import and the `ALGORITHMS` object
4. It automatically appears in the UI

## Algorithms Included

| Algorithm | Time (avg) | Time (worst) | Space | Stable |
|-----------|-----------|-------------|-------|--------|
| Bubble Sort | O(n²) | O(n²) | O(1) | Yes |
| Selection Sort | O(n²) | O(n²) | O(1) | No |
| Insertion Sort | O(n²) | O(n²) | O(1) | Yes |
| Merge Sort | O(n log n) | O(n log n) | O(n) | Yes |
| Quick Sort | O(n log n) | O(n²) | O(log n) | No |

## Roadmap

- [ ] Pathfinding algorithms (BFS, DFS, Dijkstra, A*)
- [ ] Side-by-side comparison mode
- [ ] Custom input array
- [ ] Sound effects tied to bar height
- [ ] Dark/light theme toggle

## License

MIT
