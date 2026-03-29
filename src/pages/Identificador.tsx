import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Upload, Loader2, Leaf, Sun, CloudSun, Moon, Droplets, Thermometer, PawPrint, Sparkles, RotateCcw, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface PlantResult {
  identified: boolean;
  common_name?: string;
  scientific_name?: string;
  description?: string;
  care?: {
    light: string;
    water: string;
    temperature: string;
    difficulty: string;
  };
  pet_safe?: boolean;
  fun_fact?: string;
}

function LightIcon({ light }: { light: string }) {
  if (light === 'Sol Directo') return <Sun className="h-5 w-5" />;
  if (light === 'Luz Indirecta') return <CloudSun className="h-5 w-5" />;
  return <Moon className="h-5 w-5" />;
}

export default function Identificador() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PlantResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const streamRef = useRef<MediaStream | null>(null);

  const processImage = useCallback(async (base64: string) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke('identify-plant', {
        body: { imageBase64: base64.split(',')[1] || base64 },
      });

      if (fnError) throw new Error(fnError.message);
      if (data?.error) throw new Error(data.error);
      setResult(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al identificar la planta');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const base64 = ev.target?.result as string;
      setImage(base64);
      processImage(base64);
    };
    reader.readAsDataURL(file);
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setCameraActive(true);
    } catch {
      setError('No se pudo acceder a la cámara');
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext('2d')?.drawImage(videoRef.current, 0, 0);
    const base64 = canvas.toDataURL('image/jpeg', 0.8);
    setImage(base64);
    stopCamera();
    processImage(base64);
  };

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setCameraActive(false);
  };

  const reset = () => {
    setImage(null);
    setResult(null);
    setError(null);
    stopCamera();
  };

  return (
    <div className="py-12 lg:py-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            Inteligencia Artificial
          </span>
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Identificador de Plantas
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Sube una foto o usa la cámara para identificar cualquier planta y conocer sus cuidados.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!image && !cameraActive && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-4"
            >
              <div
                onClick={() => fileInputRef.current?.click()}
                className="cursor-pointer rounded-3xl border-2 border-dashed border-border bg-card hover:border-primary/40 hover:bg-accent/50 transition-all p-12 text-center group"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-accent-foreground mx-auto mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Upload className="h-7 w-7" />
                </div>
                <p className="font-display text-lg font-semibold text-foreground mb-1">
                  Sube una foto de tu planta
                </p>
                <p className="text-sm text-muted-foreground">
                  Haz clic o arrastra una imagen aquí
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>

              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-border" />
                <span className="text-sm text-muted-foreground">o</span>
                <div className="flex-1 h-px bg-border" />
              </div>

              <button
                onClick={startCamera}
                className="w-full flex items-center justify-center gap-2 rounded-2xl border border-border bg-card px-6 py-4 font-medium text-foreground hover:border-primary/40 hover:bg-accent/50 transition-all"
              >
                <Camera className="h-5 w-5 text-primary" />
                Usar la cámara
              </button>
            </motion.div>
          )}

          {cameraActive && (
            <motion.div
              key="camera"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative rounded-3xl overflow-hidden bg-foreground"
            >
              <video ref={videoRef} className="w-full aspect-[4/3] object-cover" playsInline />
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3">
                <button
                  onClick={stopCamera}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm text-foreground hover:bg-background transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
                <button
                  onClick={capturePhoto}
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground ring-4 ring-primary-foreground/30 hover:opacity-90 transition-opacity"
                >
                  <Camera className="h-6 w-6" />
                </button>
              </div>
            </motion.div>
          )}

          {image && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {/* Preview image */}
              <div className="relative rounded-3xl overflow-hidden">
                <img src={image} alt="Planta" className="w-full aspect-[4/3] object-cover" />
                <button
                  onClick={reset}
                  className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm text-foreground hover:bg-background transition-colors"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              </div>

              {/* Loading */}
              {loading && (
                <div className="rounded-2xl border border-border bg-card p-8 text-center">
                  <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-3" />
                  <p className="font-display font-semibold text-foreground">Analizando tu planta...</p>
                  <p className="text-sm text-muted-foreground mt-1">Esto puede tardar unos segundos</p>
                </div>
              )}

              {/* Error */}
              {error && (
                <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6 text-center">
                  <p className="text-destructive font-medium">{error}</p>
                  <button
                    onClick={reset}
                    className="mt-3 text-sm text-muted-foreground hover:text-foreground underline"
                  >
                    Intentar de nuevo
                  </button>
                </div>
              )}

              {/* Result */}
              {result?.identified && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl border border-border bg-card overflow-hidden"
                >
                  <div className="p-6 border-b border-border">
                    <div className="flex items-center gap-2 mb-2">
                      <Leaf className="h-5 w-5 text-primary" />
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Planta identificada
                      </span>
                    </div>
                    <h2 className="font-display text-2xl font-bold text-foreground">
                      {result.common_name}
                    </h2>
                    <p className="text-sm text-muted-foreground italic">{result.scientific_name}</p>
                    <p className="mt-3 text-muted-foreground leading-relaxed">{result.description}</p>
                  </div>

                  {result.care && (
                    <div className="grid grid-cols-2 gap-px bg-border">
                      <div className="bg-card p-4 flex items-start gap-3">
                        <LightIcon light={result.care.light} />
                        <div>
                          <p className="text-xs font-medium text-muted-foreground">Luz</p>
                          <p className="text-sm font-medium text-foreground">{result.care.light}</p>
                        </div>
                      </div>
                      <div className="bg-card p-4 flex items-start gap-3">
                        <Droplets className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-xs font-medium text-muted-foreground">Riego</p>
                          <p className="text-sm font-medium text-foreground">{result.care.water}</p>
                        </div>
                      </div>
                      <div className="bg-card p-4 flex items-start gap-3">
                        <Thermometer className="h-5 w-5 text-secondary" />
                        <div>
                          <p className="text-xs font-medium text-muted-foreground">Temperatura</p>
                          <p className="text-sm font-medium text-foreground">{result.care.temperature}</p>
                        </div>
                      </div>
                      <div className="bg-card p-4 flex items-start gap-3">
                        <PawPrint className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-xs font-medium text-muted-foreground">Mascotas</p>
                          <p className="text-sm font-medium text-foreground">
                            {result.pet_safe ? 'Segura ✓' : 'Tóxica ✗'}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {result.fun_fact && (
                    <div className="p-5 bg-accent/50 border-t border-border">
                      <p className="text-sm text-accent-foreground">
                        <span className="font-semibold">💡 Dato curioso:</span> {result.fun_fact}
                      </p>
                    </div>
                  )}
                </motion.div>
              )}

              {result && !result.identified && (
                <div className="rounded-2xl border border-border bg-card p-6 text-center">
                  <p className="font-display font-semibold text-foreground mb-1">
                    No pudimos identificar esta planta
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Prueba con otra foto con mejor iluminación y más cerca de la planta.
                  </p>
                  <button
                    onClick={reset}
                    className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Intentar de nuevo
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
