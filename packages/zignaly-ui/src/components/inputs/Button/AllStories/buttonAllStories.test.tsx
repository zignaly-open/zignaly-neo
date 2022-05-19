import React from 'react';
import {render, screen} from '@testing-library/react';
import {composeStories} from '@storybook/testing-react';

// Info Stories
import * as stories from './stories';

// Every component that is returned maps 1:1 with the stories, but they already contain all decorators from story level, meta level and global level.
const { MediumButtonIconVariation, MediumButtonDisabled, MediumButtonTextColors, MediumButtonLoading } = composeStories(stories);


describe("inputs/Button", () => {
    describe("stories", () => {
        describe("MediumButtonIconVariation story", () => {
            it('should be rendered MediumButtonIconVariation-1-2 button with right element', () => {
                render(<MediumButtonIconVariation />);
                const MediumButtonIconVariationRightElementRendered = screen.getByTestId('MediumButtonIconVariation-right-element-1-2');
                expect(MediumButtonIconVariationRightElementRendered).toBeVisible();
            });

            it('should be rendered MediumButtonIconVariation-1-3 button with left element', () => {
                render(<MediumButtonIconVariation />);
                const MediumButtonIconVariationLeftElementRendered = screen.getByTestId('MediumButtonIconVariation-left-element-1-3');
                expect(MediumButtonIconVariationLeftElementRendered).toBeVisible();
            });

            it('should be rendered MediumButtonIconVariation-1-4 button with left and right elements', () => {
                render(<MediumButtonIconVariation />);
                const MediumButtonIconVariationLeftElementRendered = screen.getByTestId('MediumButtonIconVariation-left-element-1-4');
                expect(MediumButtonIconVariationLeftElementRendered).toBeVisible();
                const MediumButtonIconVariationRightElementRendered = screen.getByTestId('MediumButtonIconVariation-right-element-1-4');
                expect(MediumButtonIconVariationRightElementRendered).toBeVisible();
            });

            it('should be rendered MediumButtonIconVariation-2-2 button with right element', () => {
                render(<MediumButtonIconVariation />);
                const MediumButtonIconVariationRightElementRendered = screen.getByTestId('MediumButtonIconVariation-right-element-2-2');
                expect(MediumButtonIconVariationRightElementRendered).toBeVisible();
            });

            it('should be rendered MediumButtonIconVariation-2-3 button with left element', () => {
                render(<MediumButtonIconVariation />);
                const MediumButtonIconVariationLeftElementRendered = screen.getByTestId('MediumButtonIconVariation-left-element-2-3');
                expect(MediumButtonIconVariationLeftElementRendered).toBeVisible();
            });

            it('should be rendered MediumButtonIconVariation-2-4 button with left and right elements', () => {
                render(<MediumButtonIconVariation />);
                const MediumButtonIconVariationLeftElementRendered = screen.getByTestId('MediumButtonIconVariation-left-element-2-4');
                expect(MediumButtonIconVariationLeftElementRendered).toBeVisible();
                const MediumButtonIconVariationRightElementRendered = screen.getByTestId('MediumButtonIconVariation-right-element-2-4');
                expect(MediumButtonIconVariationRightElementRendered).toBeVisible();
            });
        });

        describe("MediumButtonDisabled story", () => {
            it('should be rendered MediumButtonDisabled-1-1 without disabled', () => {
                const {getAllByRole} = render(<MediumButtonDisabled />);
                const MediumButtonsDisabledRendered = getAllByRole('button');
                expect(MediumButtonsDisabledRendered[0]).not.toBeDisabled();
            });

            it('should be rendered MediumButtonDisabled-1-2 with disabled', () => {
                const {getAllByRole} = render(<MediumButtonDisabled />);
                const MediumButtonsDisabledRendered = getAllByRole('button');
                expect(MediumButtonsDisabledRendered[1]).toBeDisabled();
            });

            it('should be rendered MediumButtonDisabled-2-1 without disabled', () => {
                const {getAllByRole} = render(<MediumButtonDisabled />);
                const MediumButtonsDisabledRendered = getAllByRole('button');
                expect(MediumButtonsDisabledRendered[2]).not.toBeDisabled();
            });

            it('should be rendered MediumButtonDisabled-2-2 with disabled', () => {
                const {getAllByRole} = render(<MediumButtonDisabled />);
                const MediumButtonsDisabledRendered = getAllByRole('button');
                expect(MediumButtonsDisabledRendered[3]).toBeDisabled();
            });
        });

        describe("MediumButtonTextColors story", () => {
            it('should be rendered MediumButtonDisabled-1-1 checks color attr', () => {
                const {getAllByRole} = render(<MediumButtonTextColors />);
                const MediumButtonTextColorsRendered = getAllByRole('button');
                expect(MediumButtonTextColorsRendered[0]).toHaveAttribute('color', 'grey');
            });

            it('should be rendered MediumButtonDisabled-2-2 checks color attr', () => {
                const {getAllByRole} = render(<MediumButtonTextColors />);
                const MediumButtonTextColorsRendered = getAllByRole('button');
                expect(MediumButtonTextColorsRendered[2]).toHaveAttribute('color', 'green');
            });

        });

        describe("MediumButtonLoading story", () => {
            it('should be rendered MediumButtonLoading-1-1 button with loading, size medium and variant primary', () => {
                const {getAllByRole} = render(<MediumButtonLoading />);
                const MediumButtonLoadingRendered = getAllByRole('button');
                expect(MediumButtonLoadingRendered[0]).toBeDisabled();
                expect(MediumButtonLoadingRendered[0]).toHaveAttribute('color', 'grey');
                const MediumButtonLoadingElementRendered = screen.getByTestId('MediumButtonLoading-loading-element-1-1');
                expect(MediumButtonLoadingElementRendered).toBeVisible();
            });

            it('should be rendered MediumButtonLoading-1-2 button with loading, size medium, variant secondary and icons', () => {
                const {getAllByRole} = render(<MediumButtonLoading />);
                const MediumButtonLoadingRendered = getAllByRole('button');
                expect(MediumButtonLoadingRendered[1]).toBeDisabled();
                expect(MediumButtonLoadingRendered[1]).toHaveAttribute('color', 'grey');
                const MediumButtonLoadingElementRendered = screen.getByTestId('MediumButtonLoading-loading-element-1-2');
                expect(MediumButtonLoadingElementRendered).toBeVisible();
                const MediumButtonLoadingRightElementRendered = screen.getByTestId('MediumButtonLoading-right-element-1-2');
                expect(MediumButtonLoadingRightElementRendered).not.toBeVisible();
                expect(MediumButtonLoadingRightElementRendered).toBeInTheDocument();
            });

            it('should be rendered MediumButtonLoading-2-1 button with loading, size medium and variant primary', () => {
                const {getAllByRole} = render(<MediumButtonLoading />);
                const MediumButtonLoadingRendered = getAllByRole('button');
                expect(MediumButtonLoadingRendered[2]).toBeDisabled();
                expect(MediumButtonLoadingRendered[2]).toHaveAttribute('color', 'grey');
                const MediumButtonLoadingElementRendered = screen.getByTestId('MediumButtonLoading-loading-element-2-1');
                expect(MediumButtonLoadingElementRendered).toBeVisible();
            });

            it('should be rendered MediumButtonLoading-2-2 button with loading, size medium, variant secondary and icons', () => {
                const {getAllByRole} = render(<MediumButtonLoading />);
                const MediumButtonLoadingRendered = getAllByRole('button');
                expect(MediumButtonLoadingRendered[3]).toBeDisabled();
                expect(MediumButtonLoadingRendered[3]).toHaveAttribute('color', 'grey');
                const MediumButtonLoadingElementRendered = screen.getByTestId('MediumButtonLoading-loading-element-2-2');
                expect(MediumButtonLoadingElementRendered).toBeVisible();
                const MediumButtonLoadingRightElementRendered = screen.getByTestId('MediumButtonLoading-right-element-2-2');
                expect(MediumButtonLoadingRightElementRendered).not.toBeVisible();
                expect(MediumButtonLoadingRightElementRendered).toBeInTheDocument();
            });
        });
    });
});
