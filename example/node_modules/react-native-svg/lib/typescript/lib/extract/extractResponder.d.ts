import { extractedProps, ResponderInstanceProps, ResponderProps } from './types';
export default function extractResponder(o: extractedProps, props: {
    [x: string]: any;
} & ResponderProps, ref: ResponderInstanceProps): void;
