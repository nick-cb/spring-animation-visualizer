import {memo, useEffect, useMemo, useRef, useState} from "react";
import {Line, LineChart, YAxis} from "recharts";
import {getSvgValues, ramerDouglasPeucker} from "../utils/ramer-douglas.ts";

type ChartProps = {
  values: number[];
};
export const Chart = memo(function (props: ChartProps) {
  const { values } = props;
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerDimension, setContainerDimension] = useState({
    width: 0,
    height: 0,
  });
  const { width: containerWidth, height: containerHeight } = containerDimension;

  const { points } = useMemo(() => {
    if (!values.length || !containerWidth || !containerHeight) {
      return {
        d: 0,
        points: [] as Array<[number, number]>,
        yFrom: 0,
        yTo: 0,
      };
    }
    return getSvgValues({
      values,
      maxValue,
      minValue,
      containerWidth,
      containerHeight,
    });
  }, [values, minValue, maxValue, containerWidth, containerHeight]);
  const data = useMemo(() => {
    const ps = points.map(([x, y]) => {
      return { x, y };
    });
    if (ps.length === 0) {
      return ps;
    }
    function scale(x: number) {
      if (x <= 10000) return 0;
      return 0.5 / points.length;
    }
    return ramerDouglasPeucker(points, scale(points.length)).map(([x, y]) => ({
      x,
      y,
    }));
  }, [points]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }
    const containerRec = container.getBoundingClientRect();
    const containerWidth = containerRec.width;
    const containerHeight = containerRec.height;
    setContainerDimension({
      width: containerWidth,
      height: containerHeight,
    });
  }, []);

  return (
    <div ref={containerRef} style={{ width: 400, height: 400 }}>
      <LineChart width={containerWidth} height={containerHeight} data={data}>
        {/* <CartesianGrid stroke="#ccc" /> */}
        {/* <XAxis dataKey="x" /> */}
        <YAxis />
        <Line type={'monotone'} dataKey="y" dot={false} stroke="#877a72" />
      </LineChart>
    </div>
  );
});

