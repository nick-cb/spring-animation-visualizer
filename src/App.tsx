import {spring} from "./spring";
import {useMotionValue} from "framer-motion";
import React, {useEffect, useMemo, useReducer, useRef, useState} from "react";
import {Chart} from "./components/Chart.tsx";
import {AnimatedSliderBall} from "./components/AnimatedSliderBall.tsx";
import {OptionControl} from "./components/OptionControl.tsx";
import {Menu} from "./components/Menu.tsx";

export default function App() {
  const [count, setCount] = useState(0);
  const [options, setOptions] = useReducer(
    (prev: any, curr: any) => {
      return {
        ...prev,
        ...curr,
      };
    },
    { type: "spring", stiffness: 100, damping: 10, mass: 1 },
  );
  const [showRealValue, setShowRealValue] = useState(false);
  const [realValues, setRealValues] = useState<number[]>([]);
  const valueRef = useRef<number[]>([]);
  const val = useMotionValue(0);

  const estimateValues = useMemo(() => {
    const s = spring({
      keyframes: [0, 100],
      ...options,
    });

    const arr = [];
    let b = false;
    let index = 0;
    do {
      index = index + 1;
      const { done, value } = s.next(index);
      b = done;
      arr.push(value);
    } while (!b);
    return arr;
  }, [options]);

  useEffect(() => {
    valueRef.current = [];
    val.on("change", (latest) => {
      valueRef.current.push(latest);
    });
  }, [val, showRealValue, count]);

  function onInput(event: React.FormEvent<HTMLInputElement>) {
    const name = event.currentTarget.name;
    setCount((prev) => prev + 1);
    setOptions({
      [name]: parseInt(event.currentTarget.value),
    });
  }

  return (
    <div className="App">
      <div className="fixed right-8 top-8">
        <Menu>
          <div className="hidden peer-has-[:checked]:block w-40 h-48 absolute right-0 rounded border border-[#877a72] shadow-md shadow-[#877a72]/70 p-4 accent-[#877a72] text-stone-700">
            <OptionControl
              name="stiffness"
              value={options["stiffness"]}
              onInput={onInput}
            />
            <OptionControl
              name="damping"
              value={options["damping"]}
              onInput={onInput}
            />
            <OptionControl
              name="mass"
              value={options["mass"]}
              onInput={onInput}
            />
          </div>
        </Menu>
      </div>
      <label>
        Show real value
        <input
          type="checkbox"
          onChange={() => {
            setShowRealValue(!showRealValue);
          }}
        />
      </label>

      <div style={{ display: "flex", gap: 8 }} className="flex-wrap">
        <Chart values={estimateValues} />
        {showRealValue ? <Chart values={realValues} /> : null}
      </div>
      <AnimatedSliderBall
        key={count}
        value={val}
        options={options}
        onAnimationComplete={() => {
          setRealValues(valueRef.current);
        }}
      />
    </div>
  );
}

