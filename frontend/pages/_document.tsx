import * as React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@mui/styles';

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang='en'>
                <Head>
                    <link rel='preconnect' href='https://fonts.googleapis.com' />
                    <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
                    <link
                        href='https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap'
                        rel='stylesheet'
                        crossOrigin='anonymous'
                    />
                    <link rel='apple-touch-icon' sizes='57x57' href='/favicon/apple-icon-57x57.png' />
                    <link rel='apple-touch-icon' sizes='60x60' href='/favicon/apple-icon-60x60.png' />
                    <link rel='apple-touch-icon' sizes='72x72' href='/favicon/apple-icon-72x72.png' />
                    <link rel='apple-touch-icon' sizes='76x76' href='/favicon/apple-icon-76x76.png' />
                    <link rel='apple-touch-icon' sizes='114x114' href='/favicon/apple-icon-114x114.png' />
                    <link rel='apple-touch-icon' sizes='120x120' href='/favicon/apple-icon-120x120.png' />
                    <link rel='apple-touch-icon' sizes='152x152' href='/favicon/apple-icon-152x152.png' />
                    <link rel='apple-touch-icon' sizes='180x180' href='/favicon/apple-icon-180x180.png' />
                    <link rel='icon' type='image/png' sizes='192x192' href='/favicon/android-icon-192x192.png' />
                    <link rel='icon' type='image/png' sizes='32x32' href='/favicon/favicon-32x32.png' />
                    <link rel='icon' type='image/png' sizes='96x96' href='/favicon/favicon-96x96.png' />
                    <link rel='icon' type='image/png' sizes='16x16' href='/favicon/favicon-16x16.png' />
                    <meta name='msapplication-TileColor' content='#ffffff' />
                    <meta name='msapplication-TileImage' content='/ms-icon-144x144.png' />
                    <meta name='theme-color' content='#ffffff'></meta>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
    // Render app and page and get the context of the page with collected side effects.
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
        originalRenderPage({
            enhanceApp: (App) => (props) => sheets.collect(<App {...props} />)
        });

    const initialProps = await Document.getInitialProps(ctx);

    return {
        ...initialProps,
        // Styles fragment is rendered after the app and page rendering finish.
        styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()]
    };
};
