import React from "react";
import { Button } from "@/components/ui/button";
import { 
  Palette, 
  Accessibility, 
  Video, 
  Music, 
  FileText, 
  HardDrive, 
  Layers, 
  Shield, 
  Wrench 
} from "lucide-react";

interface SettingsSidebarProps {
  t: any;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function SettingsSidebar({ t, activeTab, setActiveTab }: SettingsSidebarProps) {
  const tabs = [
    { id: "appearance", icon: Palette, label: t.settings.appearance },
    { id: "accessibility", icon: Accessibility, label: t.settings.accessibility },
    { id: "video", icon: Video, label: t.settings.video },
    { id: "audio", icon: Music, label: t.settings.audio },
    { id: "metadata", icon: FileText, label: t.settings.metadata },
    { id: "local", icon: HardDrive, label: t.settings.local },
    { id: "instances", icon: Layers, label: t.settings.instances },
    { id: "privacy", icon: Shield, label: t.settings.privacy },
    { id: "advanced", icon: Wrench, label: t.settings.advanced },
  ];

  return (
    <div className="w-full md:w-64 space-y-1">
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          variant={activeTab === tab.id ? "secondary" : "ghost"}
          className="w-full justify-start"
          onClick={() => setActiveTab(tab.id)}
        >
          <tab.icon className="mr-2 h-4 w-4" />
          {tab.label}
        </Button>
      ))}
    </div>
  );
}
