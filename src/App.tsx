import React from 'react';
import Button from "./components/Button";
import Alert from "./components/Alert";
import Menu from "./components/Menu";
import MenuItem from "./components/Menu/menuItem";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Hello World</h1>
                <h2>Hello World</h2>
                <h3>Hello World</h3>
                <h4>Hello World</h4>
                <h5>Hello World</h5>
                <h6>Hello World</h6>
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <hr></hr>
                <code>
                    const a = 'b'
                </code>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
                <hr/>
                <Button disabled size='lg' className='custom'>Hello</Button>
                <Button btnType='danger' size='sm'>111</Button>
                <Button btnType='default' size='lg'>Hello</Button>
                <Button btnType='primary'>Hello</Button>
                <Button btnType='link' href='http://www.baidu.com' size='sm' onClick={(e) => {
                    e.preventDefault();
                    alert(1)
                }}>Hello</Button>
                <hr/>
                <Menu defaultIndex={2}>
                    <MenuItem index={0}>
                        one
                    </MenuItem>
                    <MenuItem index={1}>
                        two
                    </MenuItem>
                    <MenuItem index={2} disabled={true}>
                        three
                    </MenuItem>
                </Menu>
                <Menu mode='vertical'>
                    <MenuItem index={0} disabled={true}>
                        one
                    </MenuItem>
                    <MenuItem index={1}>
                        two
                    </MenuItem>
                    <MenuItem index={2}>
                        three
                    </MenuItem>
                </Menu>
            </header>
        </div>
    );
}

export default App;
