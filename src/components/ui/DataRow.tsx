type DataRowProps = {
  label: string;
  value: string;
};

export function DataRow({ label, value }: DataRowProps) {
  return (
    <div className="ds-data-row">
      <dt className="ds-data-row-label">{label}</dt>
      <dd className="ds-data-row-value">{value}</dd>
    </div>
  );
}
