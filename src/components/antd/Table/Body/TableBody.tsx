import React from 'react';

interface Props {
  className?: string;
}

const TableBody = ({ children }: React.PropsWithChildren<Props>) => {
  return <tbody>{children}</tbody>;
};

export default TableBody;
