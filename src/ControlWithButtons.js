// ControlWithButtons.js
import React, { useRef, useCallback, useState, useEffect } from "react";

const ControlWithButtons = ({
  label,
  value,
  min,
  max,
  step,
  onChange,
  unit = "",
  initialDirection = 0,
  wrapAround = false,
  continuous = true,
}) => {
  const animationRef = useRef(null);
  const directionRef = useRef(0);
  const valueRef = useRef(value);
  const [isChanging, setIsChanging] = useState(0);

  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  const updateValue = useCallback(() => {
    if (directionRef.current === 0) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      return;
    }
    let newValue = valueRef.current + directionRef.current * step;

    if (wrapAround) {
      if (newValue > max) {
        newValue = min;
      } else if (newValue < min) {
        newValue = max;
      }
    } else {
      newValue = Math.max(min, Math.min(max, newValue));
    }

    valueRef.current = newValue;
    onChange(newValue);
    animationRef.current = requestAnimationFrame(updateValue);
  }, [step, min, max, wrapAround, onChange]);

  // Start changing on mount if initialDirection is set
  useEffect(() => {
    if (initialDirection !== 0 && continuous) {
      directionRef.current = initialDirection;
      setIsChanging(initialDirection);
      if (!animationRef.current) {
        animationRef.current = requestAnimationFrame(updateValue);
      }
    }
    // Cleanup on unmount
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [initialDirection, continuous, updateValue]);

  const toggleChanging = useCallback(
    (direction) => {
      if (continuous) {
        if (directionRef.current === direction) {
          // Stop changing
          directionRef.current = 0;
          setIsChanging(0);
          if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
            animationRef.current = null;
          }
        } else {
          // Start changing in the new direction
          directionRef.current = direction;
          setIsChanging(direction);
          if (!animationRef.current) {
            animationRef.current = requestAnimationFrame(updateValue);
          }
        }
      } else {
        // Single step increment/decrement
        let newValue = valueRef.current + direction * step;

        if (wrapAround) {
          if (newValue > max) {
            newValue = min;
          } else if (newValue < min) {
            newValue = max;
          }
        } else {
          newValue = Math.max(min, Math.min(max, newValue));
        }

        valueRef.current = newValue;
        onChange(newValue);
      }
    },
    [continuous, step, min, max, wrapAround, onChange, updateValue]
  );

  return (
    <div className="control-group">
      <label className="control-label">
        {label}: {value}
        {unit}
      </label>
      <div className="control-wrapper">
        {/* Backward Button */}
        <button
          className={`control-button ${isChanging === -1 ? "active" : ""}`}
          onClick={() => toggleChanging(-1)}
          aria-label={`Decrease ${label}`}
        >
          {continuous ? (isChanging === -1 ? "⏸" : "◀") : "–"}
        </button>

        {/* Slider */}
        <input
          type="range"
          className="control-slider"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
        />

        {/* Forward Button */}
        <button
          className={`control-button ${isChanging === 1 ? "active" : ""}`}
          onClick={() => toggleChanging(1)}
          aria-label={`Increase ${label}`}
        >
          {continuous ? (isChanging === 1 ? "⏸" : "▶") : "+"}
        </button>
      </div>
    </div>
  );
};

export default ControlWithButtons;
