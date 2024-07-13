import React from 'react';
import Button from "./components/Button";
import Menu from "./components/Menu";
import MenuItem from "./components/Menu/menuItem";
import SubMenu from "./components/Menu/subMenu";

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
                <Menu defaultIndex='2' mode='vertical'>
                    <MenuItem>
                        one
                    </MenuItem>
                    <SubMenu title='dropdown'>
                        <MenuItem>123</MenuItem>
                        <MenuItem>234</MenuItem>
                    </SubMenu>
                    <MenuItem>
                        two
                    </MenuItem>
                    <MenuItem disabled={true}>
                        three
                    </MenuItem>
                </Menu>
                <Menu mode='vertical'>
                    <MenuItem disabled={true}>
                        one
                    </MenuItem>
                    <MenuItem>
                        two
                    </MenuItem>
                    <MenuItem>
                        three
                    </MenuItem>
                </Menu>
            </header>
        </div>
    );
}

export default App;
