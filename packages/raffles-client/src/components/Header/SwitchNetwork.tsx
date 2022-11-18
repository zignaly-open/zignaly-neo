import OptionGroupUnstyled, {
  OptionGroupUnstyledProps,
} from '@mui/base/OptionGroupUnstyled';
import SelectUnstyled, {
  SelectOption,
  SelectUnstyledProps,
} from '@mui/base/SelectUnstyled';
import { useWeb3React } from '@web3-react/core';
import { Typography } from '@zignaly-open/ui';
import {
  CHAIN_INFO,
  DEFAULT_CHAIN_ID,
  isSupportedChain,
  MAIN_NET_CHAIN_IDS,
  SupportedChainId,
  TEST_NET_CHAIN_IDS,
} from 'config/web3';
import * as React from 'react';
import { useCallback } from 'react';
import { switchNetwork } from 'util/switchChain';
import {
  StyledButton,
  StyledGroupHeader,
  StyledGroupOptions,
  StyledGroupRoot,
  StyledImg,
  StyledListbox,
  StyledOption,
  StyledOptionContainer,
  StyledPopper,
} from './styles';

function CustomSelect(props: SelectUnstyledProps<SupportedChainId>) {
  const slots: SelectUnstyledProps<SupportedChainId>['slots'] = {
    root: StyledButton,
    listbox: StyledListbox,
    popper: StyledPopper,
    ...props.slots,
  };

  return <SelectUnstyled {...props} slots={slots} />;
}

const CustomOptionGroup = React.forwardRef(function CustomOptionGroup(
  props: OptionGroupUnstyledProps,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref: React.ForwardedRef<any>,
) {
  const slots: OptionGroupUnstyledProps['slots'] = {
    root: StyledGroupRoot,
    label: StyledGroupHeader,
    list: StyledGroupOptions,
    ...props.slots,
  };

  return <OptionGroupUnstyled {...props} ref={ref} slots={slots} />;
});

function RenderValue(option: SelectOption<SupportedChainId> | null) {
  const { chainId } = useWeb3React();

  if (isSupportedChain(chainId) === false) {
    return (
      <Typography variant='buttonsm' color='red'>
        {'Wrong Network'}
      </Typography>
    );
  }
  if (option == null) {
    return (
      <StyledOptionContainer>
        <StyledImg
          src={CHAIN_INFO[chainId ?? DEFAULT_CHAIN_ID].logoUrl}
          alt={CHAIN_INFO[chainId ?? DEFAULT_CHAIN_ID].label}
        />
        <span>{CHAIN_INFO[chainId ?? DEFAULT_CHAIN_ID].label}</span>
      </StyledOptionContainer>
    );
  }

  return <span>{option.label}</span>;
}

const SwitchNetwork = () => {
  const { connector } = useWeb3React();

  const handleOnChange = useCallback(
    (_chainId) => {
      if (!connector) return;

      switchNetwork(connector, _chainId);
    },
    [connector],
  );

  return (
    <CustomSelect
      renderValue={RenderValue}
      onChange={(e, _chainId) => handleOnChange(_chainId)}
    >
      <CustomOptionGroup label='MainNet'>
        {MAIN_NET_CHAIN_IDS.map((_chainId) => (
          <StyledOption key={_chainId} value={_chainId}>
            <StyledOptionContainer>
              <StyledImg
                src={CHAIN_INFO[_chainId].logoUrl}
                alt={CHAIN_INFO[_chainId].label}
              />
              <span>{CHAIN_INFO[_chainId].label}</span>
            </StyledOptionContainer>
          </StyledOption>
        ))}
      </CustomOptionGroup>
      <CustomOptionGroup label='TestNet'>
        {TEST_NET_CHAIN_IDS.map((_chainId) => (
          <StyledOption key={_chainId} value={_chainId}>
            <StyledOptionContainer>
              <StyledImg
                src={CHAIN_INFO[_chainId].logoUrl}
                alt={CHAIN_INFO[_chainId].label}
              />
              <span>{CHAIN_INFO[_chainId].label}</span>
            </StyledOptionContainer>
          </StyledOption>
        ))}
      </CustomOptionGroup>
    </CustomSelect>
  );
};

export default SwitchNetwork;
