import React from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
import { BlurView } from "expo-blur";
import { ThemedText } from "./themed-text";
import { Radius } from "@/constants/theme";

type MenuItem = {
  label: string;
  onPress: () => void;
};

type MenuProps = {
  visible: boolean;
  items: MenuItem[];
  onDismiss: () => void;
  position?: { x: number; y: number };
};

export function Menu({ visible, items, onDismiss, position }: MenuProps) {
  const { height } = useWindowDimensions();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onDismiss}
    >
      <Pressable style={styles.backdrop} onPress={onDismiss}>
        <View
          style={[
            styles.menu,
            {
              top: (position?.y ?? 0) + 50,
              right: 20,
            },
          ]}
        >
          <BlurView intensity={80} tint="dark" style={styles.blurContainer}>
            {items.map((item, index) => (
              <Pressable
                key={index}
                onPress={() => {
                  item.onPress();
                  onDismiss();
                }}
                style={({ pressed }) => [
                  styles.menuItem,
                  pressed && styles.menuItemPressed,
                  index !== items.length - 1 && styles.menuItemBorder,
                ]}
              >
                <ThemedText size="lg">{item.label}</ThemedText>
              </Pressable>
            ))}
          </BlurView>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  menu: {
    position: "absolute",
    minWidth: 180,
    borderRadius: Radius.lg,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  blurContainer: {
    borderRadius: Radius.lg,
  },
  menuItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: "center",
  },
  menuItemPressed: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
});
