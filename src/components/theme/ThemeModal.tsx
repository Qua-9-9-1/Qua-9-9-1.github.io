import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { DUOS, BG_OPTIONS, PRESETS } from '../../data/themeOptions';
import { Button } from '../../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog';
import { Switch } from '../ui/switch';

interface ThemeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ThemeModal({ isOpen, onClose }: ThemeModalProps) {
  const { t } = useLanguage();
  const { theme, setMode, setBg, setDuo, applyPreset } = useTheme();

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px] card text-foreground border-border">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {t.theme.modalTitle}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="space-y-3">
            <p className="text-sm font-medium leading-none opacity-70 text-secondary">
              {t.theme.modeLabel}
            </p>
            <div className="flex items-center gap-2">
              <Switch
                checked={theme.mode === 'dark'}
                onCheckedChange={(checked) =>
                  setMode(checked ? 'dark' : 'light')
                }
              />
              <p>
                {theme.mode === 'dark' ? t.theme.darkLabel : t.theme.lightLabel}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium leading-none opacity-70 text-secondary">
              {t.theme.bg.label}
            </p>
            <div className="flex gap-3">
              {BG_OPTIONS.map((option) => {
                const bgColor =
                  theme.mode === 'dark' ? option.darkColor : option.lightColor;
                const isActive = theme.bg === option.value;
                return (
                  <button
                    key={option.value}
                    onClick={() => setBg(option.value)}
                    title={t.theme.bg[option.value]}
                    style={{ background: bgColor }}
                    className={`h-8 w-8 rounded-full border transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
                      ${isActive ? 'border-2 border-foreground ring-2 ring-primary' : 'border-border'}`}
                  />
                );
              })}
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium leading-none opacity-70 text-secondary">
              {t.theme.duo.label}
            </p>
            <div className="flex flex-wrap gap-3">
              {DUOS.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setDuo(d.id)}
                  title={t.theme.duo[d.id as keyof typeof t.theme.duo]}
                  style={{
                    background: `linear-gradient(135deg, ${d.primary} 50%, ${d.secondary} 50%)`,
                  }}
                  className={`
                    h-10 w-10 rounded-full border transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
                    ${theme.duo.id === d.id ? 'border-2 border-foreground ring-2 ring-primary' : 'border-border'}
                  `}
                />
              ))}
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-border">
            <p className="text-sm font-medium leading-none opacity-70 text-secondary">
              {t.theme.presets.label}
            </p>
            <div className="flex flex-wrap items-center gap-2">
              {PRESETS.map((preset) => {
                const bgOption = BG_OPTIONS.find(bg => bg.value === preset.bg);
                const duo = DUOS.find(d => d.id === preset.duoId);
                const bgColor = preset.mode === 'dark' ? bgOption?.darkColor : bgOption?.lightColor;
                const textColor = duo?.primary;
                return (
                  <Button
                    key={preset.id}
                    size="sm"
                    onClick={() => applyPreset(preset.id)}
                    className="text-xs h-7 flex items-center justify-between gap-2 border border-border"
                    style={{
                      background: bgColor,
                      color: textColor,
                    }}
                  >
                    {t.theme.presets[preset.id as keyof typeof t.theme.presets]}
                    <span
                      className="inline-block ml-2 rounded-full"
                      style={{
                        width: '0.75em',
                        height: '0.75em',
                        background: textColor,
                      }}
                    />
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
