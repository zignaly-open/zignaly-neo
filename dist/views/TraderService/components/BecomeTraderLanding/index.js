import React, { useMemo } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Typography, ZigButton } from '@zignaly-open/ui';
import { Layout, Header, Wrapper, Side, SideImage, Margin, Center, WrapperList, WrapperItem, WrapperAction, InfoBar, InfoBarList, InfoBarListItem, Sections, Section, FeaturesList, Feature, FeatureImage, FeatureData, StepList, Step, StepImage, Box, Separator, } from './styles';
import { useIsAuthenticated } from '../../../../apis/user/use';
import { ROUTE_SIGNUP } from '../../../../routes';
import { useNavigate } from 'react-router-dom';
import { Link } from '@mui/material';
import { useZModal } from '../../../../components/ZModal/use';
import CreateServiceModal from './modals/CreateServiceModal';
var BecomeTraderLanding = function () {
    var t = useTranslation('offer-your-trading-service').t;
    var showModal = useZModal().showModal;
    var isAuthenticated = useIsAuthenticated();
    var navigate = useNavigate();
    var infoBarItems = useMemo(function () { return [
        {
            title: t('infoBar.item1.title'),
            description: t('infoBar.item1.description'),
        },
        {
            title: t('infoBar.item2.title'),
            description: t('infoBar.item2.description'),
        },
        {
            title: t('infoBar.item3.title'),
            description: t('infoBar.item3.description'),
        },
    ]; }, [t]);
    var featuresItems = useMemo(function () { return [
        {
            title: t('features.list.item1.title'),
            description: t('features.list.item1.description'),
            image: 'icon-analytics.png',
        },
        {
            title: t('features.list.item2.title'),
            description: t('features.list.item2.description'),
            image: 'icon-tools.png',
        },
        {
            title: t('features.list.item3.title'),
            description: t('features.list.item3.description'),
            image: 'icon-payouts.png',
        },
        {
            title: t('features.list.item4.title'),
            description: t('features.list.item4.description'),
            image: 'icon-marketplace.png',
        },
    ]; }, [t]);
    var howWorksItems = useMemo(function () { return [
        {
            title: t('howWorks.list.item1.title'),
            description: t('howWorks.list.item1.description'),
            image: 'pool-funds.png',
        },
        {
            title: t('howWorks.list.item2.title'),
            description: t('howWorks.list.item2.description'),
            image: 'trade.png',
        },
        {
            title: t('howWorks.list.item3.title'),
            description: t('howWorks.list.item3.description'),
            image: 'split-profits.png',
        },
    ]; }, [t]);
    var onClickCreateService = function () {
        if (isAuthenticated) {
            showModal(CreateServiceModal, {
                ctaId: 'create-service',
            });
        }
        else {
            navigate(ROUTE_SIGNUP);
        }
    };
    return (React.createElement(Layout, null,
        React.createElement(Header, null,
            React.createElement(Typography, { variant: 'h1', color: 'neutral100' }, t('header.title'))),
        React.createElement(Sections, null,
            React.createElement(Section, null,
                React.createElement(Wrapper, null,
                    React.createElement(Side, null,
                        React.createElement(Typography, { variant: 'h2', color: 'neutral100' }, t('wrapper.title')),
                        React.createElement(WrapperList, null,
                            React.createElement(WrapperItem, null,
                                React.createElement(Typography, { variant: 'body1', color: 'neutral300' }, t('wrapper.list.item1'))),
                            React.createElement(WrapperItem, null,
                                React.createElement(Typography, { variant: 'body1', color: 'neutral300' }, t('wrapper.list.item2'))),
                            React.createElement(WrapperItem, null,
                                React.createElement(Typography, { variant: 'body1', color: 'neutral300' },
                                    React.createElement(Trans, { i18nKey: 'wrapper.list.item3', t: t },
                                        React.createElement(Link, { underline: 'hover', href: 'https://help.zignaly.com/en/articles/6845502-rules-for-being-listed-in-the-marketplace', target: '_blank' }))))),
                        React.createElement(WrapperAction, null,
                            React.createElement(ZigButton, { id: 'offer-service__create-service', size: 'large', variant: 'contained', onClick: onClickCreateService }, t('wrapper.action')))),
                    React.createElement(SideImage, null))),
            React.createElement(InfoBar, null,
                React.createElement(Margin, null,
                    React.createElement(InfoBarList, { itemsLength: infoBarItems.length }, infoBarItems.map(function (item, index) { return (React.createElement(InfoBarListItem, { key: "--info-bar-item-".concat(index.toString()) },
                        React.createElement(Typography, { variant: 'bigNumber', color: 'neutral100' }, item.title),
                        React.createElement(Typography, { variant: 'body1', color: 'neutral400' }, item.description.toUpperCase()))); })))),
            React.createElement(Section, null,
                React.createElement(Typography, { variant: 'h2', color: 'neutral100' }, t('howWorks.title')),
                React.createElement(StepList, { itemsLength: howWorksItems.length }, howWorksItems.map(function (howWorkItem, index) { return (React.createElement(React.Fragment, { key: "--how-works-item-".concat(index.toString()) },
                    React.createElement(Step, null,
                        React.createElement(Box, null,
                            React.createElement(Center, null,
                                React.createElement(Typography, { variant: 'h2', color: 'neutral100' }, howWorkItem.title.toUpperCase()),
                                React.createElement(StepImage, { src: '/images/service-provider/' + howWorkItem.image })),
                            React.createElement(Typography, { variant: 'body2', color: 'neutral400' }, howWorkItem.description))),
                    index < howWorksItems.length - 1 && React.createElement(Separator, null))); }))),
            React.createElement(Section, null,
                React.createElement(Typography, { variant: 'h2', color: 'neutral100' }, t('features.title')),
                React.createElement(FeaturesList, { itemsLength: featuresItems.length }, featuresItems.map(function (feature, index) { return (React.createElement(Feature, { key: "--features-item-".concat(index.toString()) },
                    React.createElement(FeatureImage, { src: '/images/service-provider/' + feature.image }),
                    React.createElement(FeatureData, null,
                        React.createElement(Typography, { variant: 'h3', color: 'neutral200' }, feature.title),
                        React.createElement(Typography, { variant: 'body2', color: 'neutral400' }, feature.description)))); }))))));
};
export default BecomeTraderLanding;
//# sourceMappingURL=index.js.map