/// <reference types="node" />
import type { HostConfig } from "react-reconciler";
import type { NodeType, Node } from "../dom/types";
import type { Container } from "./Container";
export declare const debug: (message?: any, ...optionalParams: any[]) => void;
declare type Instance = Node<unknown>;
declare type Props = object;
declare type TextInstance = Node<unknown>;
declare type SuspenseInstance = Instance;
declare type HydratableInstance = Instance;
declare type PublicInstance = Instance;
declare type HostContext = null;
declare type UpdatePayload = Container;
declare type ChildSet = unknown;
declare type TimeoutHandle = NodeJS.Timeout;
declare type NoTimeout = -1;
declare type SkiaHostConfig = HostConfig<NodeType, Props, Container, Instance, TextInstance, SuspenseInstance, HydratableInstance, PublicInstance, HostContext, UpdatePayload, ChildSet, TimeoutHandle, NoTimeout>;
export declare const skHostConfig: SkiaHostConfig;
export {};
