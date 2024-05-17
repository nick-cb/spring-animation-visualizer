import React from "react";

export function Menu(props: React.PropsWithChildren) {
    const {children} = props;
    return (
        <div className="fixed right-8 top-8">
            <label
                className="peer rounded px-2 py-1 border border-[#877a72] shadow shadow-[#877a72] w-12 h-10 grid place-items-center active:scale-95 transition-[transform,_shadow] duration-75 has-[:checked]:scale-95 has-[:checked]:shadow-inner">
                <div className="w-8 h-[2px] bg-[#877a72] my-1"></div>
                <div className="w-8 h-[2px] bg-[#877a72] my-1"></div>
                <div className="w-8 h-[2px] bg-[#877a72] my-1"></div>
                <input
                    type="checkbox"
                    className="absolute w-full h-full inset-0 hidden"
                />
            </label>
            {children}
        </div>
    );
}
