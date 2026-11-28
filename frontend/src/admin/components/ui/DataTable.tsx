import React from 'react';

export interface ColumnDef<T> {
  key: string;
  header: string;
  align?: 'left' | 'right' | 'center';
  render: (row: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  rowKey: (row: T) => string;
  emptyState?: React.ReactNode;
}

export function DataTable<T>({
  columns,
  data,
  rowKey,
  emptyState,
}: DataTableProps<T>) {
  if (data.length === 0 && emptyState) {
    return <>{emptyState}</>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[680px]">
        <thead>
          <tr className="border-b border-[#E6D9C4]/80">
            {columns.map((col) => (
              <th
                key={col.key}
                className={`py-3.5 px-5 text-[10px] font-bold uppercase tracking-[0.08em] text-[#7C8F9B] ${
                  col.align === 'right'
                    ? 'text-right'
                    : col.align === 'center'
                      ? 'text-center'
                      : 'text-left'
                } ${col.className ?? ''}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#E6D9C4]/50">
          {data.map((row) => (
            <tr
              key={rowKey(row)}
              className="hover:bg-[#FBF8F2]/80 transition-colors"
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={`py-4 px-5 text-sm text-[#203F52] ${
                    col.align === 'right'
                      ? 'text-right'
                      : col.align === 'center'
                        ? 'text-center'
                        : 'text-left'
                  } ${col.className ?? ''}`}
                >
                  {col.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
