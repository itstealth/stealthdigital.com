'use client'

import { Suspense, lazy, useEffect, useState } from 'react'

const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

/**
 * The Spline runtime is ~2MB of JS (it bundles three.js) and then fetches the
 * scene itself from prod.spline.design. Mounting it during the initial render
 * puts all of that on the critical path, competing with hydration and LCP for
 * a decorative element.
 *
 * So the mount is deferred until the browser is idle (capped, so it still
 * appears promptly on slow machines that never report idle). Users who have
 * asked for reduced motion or turned on data saver never load it at all — the
 * fallback below keeps the column's layout either way, so nothing shifts.
 */
export function SplineScene({ scene, className }: SplineSceneProps) {
  const [shouldMount, setShouldMount] = useState(false)

  useEffect(() => {
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } }
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      nav.connection?.saveData === true
    ) {
      return
    }

    type IdleWindow = Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number
      cancelIdleCallback?: (handle: number) => void
    }
    const w = window as IdleWindow

    if (typeof w.requestIdleCallback === 'function') {
      const handle = w.requestIdleCallback(() => setShouldMount(true), {
        timeout: 2000,
      })
      return () => w.cancelIdleCallback?.(handle)
    }

    const timer = window.setTimeout(() => setShouldMount(true), 1200)
    return () => window.clearTimeout(timer)
  }, [])

  const fallback = (
    <div className="w-full h-full flex items-center justify-center">
      <span className="loader"></span>
    </div>
  )

  if (!shouldMount) return fallback

  return (
    <Suspense fallback={fallback}>
      <Spline scene={scene} className={className} />
    </Suspense>
  )
}
