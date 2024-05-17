import React from "react";

export type OptionControlProps = {
    value: number;
    name: string;
    onInput?: (event: React.FormEvent<HTMLInputElement>) => void;
};

export function OptionControl(props: OptionControlProps) {
    const {name, value, onInput} = props;
    return (
        <div className="text-left">
            <div className="flex justify-between items-center">
                <label>{name[0].toUpperCase() + name.slice(1)}</label>
                <input
                    name={name}
                    value={value}
                    className="w-12 border border-[#877a72] rounded px-1 text-sm"
                    type="number"
                    min={0}
                    max={100}
                    onInput={onInput}
                />
            </div>
            <input type="range" name={name} value={value} onInput={onInput}/>
        </div>
    );
}
