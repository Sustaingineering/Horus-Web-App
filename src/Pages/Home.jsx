import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import { Container } from "../Components/Basics";
import bg from "../assets/images/bg.jpg";

class Home extends PureComponent {
  render() {
    const user = this.props.firebase.auth().currentUser.displayName;
    return (
      <Container>
        <div className="grid grid-cols-1 gap-6 max-w-6xl">
          <div className="card image-full max-h-80">
            <figure>
              <img src={bg} />
            </figure>
            <div className="card-body">
              <p className="card-title">
                {user === null ? "Welcome!" : "Welcome, " + user + "!"}
              </p>
              <p>
                Sustaingineering is a student engineering design team that
                designs, develops and deploys sustainable technology solutions
                for renewable energy applications in remote and developing
                communities. Our goal is to create power solutions to address
                the global challenge of climate change and to improve the
                quality of life of the people living in these communities.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {user === null ? (
              <div className="card">
                <div className="card-body">
                  <p className="card-title">Set your name!</p>
                  <p>
                    Visit <Link to="/config">config</Link> to set your name.
                  </p>
                </div>
              </div>
            ) : undefined}
            {this.props.posts.map((post) => (
              <div className="card" key={post.title}>
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
