import { useState, useRef, useCallback, useEffect } from 'react'
import { bubbleSort, selectionSort, insertionSort, mergeSort, quickSort } from '../algorithms/index.js'

const algoMap = { bubble: bubbleSort, selection: selectionSort, insertion: insertionSort, merge: mergeSort, quick: quickSort }

function makeArray(size) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 280) + 20)
}

function speedToDelay(speed) {
  return Math.round(700 / Math.pow(speed, 1.5))
}

export function useVisualizer() {
  const [algoKey, setAlgoKey] = useState('bubble')
  const [size, setSize] = useState(40)
  const [speed, setSpeed] = useState(6)
  const [frames, setFrames] = useState([])
  const [frameIdx, setFrameIdx] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [done, setDone] = useState(false)
  const timerRef = useRef(null)

  const stopPlay = useCallback(() => {
    clearInterval(timerRef.current)
    setPlaying(false)
  }, [])

  const generateAndReset = useCallback((key, sz) => {
    stopPlay()
    const arr = makeArray(sz)
    const fn = algoMap[key]
    const newFrames = fn(arr)
    setFrames(newFrames)
    setFrameIdx(0)
    setDone(false)
  }, [stopPlay])

  useEffect(() => {
    generateAndReset(algoKey, size)
  }, [])

  const shuffle = useCallback(() => {
    generateAndReset(algoKey, size)
  }, [algoKey, size, generateAndReset])

  const changeAlgo = useCallback((key) => {
    setAlgoKey(key)
    generateAndReset(key, size)
  }, [size, generateAndReset])

  const changeSize = useCallback((sz) => {
    setSize(sz)
    generateAndReset(algoKey, sz)
  }, [algoKey, generateAndReset])

  const play = useCallback(() => {
    if (frames.length === 0) return
    setPlaying(true)
    setDone(false)

    timerRef.current = setInterval(() => {
      setFrameIdx(prev => {
        if (prev >= frames.length - 1) {
          clearInterval(timerRef.current)
          setPlaying(false)
          setDone(true)
          return prev
        }
        return prev + 1
      })
    }, speedToDelay(speed))
  }, [frames, speed])

  const pause = useCallback(() => stopPlay(), [stopPlay])

  const stepForward = useCallback(() => {
    stopPlay()
    setFrameIdx(prev => Math.min(prev + 1, frames.length - 1))
  }, [frames.length, stopPlay])

  const stepBack = useCallback(() => {
    stopPlay()
    setFrameIdx(prev => Math.max(prev - 1, 0))
  }, [stopPlay])

  const restart = useCallback(() => {
    stopPlay()
    setFrameIdx(0)
    setDone(false)
  }, [stopPlay])

  const currentFrame = frames[frameIdx] || null

  return {
    algoKey, setAlgoKey: changeAlgo,
    size, setSize: changeSize,
    speed, setSpeed,
    frames, frameIdx,
    playing, done,
    currentFrame,
    shuffle, play, pause, stepForward, stepBack, restart,
  }
}
