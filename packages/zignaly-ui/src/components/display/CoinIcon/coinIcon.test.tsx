import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import {composeStories} from '@storybook/testing-react';

// Info Stories
import * as stories from './stories';
import {sizes} from "./styles";
import {CoinSizes} from "./types";

// Every component that is returned maps 1:1 with the stories, but they already contain all decorators from story level, meta level and global level.
const { EtherCoinIconStory, BitcoinCoinIconStory, TetherCoinIconStory } = composeStories(stories);

describe("components/display/CoinIcon", () => {
    describe("stories", () => {
        it('should be rendered image and checks use props', () => {
            const src = `https://res.cloudinary.com/zignaly/image/upload/c_scale,w_${
                sizes[CoinSizes.MEDIUM]
            },h_${sizes[CoinSizes.MEDIUM]},r_max/coins-binance/ETH`;
            const renderEtherCoin = render(<EtherCoinIconStory />);
            const etherCoinIconImage = renderEtherCoin.getByRole('img');
            expect(etherCoinIconImage).toHaveAttribute('src', src);
            expect(etherCoinIconImage).toHaveAttribute('alt', 'Ethereum');
            expect(etherCoinIconImage).toBeVisible();
        });

        it('should be rendered image fallback and checks use props', () => {
            const srcFallback = `https://res.cloudinary.com/zignaly/image/upload/c_scale,w_${
                sizes[CoinSizes.MEDIUM]
            },h_${sizes[CoinSizes.MEDIUM]},r_max/coins-binance/BTC`;
            const renderEtherCoinWithFallBack = render(<EtherCoinIconStory coin={"SCAQQFS"} />);
            const etherCoinIconImageFallBack = renderEtherCoinWithFallBack.getByRole('img');
            fireEvent.error(etherCoinIconImageFallBack);
            expect(etherCoinIconImageFallBack).toHaveAttribute('src', srcFallback);
            expect(etherCoinIconImageFallBack).toHaveAttribute('alt', 'Ethereum');
            expect(etherCoinIconImageFallBack).toBeVisible();
        });
        it('should be rendered EtherCoinIconStory', () => {
            const {getByTestId} = render(<EtherCoinIconStory />);
            const etherCoinIcon = getByTestId('coin-icon-view');
            expect(etherCoinIcon).toBeVisible();
            expect(etherCoinIcon).toHaveClass(CoinSizes.MEDIUM);
        });
        it('should be rendered BitcoinCoinIconStory', () => {
            const {getByTestId} = render(<BitcoinCoinIconStory />);
            const bitcoinCoinIcon = getByTestId('coin-icon-view');
            expect(bitcoinCoinIcon).toBeVisible();
            expect(bitcoinCoinIcon).toHaveClass(CoinSizes.LARGE);
        });

        it('should be rendered TetherCoinIconStory', () => {
            const {getByTestId} = render(<TetherCoinIconStory />);
            const tetherCoinIcon = getByTestId('coin-icon-view');
            expect(tetherCoinIcon).toBeVisible();
            expect(tetherCoinIcon).toHaveClass(CoinSizes.SMALL);
        });
    });
});
