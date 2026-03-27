/* global jest */

const mockCanvasKit = global.CanvasKit;

jest.mock('@shopify/react-native-skia', () => {
  jest.mock('@shopify/react-native-skia/lib/commonjs/skia/NativeSetup', () => {
    return {};
  });

  jest.mock('@shopify/react-native-skia/lib/commonjs/Platform', () => {
    const Noop = () => undefined;
    const Platform = {
      OS: 'web',
      PixelRatio: 1,
      requireNativeComponent: Noop,
      resolveAsset: Noop,
      findNodeHandle: Noop,
      NativeModules: Noop,
      View: Noop,
    };

    return {
      Platform,
    };
  });

  jest.mock('@shopify/react-native-skia/lib/commonjs/skia/core/Font', () => {
    return {
      useFont: () => null,
      matchFont: () => null,
      listFontFamilies: () => [],
      useFonts: () => null,
    };
  });

  const mockReact = require('react');
  const mockView = require('react-native').View;
  const skiaMock = require('@shopify/react-native-skia/lib/commonjs/mock').Mock(
    mockCanvasKit
  );
  const testParagraphFamilies = new Set();
  const paragraphFontCandidates = [
    {
      path: '/System/Library/Fonts/Hiragino Sans GB.ttc',
      families: [
        'PingFang SC',
        'Hiragino Sans GB',
        'Helvetica Neue',
        'sans-serif',
        'System',
      ],
    },
    {
      path: '/System/Library/Fonts/Supplemental/Arial.ttf',
      families: ['Arial', 'Helvetica', 'Helvetica Neue', 'sans-serif'],
    },
    {
      path: '/System/Library/Fonts/Helvetica.ttc',
      families: ['Helvetica', 'Helvetica Neue', 'sans-serif'],
    },
  ];
  let cachedParagraphFontProvider = null;
  let cachedParagraphTypeface = null;

  const registerParagraphFamily = (family) => {
    if (
      !family ||
      !cachedParagraphFontProvider ||
      !cachedParagraphTypeface ||
      testParagraphFamilies.has(family)
    ) {
      return;
    }

    cachedParagraphFontProvider.registerFont(cachedParagraphTypeface, family);
    testParagraphFamilies.add(family);
  };
  const ensureParagraphFontProvider = (families = []) => {
    if (!cachedParagraphFontProvider) {
      cachedParagraphFontProvider = skiaMock.Skia.TypefaceFontProvider.Make();

      const fs = require('fs');
      for (const candidate of paragraphFontCandidates) {
        if (!fs.existsSync(candidate.path)) {
          continue;
        }

        try {
          const bytes = fs.readFileSync(candidate.path);
          const data = skiaMock.Skia.Data.fromBytes(
            new Uint8Array(bytes.buffer, bytes.byteOffset, bytes.byteLength)
          );
          const typeface =
            skiaMock.Skia.Typeface.MakeFreeTypeFaceFromData(data);

          if (!typeface) {
            continue;
          }

          cachedParagraphTypeface = typeface;
          candidate.families.forEach(registerParagraphFamily);
          break;
        } catch {}
      }
    }

    families.forEach(registerParagraphFamily);

    return cachedParagraphFontProvider;
  };
  const originalParagraphBuilderMake = skiaMock.Skia.ParagraphBuilder.Make.bind(
    skiaMock.Skia.ParagraphBuilder
  );

  skiaMock.Skia.ParagraphBuilder.Make = (paragraphStyle, typefaceProvider) => {
    const provider = typefaceProvider ?? ensureParagraphFontProvider();
    const builder = originalParagraphBuilderMake(paragraphStyle, provider);
    const originalPushStyle = builder.pushStyle.bind(builder);

    builder.pushStyle = (style, ...args) => {
      if (!typefaceProvider && Array.isArray(style?.fontFamilies)) {
        ensureParagraphFontProvider(style.fontFamilies);
      }

      return originalPushStyle(style, ...args);
    };

    return builder;
  };

  const sanitizeValue = (value, key) => {
    if (
      value == null ||
      typeof value === 'string' ||
      typeof value === 'number' ||
      typeof value === 'boolean'
    ) {
      return value;
    }

    if (typeof value === 'function') {
      return '[Function]';
    }

    if (Array.isArray(value)) {
      return value.map((item) => sanitizeValue(item, key));
    }

    if (mockReact.isValidElement(value)) {
      return sanitizeElement(value);
    }

    if (key === 'image') {
      return '[SkImage]';
    }

    if (key === 'paragraph') {
      return '[SkParagraph]';
    }

    if (key === 'path') {
      return '[SkPath]';
    }

    if (key === 'clip') {
      return '[SkClip]';
    }

    const ctorName = value?.constructor?.name;
    if (ctorName && ctorName !== 'Object') {
      return `[${ctorName}]`;
    }

    return Object.fromEntries(
      Object.entries(value).map(([nestedKey, nestedValue]) => [
        nestedKey,
        sanitizeValue(nestedValue, nestedKey),
      ])
    );
  };
  const sanitizeElement = (element, fallbackKey) => {
    if (!mockReact.isValidElement(element)) {
      return sanitizeValue(element);
    }

    const { children, ...props } = element.props || {};
    const sanitizedChildren = mockReact.Children.toArray(children).map(
      (child, index) => sanitizeElement(child, `${fallbackKey}-child-${index}`)
    );

    return mockReact.createElement(
      element.type,
      {
        key: element.key ?? fallbackKey,
        ...Object.fromEntries(
          Object.entries(props).map(([key, value]) => [
            key,
            sanitizeValue(value, key),
          ])
        ),
      },
      ...sanitizedChildren
    );
  };
  const MockCanvas = mockReact.forwardRef(({ children, ...props }, ref) => {
    const sanitizedChildren = mockReact.Children.toArray(children).map(
      (child, index) => sanitizeElement(child, `canvas-child-${index}`)
    );

    if (sanitizedChildren.length === 0) {
      return null;
    }

    return mockReact.createElement(
      mockView,
      { ...props, ref },
      ...sanitizedChildren
    );
  });

  MockCanvas.displayName = 'SkiaMockCanvas';

  return {
    ...skiaMock,
    ...require('@shopify/react-native-skia/lib/commonjs/renderer/Offscreen'),
    Canvas: MockCanvas,
  };
});
