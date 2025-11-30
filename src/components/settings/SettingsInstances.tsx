import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface SettingsInstancesProps {
  t: any;
  settings: any;
  setSettings: (settings: any) => void;
}

export function SettingsInstances({ t, settings, setSettings }: SettingsInstancesProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t.settings.instances}</CardTitle>
          <CardDescription>Configure the Cobalt API instance to use.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Cobalt API URL</Label>
            <div className="flex gap-2">
              <Input 
                value={settings.cobaltApiUrl || ""} 
                onChange={(e) => setSettings({ ...settings, cobaltApiUrl: e.target.value })}
                placeholder="https://cobalt.api.wuk.sh"
              />
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setSettings({ ...settings, cobaltApiUrl: "https://cobalt.api.wuk.sh" })}
                title="Reset to default"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-slate-500">
              Official instance: <code>https://api.cobalt.tools</code> (Blocked by bot protection)<br/>
              Public instance: <code>https://cobalt.api.wuk.sh</code> (Recommended)
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
