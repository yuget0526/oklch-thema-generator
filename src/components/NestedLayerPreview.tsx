import React from "react";
import { ColorVariant, LayerScale, ThemeMode } from "@/lib/color/color-utils";
import ContrastBadge from "./ContrastBadge";

interface NestedLayerPreviewProps {
  layers: LayerScale[];
  primary: ColorVariant[];
  secondary: ColorVariant[];
  tertiary: ColorVariant[];
  mode: ThemeMode;
  overrides?: Record<string, string>;
}

// Helper for Layer Header
const LayerHeader = ({ label, layer }: { label: string; layer: any }) => (
  <div className="flex justify-between items-center mb-6 opacity-50 text-[10px] font-bold tracking-widest uppercase">
    <div className="flex items-center gap-2">
      <div className="w-2 h-2 rounded-full bg-current" />
      {label}
    </div>
    <div className="flex items-center gap-3">
      <span className="font-mono">{layer.hex}</span>
      <ContrastBadge
        bgColor={layer.hex}
        fgColor={layer.onHex}
        className="scale-90 origin-right"
      />
    </div>
  </div>
);

// Helper for Variant Column
const VariantColumn = ({
  title,
  variants,
  mainColor,
  resolveColor,
}: {
  title: string;
  variants: ColorVariant[];
  mainColor: string;
  resolveColor: (v: ColorVariant) => any;
}) => (
  <div className="flex-1 p-6 rounded-2xl bg-black/5 dark:bg-white/5">
    <h3
      className="text-center font-bold text-lg mb-1"
      style={{ color: mainColor }}
    >
      {title}
    </h3>
    <p className="text-center text-xs opacity-50 mb-6">Color Variants</p>
    <div className="space-y-3">
      {variants.map((v) => {
        const resolved = resolveColor(v);
        return (
          <div
            key={v.name}
            className="flex items-center justify-between px-4 py-3 rounded-lg text-xs font-medium shadow-sm"
            style={{ backgroundColor: resolved.hex, color: resolved.onHex }}
          >
            <span className="capitalize">{v.name.replace("-", " ")}</span>
            <ContrastBadge
              bgColor={resolved.hex}
              fgColor={resolved.onHex}
              className="scale-75 origin-right"
            />
          </div>
        );
      })}
    </div>
  </div>
);

export function NestedLayerPreview({
  layers,
  primary,
  secondary,
  tertiary,
  mode,
  overrides = {},
}: NestedLayerPreviewProps) {
  const resolveColor = (variant: ColorVariant | undefined) => {
    if (!variant)
      return {
        hex: "#000000",
        onHex: "#FFFFFF",
        variableName: "",
        onVariableName: "",
      };
    const hex = overrides[variant.variableName] || variant.hex;
    const onHex = overrides[variant.onVariableName] || variant.onHex;
    return { ...variant, hex, onHex };
  };

  const resolveLayer = (layer: LayerScale | undefined) => {
    if (!layer)
      return {
        hex: "#FFFFFF",
        onHex: "#000000",
        variableName: "",
        onVariableName: "",
      };
    const hex = overrides[layer.variableName] || layer.hex;
    const onHex = overrides[layer.onVariableName] || layer.onHex;
    return { ...layer, hex, onHex };
  };

  // Extract variants for current mode (for buttons)
  const pMain = resolveColor(primary.find((v) => v.name === mode));

  // Layers
  const l1 = resolveLayer(
    layers.find((l) => l.name === "surface-1") || layers[0]
  );
  const l2 = resolveLayer(
    layers.find((l) => l.name === "surface-2") || layers[1]
  );
  const l3 = resolveLayer(
    layers.find((l) => l.name === "surface-3") || layers[2]
  );

  return (
    <div className="w-full min-h-full p-8 transition-colors duration-300 flex flex-col items-center">
      {/* Background Label */}
      <div className="w-full max-w-5xl mb-2 flex justify-between items-center opacity-40 text-[10px] font-bold tracking-widest uppercase px-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-current" />
          BACKGROUND
        </div>
      </div>

      {/* Surface 1 */}
      <div
        className="w-full max-w-5xl rounded-3xl p-6 sm:p-8 shadow-sm transition-colors duration-300"
        style={{ backgroundColor: l1.hex, color: l1.onHex }}
      >
        <LayerHeader label="Surface-1" layer={l1} />

        {/* Surface 2 */}
        <div
          className="w-full rounded-2xl p-6 sm:p-8 shadow-sm transition-colors duration-300"
          style={{ backgroundColor: l2.hex, color: l2.onHex }}
        >
          <LayerHeader label="Surface-2" layer={l2} />

          {/* Surface 3 */}
          <div
            className="w-full rounded-xl p-8 sm:p-12 shadow-sm transition-colors duration-300"
            style={{ backgroundColor: l3.hex, color: l3.onHex }}
          >
            <LayerHeader label="Surface-3" layer={l3} />

            {/* Main Content */}
            <div className="text-center space-y-6 max-w-2xl mx-auto mb-16">
              <h1
                className="text-5xl font-bold tracking-tight"
                style={{ color: pMain.hex }}
              >
                Nested Layers
              </h1>
              <p className="text-lg opacity-70 leading-relaxed">
                This preview demonstrates how the generated background layers
                create depth and hierarchy in your interface.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                {/* Filled Button */}
                <div className="relative group">
                  <button
                    className="pl-6 pr-32 py-3 rounded-lg font-semibold shadow-sm transition-transform active:scale-95 flex items-center h-12"
                    style={{ backgroundColor: pMain.hex, color: pMain.onHex }}
                  >
                    Get Started
                  </button>
                  <div className="absolute top-1/2 -translate-y-1/2 right-3">
                    <ContrastBadge
                      bgColor={pMain.hex}
                      fgColor={pMain.onHex}
                      className="shadow-none border-none bg-black/20 backdrop-blur-sm"
                    />
                  </div>
                </div>

                {/* Outlined Button */}
                <div className="relative group">
                  <button
                    className="pl-6 pr-32 py-3 rounded-lg font-semibold border-2 transition-transform active:scale-95 flex items-center h-12"
                    style={{
                      borderColor: pMain.hex,
                      color: pMain.hex,
                      backgroundColor: "transparent",
                    }}
                  >
                    Learn More
                  </button>
                  <div className="absolute top-1/2 -translate-y-1/2 right-3">
                    <ContrastBadge
                      bgColor={l3.hex}
                      fgColor={pMain.hex}
                      className="shadow-none border-none bg-black/5"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Color Variants Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <VariantColumn
                title="Primary"
                variants={primary}
                mainColor={
                  resolveColor(primary.find((v) => v.name === mode)).hex
                }
                resolveColor={resolveColor}
              />
              <VariantColumn
                title="Secondary"
                variants={secondary}
                mainColor={
                  resolveColor(secondary.find((v) => v.name === mode)).hex
                }
                resolveColor={resolveColor}
              />
              <VariantColumn
                title="Tertiary"
                variants={tertiary}
                mainColor={
                  resolveColor(tertiary.find((v) => v.name === mode)).hex
                }
                resolveColor={resolveColor}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
