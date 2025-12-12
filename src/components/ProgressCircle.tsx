import style from './ProgressCircle.module.css';

interface ProgressCircleProps {
  current: number;
  max: number;
  label: string;
}

export default function ProgressCircle({ current, max, label }: ProgressCircleProps) {
  const percentage = max === 0 ? 0 : (current / max) * 100;
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className={style.container}>
      <div className={style.svgContainer}>
        <svg
          className={style.svg}
          width="120"
          height="120"
          viewBox="0 0 120 120"
        >
          {/* Background circle */}
          <circle
            className={`${style.circle} ${style.backgroundCircle}`}
            cx="60"
            cy="60"
            r={radius}
            strokeWidth="8"
          />
          {/* Progress circle */}
          <circle
            className={`${style.circle} ${style.progressCircle}`}
            cx="60"
            cy="60"
            r={radius}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
          />
        </svg>
      </div>
      <div className={style.textContainer}>
        <div className={style.label}>{label}</div>
        <div className={style.percentage}>{percentage.toFixed(0)}%</div>
        <div className={style.progressText}>{current}/{max}</div>
      </div>
    </div>
  );
}
