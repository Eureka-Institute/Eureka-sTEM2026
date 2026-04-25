export interface Experience {
  id: string
  title: string
  company: string
  location: {
    city: string
    country: string
    lat: number
    lng: number
    isRemote: boolean
  }
  startDate: string
  endDate: string
  color: "pink" | "yellow" | "green" | "blue"
}

export const experiences: Experience[] = [
  {
    id: "1",
    title: "Coding Track Participant",
    company: "North America",
    location: {
      city: "San Francisco",
      country: "USA",
      lat: 37.7749,
      lng: -122.4194,
      isRemote: false,
    },
    startDate: "2026-09-27",
    endDate: "2026-10-25",
    color: "blue",
  },
  {
    id: "2",
    title: "Research Track Participant",
    company: "Europe",
    location: {
      city: "London",
      country: "UK",
      lat: 51.5074,
      lng: -0.1278,
      isRemote: false,
    },
    startDate: "2026-09-27",
    endDate: "2026-10-25",
    color: "blue",
  },
  {
    id: "3",
    title: "AI/ML Category",
    company: "Asia Pacific",
    location: {
      city: "Singapore",
      country: "Singapore",
      lat: 1.3521,
      lng: 103.8198,
      isRemote: false,
    },
    startDate: "2026-09-27",
    endDate: "2026-10-25",
    color: "blue",
  },
  {
    id: "4",
    title: "Environmental Science",
    company: "South America",
    location: {
      city: "São Paulo",
      country: "Brazil",
      lat: -23.5505,
      lng: -46.6333,
      isRemote: false,
    },
    startDate: "2026-09-27",
    endDate: "2026-10-25",
    color: "blue",
  },
  {
    id: "5",
    title: "Medical Research",
    company: "Australia",
    location: {
      city: "Sydney",
      country: "Australia",
      lat: -33.8688,
      lng: 151.2093,
      isRemote: false,
    },
    startDate: "2026-09-27",
    endDate: "2026-10-25",
    color: "blue",
  },
  {
    id: "6",
    title: "Economics Category",
    company: "Middle East",
    location: {
      city: "Dubai",
      country: "UAE",
      lat: 25.2048,
      lng: 55.2708,
      isRemote: false,
    },
    startDate: "2026-09-27",
    endDate: "2026-10-25",
    color: "blue",
  },
  {
    id: "7",
    title: "Community Problem Solving",
    company: "Africa",
    location: {
      city: "Cape Town",
      country: "South Africa",
      lat: -33.9249,
      lng: 18.4241,
      isRemote: false,
    },
    startDate: "2026-09-27",
    endDate: "2026-10-25",
    color: "blue",
  },
  {
    id: "8",
    title: "Physics & Math",
    company: "East Asia",
    location: {
      city: "Tokyo",
      country: "Japan",
      lat: 35.6762,
      lng: 139.6503,
      isRemote: false,
    },
    startDate: "2026-09-27",
    endDate: "2026-10-25",
    color: "blue",
  },
]
