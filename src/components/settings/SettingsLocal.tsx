import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface SettingsLocalProps {
  t: any;
}

export function SettingsLocal({ t }: SettingsLocalProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t.settings.localSettings.processing}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-500">{t.settings.localSettings.desc}</p>
        </CardContent>
      </Card>
    </div>
  );
}
