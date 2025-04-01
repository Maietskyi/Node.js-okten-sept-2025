import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // axios.get();
    }, []);
    return (
        <div>
            App
        </div>
    );
};

export { App };