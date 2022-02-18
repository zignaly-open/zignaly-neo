// Dependencies
import React from 'react';

// Assets
import OptionsDotsIcon from '@assets/icons/option-dots-icon.svg';

// Component
import Table from './';
import TableButton from '@components/inputs/TableButton';
import { ButtonGroup } from '@components/styled';
import { shortenHex } from '@utils/web3';

export default {
  title: 'Display/Table',
  component: Table
};

const Template = (args) => (
  <Table {...args} />
);

export const Basic = Template.bind({});
Basic.args = {
  columns: [
    {
      Header: 'User ID',
      accessor: 'userId'
    },
    {
      Header: 'Email',
      accessor: 'email'
    },
    {
      Header: 'Investment',
      accessor: 'investment'
    },
    {
      Header: 'P & L',
      accessor: 'pyd'
    },
    {
      Header: 'P & L Total',
      accessor: 'pydTotal'
    },
    {
      Header: 'Total Fees Paid',
      accessor: 'totalFeesPaid'
    },
    {
      Header: 'Success Fee',
      accessor: 'successFee'
    },
    {
      Header: 'Fees in ZIG',
      accessor: 'feesInZig'
    },
    {
      Header: 'Status',
      accessor: 'status'
    },
    {
      Header: (
        <div style={{ textAlign: 'right' }}>
          <img src={OptionsDotsIcon} />
        </div>
      ),
      accessor: 'action',
      disableSortBy: true
    }
  ],
  data: [
    {
      userId: shortenHex('0xc3B2CFa1684dd33e8Ea8F657122f42b288d32852'),
      email: 'tec**@zig**.com',
      investment: '1,250 USDT',
      pyd: '1,250 USDT',
      pydTotal: '1,250 USDT',
      totalFeesPaid: '1,250 USDT',
      successFee: '1,250 USDT',
      feesInZig: '1,250 USDT',
      status: 'Status',
      action: (
        <ButtonGroup>
          <TableButton caption={'Edit'} />
          <TableButton caption={'Remove'} />
        </ButtonGroup>
      )
    }
  ]
};
