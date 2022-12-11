import * as React from 'react';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import theme from '../theme/theme';
import createEmotionCache from '../theme/createEmotionCache';
import type { EmotionCache } from '@emotion/react';
import type { NextPage } from 'next';
import type { ReactNode } from 'react';
import type { AppProps } from 'next/app';
// Client-side cache shared for the whole session
// of the user in the browser.

const clientSideEmotionCache = createEmotionCache();

type Page<P = unknown> = NextPage<P> & {
    getLayout?: (_page: ReactNode) => ReactNode;
};

interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache;
    Component: Page;
}

export default function MyApp(props: MyAppProps) {
    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
    const getLayout = Component.getLayout ?? ((page: ReactNode) => page);

    return (
        <CacheProvider value={emotionCache}>
            {getLayout(
                <>
                    <Head>
                        <meta
                            name='viewport'
                            content='width=device-width, initial-scale=1, user-scalable=0, maximum-scale=1, minimum-scale=1'
                        />
                    </Head>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <Component {...pageProps} />
                    </ThemeProvider>
                </>
            )}
        </CacheProvider>
    );
}
