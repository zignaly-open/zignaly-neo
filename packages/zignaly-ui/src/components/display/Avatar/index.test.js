// Dependencies
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

// Component
import { Image, Metamask } from './index.stories';
import { sizeTypesId } from '@types/sizes';

describe('components/display/Avatar/Image', () => {
  it('renders the image we specify in the `image` property', () => {
    render(<Image image={Image.args.image} />);
    expect(screen.getByRole('img')).toHaveAttribute('src', Image.args.image);
  });

  it('renders the image we specify in the `hash` property', () => {
    const { container } = render(<Image {...Metamask.args} />);

    const svg = container.querySelector('svg');

    expect(screen.getByTestId('icon-input')).toBeVisible();
    expect(svg).toBeVisible();
  });

  it('renders the image in small size', () => {
    const { container } = render(
      <Image
        {...Metamask.args}
        size={sizeTypesId.SMALL}
      />
    );

    expect(container.firstChild.classList.contains(sizeTypesId.SMALL)).toBe(true);
  });

  it('renders the image in medium size', () => {
    const { container } = render(
      <Image
        {...Metamask.args}
        size={sizeTypesId.MEDIUM}
      />
    );

    expect(container.firstChild.classList.contains(sizeTypesId.MEDIUM)).toBe(true);
  });

  it('renders the image in large size', () => {
    const { container } = render(
      <Image
        {...Metamask.args}
        size={sizeTypesId.LARGE}
      />
    );

    expect(container.firstChild.classList.contains(sizeTypesId.LARGE)).toBe(true);
  });
});
