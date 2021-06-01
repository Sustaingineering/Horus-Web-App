import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import { Container, Section } from "../Components/Basics";
import bg from "../assets/images/bg.jpg";

class Home extends PureComponent {
  componentDidMount = () => {
    this.props.setPath("home");
  }
  render() {
    const user = this.props.firebase.auth().currentUser.displayName;
    return (
      <Container>
        <Section text={user === null ? "Welcome!" : "Welcome, " + user + "!"} subText="Updates will show up here" />
        <div className="mt-10 grid grid-cols-1 gap-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {user === null ? (
              <div className="card bg-white rounded-lg">
                <div className="card-body">
                  <p className="card-title">Set your name!</p>
                  <p>
                    Visit <Link to="/config">config</Link> to set your name.
                  </p>
                </div>
              </div>
            ) : undefined}
            {this.props.posts.map((post) => (
              <div className="card bg-white rounded-lg" key={post.title}>
                <div className="card-body">
                  <p className="card-title">{post.title}</p>
                  <p dangerouslySetInnerHTML={{ __html: post.text }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    );
  }
}

export default Home;
