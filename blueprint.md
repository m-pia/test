# Blueprint

## Overview

This project is a collection of demos for various web technologies, including TensorFlow.js, ROS, React, and Tailwind CSS. The goal is to provide a hands-on learning experience for developers interested in these technologies.

## Implemented Features

### Design & Style
- Modern, dark theme using Tailwind CSS.
- Responsive layout for mobile and web.
- Interactive cards for demo selection.
- Consistent header and navigation.

### TensorFlow.js Demos
- **Simple Model:** Demonstrates a simple linear regression model running in the browser.
- **Image Classification:** Classifies images using the `MobileNet` model.
- **Object Detection:** Detects objects in an image using the `COCO-SSD` model.
- **Question & Answer:** Answers questions based on a context using the `MobileBERT` model.

### ROS Demos
- **Topic Viewer:** Shows how to view ROS topics in real-time.

### React Demos
- **useOptimistic Hook:** An example of using the `useOptimistic` hook from React 19.

### Tailwind CSS Demos
- **JIT Engine:** A demonstration of the new JIT engine in Tailwind CSS v4.

## Current Plan: Fix Module Not Found Errors

The current plan is to fix the module not found errors for `three` and `FaceMesh`.

### Steps
1.  **Install `three.js`:** Install the `three` and `@types/three` packages.
2.  **Remove `face-landmarks-detection`:** Remove the `@tensorflow-models/face-landmarks-detection` package to resolve version conflicts.
3.  **Delete Face Detection Demo:** Delete the `face-detection` demo page.
4.  **Update Demo List:** Remove the '안면 탐지' demo from the demo list.
5.  **Update `blueprint.md`:** Document the changes in the blueprint.
6.  **Run `npm install`:** Apply the changes by running `npm install`.
