import React from 'react'

export function Stats({ frame, frameIdx, totalFrames }) {
  if (!frame) return null
  return (
    <div className="flex flex-wrap gap-4 text-sm">
      <div className="bg-slate-800 rounded-lg px-4 py-2 border border-slate-700">
        <span className="text-slate-400">Comparisons </span>
        <span className="font-medium text-amber-400">{frame.comparisons}</span>
      </div>
      <div className="bg-slate-800 rounded-lg px-4 py-2 border border-slate-700">
        <span className="text-slate-400">Swaps </span>
        <span className="font-medium text-red-400">{frame.swaps}</span>
      </div>
      <div className="bg-slate-800 rounded-lg px-4 py-2 border border-slate-700">
        <span className="text-slate-400">Step </span>
        <span className="font-medium text-blue-400">{frameIdx + 1}</span>
        <span className="text-slate-500"> / {totalFrames}</span>
      </div>
      <div className="bg-slate-800 rounded-lg px-4 py-2 border border-slate-700 flex-1 min-w-0">
        <span className="text-slate-300 text-xs truncate">{frame.msg}</span>
      </div>
    </div>
  )
}
