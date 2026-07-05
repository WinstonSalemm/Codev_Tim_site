import type { ReactNode } from "react";

type OperationsCenterHeaderItemProps = {
  label: string;
  value: ReactNode;
  valueClassName?: string;
};

export function OperationsCenterHeaderItem({
  label,
  value,
  valueClassName = "ds-oc-header-value",
}: OperationsCenterHeaderItemProps) {
  return (
    <div className="ds-oc-header-item">
      <dt className="ds-oc-header-label">{label}</dt>
      <dd className={valueClassName}>{value}</dd>
    </div>
  );
}
