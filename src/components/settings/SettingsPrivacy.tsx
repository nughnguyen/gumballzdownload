import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface SettingsPrivacyProps {
  t: any;
  settings: any;
  setSettings: (settings: any) => void;
}

export function SettingsPrivacy({ t, settings, setSettings }: SettingsPrivacyProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t.settings.privacy}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>{t.settings.privacySettings?.tunneling || "Always tunnel files"}</Label>
              <p className="text-sm text-slate-500">{t.settings.privacySettings?.tunnelingDesc || "Cobalt will hide your IP address..."}</p>
            </div>
            <Switch checked={settings.tunneling} onCheckedChange={(v: boolean) => setSettings({...settings, tunneling: v})} />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>{t.settings.privacySettings?.analytics || "Don't contribute to analytics"}</Label>
              <p className="text-sm text-slate-500">{t.settings.privacySettings?.analyticsDesc || "Anonymous traffic analytics..."}</p>
            </div>
            <Switch checked={settings.noAnalytics} onCheckedChange={(v: boolean) => setSettings({...settings, noAnalytics: v})} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
