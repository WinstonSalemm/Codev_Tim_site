type CardSignalProps = {
  className?: string;
};

export function CardSignal({ className }: CardSignalProps) {
  return (
    <span
      className={className ?? "ds-dashboard-card-signal"}
      aria-hidden="true"
    />
  );
}
