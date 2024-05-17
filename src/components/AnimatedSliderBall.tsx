import {motion} from "framer-motion";

export type AnimationBallProps = {
    value: any;
    options: any;
    onAnimationComplete: () => void;
};

export function AnimatedSliderBall(props: AnimationBallProps) {
    const {value, options, onAnimationComplete} = props;
    return (
        <div className="flex justify-center my-5">
            <div className="relative">
                <div
                    style={{
                        width: 130,
                        height: 4,
                        backgroundColor: "#ccc",
                        borderRadius: 4,
                        position: "absolute",
                        top: "50%",
                        transform: "translateY(-50%)",
                    }}
                />
                <motion.div
                    style={{
                        x: value,
                        width: 30,
                        height: 30,
                        backgroundColor: "#877a72",
                        borderRadius: 50,
                        position: "relative",
                    }}
                    initial={{x: 0}}
                    animate={{x: 100}}
                    transition={options}
                    onAnimationComplete={onAnimationComplete}
                ></motion.div>
            </div>
        </div>
    );
}
