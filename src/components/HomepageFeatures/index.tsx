import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

import Translate, { translate } from '@docusaurus/Translate';

type FeatureItem = {
  title: string;
  img: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: translate({
      id: 'components.HomepageFeatures.easyToUse',
      message: 'Easy to Use',
      description: 'The title of the feature that is easy to use',
    }),
    img: require('@site/static/img/easy-to-use@2x.png').default,
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
    img: require('@site/static/img/creating-interactive-charts@2x.png').default,
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
    img: require('@site/static/img/powered-by-react-native@2x.png').default,
    description: (
      <>
        <Translate id='components.HomepageFeatures.poweredByReactNativeDesc'>Designed for React Native, delivering chart visualization directly in the app for a seamless experience.</Translate>
      </>
    ),
  },
];

function Feature({title, img, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <img className={styles.featureImg} src={img} role="img" />
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
