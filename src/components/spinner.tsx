
// styles are in app.scss

import { useEffect, useState } from "react";

interface SpinnerProps {
    size?: 'small' | 'large'
}

function Spinner({ size = 'small' }: SpinnerProps) {
    const [height, setHeight] = useState<number>(32);

    useEffect(() => {
        if (size === "small") {
            setHeight(32)
        } else if (size === "large") {
            setHeight(48)
        }
    }, [size]);

    return (
        <div className="spinner" style={{ width: height + 'px', height: height + 'px' }}></div>
    )
}

export default Spinner