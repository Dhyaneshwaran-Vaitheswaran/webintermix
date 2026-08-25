export function Crosshair({ className = "" }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M8 0v16M0 8h16"
        stroke="currentColor"
        strokeWidth="1"
        shapeRendering="crispEdges"
      />
    </svg>
  );
}
