"use client";

import React, { useState, useCallback, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { 
  Search, Download, FileVideo, FileAudio, FileImage, Link as LinkIcon, 
  CheckCircle2, AlertCircle, Settings, Heart, Info, RefreshCw, 
  Monitor, Moon, Sun, Globe, Copy, Share2, Star, UserPlus, FileUp
} from "lucide-react";

// --- Types ---
type View = "home" | "remux" | "settings" | "donate" | "about";
type MediaType = "video" | "audio" | "image";

interface DownloadOption {
  id: string;
  type: MediaType;
  label: string;
  quality: string;
  size: string;
  format: string;
  colorClass: string;
}

// --- Mock Data ---
const generateMockOptions = (): DownloadOption[] => [
  { id: "1", type: "video", label: "Video MP4", quality: "1080p Full HD", size: "145.5 MB", format: "mp4", colorClass: "bg-gradient-to-br from-violet-500 to-purple-600 text-white" },
  { id: "2", type: "video", label: "Video MP4", quality: "720p HD", size: "85.2 MB", format: "mp4", colorClass: "bg-gradient-to-br from-blue-500 to-cyan-600 text-white" },
  { id: "3", type: "audio", label: "Audio MP3", quality: "320kbps", size: "8.4 MB", format: "mp3", colorClass: "bg-gradient-to-br from-emerald-400 to-teal-600 text-white" },
  { id: "4", type: "image", label: "Thumbnail JPG", quality: "Original", size: "1.2 MB", format: "jpg", colorClass: "bg-gradient-to-br from-orange-400 to-pink-600 text-white" },
];

const SUPPORTED_SERVICES = [
  "bilibili", "bluesky", "dailymotion", "facebook", "instagram", "loom", "ok", "pinterest", 
  "reddit", "rutube", "snapchat", "soundcloud", "streamable", "tiktok", "tumblr", "twitch", 
  "twitter", "vimeo", "vk", "youtube"
];

// --- Components ---

const Navbar = ({ currentView, setView }: { currentView: View, setView: (v: View) => void }) => (
  <header className="sticky top-0 z-50 w-full border-b bg-white/80 dark:bg-slate-950/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
    <div className="container mx-auto px-4 h-16 flex items-center justify-between">
      <div 
        className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
        onClick={() => setView("home")}
      >
        <div className="bg-primary text-primary-foreground p-1.5 rounded-lg">
          <Download className="h-5 w-5" />
        </div>
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 hidden sm:block">
          MediaGrab.io
        </h1>
      </div>
      
      <nav className="flex items-center gap-1 sm:gap-2">
        <Button variant={currentView === "remux" ? "secondary" : "ghost"} size="sm" onClick={() => setView("remux")}>
          <RefreshCw className="h-4 w-4 sm:mr-2" />
          <span className="hidden sm:inline">Remux</span>
        </Button>
        <Button variant={currentView === "settings" ? "secondary" : "ghost"} size="sm" onClick={() => setView("settings")}>
          <Settings className="h-4 w-4 sm:mr-2" />
          <span className="hidden sm:inline">Settings</span>
        </Button>
        <Button variant={currentView === "donate" ? "secondary" : "ghost"} size="sm" onClick={() => setView("donate")}>
          <Heart className="h-4 w-4 sm:mr-2" />
          <span className="hidden sm:inline">Donate</span>
        </Button>
        <Button variant={currentView === "about" ? "secondary" : "ghost"} size="sm" onClick={() => setView("about")}>
          <Info className="h-4 w-4 sm:mr-2" />
          <span className="hidden sm:inline">About</span>
        </Button>
      </nav>
    </div>
  </header>
);

const HomeView = () => {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState<"idle" | "analyzing" | "ready" | "downloading">("idle");
  const [progress, setProgress] = useState(0);
  const [options, setOptions] = useState<DownloadOption[]>([]);

  const handleAnalyzeUrl = useCallback(async () => {
    if (!url.trim()) {
      toast.error("Vui lòng nhập URL hợp lệ!");
      return;
    }
    setStatus("analyzing");
    setProgress(0);
    setOptions([]);

    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 90 ? 90 : prev + 10));
    }, 300);

    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setOptions(generateMockOptions());
      setStatus("ready");
      toast.success("Phân tích thành công!");
    }, 2000);
  }, [url]);

  const handleDownload = (option: DownloadOption) => {
    setStatus("downloading");
    toast.info(`Đang tải xuống: ${option.label}...`);
    setTimeout(() => {
      setStatus("ready");
      toast.success(`Đã tải xuống: ${option.label}`);
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center gap-10 w-full max-w-4xl animate-in fade-in duration-500">
      <div className="text-center space-y-4">
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight lg:text-6xl">
          Công Cụ Tải Xuống <span className="text-primary">Đa Phương Tiện</span>
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Hỗ trợ tải xuống từ Youtube, Facebook, TikTok và nhiều nền tảng khác.
        </p>
      </div>

      <Card className="w-full shadow-xl border-slate-200 dark:border-slate-800 overflow-hidden">
        <CardContent className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input 
                placeholder="Dán URL video hoặc bài viết vào đây..." 
                className="pl-10 h-12 text-lg"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAnalyzeUrl()}
                disabled={status === "analyzing" || status === "downloading"}
              />
            </div>
            <Button 
              size="lg" 
              className="h-12 px-8 text-lg font-semibold"
              onClick={handleAnalyzeUrl}
              disabled={status === "analyzing" || status === "downloading"}
            >
              {status === "analyzing" ? "Đang xử lý..." : "Phân Tích Link"}
            </Button>
          </div>
          {(status === "analyzing" || status === "downloading") && (
            <Progress value={progress} className="h-2" />
          )}
        </CardContent>
      </Card>

      {status === "ready" && options.length > 0 && (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in slide-in-from-bottom-4 duration-500">
          {options.map((option) => (
            <Card key={option.id} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all group">
              <CardHeader className={`${option.colorClass} p-6`}>
                <CardTitle className="text-2xl font-bold text-white">{option.quality}</CardTitle>
                <p className="text-white/80 font-medium">{option.label}</p>
              </CardHeader>
              <CardContent className="p-6 bg-white dark:bg-slate-900">
                <div className="flex justify-between text-sm text-slate-500 mb-4">
                  <span>Size:</span><span className="font-semibold text-slate-900 dark:text-slate-100">{option.size}</span>
                </div>
                <Button className="w-full" onClick={() => handleDownload(option)}>
                  <Download className="mr-2 h-4 w-4" /> Tải Ngay
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="w-full max-w-2xl text-center space-y-4">
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Supported Services</h3>
        <div className="flex flex-wrap justify-center gap-2">
          {SUPPORTED_SERVICES.map((service) => (
            <span key={service} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-xs font-medium text-slate-600 dark:text-slate-300">
              {service}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const RemuxView = () => (
  <div className="flex flex-col items-center gap-8 w-full max-w-4xl animate-in fade-in duration-500">
    <div className="text-center space-y-2">
      <h2 className="text-3xl font-bold">Remux Media</h2>
      <p className="text-slate-500">Fix container issues and increase compatibility without re-encoding.</p>
    </div>
    
    <div className="w-full max-w-xl border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-3xl p-12 flex flex-col items-center justify-center text-center gap-4 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors cursor-pointer">
      <FileUp className="h-16 w-16 text-slate-400" />
      <div className="space-y-1">
        <h3 className="text-xl font-semibold">Drag or select files</h3>
        <p className="text-sm text-slate-500">Supported formats: mp4, webm, mp3, ogg, opus, wav, m4a</p>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><RefreshCw className="h-5 w-5" /> What does remux do?</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-slate-600 dark:text-slate-400">
          Remux fixes any issues with the file container, such as missing time info. It helps increase compatibility with old software like Vegas Pro.
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Monitor className="h-5 w-5" /> On-device processing</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-slate-600 dark:text-slate-400">
          MediaGrab remuxes files locally. Files never leave your device, so processing is nearly instant.
        </CardContent>
      </Card>
    </div>
  </div>
);

const SettingsView = () => (
  <div className="flex flex-col gap-8 w-full max-w-3xl animate-in fade-in duration-500">
    <h2 className="text-3xl font-bold">Settings</h2>
    
    <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
      <div className="space-y-1">
        {["Appearance", "Accessibility", "Video", "Audio", "Privacy", "Advanced"].map((item, i) => (
          <Button key={item} variant={i === 0 ? "secondary" : "ghost"} className="w-full justify-start">
            {item}
          </Button>
        ))}
      </div>
      
      <div className="space-y-8">
        <section className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2"><Sun className="h-5 w-5" /> Theme</h3>
          <div className="grid grid-cols-3 gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
            <Button variant="ghost" className="bg-white dark:bg-slate-700 shadow-sm">Auto</Button>
            <Button variant="ghost">Light</Button>
            <Button variant="ghost">Dark</Button>
          </div>
          <p className="text-xs text-slate-500">Auto theme switches between light and dark themes depending on your device's display mode.</p>
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2"><Globe className="h-5 w-5" /> Language</h3>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <span>Automatic Selection</span>
            <div className="h-6 w-11 bg-slate-200 rounded-full relative cursor-pointer"><div className="absolute right-1 top-1 h-4 w-4 bg-white rounded-full shadow" /></div>
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg bg-slate-50 dark:bg-slate-900">
            <span>Preferred Language</span>
            <span className="font-medium">English</span>
          </div>
        </section>
      </div>
    </div>
  </div>
);

const DonateView = () => {
  const [amount, setAmount] = useState("50000");
  const [content, setContent] = useState("Ung ho MediaGrab");
  const [qrUrl, setQrUrl] = useState("");

  useEffect(() => {
    // Generate VietQR URL
    // Format: https://img.vietqr.io/image/<BANK_ID>-<ACCOUNT_NO>-<TEMPLATE>.png?amount=<AMOUNT>&addInfo=<CONTENT>
    const bankId = "OCB";
    const accountNo = "0004100037889006";
    const template = "compact2";
    const cleanAmount = amount.replace(/[^0-9]/g, "") || "0";
    const encodedContent = encodeURIComponent(content);
    
    setQrUrl(`https://img.vietqr.io/image/${bankId}-${accountNo}-${template}.png?amount=${cleanAmount}&addInfo=${encodedContent}`);
  }, [amount, content]);

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-5xl animate-in fade-in duration-500">
      <div className="w-full bg-gradient-to-r from-slate-900 to-slate-800 text-white p-8 sm:p-12 rounded-3xl relative overflow-hidden">
         <div className="relative z-10 max-w-2xl space-y-4">
           <h2 className="text-3xl sm:text-4xl font-bold">Support a safe and open Internet</h2>
           <p className="text-slate-300 text-lg">Donate to help us maintain the service. Free, no ads, forever.</p>
         </div>
         {/* Abstract decoration */}
         <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-1/4 translate-y-1/4">
           <Heart className="h-96 w-96" />
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
        {/* Donation Options */}
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-slate-900 text-white border-0">
              <CardHeader>
                <CardTitle className="text-lg">One-time Donation</CardTitle>
                <CardDescription className="text-slate-400">via VietQR (OCB)</CardDescription>
              </CardHeader>
            </Card>
            <a href="https://zypage.com/gumballz" target="_blank" rel="noopener noreferrer" className="block h-full">
              <Card className="bg-slate-100 dark:bg-slate-800 border-0 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors h-full cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg">Recurring Donation</CardTitle>
                  <CardDescription>via Zypage</CardDescription>
                </CardHeader>
              </Card>
            </a>
          </div>

          <div className="space-y-4">
            <label className="text-sm font-medium">Custom Amount (VND)</label>
            <Input 
              value={amount} 
              onChange={(e) => setAmount(e.target.value)} 
              type="number" 
              className="text-lg h-12"
            />
            <label className="text-sm font-medium">Message</label>
            <Input 
              value={content} 
              onChange={(e) => setContent(e.target.value)} 
              className="text-lg h-12"
            />
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {["20000", "50000", "100000", "200000"].map((val) => (
              <Button key={val} variant="outline" onClick={() => setAmount(val)}>
                {parseInt(val).toLocaleString()}đ
              </Button>
            ))}
          </div>

          {/* Share Card */}
          <Card className="bg-slate-900 text-white border-0 overflow-hidden">
            <CardHeader className="pb-2">
               <div className="flex items-center gap-2">
                 <div className="bg-white/10 p-1.5 rounded-full">
                   <Heart className="h-4 w-4 text-pink-500" />
                 </div>
                 <h3 className="font-semibold">share MediaGrab with a friend</h3>
               </div>
            </CardHeader>
            <CardContent className="flex gap-4">
              <div className="bg-white p-2 rounded-lg shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://mediagrab.io" 
                  alt="App QR" 
                  className="w-24 h-24" 
                />
              </div>
              <div className="grid grid-cols-2 gap-2 w-full">
                <Button variant="secondary" className="w-full h-full flex flex-col gap-1 items-center justify-center bg-white/10 hover:bg-white/20 text-white border-0">
                  <Copy className="h-4 w-4" />
                  <span className="text-xs">copy</span>
                </Button>
                <Button variant="secondary" className="w-full h-full flex flex-col gap-1 items-center justify-center bg-white/10 hover:bg-white/20 text-white border-0">
                  <Share2 className="h-4 w-4" />
                  <span className="text-xs">share</span>
                </Button>
                <Button variant="secondary" className="w-full h-full flex flex-col gap-1 items-center justify-center bg-white/10 hover:bg-white/20 text-white border-0">
                  <Star className="h-4 w-4" />
                  <span className="text-xs">star</span>
                </Button>
                <Button variant="secondary" className="w-full h-full flex flex-col gap-1 items-center justify-center bg-white/10 hover:bg-white/20 text-white border-0">
                  <UserPlus className="h-4 w-4" />
                  <span className="text-xs">follow</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* QR Code Display */}
        <Card className="flex flex-col items-center justify-center p-8 bg-white dark:bg-slate-900">
          <div className="bg-white p-2 rounded-xl shadow-sm mb-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={qrUrl} alt="VietQR Code" className="w-64 h-auto rounded-lg" />
          </div>
          
          <div className="text-center space-y-1 mb-6">
            <p className="text-sm text-slate-500">Scan with any banking app to donate</p>
            <div className="pt-2">
               <p className="text-lg font-bold text-slate-900 dark:text-slate-100">
                 {parseInt(amount || "0").toLocaleString()} VND
               </p>
               <p className="text-base font-semibold text-slate-700 dark:text-slate-300 break-all">
                 {content}
               </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
            <Button variant="outline" className="w-full"><Copy className="mr-2 h-4 w-4" /> Copy</Button>
            <Button variant="outline" className="w-full"><Share2 className="mr-2 h-4 w-4" /> Share</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

const AboutView = () => (
  <div className="flex flex-col items-center gap-8 w-full max-w-2xl animate-in fade-in duration-500 text-center">
    <h2 className="text-3xl font-bold">About MediaGrab</h2>
    <div className="space-y-4 text-lg text-slate-600 dark:text-slate-400">
      <p>
        MediaGrab helps producers, educators, video makers, and many others to do what they love. 
        It's a different kind of service that is made with love, not for profit.
      </p>
      <p>
        We believe that the internet doesn't have to be scary, which is why MediaGrab will never have ads, 
        trackers, or invasive analytics.
      </p>
    </div>
    <div className="grid grid-cols-2 gap-4 mt-8">
      <Button variant="outline"><Star className="mr-2 h-4 w-4" /> Star on GitHub</Button>
      <Button variant="outline"><UserPlus className="mr-2 h-4 w-4" /> Follow us</Button>
    </div>
  </div>
);

// --- Main App Component ---

export default function DownloaderApp() {
  const [currentView, setCurrentView] = useState<View>("home");

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-50 flex flex-col">
      <Navbar currentView={currentView} setView={setCurrentView} />
      
      <main className="flex-1 container mx-auto px-4 py-12 flex flex-col items-center">
        {currentView === "home" && <HomeView />}
        {currentView === "remux" && <RemuxView />}
        {currentView === "settings" && <SettingsView />}
        {currentView === "donate" && <DonateView />}
        {currentView === "about" && <AboutView />}
      </main>

      <footer className="py-8 text-center text-slate-500 text-sm border-t bg-white dark:bg-slate-950 mt-auto">
        <p>© 2024 MediaGrab.io. All rights reserved.</p>
      </footer>

      <Toaster position="bottom-center" richColors />
    </div>
  );
}
