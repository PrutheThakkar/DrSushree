import React from "react"
import "../css/underwater-banner.css"

const UnderwaterBanner = () => (
  <div className="underwater-banner__effects" aria-hidden="true">
    <svg className="underwater-banner__filters" width="0" height="0">
      <defs>
        <filter
          id="homepage-water-current"
          x="-5%"
          y="-5%"
          width="110%"
          height="110%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.008 0.018"
            numOctaves="1"
            seed="7"
            result="current"
          >
            <animate
              attributeName="baseFrequency"
              values="0.008 0.018;0.011 0.022;0.008 0.018"
              dur="10s"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="current"
            scale="12"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
    <div className="underwater-banner__light" />
    {Array.from({ length: 10 }, (_, index) => (
      <span
        className="underwater-banner__bubble"
        key={index}
        style={{
          "--bubble-left": `${6 + ((index * 29) % 89)}%`,
          "--bubble-size": `${14 + ((index * 7) % 28)}px`,
          "--bubble-duration": `${12 + (index % 5) * 2}s`,
          "--bubble-delay": `${-index * 3.7}s`,
        }}
      />
    ))}
  </div>
)

export default UnderwaterBanner
