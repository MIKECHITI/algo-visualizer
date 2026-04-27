import React from 'react'
import { ALGORITHMS } from '../algorithms/index.js'

export function AlgoInfo({ algoKey, currentFrame, frameIdx, totalFrames }) {
  const info = ALGORITHMS[algoKey]
  if (!info) return null

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-4">
        <p className="text-xs text-slate-400 mb-1">Algorithm</p>
        <p className="text-lg font-medium">{info.name}</p>
        <p className="text-sm text-slate-400 mt-1">{info.description}</p>
      </div>
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-4">
        <p className="text-xs text-slate-400 mb-2">Complexity</p>
        <div className="flex gap-4 text-sm">
          <div>
            <p className="text-slate-400 text-xs">Avg time</p>
            <p className="font-mono font-medium text-amber-400">{info.time}</p>
          </div>
          <div>
            <p className="text-slate-400 text-xs">Best case</p>
            <p className="font-mono font-medium text-teal-400">{info.bestCase}</p>
          </div>
          <div>
            <p className="text-slate-400 text-xs">Worst case</p>
            <p className="font-mono font-medium text-red-400">{info.worstCase}</p>
          </div>
          <div>
            <p className="text-slate-400 text-xs">Space</p>
            <p className="font-mono font-medium text-blue-400">{info.space}</p>
          </div>
        </div>
        <div className="mt-2">
          <span className={`text-xs px-2 py-0.5 rounded-full ${info.stable ? 'bg-teal-900 text-teal-300' : 'bg-slate-700 text-slate-400'}`}>
            {info.stable ? 'Stable' : 'Unstable'}
          </span>
        </div>
      </div>
    </div>
  )
}
