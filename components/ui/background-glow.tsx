import { Canvas, Rect, RadialGradient, vec } from "@shopify/react-native-skia";
import { StyleSheet } from "react-native";

type BackgroundGlowProps = {
  width: number;
  height: number;
  pos: { x: number; y: number };
  color: string;
};

export function BackgroundGlow({
  width,
  height,
  pos,
  color,
}: BackgroundGlowProps) {
  return (
    <Canvas
      style={[StyleSheet.absoluteFill, { width, height }]}
      pointerEvents="none"
    >
      <Rect x={0} y={0} width={width} height={height}>
        <RadialGradient
          c={vec(pos.x, pos.y)}
          r={width * 0.72}
          colors={[`${color}70`, `${color}25`, `${color}05`, `${color}00`]}
        />
      </Rect>
    </Canvas>
  );
}
