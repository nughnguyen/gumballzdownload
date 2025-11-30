import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface SettingsAudioProps {
  t: any;
  settings: any;
  setSettings: (settings: any) => void;
}

export function SettingsAudio({ t, settings, setSettings }: SettingsAudioProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t.settings.audio}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label>{t.settings.audioSettings.format}</Label>
            <Select value={settings.audioFormat} onValueChange={(v) => setSettings({...settings, audioFormat: v})}>
              <SelectTrigger>
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mp3">MP3</SelectItem>
                <SelectItem value="best">Best (Opus/M4A)</SelectItem>
                <SelectItem value="wav">WAV</SelectItem>
                <SelectItem value="ogg">OGG</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>{t.settings.audioSettings.tiktokSound}</Label>
              <p className="text-sm text-slate-500">{t.settings.audioSettings.tiktokSoundDesc}</p>
            </div>
            <Switch checked={settings.tiktokSound} onCheckedChange={(v) => setSettings({...settings, tiktokSound: v})} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
