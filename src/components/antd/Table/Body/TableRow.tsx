import React from 'react';

interface Props {
  className?: string;
}

const TableRow = ({ children, className }: React.PropsWithChildren<Props>) => {
  return <tr className={className}>{children}</tr>;
};

export default TableRow;
