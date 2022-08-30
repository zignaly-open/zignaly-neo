// Dependencies
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NumberFormat from "react-number-format";

// Components
import ModalContainer from "../../containers/ModalContainer";
import Typography from "components/display/Typography";
import InputSelect, { formatSelectorItem } from "components/inputs/InputSelect";
import CoinIcon from "components/display/CoinIcon";
import Select, { SelectSizes } from "components/inputs/Selector";
import InputText from "components/inputs/InputText";
import ErrorMessage from "components/display/ErrorMessage";
import QRCode from "components/display/QRCode";
import Loader from "components/display/Loader";

// Styled Components
import { Data, Field, Layout, Balance, Currency, Value } from "./styles";

// Actions
import { closeModal } from "state/actions/ui/modal";
import { fetchCoinsBalances, fetchCoinDepositInfo } from "state/actions/coins";

// Selectors
import { selectCoinDepositInfo, selectCoinsBalances, selectCoinsBase } from "state/selectors/coins";
import {
  selectIsLoadingFetchCoinDepositInfo,
  selectIsLoadingFetchCoinsBalances,
} from "state/selectors/ui/coins";

// Hooks
import { useTranslation } from "next-i18next";

// Utils
import { isEmpty } from "utils/state";

function DepositCryptoModal() {
  // Hooks
  const dispatch = useDispatch();
  const { t } = useTranslation("deposit-crypto");

  // State
  const [coin, setCoin] = useState(null) as any;
  const [network, setNetwork] = useState(null) as any;

  // Selectors
  const coins = useSelector((state: any) => selectCoinsBase(state, "spot"));
  const balances = useSelector(selectCoinsBalances);
  const depositInfo = useSelector((state: any) =>
    selectCoinDepositInfo(state, String(coin?.ref?.id)),
  );
  const depositTag =
    (coin && network && depositInfo && (!isEmpty(depositInfo?.tag) ? depositInfo?.tag : null)) ??
    null;

  const isLoadingCoinsBalances = useSelector(selectIsLoadingFetchCoinsBalances);
  const isLoadingDepositAddress = useSelector(selectIsLoadingFetchCoinDepositInfo);

  /**
   * @name renderBalanceInfo()
   * @description Render the balance field
   */
  const renderBalanceInfo = useCallback(
    (label, value) =>
      coin && (
        <Balance variant={"body2"} color={"neutral200"}>
          {label}
          <Value variant={"body2"} color={"neutral000"}>
            <NumberFormat
              value={value}
              displayType={"text"}
              thousandSeparator={true}
              decimalScale={9}
            />
          </Value>
          <Currency variant={"body2"}>{String(coin?.ref?.id).toUpperCase()}</Currency>
        </Balance>
      ),
    [coin],
  );

  /**
   * @name balance
   * @description Get the current Balances of the token.
   */
  const balance = useMemo(() => {
    if (!balances || !Object.keys(balances).length || !coin) {
      return null;
    }
    const id = coin?.ref?.id as string;
    return balances[id];
  }, [coin, balances]);

  /**
   * @name coinList
   * @description Un-normalized state and format to coin selector.
   */
  const coinList = useMemo(
    () =>
      Object.keys(coins).map((key: any) => ({
        id: key,
        balance: coins[key],
      })),
    [coins],
  );

  useEffect(() => {
    dispatch(fetchCoinsBalances());
  }, []);

  useEffect(() => {
    if (coin && network && network.data.depositEnable) {
      dispatch(fetchCoinDepositInfo(coin.ref.id, network.id));
    }
  }, [coin, network]);

  return (
    <ModalContainer
      title={t("deposit-crypto.title")}
      width={784}
      onClickClose={() => dispatch(closeModal())}
    >
      <Typography>{t("deposit-crypto.description")}</Typography>

      <Layout>
        {/* Select Coin */}
        <Field>
          <InputSelect
            name={"coin"}
            label={t("deposit-crypto.coinSelector.label")}
            variant={"primary"}
            placeholder={t("deposit-crypto.coinSelector.placeholder")}
            selected={coin}
            onSelectItem={(coin: any) => {
              setCoin(coin);
              setNetwork(null);
            }}
            options={coinList
              .sort((a: { id: string }, b: { id: string }) => a.id.localeCompare(b.id))
              .map((item: any) =>
                formatSelectorItem(
                  {
                    id: item.id,
                    icon: <CoinIcon key={item.id} size={"small"} name={item.id} coin={item.id} />,
                    caption: item.id,
                  },
                  {
                    coin: item.id,
                    balance: item.balance,
                  },
                ),
              )}
          />
          <Data>
            {isLoadingCoinsBalances
              ? coin && (
                  <Loader
                    color={"#fff"}
                    ariaLabel={t("deposit-crypto.balances.loadingAriaLabel")}
                    width={"22px"}
                    height={"22px"}
                  />
                )
              : coin &&
                balance && (
                  <>
                    {renderBalanceInfo(t("deposit-crypto.balances.total"), balance.balanceTotal)}
                    {renderBalanceInfo(
                      t("deposit-crypto.balances.balanceLocked"),
                      balance.balanceLocked,
                    )}
                    {renderBalanceInfo(
                      t("deposit-crypto.balances.balanceFree"),
                      balance.balanceFree,
                    )}
                  </>
                )}
          </Data>
        </Field>

        {/* Select Network */}
        <Field>
          <Select
            label={t("deposit-crypto.networkSelector.label")}
            placeholder={t("deposit-crypto.networkSelector.placeholder")}
            size={SelectSizes.NORMAL}
            disabled={!coin}
            options={
              coin
                ? (coin?.data?.balance?.networks ?? []).map((item: any) => ({
                    id: item.network,
                    caption: item.name,
                    leftElement: (
                      <CoinIcon
                        key={item.network}
                        name={item.network}
                        coin={item.network}
                        size={"small"}
                      />
                    ),
                    data: item,
                  }))
                : []
            }
            value={network}
            minHeight={54}
            maxHeight={54}
            isFooterTable={true}
            onChange={setNetwork}
          />
        </Field>

        {network && !network.data.depositEnable ? (
          <ErrorMessage variant={"box"} withTranslation={false} text={network.data.depositDesc} />
        ) : (
          <>
            <Field className={"column"}>
              <InputText
                label={t("deposit-crypto.depositAddress.label")}
                value={isLoadingDepositAddress || !network ? "" : depositInfo?.address ?? ""}
                readOnly={true}
                placeholder={
                  isLoadingDepositAddress
                    ? t("deposit-crypto.depositAddress.loading")
                    : t("deposit-crypto.depositAddress.placeholder")
                }
                copyToClipboard={true}
              />
              {!isLoadingDepositAddress && depositInfo?.address && network && coin && (
                <ErrorMessage
                  text={t("deposit-crypto.depositAddress.warning", {
                    network: network.caption,
                    coin: coin.ref.id,
                  })}
                />
              )}
            </Field>

            {isLoadingDepositAddress ? (
              <Field className={"loader"}>
                <Loader
                  color={"#fff"}
                  ariaLabel={t("deposit-crypto.depositAddress.loading")}
                  width={"32px"}
                  height={"32px"}
                />
              </Field>
            ) : (
              <>
                {depositTag && coin && network && (
                  <Field className={"column"}>
                    <InputText
                      label={t("deposit-crypto.depositMemo.label")}
                      value={depositTag}
                      readOnly={true}
                      copyToClipboard={true}
                    />
                  </Field>
                )}
                {depositInfo?.address && coin && network && (
                  <Field className={"qrCode"}>
                    <QRCode
                      label={
                        depositTag && t("deposit-crypto.depositQR.address", { coin: coin.ref.id })
                      }
                      includeMargin={true}
                      size={200}
                      value={depositInfo.address}
                    />

                    {depositTag && coin && (
                      <QRCode
                        label={t("deposit-crypto.depositQR.memo", { coin: coin.ref.id })}
                        includeMargin={true}
                        size={200}
                        value={depositTag}
                      />
                    )}
                  </Field>
                )}
              </>
            )}
          </>
        )}
      </Layout>
    </ModalContainer>
  );
}

export default DepositCryptoModal;
