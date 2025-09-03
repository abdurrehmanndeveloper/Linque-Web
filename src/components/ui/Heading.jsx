// components/Heading.jsx
"use client";

import React from "react";

export default function Heading({ text, lineHeight = "34px", className = "" }) {
  return (
    <h3
      className={`font-semibold text-center ${className}`}
      style={{ lineHeight: lineHeight }}
    >
      {text}
    </h3>
  );
}
