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
            <h4 className="text-sm font-medium leading-none opacity-70 text-secondary">
              {t.theme.modeLabel}
            </h4>
              <div className="gap-4">
              <Switch
                checked={theme.mode === 'dark'}
                onCheckedChange={(checked) =>
                  setMode(checked ? 'dark' : 'light')
                }
                className="ml-auto"
              />
              <span>{theme.mode === 'dark' ? t.theme.darkLabel : t.theme.lightLabel}</span>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium leading-none opacity-70 text-secondary">
              {t.theme.bgLabel}
            </h4>
            <div className="flex gap-3">
              {BG_OPTIONS.map((option) => {
                const bgColor =
                  theme.mode === 'dark' ? option.darkColor : option.lightColor;
                const isActive = theme.bg === option.value;
                return (
                  <button
                    key={option.value}
                    onClick={() => setBg(option.value)}
                    title={option.label}
                    style={{ background: bgColor }}
                    className={`h-8 w-8 rounded-full border-2 transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
                      isActive
                        ? 'border-foreground ring-2 ring-primary'
                        : 'border-transparent'
                    }`}
                  />
                );
              })}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium leading-none opacity-70 text-secondary">
              {t.theme.duoLabel}
            </h4>
            <div className="flex flex-wrap gap-3">
              {DUOS.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setDuo(d.id)}
                  title={d.label}
                  style={{
                    background: `linear-gradient(135deg, ${d.primary} 50%, ${d.secondary} 50%)`,
                  }}
                  className={`
                    h-10 w-10 rounded-full border-2 transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
                    ${theme.duo.id === d.id ? 'border-foreground ring-2 ring-primary' : 'border-transparent'}
                  `}
                />
              ))}
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-border">
            <h4 className="text-sm font-medium leading-none opacity-70 text-secondary">
              {t.theme.presetsLabel}
            </h4>
            <div className="flex flex-wrap gap-2">
              {Object.keys(PRESETS).map((preset) => (
                <Button
                  key={preset}
                  variant="secondary"
                  size="sm"
                  onClick={() => applyPreset(preset as any)}
                  className="text-xs h-7"
                >
                  {preset}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
