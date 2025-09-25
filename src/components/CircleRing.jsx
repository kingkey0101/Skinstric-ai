const CircleProgress = ({ value }) => {
  const radius = 180;
  const stroke = 3;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (

      <svg
        viewBox={`0 0 ${radius * 2} ${radius * 2}`}
        className="w-full h-full transform -rotate-90"
      >
        {/* background */}
        <circle
          stroke="#e5e7eb"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        {/* progress */}
        <circle
          stroke="black"
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          className="transition-all duration-700 ease-out"
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dy=".3em"
          fontSize='40'
          fontWeight='bold'
          fill="black"
          transform={`rotate(90, ${radius}, ${radius})`}
        >
          {Math.round(value)}%
        </text>
      </svg>
  );
};
export default CircleProgress;
