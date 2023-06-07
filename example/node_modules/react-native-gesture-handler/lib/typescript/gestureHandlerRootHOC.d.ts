import * as React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
export default function gestureHandlerRootHOC<P extends JSX.IntrinsicAttributes>(Component: React.ComponentType<P>, containerStyles?: StyleProp<ViewStyle>): React.ComponentType<P>;
