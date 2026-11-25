export type Route = 'home' | 'services' | 'workshop'

const TITLES: Record<Route, string> = {
  home: 'Kizuna Youth Project — Guiding students to Japan',
  services: 'Student Services — Kizuna Youth Project',
  workshop: 'Free Japan Workshops for Schools — Kizuna Youth Project',
}

/** The path below the deployment base (`/` locally, `/<repo>/` on Pages). */
export function currentRoute(): Route {
  const base = import.meta.env.BASE_URL.replace(/\/+$/, '')
  const path = window.location.pathname
  const relative = (base && path.startsWith(base) ? path.slice(base.length) : path).replace(/^\/+|\/+$/g, '')

  if (relative === 'services') return 'services'
  if (relative === 'workshop') return 'workshop'
  return 'home'
}

export function titleFor(route: Route) {
  return TITLES[route]
}
