import React, { useState } from "react";
import { SettingsSidebar } from "@/components/settings/SettingsSidebar";
import { SettingsAppearance } from "@/components/settings/SettingsAppearance";
import { SettingsAccessibility } from "@/components/settings/SettingsAccessibility";
import { SettingsVideo } from "@/components/settings/SettingsVideo";
import { SettingsAudio } from "@/components/settings/SettingsAudio";
import { SettingsMetadata } from "@/components/settings/SettingsMetadata";
import { SettingsLocal } from "@/components/settings/SettingsLocal";
import { SettingsInstances } from "@/components/settings/SettingsInstances";
import { SettingsPrivacy } from "@/components/settings/SettingsPrivacy";
import { SettingsAdvanced } from "@/components/settings/SettingsAdvanced";

interface SettingsViewProps {
  t: any;
  settings: any;
  setSettings: (settings: any) => void;
  theme: string;
  setTheme: (theme: string) => void;
  language: string;
  setLanguage: (lang: string) => void;
  autoLanguage: boolean;
  setAutoLanguage: (auto: boolean) => void;
}

export function SettingsView({ 
  t, 
  settings, 
  setSettings, 
  theme, 
  setTheme, 
  language, 
  setLanguage, 
  autoLanguage, 
  setAutoLanguage 
}: SettingsViewProps) {
  const [activeTab, setActiveTab] = useState("appearance");

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-2 mb-8">
        <h2 className="text-3xl font-bold tracking-tight">{t.settings.title}</h2>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <SettingsSidebar t={t} activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div className="flex-1">
          {activeTab === "appearance" && (
            <SettingsAppearance 
              t={t} 
              theme={theme} 
              setTheme={setTheme} 
              language={language} 
              setLanguage={setLanguage} 
              autoLanguage={autoLanguage} 
              setAutoLanguage={setAutoLanguage} 
            />
          )}
          {activeTab === "accessibility" && <SettingsAccessibility t={t} settings={settings} setSettings={setSettings} />}
          {activeTab === "video" && <SettingsVideo t={t} settings={settings} setSettings={setSettings} />}
          {activeTab === "audio" && <SettingsAudio t={t} settings={settings} setSettings={setSettings} />}
          {activeTab === "metadata" && <SettingsMetadata t={t} settings={settings} setSettings={setSettings} />}
          {activeTab === "local" && <SettingsLocal t={t} />}
          {activeTab === "instances" && <SettingsInstances t={t} settings={settings} setSettings={setSettings} />}
          {activeTab === "privacy" && <SettingsPrivacy t={t} settings={settings} setSettings={setSettings} />}
          {activeTab === "advanced" && <SettingsAdvanced t={t} settings={settings} setSettings={setSettings} />}
        </div>
      </div>
    </div>
  );
}
