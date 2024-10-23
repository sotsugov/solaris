import { render, screen } from '@testing-library/react';
import { SiteHeader } from '../header';

// Mock the next/link component
jest.mock('next/link', () => {
  const NextLink = ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>;
  // Component definition is required here react/display-name
  NextLink.displayName = 'NextLink';
  return NextLink;
});

// Mock the ModeToggle component
jest.mock('../theme-toggle', () => ({
  ModeToggle: () => <div data-testid="mode-toggle">Mode Toggle</div>,
}));

describe('SiteHeader', () => {
  it('renders correctly', () => {
    render(<SiteHeader />);

    // Test the logo link
    const logoLink = screen.getByRole('link', { name: /solaris/i });
    expect(logoLink).toBeInTheDocument();

    // Test the heading text
    expect(screen.getByText('API credit usage dashboard')).toBeInTheDocument();

    // Test avatar fallback
    const avatarFallback = screen.getByText('IS');
    expect(avatarFallback).toBeInTheDocument();

    // Test the mode toggle
    expect(screen.getByTestId('mode-toggle')).toBeInTheDocument();
  });

  it('maintains correct layout structure', () => {
    render(<SiteHeader />);

    // Test the main container layout
    const mainContainer = screen.getByRole('banner').firstChild as HTMLElement;
    expect(mainContainer).toHaveClass('flex items-center justify-between');

    // Test the right side container
    const rightContainer = screen.getByTestId('mode-toggle')
      .parentElement as HTMLElement;
    expect(rightContainer).toHaveClass('flex flex-row items-center gap-x-6');
  });
});
