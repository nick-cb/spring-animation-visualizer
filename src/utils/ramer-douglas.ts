export type GetSvgValuesParams = {
    values: number[];
    containerHeight: number;
    containerWidth: number;
    minValue: number;
    maxValue: number;
};

export function getSvgValues({
                                 values,
                                 containerHeight,
                                 containerWidth,
                                 minValue,
                                 maxValue,
                             }: GetSvgValuesParams) {
    const points: Array<[number, number]> = values.map((y, i) => [
        (i / (values.length - 1)) * containerWidth,
        mapValueToYCoord(y),
    ]);

    return {
        points,
        yTo: mapValueToYCoord(1),
        yFrom: mapValueToYCoord(0),
    };

    function mapValueToYCoord(value: number) {
        return (
            containerHeight -
            mapValueFromRangeToRange({
                value,
                from: {min: minValue, max: maxValue},
                to: {min: containerHeight * 0.2, max: containerHeight * 0.8},
            })
        );
    }
}

export type MapValueFromRangeToRangeParams = {
    value: number;
    from: { min: number; max: number };
    to: { min: number; max: number };
};

export function mapValueFromRangeToRange({
                                             value,
                                             from,
                                             to,
                                         }: MapValueFromRangeToRangeParams) {
    return (
        ((value - from.min) / (from.max - from.min)) * (to.max - to.min) + to.min
    );
}

export function distanceFromPointToLine(
    point: [number, number],
    lineStart: [number, number],
    lineEnd: [number, number],
) {
    const [x, y] = point;
    const [x1, y1] = lineStart;
    const [x2, y2] = lineEnd;

    const numerator = Math.abs((y2 - y1) * x - (x2 - x1) * y + x2 * y1 - y2 * x1);
    const denominator = Math.sqrt(Math.pow(y2 - y1, 2) + Math.pow(x2 - x1, 2));

    // Scale the distance by the distance between the points that form the line
    const scale = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

    return (numerator / denominator) * scale;
}

export function ramerDouglasPeucker(
    points: Array<[number, number]>,
    epsilon: number,
): Array<[number, number]> {
    const end = points.length - 1;
    let index = -1;
    let dist = 0;

    for (let i = 1; i < end; i++) {
        const d = distanceFromPointToLine(points[i], points[0], points[end]);
        if (d > dist) {
            index = i;
            dist = d;
        }
    }

    if (dist > epsilon) {
        const left = points.slice(0, index + 1);
        const right = points.slice(index);
        return [
            ...ramerDouglasPeucker(left, epsilon),
            ...ramerDouglasPeucker(right, epsilon).slice(1),
        ];
    } else {
        return [points[0], points[end]];
    }
}
