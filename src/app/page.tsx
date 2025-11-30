"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Settings, Heart, Info, Monitor, RefreshCw, 
  Facebook, Instagram, Youtube, Gamepad2, 
  X, FileVideo, CheckCircle2, 
  ArrowRight, Loader2, AlertCircle, Music, Download,
  Copy, Share2, Star, UserPlus, Shield, Globe,
  ClipboardPaste, Image as ImageIcon, Film, Headphones
} from "lucide-react";
import { Toaster, toast } from "sonner";
import { translations } from "@/lib/translations";
import { SettingsView } from "@/components/views/SettingsView";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DownloadOption {
  type: "video" | "audio" | "image";
  title: string;
  qualities: string[];
  selectedQuality: string;
  format: string;
  size: string;
}

interface QueueItem {
  id: string;
  name: string;
  size: string;
  status: string;
}

export default function MediaDownloader() {
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"idle" | "analyzing" | "downloading" | "completed" | "error">("idle");
  const [progress, setProgress] = useState(0);
  const [downloadOptions, setDownloadOptions] = useState<DownloadOption[]>([]);
  const [currentView, setCurrentView] = useState("home");
  const [theme, setTheme] = useState("dark");
  const [language, setLanguage] = useState("en");
  const [autoLanguage, setAutoLanguage] = useState(true);
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [showQueue, setShowQueue] = useState(false);
  const [donateAmount, setDonateAmount] = useState("50000");
  const [donateMessage, setDonateMessage] = useState("Ung ho GumballZ");
  
  const [settings, setSettings] = useState({
    reduceMotion: false,
    reduceTransparency: false,
    noAutoQueue: false,
    videoQuality: "max",
    videoCodec: "h264",
    allowH265: false,
    twitterGif: false,
    audioFormat: "mp3",
    tiktokSound: false,
    filenameStyle: "classic",
    disableMetadata: false,
    tunneling: false,
    noAnalytics: false,
    debug: false
  });

  // Load settings from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const savedLang = localStorage.getItem("language");
    const savedAutoLang = localStorage.getItem("autoLanguage");
    const savedSettings = localStorage.getItem("settings");

    if (savedTheme) setTheme(savedTheme);
    if (savedLang) setLanguage(savedLang);
    if (savedAutoLang) setAutoLanguage(savedAutoLang === "true");
    if (savedSettings) setSettings(JSON.parse(savedSettings));
  }, []);

  // Save settings to localStorage
  useEffect(() => {
    localStorage.setItem("theme", theme);
    localStorage.setItem("language", language);
    localStorage.setItem("autoLanguage", String(autoLanguage));
    localStorage.setItem("settings", JSON.stringify(settings));
  }, [theme, language, autoLanguage, settings]);

  // Apply theme
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else if (theme === "light") {
      document.documentElement.classList.remove("dark");
    } else if (theme === "auto") {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [theme]);

  // Apply language
  useEffect(() => {
    if (autoLanguage) {
      const browserLang = navigator.language.startsWith("vi") ? "vi" : "en";
      setLanguage(browserLang);
    }
  }, [autoLanguage]);

  const t = translations[language as keyof typeof translations] || translations.en;

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInput(text);
      toast.success("Link pasted!");
    } catch (err) {
      toast.error("Failed to read clipboard");
    }
  };

  const handleAnalyze = () => {
    if (!input) return;
    setStatus("analyzing");
    
    // Mock analysis
    setTimeout(() => {
      setStatus("idle");
      setDownloadOptions([
        { 
          type: "video", 
          title: "Video Download",
          qualities: ["1080p", "720p", "480p", "360p"],
          selectedQuality: "1080p",
          format: "MP4", 
          size: "~125 MB" 
        },
        { 
          type: "audio", 
          title: "Audio Extract",
          qualities: ["320kbps", "192kbps", "128kbps"],
          selectedQuality: "320kbps",
          format: "MP3", 
          size: "~8 MB" 
        },
        { 
          type: "image", 
          title: "Cover Art",
          qualities: ["Original", "Large", "Medium"],
          selectedQuality: "Original",
          format: "JPG", 
          size: "~2 MB" 
        },
      ]);
    }, 1500);
  };

  const handleDownload = (option: DownloadOption) => {
    setStatus("downloading");
    setProgress(0);

    const newItem: QueueItem = {
      id: Date.now().toString(),
      name: `${option.type}_${Date.now()}.${option.format.toLowerCase()}`,
      size: option.size,
      status: "downloading"
    };
    setQueue(prev => [newItem, ...prev]);
    if (!settings.noAutoQueue) {
      setShowQueue(true);
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setStatus("completed");
          setQueue(prevQueue => prevQueue.map(item => 
            item.id === newItem.id ? { ...item, status: "completed" } : item
          ));
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const handleDownloadQR = () => {
    const canvas = document.createElement("canvas");
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = `https://img.vietqr.io/image/OCB-0388205003-compact2.png?amount=${donateAmount}&addInfo=${encodeURIComponent(donateMessage)}&accountName=NGUYEN%20QUOC%20HUNG`;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        const a = document.createElement("a");
        a.href = canvas.toDataURL("image/png");
        a.download = "gumballz-donate-qr.png";
        a.click();
        toast.success("QR Code downloaded!");
      }
    };
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 font-sans transition-colors duration-300 flex flex-col selection:bg-blue-500/30">
      {/* Navbar */}
      <nav className="border-b border-slate-200/50 dark:border-slate-800/50 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => setCurrentView("home")}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
              <div className="relative h-9 w-9 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
                <Monitor className="h-5 w-5 text-white" />
              </div>
            </div>
            <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">
              GumballZ
            </span>
          </div>
          
          <div className="flex items-center gap-1 bg-slate-100/50 dark:bg-slate-900/50 p-1 rounded-full border border-slate-200/50 dark:border-slate-800/50 backdrop-blur-sm">
            {[
              { id: "home", icon: Monitor, label: t.nav.home },
              { id: "remux", icon: RefreshCw, label: t.nav.remux },
              { id: "settings", icon: Settings, label: t.nav.settings },
              { id: "donate", icon: Heart, label: t.nav.donate, color: "text-red-500" },
              { id: "about", icon: Info, label: t.nav.about },
            ].map((item) => (
              <Button 
                key={item.id}
                variant={currentView === item.id ? "secondary" : "ghost"} 
                size="sm"
                className={`rounded-full px-4 transition-all duration-300 ${currentView === item.id ? 'bg-white dark:bg-slate-800 shadow-sm' : 'hover:bg-slate-200/50 dark:hover:bg-slate-800/50'}`}
                onClick={() => setCurrentView(item.id)}
              >
                <item.icon className={`h-4 w-4 mr-2 ${item.color || ""}`} />
                {item.label}
              </Button>
            ))}
          </div>
        </div>
      </nav>

      <main className="flex-1 container max-w-6xl mx-auto px-4 py-12 relative">
        {/* Process Queue */}
        {showQueue && (
          <div className="fixed top-20 right-4 w-80 z-50 animate-in slide-in-from-right duration-500 ease-out">
            <Card className="shadow-2xl border-slate-200/50 dark:border-slate-800/50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl overflow-hidden">
              <CardHeader className="p-4 py-3 border-b border-slate-100 dark:border-slate-800 flex flex-row items-center justify-between space-y-0 bg-slate-50/50 dark:bg-slate-900/50">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm">Queue</span>
                  <span className="bg-blue-600 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold tracking-wide">BETA</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 w-6 p-0 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30 text-slate-400 hover:text-red-500 transition-colors" 
                  onClick={() => {setQueue([]); setShowQueue(false);}}
                >
                  <X className="h-3 w-3" />
                </Button>
              </CardHeader>
              <CardContent className="p-0 max-h-96 overflow-y-auto">
                {queue.length === 0 ? (
                  <div className="p-8 text-center text-slate-400 text-sm">Queue is empty</div>
                ) : (
                  queue.map((item) => (
                    <div key={item.id} className="p-3 border-b border-slate-100 dark:border-slate-800 last:border-0 flex items-start gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg">
                        <FileVideo className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate text-slate-700 dark:text-slate-200">{item.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          {item.status === "completed" ? (
                            <CheckCircle2 className="h-3 w-3 text-green-500" />
                          ) : (
                            <RefreshCw className="h-3 w-3 text-blue-500 animate-spin" />
                          )}
                          <span className="text-xs text-slate-500 font-medium">{item.size}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {currentView === "home" && (
          <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out">
            <div className="text-center space-y-6 mb-16 relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-[100px] rounded-full -z-10 pointer-events-none" />
              
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 pb-4 drop-shadow-sm">
                GumballZ
              </h1>
              <p className="text-slate-600 dark:text-slate-300 text-xl md:text-2xl max-w-2xl mx-auto font-medium leading-relaxed">
                {t.about.desc}
              </p>
            </div>

            <Card className="border-0 shadow-2xl shadow-blue-500/10 bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl ring-1 ring-white/20 dark:ring-slate-800/50 overflow-hidden rounded-3xl">
              <CardContent className="p-3">
                <div className="flex gap-3 relative group">
                  <div className="relative flex-1">
                    <Input 
                      placeholder={t.home.placeholder}
                      className="h-16 text-lg bg-white/50 dark:bg-slate-950/50 border-0 focus-visible:ring-2 focus-visible:ring-blue-500/50 px-6 rounded-2xl shadow-inner transition-all duration-300 pr-14"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
                    />
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-xl text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                      onClick={handlePaste}
                      title="Paste from clipboard"
                    >
                      <ClipboardPaste className="h-5 w-5" />
                    </Button>
                  </div>
                  <Button 
                    size="lg" 
                    className="h-16 px-10 text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                    onClick={handleAnalyze}
                    disabled={status === "analyzing" || !input}
                  >
                    {status === "analyzing" ? (
                      <Loader2 className="h-6 w-6 animate-spin" />
                    ) : (
                      <ArrowRight className="h-6 w-6" />
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {status === "downloading" && (
              <Card className="animate-in fade-in zoom-in-95 duration-500 border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-xl rounded-2xl">
                <CardContent className="p-8 space-y-6">
                  <div className="flex items-center justify-between text-base font-medium">
                    <span className="flex items-center gap-3 text-blue-600 dark:text-blue-400">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        <Loader2 className="h-5 w-5 animate-spin" />
                      </div>
                      {t.home.downloading}
                    </span>
                    <span className="font-mono bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-md">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-3 rounded-full bg-slate-100 dark:bg-slate-800" indicatorClassName="bg-gradient-to-r from-blue-500 to-purple-500" />
                </CardContent>
              </Card>
            )}

            {status === "completed" && (
              <Card className="bg-green-50/50 dark:bg-green-900/10 border-green-200/50 dark:border-green-900/50 animate-in fade-in zoom-in-95 duration-500 backdrop-blur-sm rounded-2xl">
                <CardContent className="p-6 flex items-center gap-4 text-green-700 dark:text-green-400">
                  <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <span className="font-semibold text-lg">{t.home.downloaded}</span>
                </CardContent>
              </Card>
            )}

            {status === "error" && (
              <Card className="bg-red-50/50 dark:bg-red-900/10 border-red-200/50 dark:border-red-900/50 animate-in fade-in zoom-in-95 duration-500 backdrop-blur-sm rounded-2xl">
                <CardContent className="p-6 flex items-center gap-4 text-red-700 dark:text-red-400">
                  <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-full">
                    <AlertCircle className="h-6 w-6" />
                  </div>
                  <span className="font-semibold text-lg">{t.home.error}</span>
                </CardContent>
              </Card>
            )}

            {downloadOptions.length > 0 && status !== "downloading" && status !== "completed" && (
              <div className="grid md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-12 duration-700">
                {downloadOptions.map((option, index) => (
                  <Card key={index} className="overflow-hidden border-0 shadow-xl shadow-slate-200/50 dark:shadow-black/20 bg-white dark:bg-slate-900 rounded-3xl hover:-translate-y-2 transition-transform duration-300 group">
                    <div className={`h-2 w-full bg-gradient-to-r ${
                      option.type === 'video' ? 'from-blue-500 to-cyan-500' : 
                      option.type === 'audio' ? 'from-pink-500 to-rose-500' : 
                      'from-amber-500 to-orange-500'
                    }`} />
                    <CardContent className="p-6 space-y-6">
                      <div className="flex items-center gap-4">
                        <div className={`h-14 w-14 rounded-2xl flex items-center justify-center shadow-lg ${
                          option.type === 'video' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 
                          option.type === 'audio' ? 'bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400' : 
                          'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400'
                        }`}>
                          {option.type === "video" ? <Film className="h-7 w-7" /> : 
                           option.type === "audio" ? <Headphones className="h-7 w-7" /> : 
                           <ImageIcon className="h-7 w-7" />}
                        </div>
                        <div>
                          <h3 className="font-bold text-lg leading-tight">{option.title}</h3>
                          <p className="text-sm text-slate-500 font-medium">{option.format} • {option.size}</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Quality</Label>
                        <div className="grid grid-cols-2 gap-2">
                          {option.qualities.slice(0, 4).map((q) => (
                            <Button 
                              key={q} 
                              variant={option.selectedQuality === q ? "default" : "outline"}
                              size="sm"
                              className={`text-xs ${option.selectedQuality === q ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900' : ''}`}
                              onClick={() => {
                                const newOptions = [...downloadOptions];
                                newOptions[index].selectedQuality = q;
                                setDownloadOptions(newOptions);
                              }}
                            >
                              {q}
                            </Button>
                          ))}
                        </div>
                      </div>

                      <Button 
                        onClick={() => handleDownload(option)} 
                        className={`w-full gap-2 font-bold shadow-lg transition-all duration-300 ${
                          option.type === 'video' ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/20' : 
                          option.type === 'audio' ? 'bg-pink-600 hover:bg-pink-700 shadow-pink-500/20' : 
                          'bg-amber-600 hover:bg-amber-700 shadow-amber-500/20'
                        }`}
                      >
                        <Download className="h-4 w-4" />
                        Download
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {currentView === "remux" && (
          <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-4xl md:text-5xl font-black tracking-tight">{t.remux.title}</h2>
              <p className="text-slate-500 dark:text-slate-400 text-lg">Fix media containers quickly and easily.</p>
            </div>

            <Card className="border-2 border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 hover:bg-slate-100/50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group rounded-3xl">
              <CardContent className="flex flex-col items-center justify-center py-20 text-center space-y-6">
                <div className="h-24 w-24 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-500">
                  <RefreshCw className="h-10 w-10 text-blue-500 group-hover:rotate-180 transition-transform duration-700" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-2xl">{t.remux.drop}</h3>
                  <p className="text-slate-500">{t.remux.drag}</p>
                </div>
                <div className="flex gap-3 text-xs font-bold text-slate-400 uppercase tracking-widest">
                  <span className="bg-white dark:bg-slate-800 px-3 py-1.5 rounded-lg shadow-sm">mp4</span>
                  <span className="bg-white dark:bg-slate-800 px-3 py-1.5 rounded-lg shadow-sm">mkv</span>
                  <span className="bg-white dark:bg-slate-800 px-3 py-1.5 rounded-lg shadow-sm">webm</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {currentView === "settings" && (
          <SettingsView 
            t={t} 
            settings={settings} 
            setSettings={setSettings} 
            theme={theme} 
            setTheme={setTheme} 
            language={language} 
            setLanguage={setLanguage} 
            autoLanguage={autoLanguage} 
            setAutoLanguage={setAutoLanguage} 
          />
        )}

        {currentView === "donate" && (
          <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-4xl md:text-5xl font-black tracking-tight">{t.donate.title}</h2>
              <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto">{t.donate.desc}</p>
            </div>

            <div className="grid md:grid-cols-12 gap-8">
              {/* VietQR Section */}
              <div className="md:col-span-7">
                <Card className="overflow-hidden border-0 shadow-2xl shadow-blue-500/10 bg-white dark:bg-slate-900 rounded-3xl h-full">
                  <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-6 text-white">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                        <Heart className="h-6 w-6 fill-white" />
                      </div>
                      <h3 className="text-xl font-bold">{t.donate.oneTime}</h3>
                    </div>
                    <p className="text-blue-100 text-sm">{t.donate.scan}</p>
                  </div>
                  
                  <CardContent className="p-8 space-y-8">
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                      <div className="flex-shrink-0 bg-white p-4 rounded-2xl shadow-lg border border-slate-100">
                        {/* Dynamic QR Code */}
                        <img 
                          src={`https://img.vietqr.io/image/OCB-0388205003-compact2.png?amount=${donateAmount}&addInfo=${encodeURIComponent(donateMessage)}&accountName=NGUYEN%20QUOC%20HUNG`}
                          alt="VietQR"
                          className="w-48 h-48 rounded-lg"
                        />
                        <div className="mt-4 text-center space-y-1">
                           <p className="font-black text-xl text-slate-900 tracking-tight">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(parseInt(donateAmount) || 0)}</p>
                           <p className="text-xs text-slate-500 max-w-[190px] break-words mx-auto font-medium">{donateMessage}</p>
                        </div>
                      </div>
                      
                      <div className="flex-1 space-y-6 w-full">
                        <div className="space-y-3">
                          <Label className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Quick Select</Label>
                          <div className="flex gap-2">
                            {["10000", "20000", "50000", "100000"].map((amount) => (
                              <Button 
                                key={amount}
                                variant={donateAmount === amount ? "default" : "outline"}
                                className={`flex-1 ${donateAmount === amount ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                                onClick={() => setDonateAmount(amount)}
                              >
                                {parseInt(amount) / 1000}k
                              </Button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="grid gap-2">
                            <Label>Amount (VND)</Label>
                            <Input 
                              type="number" 
                              value={donateAmount} 
                              onChange={(e) => setDonateAmount(e.target.value)}
                              step="10000"
                              min="1000"
                              className="h-12 text-lg font-medium"
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label>Message</Label>
                            <Input 
                              value={donateMessage} 
                              onChange={(e) => setDonateMessage(e.target.value)}
                              maxLength={50}
                              className="h-12"
                            />
                          </div>
                        </div>

                        <Button className="w-full h-12 font-bold" variant="secondary" onClick={handleDownloadQR}>
                          <Download className="mr-2 h-4 w-4" />
                          Download QR (PNG)
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="md:col-span-5 space-y-6">
                {/* Zypage Section */}
                <Card className="border-0 shadow-xl bg-gradient-to-br from-pink-500 to-rose-600 text-white rounded-3xl overflow-hidden relative">
                  <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Heart className="h-32 w-32 fill-white" />
                  </div>
                  <CardContent className="p-8 relative z-10">
                    <h3 className="text-2xl font-bold mb-2">{t.donate.recurring}</h3>
                    <p className="text-pink-100 mb-6">Become a sponsor and support development.</p>
                    <Button className="w-full bg-white text-pink-600 hover:bg-pink-50 border-0 h-12 font-bold shadow-lg" asChild>
                      <a href="https://zypage.com" target="_blank" rel="noopener noreferrer">
                        <Heart className="mr-2 h-5 w-5 fill-pink-600" />
                        {t.donate.zypage}
                      </a>
                    </Button>
                  </CardContent>
                </Card>

                {/* Share Section */}
                <Card className="border-0 shadow-xl bg-white dark:bg-slate-900 rounded-3xl overflow-hidden">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-indigo-600">
                      <Share2 className="h-5 w-5" />
                      {t.donate.shareTitle}
                    </CardTitle>
                    <CardDescription>{t.donate.shareDesc}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex justify-center bg-slate-50 dark:bg-slate-950 p-6 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
                       <img 
                         src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent("https://gumballzdownload.vercel.app")}`}
                         alt="App QR"
                         className="w-32 h-32 mix-blend-multiply dark:mix-blend-normal"
                       />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline" className="w-full h-10" onClick={() => {
                        navigator.clipboard.writeText("https://gumballzdownload.vercel.app");
                        toast.success("Link copied!");
                      }}>
                        <Copy className="mr-2 h-4 w-4" /> {t.donate.copyLink}
                      </Button>
                      <Button variant="outline" className="w-full h-10" onClick={() => {
                         if (navigator.share) {
                           navigator.share({
                             title: 'GumballZ',
                             text: 'Check out GumballZ - The best media downloader!',
                             url: 'https://gumballzdownload.vercel.app',
                           });
                         } else {
                           toast.error("Sharing not supported on this device");
                         }
                      }}>
                        <Share2 className="mr-2 h-4 w-4" /> {t.donate.share}
                      </Button>
                      <Button variant="secondary" className="w-full h-10 col-span-2" asChild>
                        <a href="https://github.com/nughnguyen" target="_blank">
                          <UserPlus className="mr-2 h-4 w-4 text-blue-500" /> {t.donate.follow}
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

        {currentView === "about" && (
          <div className="max-w-3xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-4xl md:text-5xl font-black tracking-tight">{t.about.title}</h2>
              <p className="text-slate-500 dark:text-slate-400 text-lg">{t.about.desc}</p>
            </div>

            <div className="grid gap-8">
              <Card className="border-0 shadow-xl bg-white dark:bg-slate-900 rounded-3xl overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-blue-500 to-cyan-500" />
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                      <Globe className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-2xl font-bold">{t.about.mission}</h3>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                    {t.about.missionDesc}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl bg-white dark:bg-slate-900 rounded-3xl overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-green-500 to-emerald-500" />
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
                      <Shield className="h-8 w-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-2xl font-bold">Privacy First</h3>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                    We don't log your downloads or store your personal data. Everything happens in your browser or through secure, anonymous processing.
                  </p>
                </CardContent>
              </Card>
              
              <div className="text-center text-sm text-slate-400 font-mono">
                {t.about.version}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 mt-auto">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-sm text-slate-500 font-medium">
              © 2025 GumballZ. All rights reserved.
            </div>
            
            <div className="flex items-center gap-8">
              <a href="#" className="text-slate-400 hover:text-blue-600 hover:scale-110 transition-all duration-300"><Facebook className="h-6 w-6" /></a>
              <a href="#" className="text-slate-400 hover:text-pink-600 hover:scale-110 transition-all duration-300"><Instagram className="h-6 w-6" /></a>
              <a href="#" className="text-slate-400 hover:text-red-600 hover:scale-110 transition-all duration-300"><Youtube className="h-6 w-6" /></a>
              <a href="#" className="text-slate-400 hover:text-indigo-500 hover:scale-110 transition-all duration-300"><Gamepad2 className="h-6 w-6" /></a>
            </div>

            <div className="flex items-center gap-2 text-sm font-bold animate-rainbow bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
              Powered by Nguyen Quoc Hung
            </div>
          </div>
        </div>
      </footer>
      <Toaster />
    </div>
  );
}
