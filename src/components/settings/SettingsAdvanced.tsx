import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface SettingsAdvancedProps {
  t: any;
  settings: any;
  setSettings: (settings: any) => void;
}

export function SettingsAdvanced({ t, settings, setSettings }: SettingsAdvancedProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t.settings.advanced}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>{t.settings.advancedSettings?.debug || "Enable features for nerds"}</Label>
              <p className="text-sm text-slate-500">{t.settings.advancedSettings?.debugDesc || "Gives you easy access to app info..."}</p>
            </div>
            <Switch checked={settings.debug} onCheckedChange={(v: boolean) => setSettings({...settings, debug: v})} />
          </div>
          
          <div className="space-y-2">
             <Label>{t.settings.advancedSettings?.data || "Settings Data"}</Label>
             <div className="flex gap-2">
               <Button variant="outline" size="sm" onClick={() => toast.info("Import feature coming soon")}>{t.settings.advancedSettings?.import || "Import"}</Button>
               <Button variant="outline" size="sm" onClick={() => toast.info("Export feature coming soon")}>{t.settings.advancedSettings?.export || "Export"}</Button>
               <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600" onClick={() => toast.info("Reset feature coming soon")}>{t.settings.advancedSettings?.reset || "Reset"}</Button>
             </div>
          </div>

          <div className="space-y-2">
             <Label>{t.settings.advancedSettings?.storage || "Local Storage"}</Label>
             <div>
               <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600" onClick={() => {
                 localStorage.clear();
                 window.location.reload();
               }}>{t.settings.advancedSettings?.clear || "Clear Cache"}</Button>
             </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
