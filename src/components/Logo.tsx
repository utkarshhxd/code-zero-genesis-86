
import React from "react";

/**
 * Logo component displaying the uploaded logo.
 * The logo image is contained with rounded and subtle drop shadow for premium feel.
 */
const Logo = ({ size = 40 }: { size?: number }) => (
  <div
    className="flex items-center justify-center logo-3d"
    style={{
      width: size,
      height: size,
      borderRadius: "12px",
      overflow: "hidden",
      boxShadow: "0 2px 12px 0 #2227, 0 0.5px 1.5px #0004",
      background: "linear-gradient(135deg, #bdc3c7 0%, #2c3e50 100%)"
    }}
  >
    <img
      src="/lovable-uploads/0e7cda36-5e66-41b0-916b-9e35fcff2d30"
      alt="Logo"
      width={size}
      height={size}
      style={{ objectFit: "cover", width: "100%", height: "100%" }}
      draggable={false}
    />
  </div>
);

export default Logo;
