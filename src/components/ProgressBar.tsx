const colors = [
  'rgb(255,214,161)',
  'rgb(255,175,163)',
  'rgb(108,115,148)',
  'rgb(108,120,150)',
  'rgb(141,181,145)'
];

const randomColor = colors[Math.floor(Math.random() * colors.length)];

const ProgressBar = ({progress}: {progress: number}) => {
  return (
    <div className="bar | " data-bar="progress">
      <div
        className={`bar__inner | `}
        style={{width: `${progress}%`, background: `${randomColor}`}}
      />
    </div>
  );
};

export default ProgressBar;
