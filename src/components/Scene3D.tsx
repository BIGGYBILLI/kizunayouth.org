import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v))

/**
 * Two interlocking metal rings — the bond — suspended in drifting sakura.
 * The rings turn with the pointer, can be dragged with the mouse (or arrow
 * keys), and drift deeper as the hero scrolls away. Purely decorative, so the
 * canvas is hidden from assistive tech; everything it hints at is in the copy.
 */
export function BondScene({ className }: { className?: string }) {
  const host = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = host.current
    if (!el) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    } catch {
      return
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.15
    renderer.domElement.style.display = 'block'
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'
    renderer.domElement.style.cursor = 'grab'
    el.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100)
    let baseZ = 7
    camera.position.set(0, 0, baseZ)

    const pmrem = new THREE.PMREMGenerator(renderer)
    const envTexture = pmrem.fromScene(new RoomEnvironment(), 0.02).texture
    scene.environment = envTexture
    scene.environmentIntensity = 0.6

    scene.add(new THREE.HemisphereLight(0xfff6e4, 0x3f4a33, 0.9))
    const key = new THREE.DirectionalLight(0xfff4e2, 2.6)
    key.position.set(4, 6, 5)
    scene.add(key)
    const rim = new THREE.DirectionalLight(0xc4583a, 2.4)
    rim.position.set(-5, -2, -3)
    scene.add(rim)
    const fill = new THREE.DirectionalLight(0xa9bb8d, 1.4)
    fill.position.set(-3, 3, 4)
    scene.add(fill)

    const bond = new THREE.Group()
    bond.rotation.set(0.12, -0.5, -0.18)
    scene.add(bond)

    // Radius of the finished sculpture around its own centre: the rings sit
    // 1.72 units out at the widest, measured once so the camera can keep them
    // inside the canvas at every aspect ratio.
    const RING_HALF = 1.8

    const ringGeometry = new THREE.TorusGeometry(1.02, 0.155, 48, 190)
    const mossMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#6d7d53'),
      metalness: 0.92,
      roughness: 0.3,
      clearcoat: 1,
      clearcoatRoughness: 0.22,
      envMapIntensity: 1.1,
    })
    const vermilionMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#b8442b'),
      metalness: 0.88,
      roughness: 0.28,
      clearcoat: 1,
      clearcoatRoughness: 0.2,
      envMapIntensity: 1.1,
    })

    const ringA = new THREE.Mesh(ringGeometry, mossMaterial)
    ringA.rotation.set(Math.PI / 2, 0.12, 0.18)
    ringA.position.set(0.34, 0.42, 0)

    const ringB = new THREE.Mesh(ringGeometry, vermilionMaterial)
    ringB.rotation.set(0.1, Math.PI / 2, 0.2)
    ringB.position.set(-0.34, -0.42, 0)

    bond.add(ringA, ringB)

    // Sakura: one petal geometry, many instances.
    const petal = new THREE.Shape()
    petal.moveTo(0, -0.17)
    petal.bezierCurveTo(0.15, -0.06, 0.13, 0.12, 0, 0.21)
    petal.bezierCurveTo(-0.13, 0.12, -0.15, -0.06, 0, -0.17)
    const petalGeometry = new THREE.ExtrudeGeometry(petal, { depth: 0.012, bevelEnabled: false, curveSegments: 8 })
    petalGeometry.center()

    // Petals are positioned in normalised screen space, so this count fills the
    // frame the same way on a phone, a short landscape window and a desktop.
    const PETALS = 44
    // The sculpture follows the page theme: sakura pink on cream paper,
    // cream and sage on the dark emerald band.
    const PALETTES = {
      light: { petals: ['#e6c3c4', '#f3e7d6', '#f7dfe1'], ringA: '#6d7d53', ringB: '#b8442b' },
      dark: { petals: ['#f3ebd6', '#cfe0c8', '#e2d6b8'], ringA: '#4c7a5c', ringB: '#d8cba6' },
    }
    const isDark = () => document.documentElement.classList.contains('dark')
    const theme = isDark() ? PALETTES.dark : PALETTES.light
    mossMaterial.color.set(theme.ringA)
    vermilionMaterial.color.set(theme.ringB)
    const petalColors = theme.petals.map((hex) => new THREE.Color(hex))

    // Each petal carries its own alpha so it can dissolve into the page as it
    // nears the canvas edge, rather than being sliced by the rectangular
    // bounds of the WebGL surface.
    const petalFade = new THREE.InstancedBufferAttribute(new Float32Array(PETALS).fill(1), 1)
    petalGeometry.setAttribute('aFade', petalFade)

    const petalMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#e9c6c7'),
      roughness: 0.78,
      metalness: 0,
      side: THREE.DoubleSide,
      transparent: true,
      depthWrite: false,
    })
    petalMaterial.onBeforeCompile = (shader) => {
      shader.vertexShader = shader.vertexShader
        .replace('#include <common>', '#include <common>\nattribute float aFade;\nvarying float vFade;')
        .replace('#include <begin_vertex>', '#include <begin_vertex>\n\tvFade = aFade;')
      shader.fragmentShader = shader.fragmentShader
        .replace('#include <common>', '#include <common>\nvarying float vFade;')
        .replace('#include <dithering_fragment>', '#include <dithering_fragment>\n\tgl_FragColor.a *= vFade;')
    }
    const petals = new THREE.InstancedMesh(petalGeometry, petalMaterial, PETALS)
    petals.instanceMatrix.setUsage(THREE.DynamicDrawUsage)

    type Flake = { nx: number; ny: number; z: number; scale: number; speed: number; sway: number; phase: number; rx: number; ry: number; rz: number }
    const flakes: Flake[] = []
    const dummy = new THREE.Object3D()

    for (let i = 0; i < PETALS; i++) {
      const f: Flake = {
        nx: Math.random() * 2 - 1,
        ny: Math.random() * 2 - 1,
        z: (Math.random() - 0.5) * 4,
        scale: 0.55 + Math.random() * 0.9,
        speed: 0.03 + Math.random() * 0.06,
        sway: 0.5 + Math.random(),
        phase: Math.random() * Math.PI * 2,
        rx: 0.3 + Math.random(),
        ry: 0.3 + Math.random(),
        rz: 0.2 + Math.random(),
      }
      flakes.push(f)
      dummy.position.set(f.nx * 2, f.ny * 2, f.z)
      dummy.rotation.set(f.phase, f.phase, f.phase)
      dummy.scale.setScalar(f.scale)
      dummy.updateMatrix()
      petals.setMatrixAt(i, dummy.matrix)
      petals.setColorAt(i, petalColors[i % 3])
    }
    petals.instanceColor!.needsUpdate = true
    scene.add(petals)

    const applyTheme = () => {
      const next = isDark() ? PALETTES.dark : PALETTES.light
      const colors = next.petals.map((hex) => new THREE.Color(hex))
      for (let i = 0; i < PETALS; i++) petals.setColorAt(i, colors[i % 3])
      petals.instanceColor!.needsUpdate = true
      mossMaterial.color.set(next.ringA)
      vermilionMaterial.color.set(next.ringB)
    }
    const themeWatcher = new MutationObserver(applyTheme)
    themeWatcher.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    const pointer = { x: 0, y: 0 }
    const smooth = { x: 0, y: 0 }
    let spin = 0
    let dragging = false
    let lastX = 0
    let active = true

    const onPointerMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      pointer.x = clamp(((event.clientX - rect.left) / rect.width) * 2 - 1, -1, 1)
      pointer.y = clamp(((event.clientY - rect.top) / rect.height) * 2 - 1, -1, 1)
      if (dragging) {
        spin += (event.clientX - lastX) * 0.006
        lastX = event.clientX
      }
    }
    const onPointerLeave = () => {
      pointer.x = 0
      pointer.y = 0
    }
    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      dragging = true
      lastX = event.clientX
      renderer.domElement.style.cursor = 'grabbing'
      el.setPointerCapture(event.pointerId)
    }
    const endDrag = () => {
      dragging = false
      renderer.domElement.style.cursor = 'grab'
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') spin -= 0.18
      if (event.key === 'ArrowRight') spin += 0.18
    }

    el.addEventListener('pointermove', onPointerMove)
    el.addEventListener('pointerleave', onPointerLeave)
    el.addEventListener('pointerdown', onPointerDown)
    el.addEventListener('pointerup', endDrag)
    el.addEventListener('pointercancel', endDrag)
    el.addEventListener('keydown', onKeyDown)

    const resize = () => {
      const width = el.clientWidth || 1
      const height = el.clientHeight || 1
      renderer.setSize(width, height, false)
      camera.aspect = width / height
      // Start at a distance that already clears the sculpture on this width;
      // the render loop pushes further back if a frame ever needs it.
      baseZ = Math.max(camera.aspect >= 1 ? 7 : (7 / Math.max(camera.aspect, 0.55)) * 0.82, 6.9)
      camera.position.z = baseZ
      camera.updateProjectionMatrix()
    }
    const observer = new ResizeObserver(resize)
    observer.observe(el)
    resize()

    const intersection = new IntersectionObserver(
      ([entry]) => {
        active = entry.isIntersecting
      },
      { rootMargin: '120px' },
    )
    intersection.observe(el)

    const clock = new THREE.Clock()
    let frame = 0

    // Petals live in normalised screen space, so they fill the canvas at every
    // width instead of clustering around one aspect ratio. Each one dissolves
    // just before any part of its shape can touch the canvas bounds, so the
    // frame itself is never visible as an edge.
    const placePetals = (t: number, dt: number) => {
      const camZ = camera.position.z
      const tanHalfFov = Math.tan((camera.fov * Math.PI) / 360)
      // The field leans a little with the pointer. This offset is baked into
      // each petal's position (rather than rotating the whole group) so the
      // edge test below sees exactly where the petal really renders.
      const shiftX = smooth.x * 0.12
      const shiftY = smooth.y * 0.05
      for (let i = 0; i < PETALS; i++) {
        const f = flakes[i]
        f.ny -= f.speed * dt
        f.nx += Math.sin(t * f.sway + f.phase) * 0.0012
        // Both axes wrap while the petal is fully transparent, so none is ever
        // lost off the side and none pops back into view.
        if (f.ny < -1.12) {
          f.ny = 1.12
          f.nx = Math.random() * 2 - 1
        }
        if (f.nx > 1.2) f.nx -= 2.4
        else if (f.nx < -1.2) f.nx += 2.4

        const halfHeight = tanHalfFov * Math.max(camZ - f.z, 0.1)
        const halfWidth = halfHeight * camera.aspect
        const x = f.nx * halfWidth + shiftX
        const y = f.ny * halfHeight + shiftY
        // The fade ends before the petal's own radius can cross the bound.
        const radius = 0.25 * f.scale
        petalFade.array[i] = Math.min(
          clamp((halfWidth - Math.abs(x) - radius) / Math.max(halfWidth * 0.045, 0.05), 0, 1),
          clamp((halfHeight - Math.abs(y) - radius) / Math.max(halfHeight * 0.045, 0.05), 0, 1),
        )
        dummy.position.set(x, y, f.z)
        dummy.rotation.set(t * f.rx + f.phase, t * f.ry, t * f.rz)
        dummy.scale.setScalar(f.scale)
        dummy.updateMatrix()
        petals.setMatrixAt(i, dummy.matrix)
      }
      petals.instanceMatrix.needsUpdate = true
      petalFade.needsUpdate = true
    }

    const render = () => {
      const dt = Math.min(clock.getDelta(), 0.05)
      const t = clock.elapsedTime

      smooth.x += (pointer.x - smooth.x) * 0.05
      smooth.y += (pointer.y - smooth.y) * 0.05

      const rect = el.getBoundingClientRect()
      const progress = clamp((window.innerHeight - rect.top) / (window.innerHeight + rect.height), 0, 1)

      bond.rotation.y = -0.5 + smooth.x * 0.55 + spin + progress * 1.15 + t * 0.05
      bond.rotation.x = 0.12 + smooth.y * 0.3 + progress * 0.18
      const drift = progress * 0.15
      bond.position.y = -drift
      // The sculpture sinks a little as the hero scrolls away, and the camera
      // eases back by exactly enough that no ring can touch the canvas edge on
      // any width. RING_HALF is the sculpture's real radius; the small margin
      // covers perspective on its nearest side.
      const tanHalfFov = Math.tan((camera.fov * Math.PI) / 360)
      camera.position.z = Math.max(
        baseZ - progress * 0.35,
        (RING_HALF + 0.15 + drift) / tanHalfFov,
        (RING_HALF + 0.15) / (tanHalfFov * camera.aspect),
      )

      placePetals(t, dt)

      if (active) renderer.render(scene, camera)
      frame = requestAnimationFrame(render)
    }

    if (reduceMotion) {
      smooth.x = 0.2
      bond.rotation.y = -0.35
      placePetals(0, 0)
      renderer.render(scene, camera)
    } else {
      frame = requestAnimationFrame(render)
    }

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      intersection.disconnect()
      themeWatcher.disconnect()
      el.removeEventListener('pointermove', onPointerMove)
      el.removeEventListener('pointerleave', onPointerLeave)
      el.removeEventListener('pointerdown', onPointerDown)
      el.removeEventListener('pointerup', endDrag)
      el.removeEventListener('pointercancel', endDrag)
      el.removeEventListener('keydown', onKeyDown)
      ringGeometry.dispose()
      mossMaterial.dispose()
      vermilionMaterial.dispose()
      petalGeometry.dispose()
      petalMaterial.dispose()
      petals.dispose()
      envTexture.dispose()
      pmrem.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return (
    <div
      ref={host}
      role="img"
      aria-label="An interactive sculpture of two interlocking rings — one moss green, one vermilion — turning among drifting sakura petals."
      tabIndex={0}
      className={className}
    />
  )
}
