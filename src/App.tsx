import React, {useEffect, useState} from 'react';
import axios from 'axios';

function App() {
    const [title, setTitle] = useState('');
    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/posts/1',{headers:{}}).then(res => {
            console.log(res);
            setTitle(res.data.title);
        })
    });
    return (
        <div className="App">
            {title}
        </div>
    );
}

export default App;
