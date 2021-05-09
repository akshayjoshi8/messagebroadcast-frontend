import './App.css';
import React from 'react';
import Posts from './components/posts';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';

function Home(){
    return (
            <div className="container">
                <div> 
                    <h1>Akshay Joshi</h1>
                </div>
                <div>
                    <p>
                        <Link to='/posts'>Posts</Link>
                    </p>
                </div>
            </div>
    )
}

export class App extends React.Component{
	render(){
		return (
            <Router>
                <div>
                    <Link to='/posts'></Link>
                </div>
                <Route exact path='/' component={Home} />
                <Route exact path='/posts' component={Posts} />
            </Router>            
		)
	}
}

export default App;