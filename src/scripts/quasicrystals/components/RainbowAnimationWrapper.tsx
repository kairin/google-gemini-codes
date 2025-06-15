
import React from 'react';

interface RainbowCoreProps<T extends keyof JSX.IntrinsicElements> {
  children: React.ReactNode;
  isActive: boolean;
  /** Applies a faint, shimmery rainbow animation to the background using a ::before pseudo-element. */
  animateBackgroundShimmer?: boolean;
  /** Applies a faint, shimmery rainbow animation to the text using pastel colors. */
  animateTextShimmer?: boolean;
  /** Applies a bold, animated rainbow border. Element must have border-width set (e.g., via Tailwind's border-2). */
  animateBorder?: boolean;
  elementType?: T;
}

type RainbowAnimationWrapperProps<T extends keyof JSX.IntrinsicElements = 'div'> =
  RainbowCoreProps<T> &
  Omit<React.ComponentProps<T>, keyof RainbowCoreProps<T>>; // Changed from <any> to <T>

export const RainbowAnimationWrapper = <T extends keyof JSX.IntrinsicElements = 'div'>({
  children,
  isActive,
  animateBackgroundShimmer = false,
  animateTextShimmer = false,
  animateBorder = false,
  elementType,
  className, // className from incoming props
  ...rest
}: RainbowAnimationWrapperProps<T>) => {
  const Element = elementType || ('div' as T);

  let animationClasses = '';
  if (isActive) {
    if (animateBackgroundShimmer) {
      animationClasses += ' animate-rainbow-bg-shimmer';
    }
    if (animateTextShimmer) {
      animationClasses += ' animate-rainbow-text-shimmer';
    }
    if (animateBorder) {
      animationClasses += ' animate-rainbow-border';
    }
  }

  // Use the incoming className prop and append animation classes
  const combinedClassName = `${className || ''}${animationClasses}`.trim();

  // Spread props directly onto the Element
  return (
    <Element className={combinedClassName} {...rest}>
      {children}
    </Element>
  );
};
