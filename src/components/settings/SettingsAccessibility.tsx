import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface SettingsAccessibilityProps {
  t: any;
  settings: any;
  setSettings: (settings: any) => void;
}

export function SettingsAccessibility({ t, settings, setSettings }: SettingsAccessibilityProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t.settings.visual.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>{t.settings.visual.reduceMotion}</Label>
              <p className="text-sm text-slate-500">{t.settings.visual.reduceMotionDesc}</p>
            </div>
            <Switch checked={settings.reduceMotion} onCheckedChange={(v) => setSettings({...settings, reduceMotion: v})} />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>{t.settings.visual.reduceTransparency}</Label>
              <p className="text-sm text-slate-500">{t.settings.visual.reduceTransparencyDesc}</p>
            </div>
            <Switch checked={settings.reduceTransparency} onCheckedChange={(v) => setSettings({...settings, reduceTransparency: v})} />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>{t.settings.behavior.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>{t.settings.behavior.noAutoQueue}</Label>
              <p className="text-sm text-slate-500">{t.settings.behavior.noAutoQueueDesc}</p>
            </div>
            <Switch checked={settings.noAutoQueue} onCheckedChange={(v) => setSettings({...settings, noAutoQueue: v})} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
