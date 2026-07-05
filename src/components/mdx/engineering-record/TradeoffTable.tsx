import type { TradeoffTableProps } from "./types";

const COLUMNS = [
  { key: "decision", label: "Decision" },
  { key: "alternative", label: "Alternative" },
  { key: "rationale", label: "Rationale" },
  { key: "outcome", label: "Outcome" },
] as const;

export function TradeoffTable({ rows }: TradeoffTableProps) {
  if (rows.length === 0) {
    return null;
  }

  return (
    <div className="ds-mdx-tradeoff-scroll">
      <table className="ds-mdx-tradeoff-table">
        <caption className="ds-mdx-sr-only">Trade-offs</caption>
        <thead>
          <tr>
            {COLUMNS.map((column) => (
              <th key={column.key} scope="col">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={`${row.decision}-${index}`}>
              {COLUMNS.map((column) => (
                <td key={column.key}>{row[column.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
