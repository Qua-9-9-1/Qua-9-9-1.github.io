import { useTheme } from '../../context/ThemeContext';
import { DUOS, BG_OPTIONS, PRESETS } from '../../styles/themeOptions';
import '../../styles/components/theme/modal.css';
import { useLanguage } from '../../context/LanguageContext';

interface ThemeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ThemeModal({ isOpen, onClose }: ThemeModalProps) {
  const { t } = useLanguage();
  const { theme, setMode, setBg, setDuo, applyPreset } = useTheme();

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{t.theme.modalTitle}</h2>
          <button onClick={onClose} className="close-button">
            &times;
          </button>
        </div>

        <section className="modal-section">
          <p className="modal-label">{t.theme.modeLabel}</p>
          <div className="mode-switch">
            {['light', 'dark'].map((m) => (
              <button
                key={m}
                onClick={() => setMode(m as any)}
                className={`mode-button ${theme.mode === m ? 'active' : ''}`}
              >
                {m === 'light' ? t.theme.modeLight : t.theme.modeDark}
              </button>
            ))}
          </div>
        </section>

        <section className="modal-section">
          <p className="modal-label">{t.theme.bgLabel}</p>
          <div className="bg-options">
            {BG_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => setBg(option.value)}
                className={`bg-circle ${theme.bg === option.value ? 'active' : ''}`}
                title={option.label}
                style={{
                  backgroundColor:
                    theme.mode === 'light'
                      ? option.lightColor
                      : option.darkColor,
                  borderColor:
                    theme.bg === option.value
                      ? 'var(--text-main)'
                      : 'transparent',
                }}
              />
            ))}
          </div>
        </section>

        <section className="modal-section">
          <p className="modal-label">{t.theme.duoLabel}</p>
          <div className="duo-options">
            {DUOS.map((d) => (
              <button
                key={d.id}
                onClick={() => setDuo(d.id)}
                className={`duo-circle ${theme.duo.id === d.id ? 'active' : ''}`}
                title={d.label}
                style={{
                  background: `linear-gradient(135deg, ${d.primary} 50%, ${d.secondary} 50%)`,
                }}
              />
            ))}
          </div>
        </section>

        <section className="modal-section">
          <p className="modal-label">{t.theme.presetsLabel}</p>
          <div className="preset-options">
            {Object.keys(PRESETS).map((presetName) => (
              <button
                key={presetName}
                onClick={() => applyPreset(presetName as keyof typeof PRESETS)}
                className="preset-button"
              >
                {presetName}
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
