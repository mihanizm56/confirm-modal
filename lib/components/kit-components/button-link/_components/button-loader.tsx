import React, { useMemo, memo } from 'react';
import { Preloader } from '@/components/kit-components/preloader';
import { ButtonVariant } from '@/_types';
import { Overlay } from '../../overlay';
import { getPreloaderColor } from '../_utils/get-preloader-color';
import { BUTTON_OVERLAY_TIMEOUT } from '../_constants';

type ButtonLoaderPropsType = {
  isDarkTheme?: boolean;
  isLoading: boolean;
  variant: ButtonVariant;
};

export const ButtonLoader = memo(
  ({ isDarkTheme, isLoading, variant }: ButtonLoaderPropsType) => {
    const preloaderColorCheck = useMemo(
      () => getPreloaderColor({ variant, isDarkTheme }),
      [variant, isDarkTheme],
    );

    return (
      <Overlay
        absolute
        inherit
        opened={isLoading}
        timeout={BUTTON_OVERLAY_TIMEOUT}
        withBorderRadius
      >
        <Preloader color={preloaderColorCheck} size="small" />
      </Overlay>
    );
  },
);
