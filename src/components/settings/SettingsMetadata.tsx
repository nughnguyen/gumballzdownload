import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface SettingsMetadataProps {
  t: any;
  settings: any;
  setSettings: (settings: any) => void;
}

export function SettingsMetadata({ t, settings, setSettings }: SettingsMetadataProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t.settings.metadata}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label>{t.settings.metadataSettings.filename}</Label>
            <Select value={settings.filenameStyle} onValueChange={(v) => setSettings({...settings, filenameStyle: v})}>
              <SelectTrigger>
                <SelectValue placeholder="Select style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="classic">Classic (Title)</SelectItem>
                <SelectItem value="pretty">Pretty (Artist - Title)</SelectItem>
                <SelectItem value="basic">Basic (Video ID)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>{t.settings.metadataSettings.disableMetadata}</Label>
              <p className="text-sm text-slate-500">{t.settings.metadataSettings.disableMetadataDesc}</p>
            </div>
            <Switch checked={settings.disableMetadata} onCheckedChange={(v) => setSettings({...settings, disableMetadata: v})} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
