import { useState } from "react";

function Foo() {
    const [bar, setBar] = useState(2);

    console.log(bar);

    return (
        <div onClick={() => setBar(bar+1)}>
            {bar}
        </div>
    );
}

export default Foo;