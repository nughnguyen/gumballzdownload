import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface SettingsAppearanceProps {
  t: any;
  theme: string;
  setTheme: (theme: string) => void;
  language: string;
  setLanguage: (lang: string) => void;
  autoLanguage: boolean;
  setAutoLanguage: (auto: boolean) => void;
}

export function SettingsAppearance({ 
  t, 
  theme, 
  setTheme, 
  language, 
  setLanguage, 
  autoLanguage, 
  setAutoLanguage 
}: SettingsAppearanceProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t.settings.appearance}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label>{t.settings.theme.label}</Label>
            <Select value={theme} onValueChange={setTheme}>
              <SelectTrigger>
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">{t.settings.theme.light}</SelectItem>
                <SelectItem value="dark">{t.settings.theme.dark}</SelectItem>
                <SelectItem value="auto">{t.settings.theme.auto}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label>{t.settings.language.label}</Label>
            <div className="flex items-center justify-between border p-3 rounded-md">
              <Label>{t.settings.language.auto}</Label>
              <Switch checked={autoLanguage} onCheckedChange={setAutoLanguage} />
            </div>
            {!autoLanguage && (
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="vi">Tiếng Việt</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
