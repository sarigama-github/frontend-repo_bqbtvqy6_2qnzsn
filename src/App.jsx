import React, { useMemo } from 'react'
import GalleryEmbed from './components/GalleryEmbed'

function App() {
  // Build an example embed code block the user can copy
  const embedCode = useMemo(() => {
    const src = window.location.origin + '/?embed=gallery'
    const params = new URLSearchParams({
      images: [
        'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1200&auto=format&fit=crop',
      ].map(encodeURIComponent).join(','),
      h: '320',
      radius: '16',
      gap: '16',
      speed: '30',
      dir: 'left',
      pause: '1',
      bg: 'transparent',
    })
    return `<iframe src="${src}&${params.toString()}" style="width:100%;border:0;overflow:hidden" height="360" allowfullscreen loading="lazy"></iframe>`
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-4xl w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Galería de imágenes en movimiento</h1>
          <p className="text-gray-600 mt-2">Copia y pega el siguiente código para incrustar la galería en tu web.</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 mb-8">
          <pre className="text-sm text-gray-800 whitespace-pre-wrap break-all">{embedCode}</pre>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Vista previa</h2>
          <GalleryEmbed />
        </div>

        <p className="text-gray-500 text-sm">Personaliza vía parámetros: images (lista separada por comas), h (alto), radius, gap, speed (segundos por vuelta), dir (left|right), pause (1 para pausar al pasar el mouse), bg.</p>
      </div>
    </div>
  )
}

export default App
