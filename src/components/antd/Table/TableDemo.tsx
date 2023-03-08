import React from 'react';
import Table from './Table';
import useSort from './useSort';

interface Props {
  data: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    department: string;
    jobTitle: string;
  }[];
}

const TableDemo = ({ data }: Props) => {
  const { onSort, sortedItems, sortDir, sortKey } = useSort({ data });
  return (
    <Table>
      <Table.Header
        onSort={onSort}
        sortDir={sortDir}
        sortKey={sortKey}
        isSortableHeader
      >
        <Table.Column id="firstName">First Name</Table.Column>
        <Table.Column id="lastName">Last Name</Table.Column>
        <Table.Column id="email">Email</Table.Column>
        <Table.Column id="department">Department</Table.Column>
        <Table.Column id="jobTitle">Job Title</Table.Column>
      </Table.Header>

      <Table.Body>
        {sortedItems.map((item) => (
          <Table.Row key={item.id}>
            <Table.Cell>{item.firstName}</Table.Cell>
            <Table.Cell>{item.lastName}</Table.Cell>
            <Table.Cell>{item.email}</Table.Cell>
            <Table.Cell>{item.department}</Table.Cell>
            <Table.Cell>{item.jobTitle}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default TableDemo;
