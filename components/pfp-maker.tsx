"use client"

import React, { useState, useRef, useCallback, useLayoutEffect, useEffect } from "react"

import type { ReactElement } from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Upload, Download, Trash2 } from "lucide-react"

const penguinPresets = [
  { id: "doble", name: "Peanie Doble", image: "/images/peanie-doble.png", description: "Dos pingüinos tiernos" },
  {
    id: "dinosaurio",
    name: "Peanie Dino",
    image: "/images/peanie-dinosaurio.png",
    description: "Con gorro de dinosaurio",
  },
  { id: "asomando", name: "Peanie Peek", image: "/images/peanie-asomando.png", description: "Asomándose tímidamente" },
  { id: "cara-tierna", name: "Peanie Cute", image: "/images/peanie-cara-tierna.png", description: "Cara súper tierna" },
  { id: "saludando", name: "Peanie Wave", image: "/images/peanie-saludando.png", description: "Saludando amigable" },
]

interface PenguinElement {
  id: string
  preset: string
  x: number
  y: number
  size: number
  rotation: number
  opacity: number
  flipped: boolean
}

export default function PFPMaker(): ReactElement {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [penguinElements, setPenguinElements] = useState<PenguinElement[]>([])
  const [selectedElement, setSelectedElement] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [isRotating, setIsRotating] = useState(false)
  const [dragElementId, setDragElementId] = useState<string | null>(null)
  const [initialSize, setInitialSize] = useState(0)
  const [initialRotation, setInitialRotation] = useState(0)
  const [initialMousePos, setInitialMousePos] = useState({ x: 0, y: 0 })
  const [rotationCenter, setRotationCenter] = useState({ x: 0, y: 0 })
  const fileInputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvasContainerRef = useRef<HTMLDivElement>(null)
  const [canvasSize, setCanvasSize] = useState(400); // default fallback
  const [parallax, setParallax] = useState({ x: 0, rot: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrame: number;
    const animate = () => {
      const t = Date.now() / 1000;
      // Movimiento de izquierda a derecha (onda senoidal)
      const x = Math.sin(t * 0.7) * 60; // 60px de amplitud
      // Rotación acompaña el movimiento
      const rot = Math.sin(t * 0.7) * 12; // 12 grados de rotación
      setParallax({ x, rot });
      animationFrame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const handleImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.size <= 10 * 1024 * 1024) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }, [])

  // Función para generar posición random SIN repetir presets
  const getRandomPosition = () => ({
    x: Math.random() * 80 + 10, // Entre 10% y 90%
    y: Math.random() * 80 + 10, // Entre 10% y 90%
    size: Math.random() * 100 + 50, // Entre 50% y 150%
    rotation: Math.random() * 30 - 15, // Entre -15° y 15°
    opacity: 100, // SIEMPRE 100%
    flipped: Math.random() > 0.5,
  })

  // Función principal: Customize your PFP - SIN REPETIR IMÁGENES
  const customizeRandomPFP = useCallback(() => {
    if (!uploadedImage) return

    const newElements: PenguinElement[] = []
    const numElements = Math.min(Math.floor(Math.random() * 3) + 2, penguinPresets.length) // Entre 2 y 4, pero no más que presets disponibles

    // Crear array de presets disponibles y mezclarlo
    const availablePresets = [...penguinPresets]
    for (let i = availablePresets.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[availablePresets[i], availablePresets[j]] = [availablePresets[j], availablePresets[i]]
    }

    // Tomar solo los primeros numElements (sin repetir)
    for (let i = 0; i < numElements; i++) {
      const preset = availablePresets[i]
      const position = getRandomPosition()

      newElements.push({
        id: `penguin-${Date.now()}-${i}`,
        preset: preset.id,
        ...position,
      })
    }

    setPenguinElements(newElements)
    setSelectedElement(newElements[0]?.id || null)
  }, [uploadedImage])

  const updateElement = useCallback((elementId: string, updates: Partial<PenguinElement>) => {
    setPenguinElements((prev) => prev.map((el) => (el.id === elementId ? { ...el, ...updates } : el)))
  }, [])

  const removeElement = useCallback(
    (elementId: string) => {
      setPenguinElements((prev) => prev.filter((el) => el.id !== elementId))
      if (selectedElement === elementId) {
        setSelectedElement(null)
      }
    },
    [selectedElement],
  )

  const clearAllElements = useCallback(() => {
    setPenguinElements([])
    setSelectedElement(null)
  }, [])

  // Drag functionality
  const handleMouseDown = useCallback((event: React.MouseEvent, elementId: string) => {
    event.preventDefault()
    setIsDragging(true)
    setDragElementId(elementId)
    setSelectedElement(elementId)
  }, [])

  // Resize functionality
  const handleResizeStart = useCallback(
    (event: React.MouseEvent, elementId: string) => {
      event.preventDefault()
      event.stopPropagation()
      setIsResizing(true)
      setDragElementId(elementId)
      setSelectedElement(elementId)

      const element = penguinElements.find((el) => el.id === elementId)
      if (element) {
        setInitialSize(element.size)
        setInitialMousePos({ x: event.clientX, y: event.clientY })
      }
    },
    [penguinElements],
  )

  // Rotation functionality
  const handleRotationStart = useCallback(
    (event: React.MouseEvent, elementId: string) => {
      event.preventDefault()
      event.stopPropagation()
      setIsRotating(true)
      setDragElementId(elementId)
      setSelectedElement(elementId)

      const element = penguinElements.find((el) => el.id === elementId)
      if (element && canvasContainerRef.current) {
        setInitialRotation(element.rotation)

        // Calcular el centro del elemento para la rotación
        const rect = canvasContainerRef.current.getBoundingClientRect()
        const centerX = rect.left + (rect.width * element.x) / 100
        const centerY = rect.top + (rect.height * element.y) / 100

        setRotationCenter({ x: centerX, y: centerY })
        setInitialMousePos({ x: event.clientX, y: event.clientY })
      }
    },
    [penguinElements],
  )

  const handleMouseMove = useCallback(
    (event: React.MouseEvent) => {
      if (!dragElementId || !canvasContainerRef.current) return

      if (isResizing) {
        // Resize logic
        const deltaX = event.clientX - initialMousePos.x
        const deltaY = event.clientY - initialMousePos.y
        const delta = (deltaX + deltaY) / 2
        const sizeDelta = delta * 0.5
        const newSize = Math.max(10, Math.min(300, initialSize + sizeDelta))

        updateElement(dragElementId, { size: newSize })
      } else if (isRotating) {
        // Rotation logic
        const deltaX = event.clientX - rotationCenter.x
        const deltaY = event.clientY - rotationCenter.y
        const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI)

        const initialDeltaX = initialMousePos.x - rotationCenter.x
        const initialDeltaY = initialMousePos.y - rotationCenter.y
        const initialAngle = Math.atan2(initialDeltaY, initialDeltaX) * (180 / Math.PI)

        const rotationDelta = angle - initialAngle
        const newRotation = Math.max(-180, Math.min(180, initialRotation + rotationDelta))

        updateElement(dragElementId, { rotation: newRotation })
      } else if (isDragging) {
        // Drag logic
        const rect = canvasContainerRef.current.getBoundingClientRect()
        const x = ((event.clientX - rect.left) / rect.width) * 100
        const y = ((event.clientY - rect.top) / rect.height) * 100

        const constrainedX = Math.max(-50, Math.min(150, x))
        const constrainedY = Math.max(-50, Math.min(150, y))

        updateElement(dragElementId, { x: constrainedX, y: constrainedY })
      }
    },
    [
      isDragging,
      isResizing,
      isRotating,
      dragElementId,
      updateElement,
      initialSize,
      initialRotation,
      initialMousePos,
      rotationCenter,
    ],
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
    setIsResizing(false)
    setIsRotating(false)
    setDragElementId(null)
  }, [])

  // Global mouse events to handle dragging outside canvas
  const handleGlobalMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!dragElementId || !canvasContainerRef.current) return

      if (isResizing) {
        const deltaX = event.clientX - initialMousePos.x
        const deltaY = event.clientY - initialMousePos.y
        const delta = (deltaX + deltaY) / 2
        const sizeDelta = delta * 0.5
        const newSize = Math.max(10, Math.min(300, initialSize + sizeDelta))

        updateElement(dragElementId, { size: newSize })
      } else if (isRotating) {
        const deltaX = event.clientX - rotationCenter.x
        const deltaY = event.clientY - rotationCenter.y
        const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI)

        const initialDeltaX = initialMousePos.x - rotationCenter.x
        const initialDeltaY = initialMousePos.y - rotationCenter.y
        const initialAngle = Math.atan2(initialDeltaY, initialDeltaX) * (180 / Math.PI)

        const rotationDelta = angle - initialAngle
        const newRotation = Math.max(-180, Math.min(180, initialRotation + rotationDelta))

        updateElement(dragElementId, { rotation: newRotation })
      } else if (isDragging) {
        const rect = canvasContainerRef.current.getBoundingClientRect()
        const x = ((event.clientX - rect.left) / rect.width) * 100
        const y = ((event.clientY - rect.top) / rect.height) * 100

        const constrainedX = Math.max(-50, Math.min(150, x))
        const constrainedY = Math.max(-50, Math.min(150, y))

        updateElement(dragElementId, { x: constrainedX, y: constrainedY })
      }
    },
    [
      isDragging,
      isResizing,
      isRotating,
      dragElementId,
      updateElement,
      initialSize,
      initialRotation,
      initialMousePos,
      rotationCenter,
    ],
  )

  const handleGlobalMouseUp = useCallback(() => {
    setIsDragging(false)
    setIsResizing(false)
    setIsRotating(false)
    setDragElementId(null)
  }, [])

  // Add global event listeners
  React.useEffect(() => {
    if (isDragging || isResizing || isRotating) {
      document.addEventListener("mousemove", handleGlobalMouseMove)
      document.addEventListener("mouseup", handleGlobalMouseUp)

      return () => {
        document.removeEventListener("mousemove", handleGlobalMouseMove)
        document.removeEventListener("mouseup", handleGlobalMouseUp)
      }
    }
  }, [isDragging, isResizing, isRotating, handleGlobalMouseMove, handleGlobalMouseUp])

  // Touch events for mobile
  const handleTouchStart = useCallback((event: React.TouchEvent, elementId: string) => {
    event.preventDefault()
    setIsDragging(true)
    setDragElementId(elementId)
    setSelectedElement(elementId)
  }, [])

  const handleTouchMove = useCallback(
    (event: React.TouchEvent) => {
      if (!isDragging || !dragElementId || !canvasContainerRef.current || !event.touches[0]) return

      const rect = canvasContainerRef.current.getBoundingClientRect()
      const x = ((event.touches[0].clientX - rect.left) / rect.width) * 100
      const y = ((event.touches[0].clientY - rect.top) / rect.height) * 100

      const constrainedX = Math.max(-50, Math.min(150, x))
      const constrainedY = Math.max(-50, Math.min(150, y))

      updateElement(dragElementId, { x: constrainedX, y: constrainedY })
    },
    [isDragging, dragElementId, updateElement],
  )

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false)
    setDragElementId(null)
  }, [])

  const handleWheel = useCallback(
    (event: React.WheelEvent, elementId: string) => {
      event.preventDefault()
      const element = penguinElements.find((el) => el.id === elementId)
      if (!element) return

      const delta = event.deltaY > 0 ? -10 : 10
      const newSize = Math.max(10, Math.min(300, element.size + delta))
      updateElement(elementId, { size: newSize })
      setSelectedElement(elementId)
    },
    [penguinElements, updateElement],
  )

  const downloadPFP = useCallback(async () => {
    if (!uploadedImage || !canvasRef.current) return

    setIsProcessing(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const link = document.createElement("a")
    link.download = `peanie_pfp_${Date.now()}.png`
    link.href = uploadedImage
    link.click()

    setIsProcessing(false)
  }, [uploadedImage])

  const getPresetById = (presetId: string) => {
    return penguinPresets.find((p) => p.id === presetId)
  }

  const selectedElementData = selectedElement ? penguinElements.find((el) => el.id === selectedElement) : null

  // Actualizar tamaño del canvas visible en resize
  useLayoutEffect(() => {
    function updateSize() {
      if (canvasContainerRef.current) {
        const rect = canvasContainerRef.current.getBoundingClientRect();
        setCanvasSize(Math.min(rect.width, rect.height));
      }
    }
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <section
      id="pfp-maker"
      ref={sectionRef}
      className="min-h-screen flex items-center relative overflow-hidden"
      style={{
        backgroundImage: "url('/images/background-3.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Pingüino animado de izquierda a derecha */}
      <img
        src="/images/PFPMAKER-PIEANIE.png"
        alt=""
        className="absolute top-0 left-0 w-full h-full pointer-events-none select-none"
        style={{
          zIndex: 1,
          transform: `translateX(${parallax.x}px) rotate(${parallax.rot}deg)`,
          transition: "none",
        }}
        draggable={false}
      />
      {/* Contenido */}
      <div className="max-w-7xl mx-auto w-full relative z-[20] pt-[8vh]">
        <div className="text-center mb-[10vh]">
          <img
            src="/images/title-pfp-maker.png"
            alt="PFP MAKER"
            className="w-[50vw] max-w-xl min-w-[350px] h-auto mx-auto"
          />
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Presets Panel */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="space-y-4 pt-6">
              <h3 className="text-black font-bold text-center mb-4">Peanie Presets</h3>
              {penguinPresets.map((preset) => (
                <div
                  key={preset.id}
                  className="flex items-center space-x-3 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                  onClick={() => {
                    if (!uploadedImage) return;
                    // Agregar el preset al canvas en posición random
                    const position = getRandomPosition();
                    const newElement = {
                      id: `penguin-${Date.now()}-${Math.random()}`,
                      preset: preset.id,
                      ...position,
                    };
                    setPenguinElements((prev) => [...prev, newElement]);
                    setSelectedElement(newElement.id);
                  }}
                >
                  <img
                    src={preset.image || "/placeholder.svg"}
                    alt={preset.name}
                    className="w-12 h-12 object-contain rounded"
                  />
                  <div className="flex-1">
                    <div className="text-black font-semibold text-sm">{preset.name}</div>
                    <div className="text-gray-600 text-xs">{preset.description}</div>
                  </div>
                </div>
              ))}
              <div className="pt-4 border-t border-white/20">
                <div className="text-black text-sm mb-2">Elements: {penguinElements.length}</div>
                <Button
                  onClick={clearAllElements}
                  variant="outline"
                  className="w-full bg-red-500/20 text-red-700 border-red-300 hover:bg-red-500/30"
                  disabled={penguinElements.length === 0}
                >
                  <Trash2 className="mr-2" size={16} />
                  Clear All
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Canvas Area */}
          <Card className="lg:col-span-2 bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="pt-6">
              <div
                ref={canvasContainerRef}
                className="relative aspect-square bg-gray-800 rounded-lg overflow-hidden border-2 border-dashed border-white/30 canvas-container"
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {uploadedImage ? (
                  <div className="relative w-full h-full">
                    <img
                      src={uploadedImage || "/placeholder.svg"}
                      alt="Uploaded"
                      className="w-full h-full object-cover"
                    />

                    {/* Render all penguin elements */}
                    {penguinElements.map((element) => {
                      const preset = getPresetById(element.preset)
                      const isSelected = selectedElement === element.id
                      return (
                        <div
                          key={element.id}
                          className={`absolute draggable-penguin transition-all duration-200 ${
                            isSelected ? "ring-2 ring-blue-400 ring-opacity-75" : ""
                          }`}
                          style={{
                            left: `${element.x}%`,
                            top: `${element.y}%`,
                            transform: `translate(-50%, -50%) scale(${element.size / 100}) rotate(${element.rotation}deg) ${element.flipped ? "scaleX(-1)" : ""}`,
                            opacity: element.opacity / 100,
                            zIndex: isSelected ? 10 : 5,
                          }}
                          onMouseDown={(e) => handleMouseDown(e, element.id)}
                          onTouchStart={(e) => handleTouchStart(e, element.id)}
                          onClick={() => setSelectedElement(element.id)}
                          onWheel={(e) => handleWheel(e, element.id)}
                        >
                          <img
                            src={preset?.image || "/placeholder.svg"}
                            alt={preset?.name}
                            style={{
                              width: `${(element.size / 100) * (canvasSize / 4)}px`,
                              height: `${(element.size / 100) * (canvasSize / 4)}px`,
                              pointerEvents: 'none',
                              userSelect: 'none',
                              MozUserSelect: 'none',
                              WebkitUserSelect: 'none',
                            }}
                            draggable={false}
                          />

                          {/* Controls for selected element */}
                          {isSelected && (
                            <>
                              {/* Rotation handle (green, top center) */}
                              <div
                                className="rotation-handle"
                                onMouseDown={(e) => handleRotationStart(e, element.id)}
                              />

                              {/* Corner resize handles (blue) */}
                              <div
                                className="resize-handle"
                                style={{ top: "-6px", right: "-6px" }}
                                onMouseDown={(e) => handleResizeStart(e, element.id)}
                              />
                              <div
                                className="resize-handle"
                                style={{ bottom: "-6px", right: "-6px" }}
                                onMouseDown={(e) => handleResizeStart(e, element.id)}
                              />
                              <div
                                className="resize-handle"
                                style={{ bottom: "-6px", left: "-6px" }}
                                onMouseDown={(e) => handleResizeStart(e, element.id)}
                              />
                              <div
                                className="resize-handle"
                                style={{ top: "-6px", left: "-6px" }}
                                onMouseDown={(e) => handleResizeStart(e, element.id)}
                              />
                            </>
                          )}

                          {/* Delete button */}
                          {isSelected && (
                            <button
                              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs hover:bg-red-600 transition-colors z-20"
                              onClick={(e) => {
                                e.stopPropagation()
                                removeElement(element.id)
                              }}
                            >
                              ×
                            </button>
                          )}
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-gray-600">
                    <Upload size={48} className="mb-4" />
                    <p className="text-center">Upload an image to start creating your PFP</p>
                    <p className="text-sm text-center mt-2 opacity-75">Then click "Customize your PFP" for magic!</p>
                  </div>
                )}
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 px-6 py-2 rounded-full border-4 border-cyan-400 bg-white text-black font-bold text-lg shadow-md hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-2"
                >
                  <Upload className="mr-2" size={16} />
                  Upload Image
                </button>
                <button
                  onClick={async () => {
                    if (!uploadedImage || !canvasContainerRef.current) return;
                    setIsProcessing(true);
                    // Obtener tamaño real del área visible (cuadrado)
                    const rect = canvasContainerRef.current.getBoundingClientRect();
                    const exportSize = Math.round(Math.min(rect.width, rect.height));
                    // Crear canvas cuadrado
                    const exportCanvas = document.createElement('canvas');
                    exportCanvas.width = exportSize;
                    exportCanvas.height = exportSize;
                    const ctx = exportCanvas.getContext('2d');
                    if (!ctx) return;
                    // Dibujar imagen base con object-fit: cover
                    const baseImg = new window.Image();
                    baseImg.src = uploadedImage;
                    await new Promise((resolve) => { baseImg.onload = resolve; });
                    // Calcular recorte para cover
                    const imgAspect = baseImg.width / baseImg.height;
                    const canvasAspect = 1; // cuadrado
                    let sx = 0, sy = 0, sw = baseImg.width, sh = baseImg.height;
                    if (imgAspect > canvasAspect) {
                      // Imagen más ancha que el canvas
                      sw = baseImg.height * canvasAspect;
                      sx = (baseImg.width - sw) / 2;
                    } else if (imgAspect < canvasAspect) {
                      // Imagen más alta que el canvas
                      sh = baseImg.width / canvasAspect;
                      sy = (baseImg.height - sh) / 2;
                    }
                    ctx.drawImage(baseImg, sx, sy, sw, sh, 0, 0, exportSize, exportSize);
                    // Dibujar elementos
                    for (const element of penguinElements) {
                      const preset = getPresetById(element.preset);
                      if (!preset) continue;
                      const elImg = new window.Image();
                      elImg.src = preset.image;
                      await new Promise((resolve) => { elImg.onload = resolve; });
                      ctx.save();
                      // Posición y transformaciones (igual que en pantalla)
                      ctx.translate((element.x / 100) * exportSize, (element.y / 100) * exportSize);
                      ctx.rotate((element.rotation * Math.PI) / 180);
                      if (element.flipped) ctx.scale(-1, 1);
                      const size = (element.size / 100) * (exportSize / 4); // más pequeño en exportación
                      ctx.globalAlpha = element.opacity / 100;
                      ctx.drawImage(elImg, -size / 2, -size / 2, size, size);
                      ctx.restore();
                    }
                    // Descargar
                    const link = document.createElement('a');
                    link.download = `peanie_pfp_${Date.now()}.png`;
                    link.href = exportCanvas.toDataURL('image/png');
                    link.click();
                    setIsProcessing(false);
                  }}
                  disabled={!uploadedImage || isProcessing}
                  className="flex-1 px-6 py-2 rounded-full border-4 border-cyan-400 bg-white text-black font-bold text-lg shadow-md hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  <Download className="mr-2" size={16} />
                  {isProcessing ? "Processing..." : "Download PFP"}
                </button>
              </div>

              {/* Custom Customize Button - FUNCIÓN PRINCIPAL */}
              <div className="text-center mt-4">
                <img
                  src="/images/btn-customize-pfp.png"
                  alt="Customize your PFP"
                  className="h-16 md:h-20 w-auto mx-auto cursor-pointer hover:scale-105 transition-transform duration-300"
                  onClick={customizeRandomPFP}
                />
                {!uploadedImage && <p className="text-gray-500 text-sm mt-2">Upload an image first!</p>}
              </div>

              {/* Canvas oculto para exportar la imagen final */}
              <canvas ref={canvasRef} width={800} height={800} style={{ display: 'none' }} />

              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </CardContent>
          </Card>

          {/* Controls Panel */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="space-y-6 pt-6">
              {selectedElementData ? (
                <>
                  <div className="text-center p-3 bg-blue-100/20 rounded-lg">
                    <div className="text-black font-semibold">{getPresetById(selectedElementData.preset)?.name}</div>
                    <div className="text-gray-600 text-sm">Drag to move</div>
                    <div className="text-gray-600 text-xs">🔵 Corners: resize | 🟢 Top: rotate</div>
                  </div>

                  <div>
                    <label className="text-black text-sm font-medium mb-2 block">
                      Position X ({Math.round(selectedElementData.x)}%)
                    </label>
                    <Slider
                      value={[selectedElementData.x]}
                      onValueChange={([value]) => updateElement(selectedElementData.id, { x: value })}
                      min={-50}
                      max={150}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="text-black text-sm font-medium mb-2 block">
                      Position Y ({Math.round(selectedElementData.y)}%)
                    </label>
                    <Slider
                      value={[selectedElementData.y]}
                      onValueChange={([value]) => updateElement(selectedElementData.id, { y: value })}
                      min={-50}
                      max={150}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="text-black text-sm font-medium mb-2 block">
                      Size ({selectedElementData.size}%)
                    </label>
                    <Slider
                      value={[selectedElementData.size]}
                      onValueChange={([value]) => updateElement(selectedElementData.id, { size: value })}
                      min={10}
                      max={300}
                      step={5}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="text-black text-sm font-medium mb-2 block">
                      Rotation ({Math.round(selectedElementData.rotation)}°)
                    </label>
                    <Slider
                      value={[selectedElementData.rotation]}
                      onValueChange={([value]) => updateElement(selectedElementData.id, { rotation: value })}
                      min={-180}
                      max={180}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-3">
                    <Button
                      onClick={() => updateElement(selectedElementData.id, { flipped: !selectedElementData.flipped })}
                      variant="outline"
                      className="w-full bg-white/10 text-black border-white/20"
                    >
                      Flip Horizontal
                    </Button>

                    <Button
                      onClick={() => removeElement(selectedElementData.id)}
                      variant="outline"
                      className="w-full bg-red-500/20 text-red-700 border-red-300"
                    >
                      <Trash2 className="mr-2" size={16} />
                      Remove Element
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center text-gray-600 py-8">
                  <div className="text-4xl mb-4">🐧</div>
                  <p>Upload an image and click</p>
                  <p className="font-semibold">"Customize your PFP"</p>
                  <p className="text-sm mt-2">to add unique Peanie elements!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      {/* Degradado para transición suave */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white/80 to-transparent z-30 pointer-events-none" />
    </section>
  )
}
