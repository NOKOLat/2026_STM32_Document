import style from './ProgressBar.module.css';

interface ProgressBarProps {
  current: number;
  max: number;
  label?: string;
}

export default function ProgressBar({ current, max, label = '全体進捗' }: ProgressBarProps) {
  const percentage = max === 0 ? 0 : (current / max) * 100;

  return (
    <div className={style.container}>
      <div className={style.labelContainer}>
        <span className={style.label}>{label}</span>
        <span className={style.percentage}>{percentage.toFixed(1)}%</span>
      </div>
      <div className={style.barBackground}>
        <div
          className={style.barFill}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className={style.progressText}>{current}/{max}</div>
    </div>
  );
}
