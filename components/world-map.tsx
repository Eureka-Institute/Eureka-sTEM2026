"use client"

import { useEffect, useRef, useState } from "react"
import * as d3 from "d3"
import type { Experience } from "@/lib/experience-data"

interface WorldMapProps {
  experiences: Experience[]
  selectedExperience: Experience | null
  onSelectExperience: (exp: Experience | null) => void
}

export function WorldMap({ experiences, selectedExperience, onSelectExperience }: WorldMapProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 1138, height: 640 })
  const [hoveredExp, setHoveredExp] = useState<Experience | null>(null)
  const [projection, setProjection] = useState<d3.GeoProjection | null>(null)

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width } = containerRef.current.getBoundingClientRect()
        setDimensions({ width: Math.max(width, 1138), height: Math.max(width * (640 / 1138), 640) })
      }
    }
    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  useEffect(() => {
    const { width, height } = dimensions

    const validLocations = experiences.filter((exp) => !exp.location.isRemote)
    let centerLng = 40
    let centerLat = 30

    if (validLocations.length > 0) {
      centerLng = validLocations.reduce((sum, exp) => sum + exp.location.lng, 0) / validLocations.length
      centerLat = validLocations.reduce((sum, exp) => sum + exp.location.lat, 0) / validLocations.length
    }

    const proj = d3
      .geoNaturalEarth1()
      .scale(width / 4)
      .translate([width / 2, height / 2])
      .center([centerLng, centerLat])

    setProjection(() => proj)
  }, [dimensions, experiences])

  const getMarkerPosition = (exp: Experience): [number, number] | null => {
    if (!projection) return null
    return projection([exp.location.lng, exp.location.lat])
  }

  const colorMap: Record<string, string> = {
    pink: "var(--accent-violet)",
    yellow: "var(--accent-orange)",
    green: "var(--accent-violet)",
    blue: "var(--accent-blue)",
  }

  const colorClassMap: Record<string, string> = {
    pink: "bg-[color:var(--accent-violet)]",
    yellow: "bg-[color:var(--accent-orange)]",
    green: "bg-[color:var(--accent-violet)]",
    blue: "bg-[color:var(--accent-blue)]",
  }

  return (
    <div ref={containerRef} className="relative w-full h-full">
      <div className="relative w-full h-auto">
        <img src="/map.svg" alt="World Map" className="w-full h-auto" />
      </div>
    </div>
  )
}
