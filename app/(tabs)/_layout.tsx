import { NativeTabs, Icon, Label } from "expo-router/unstable-native-tabs";
import React from "react";

export default function TabLayout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="home">
        <Label>Home</Label>
        <Icon sf="house.fill" drawable="custom_android_drawable" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="library">
        <Label>Library</Label>
        <Icon sf="book.fill" drawable="custom_android_drawable" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="setlist">
        <Label>Setlist</Label>
        <Icon sf="list.bullet" drawable="custom_android_drawable" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
