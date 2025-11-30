import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SettingsInstancesProps {
  t: any;
}

export function SettingsInstances({ t }: SettingsInstancesProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t.settings.instances}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-500">Instance management coming soon.</p>
        </CardContent>
      </Card>
    </div>
  );
}
