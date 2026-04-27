import React, { useState } from 'react'
import { useVisualizer } from './hooks/useVisualizer.js'
import { BarCanvas } from './components/BarCanvas.jsx'
import { Controls } from './components/Controls.jsx'
import { AlgoInfo } from './components/AlgoInfo.jsx'
import { Stats } from './components/Stats.jsx'
import { Legend } from './components/Legend.jsx'
import { PathfinderView } from './components/PathfinderView.jsx'
import { ALGORITHMS } from './algorithms/index.js'

function SortingView() {
  const {
    algoKey, setAlgoKey,
    size, setSize,
    speed, setSpeed,
    frames, frameIdx,
    playing, done,
    currentFrame,
    shuffle, play, pause, stepForward, stepBack, restart,
  } = useVisualizer()

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {Object.entries(ALGORITHMS).map(([key, info]) => (
          <button
            key={key}
            onClick={() => setAlgoKey(key)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors border ${
              algoKey === key
                ? 'bg-blue-500 border-blue-500 text-white'
                : 'border-slate-600 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {info.name}
          </button>
        ))}
      </div>

      <AlgoInfo algoKey={algoKey} currentFrame={currentFrame} frameIdx={frameIdx} totalFrames={frames.length} />
      <BarCanvas frame={currentFrame} />
      <Legend />
      <Stats frame={currentFrame} frameIdx={frameIdx} totalFrames={frames.length} />
      <Controls
        playing={playing} done={done} frameIdx={frameIdx} totalFrames={frames.length}
        speed={speed} size={size}
        onPlay={play} onPause={pause} onStepForward={stepForward}
        onStepBack={stepBack} onRestart={restart} onShuffle={shuffle}
        onSpeedChange={setSpeed} onSizeChange={setSize}
      />
    </div>
  )
}

export default function App() {
  const [tab, setTab] = useState('sorting')

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto space-y-6">

        <div>
          <h1 className="text-2xl font-medium tracking-tight">Algorithm Visualizer</h1>
          <p className="text-slate-400 text-sm mt-1">Interactive sorting and pathfinding — built with React + Vite</p>
        </div>

        <div className="flex gap-1 bg-slate-800 rounded-xl p-1 w-fit border border-slate-700">
          {[
            { key: 'sorting',     label: 'Sorting' },
            { key: 'pathfinding', label: 'Pathfinding' },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${
                tab === key
                  ? 'bg-slate-600 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === 'sorting' && <SortingView />}
        {tab === 'pathfinding' && <PathfinderView />}

        <footer className="text-xs text-slate-600 pt-4 border-t border-slate-800">
          Built with React + Vite + Tailwind CSS — deploy free on Vercel
        </footer>
      </div>
    </div>
  )
}
