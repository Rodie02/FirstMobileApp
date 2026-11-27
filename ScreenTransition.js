// ==============================================================
// FILE: ScreenTransition.js
// WHAT:  Reusable animation. Every screen fades in and slides up a little
//        each time it becomes the visible screen.
//
// HOW IT WORKS (lifecycle + animation):
//   - Animated.Value holds the current opacity / position (not React state,
//     so animating does not re-render the screen on every frame).
//   - useIsFocused() is true while this screen is the one being shown.
//   - useEffect([isFocused]) runs when the screen gains focus ->
//     reset the values -> Animated.timing() plays the animation.
//   - Tabs stay mounted, so "focus" (not "mount") is what replays it.
//
// USED BY: App.js wraps each screen with withTransition().
// SEARCH (Ctrl+F):  [LOGIC]  [UI]
// ==============================================================

import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { USE_NATIVE_DRIVER } from "./helpers";

export default function ScreenTransition({ children }) {
  // [STATE] animated values (start invisible and 24px lower)
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(24)).current;
  const isFocused = useIsFocused();

  // [LOGIC] play the animation every time this screen becomes focused
  useEffect(() => {
    if (!isFocused) return;

    opacity.setValue(0);
    translateY.setValue(24);

    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 320,
        useNativeDriver: USE_NATIVE_DRIVER,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 320,
        useNativeDriver: USE_NATIVE_DRIVER,
      }),
    ]).start();
  }, [isFocused]);

  // [UI] wrapper that applies the animated style to the whole screen
  return (
    <Animated.View
      style={{ flex: 1, opacity, transform: [{ translateY }] }}
    >
      {children}
    </Animated.View>
  );
}
