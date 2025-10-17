'use client'

/**
 * Halaman ini merender Sanity Studio.
 * Ini menggunakan Rute Dinamis Catch-all Next.js untuk memungkinkan
 * Sanity Studio menangani semua perutean di dalam /studio.
 */
import {NextStudio} from 'next-sanity/studio'
import config from '../../../../sanity.config'

export default function StudioPage() {
  return <NextStudio config={config} />
}
