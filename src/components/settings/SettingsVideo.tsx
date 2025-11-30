import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface SettingsVideoProps {
  t: any;
  settings: any;
  setSettings: (settings: any) => void;
}

export function SettingsVideo({ t, settings, setSettings }: SettingsVideoProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t.settings.video}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label>{t.settings.videoSettings.quality}</Label>
            <Select value={settings.videoQuality} onValueChange={(v) => setSettings({...settings, videoQuality: v})}>
              <SelectTrigger>
                <SelectValue placeholder="Select quality" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="max">Max (4K/8K)</SelectItem>
                <SelectItem value="1080">1080p</SelectItem>
                <SelectItem value="720">720p</SelectItem>
                <SelectItem value="480">480p</SelectItem>
                <SelectItem value="360">360p</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label>{t.settings.videoSettings.codec}</Label>
            <Select value={settings.videoCodec} onValueChange={(v) => setSettings({...settings, videoCodec: v})}>
              <SelectTrigger>
                <SelectValue placeholder="Select codec" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="h264">H.264 (Best Compatibility)</SelectItem>
                <SelectItem value="av1">AV1 (Best Quality)</SelectItem>
                <SelectItem value="vp9">VP9</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>{t.settings.videoSettings.h265}</Label>
              <p className="text-sm text-slate-500">{t.settings.videoSettings.h265Desc}</p>
            </div>
            <Switch checked={settings.allowH265} onCheckedChange={(v) => setSettings({...settings, allowH265: v})} />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>{t.settings.videoSettings.twitterGif}</Label>
              <p className="text-sm text-slate-500">{t.settings.videoSettings.twitterGifDesc}</p>
            </div>
            <Switch checked={settings.twitterGif} onCheckedChange={(v) => setSettings({...settings, twitterGif: v})} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
