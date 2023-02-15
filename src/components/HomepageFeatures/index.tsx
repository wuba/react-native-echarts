import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

import Translate, { translate } from '@docusaurus/Translate';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: translate({
      id: 'components.HomepageFeatures.easyToUse',
      message: 'Easy to Use',
      description: 'The title of the feature that is easy to use',
    }),
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        <Translate id="components.HomepageFeatures.easyToUseDesc">Built with Apache ECharts, offering customization options to represent complex data visually. The usage is almost identical to ECharts.</Translate>
      </>
    ),
  },
  {
    title: translate({
      id: 'components.HomepageFeatures.interactiveCharts',
      message: 'Creating interactive charts',
      description: 'The title of the feature that is creating interactive charts',
    }),
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        <Translate id='components.HomepageFeatures.interactiveChartsDesc'>Experience the power of data visualization with our intuitive, interactive charts that bring your data to life.</Translate>
      </>
    ),
  },
  {
    title: translate({
      id: 'components.HomepageFeatures.poweredByReactNative',
      message: 'Powered by React Native',
      description: 'The title of the feature that is powered by React Native',
    }),
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        <Translate id='components.HomepageFeatures.poweredByReactNativeDesc'>Designed for React Native, delivering chart visualization directly in the app for a seamless experience.</Translate>
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
