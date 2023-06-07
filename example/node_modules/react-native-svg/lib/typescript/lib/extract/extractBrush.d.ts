import { ColorValue } from 'react-native';
export default function extractBrush(color?: ColorValue): {
    type: number;
} | {
    type: number;
    brushRef: string;
    payload?: undefined;
} | {
    type: number;
    payload: number;
    brushRef?: undefined;
} | null;
