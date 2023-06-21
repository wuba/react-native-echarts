import React from 'react';

const defaultDependencies = ['@wuba/react-native-echarts@1.2.1-all.0', 'react-native-svg', 'react-native-reanimated', '@shopify/react-native-skia', 'react-native-gesture-handler']

type SnackPlayerProps = {
    name?: string;
    description?: string;
    ext?: string;
    children: string;
    dependencies?: string;
    platform?: string;
    supportedPlatforms?: string;
    theme?: string;
    preview?: string;
    loading?: string;
}

export default function SnackPlayer(params: SnackPlayerProps): JSX.Element {
    // Gather necessary Params
    const name = params.name ? decodeURIComponent(params.name) : 'Example';
    const description = params.description
      ? decodeURIComponent(params.description)
      : 'Example usage';
    const ext = params.ext ? decodeURIComponent(params.ext) : 'tsx';
    const filename = `App.${ext}`;
    const files = encodeURIComponent(
        JSON.stringify({
            [filename]: {
                type: 'CODE',
                contents: params.children,
            },
        })
    );
    const dependencies = params.dependencies || defaultDependencies.join(',');
    const platform = params.platform || 'web';
    const supportedPlatforms = params.supportedPlatforms || 'ios,android,web';
    const theme = params.theme || 'light';
    const preview = params.preview || 'true';
    const loading = params.loading || 'lazy';
    return <div
        className="snack-player"
        data-snack-name={name}
        data-snack-description={description}
        data-snack-files={files}
        data-snack-dependencies={dependencies}
        data-snack-platform={platform}
        data-snack-supported-platforms={supportedPlatforms}
        data-snack-theme={theme}
        data-snack-preview={preview}
        data-snack-loading={loading}
    />
}