import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { DUOS, BG_OPTIONS, PRESETS } from '../../data/themeOptions';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Sun, Moon, Dices, Check } from 'lucide-react';
import { cn } from '../../lib/utils';
import type { ThemeMode } from '../../data/themeOptions';

interface ThemeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
      {children}
    </p>
  );
}

const swatchRing =
  'ring-2 ring-primary ring-offset-2 ring-offset-card border-transparent';

export default function ThemeModal({ isOpen, onClose }: ThemeModalProps) {
  const { t } = useLanguage();
  const { theme, isRandom, setMode, setBg, setDuo, applyPreset, randomize } =
    useTheme();

  const activePreset = PRESETS.find(
    (p) =>
      p.mode === theme.mode && p.bg === theme.bg && p.duoId === theme.duo.id
  )?.id;

  const modes: { value: ThemeMode; icon: React.ReactNode; label: string }[] = [
    { value: 'light', icon: <Sun />, label: t.theme.lightLabel },
    { value: 'dark', icon: <Moon />, label: t.theme.darkLabel },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[760px] text-foreground border-border">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {t.theme.modalTitle}
          </DialogTitle>
          <DialogDescription>
            {isRandom ? t.theme.randomActive : t.theme.randomHint}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-2">
          {/* Random */}
          <Button
            variant="primary"
            className="w-full sm:w-fit"
            onClick={randomize}
          >
            <Dices />
            {t.theme.random}
          </Button>

          {/* Presets */}
          <div className="space-y-3">
            <SectionLabel>{t.theme.presets.label}</SectionLabel>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
              {PRESETS.map((preset) => {
                const bgOption = BG_OPTIONS.find(
                  (bg) => bg.value === preset.bg
                );
                const duo = DUOS.find((d) => d.id === preset.duoId)!;
                const bgColor =
                  preset.mode === 'dark'
                    ? bgOption?.darkColor
                    : bgOption?.lightColor;
                const active = activePreset === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => applyPreset(preset.id)}
                    aria-pressed={active}
                    className={cn(
                      'group relative flex flex-col gap-2 rounded-lg border p-2.5 text-left transition-all hover:-translate-y-0.5 hover:shadow-md',
                      active && swatchRing
                    )}
                    style={{ background: bgColor }}
                  >
                    <span
                      className="h-1.5 w-full rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${duo.primary}, ${duo.secondary})`,
                      }}
                    />
                    <span
                      className={cn(
                        'text-xs font-semibold truncate',
                        preset.mode === 'dark'
                          ? 'text-white'
                          : 'text-neutral-900'
                      )}
                    >
                      {
                        t.theme.presets[
                          preset.id as keyof typeof t.theme.presets
                        ]
                      }
                    </span>
                    {active && (
                      <Check
                        className={cn(
                          'absolute right-2 bottom-2.5 size-3.5',
                          preset.mode === 'dark'
                            ? 'text-white'
                            : 'text-neutral-900'
                        )}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-[auto_1fr]">
            {/* Mode */}
            <div className="space-y-3">
              <SectionLabel>{t.theme.modeLabel}</SectionLabel>
              <div className="inline-flex rounded-full border bg-muted/50 p-1">
                {modes.map((m) => (
                  <button
                    key={m.value}
                    onClick={() => setMode(m.value)}
                    aria-pressed={theme.mode === m.value}
                    className={cn(
                      'flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors [&_svg]:size-4',
                      theme.mode === m.value
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {m.icon}
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Background */}
            <div className="space-y-3">
              <SectionLabel>{t.theme.bg.label}</SectionLabel>
              <div className="flex flex-wrap gap-3">
                {BG_OPTIONS.map((option) => {
                  const bgColor =
                    theme.mode === 'dark'
                      ? option.darkColor
                      : option.lightColor;
                  const isActive = theme.bg === option.value;
                  return (
                    <button
                      key={option.value}
                      onClick={() => setBg(option.value)}
                      title={t.theme.bg[option.value]}
                      aria-label={t.theme.bg[option.value]}
                      aria-pressed={isActive}
                      style={{ background: bgColor }}
                      className={cn(
                        'h-9 w-9 rounded-full border-2 border-foreground/25 transition-transform hover:scale-110',
                        isActive && swatchRing
                      )}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          {/* Colours */}
          <div className="space-y-3">
            <SectionLabel>{t.theme.duo.label}</SectionLabel>
            <div className="flex flex-wrap gap-3">
              {DUOS.map((d) => {
                const isActive = theme.duo.id === d.id;
                const label = t.theme.duo[d.id as keyof typeof t.theme.duo];
                return (
                  <button
                    key={d.id}
                    onClick={() => setDuo(d.id)}
                    title={label}
                    aria-label={label}
                    aria-pressed={isActive}
                    style={{
                      background: `linear-gradient(135deg, ${d.primary} 50%, ${d.secondary} 50%)`,
                    }}
                    className={cn(
                      'h-10 w-10 rounded-full border-2 border-border transition-transform hover:scale-110',
                      isActive && swatchRing
                    )}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
