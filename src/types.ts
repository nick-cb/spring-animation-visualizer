export type RepeatType = "loop" | "reverse" | "mirror";
export interface DurationSpringOptions {
  duration?: number;
  bounce?: number;
}
export interface VelocityOptions {
  velocity?: number;
  restSpeed?: number;
  restDelta?: number;
}
export interface SpringOptions extends DurationSpringOptions, VelocityOptions {
  stiffness?: number;
  damping?: number;
  mass?: number;
}

export interface AnimationPlaybackOptions {
  repeat?: number;
  repeatType?: RepeatType;
  repeatDelay?: number;
}
export interface DecayOptions extends VelocityOptions {
  keyframes?: number[];
  power?: number;
  timeConstant?: number;
  modifyTarget?: (v: number) => number;
}
export type BezierDefinition = [number, number, number, number];
export type EasingFunction = (v: number) => number;
export type EasingDefinition =
  | BezierDefinition
  | "linear"
  | "easeIn"
  | "easeOut"
  | "easeInOut"
  | "circIn"
  | "circOut"
  | "circInOut"
  | "backIn"
  | "backOut"
  | "backInOut"
  | "anticipate";

export type Easing = EasingDefinition | EasingFunction;
export interface KeyframeOptions {
  ease?: Easing | Easing[];
  times?: number[];
}

export interface InertiaOptions extends DecayOptions {
  bounceStiffness?: number;
  bounceDamping?: number;
  min?: number;
  max?: number;
}
export interface Transition
  extends AnimationPlaybackOptions,
    Omit<SpringOptions, "keyframes">,
    Omit<InertiaOptions, "keyframes">,
    KeyframeOptions {
  delay?: number;
  elapsed?: number;
  driver?: Driver;
  type?: "decay" | "spring" | "keyframes" | "tween" | "inertia";
  duration?: number;
  autoplay?: boolean;
}
type Update = (timestamp: number) => void;

/**
 * Drivers accept a update function and call it at an interval. This interval
 * could be a synchronous loop, a setInterval, or tied to the device's framerate.
 */
export interface DriverControls {
  start: () => void;
  stop: () => void;
  now: () => number;
}

export type Driver = (update: Update) => DriverControls;
export interface AnimationPlaybackLifecycles<V> {
  onUpdate?: (latest: V) => void;
  onPlay?: () => void;
  onComplete?: () => void;
  onRepeat?: () => void;
  onStop?: () => void;
}

export interface ValueAnimationTransition<V = any>
  extends Transition,
    AnimationPlaybackLifecycles<V> {}

export interface ValueAnimationOptions<V extends string | number = number>
  extends ValueAnimationTransition {
  keyframes: V[];
  KeyframeResolver?: any;
  name?: string;
  motionValue?: any;
  from?: V;
  isGenerator?: boolean;
}
