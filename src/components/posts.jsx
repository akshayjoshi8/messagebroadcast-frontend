import React from 'react'
import {Link} from 'react-router-dom'
import { fetchPosts } from './../utils/api.js';


export class Posts extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            page: 1,
            posts: [],
            error: null,
            loading: true,
        }
    }

    componentDidMount(){
        this.getPosts();
    }

    componentDidUpdate(prevProps, prevState){
        if(this.state.page !== prevState.page){
            this.getPosts()
        }
    }

    getPosts = ()=>{
        this.setState({loading: true})
        fetchPosts(this.state.page)
        .then(data=>{
            this.setState({
                    posts: data || [],
                    loading: false,
                    error: null
            })
        }).catch(err=>{
            this.setState({
                error: "Some error occoured, please try again!",
                posts: [],
                loading: false,
            })
        })
    }

    render(){
        let {posts, page, error, loading} = this.state;
        if(error) return <div className="container"> <div className="message">{error}</div> <div> <Link to='/' >Back</Link> </div> </div>;
        if(loading) return <div className="container"> <div  className="message">Loading...</div> <div> <Link to='/' >Back</Link> </div> </div>;
        if(!posts.length) return <div className="container" >  <div  className="message"> 0 posts found!</div> <div> <Link to='/' > Back </Link> </div> </div>

        return(
            <div className="container">
                <div>
                    <button><Link to='/' >Back</Link></button>
                    <button onClick={()=>{this.setState({page: 1})}}> Refresh </button>
                    
                    <h2>Posts</h2> 
                </div>
                <div>
                    <table>
                        <thead>
                            <tr>
                                { Object.keys(posts[0]).map(col=> <th key={col}>{col}</th>) }    
                            </tr>
                        </thead>
                        <tbody>
                        {
                            posts.map(post=>{
                                return (
                                    <tr key={post.id}>
                                        {Object.values(post).map((col, index)=> <td key={index}>{col}</td> )}
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                    <div>
                        <button
                            disabled={!this.state.posts}
                            onClick={()=>{ this.setState({page: this.state.page+1})} }
                        > NEXT PAGE
                        </button>
                        <button
                            disabled={this.state.page < 2}
                            onClick={()=>{ this.setState({page: this.state.page-1}) }}
                        > PREVIOUS PAGE
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}


export default Posts;