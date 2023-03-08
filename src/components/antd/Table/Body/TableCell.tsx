import React from 'react';

interface Props {
  className?: string;
}

const TableCell = ({ children, className }: React.PropsWithChildren<Props>) => {
  return <td className={className}>{children}</td>;
};

export default TableCell;
