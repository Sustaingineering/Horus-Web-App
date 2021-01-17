import React, { Fragment, PureComponent } from "react";
import { Link } from "react-router-dom";
import { CardMedia } from "@material-ui/core";
import { Typography, Grid, Card, CardContent } from "@material-ui/core";
import logos from "../../assets/images/logos.png";
import bg from "../../assets/images/bg.jpg";

class Home extends PureComponent {
  render() {
    const user = this.props.firebase.auth().currentUser.displayName;
    return (
      <Grid container spacing={6}>
        <Grid item>
          <Grid container>
            <Grid item>
              <Card>
                <CardMedia image={bg} />
                <CardContent>
                  <Typography component="h1" variant="h5">
                    {user === null ? "Welcome!" : "Welcome, " + user + "!"}
                  </Typography>
                  <Typography variant="subtitle1" color="inherit" paragraph>
                    Sustaingineering is a student engineering design team that
                    designs, develops and deploys sustainable technology
                    solutions for renewable energy applications in remote and
                    developing communities. Our goal is to create power
                    solutions to address the global challenge of climate change
                    and to improve the quality of life of the people living in
                    these communities.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container spacing={4}>
            {user === null ? (
              <Grid item key={"no-user-auth"} xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Set your name!</Typography>
                    <Typography variant="subtitle1" color="inherit">
                      Visit <Link to="/config">config</Link> to set your name.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ) : undefined}
            {this.props.posts.map((post) => (
              <Grid item key={post.title} xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{post.title}</Typography>
                    <Typography
                      variant="subtitle1"
                      color="inherit"
                      dangerouslySetInnerHTML={{ __html: post.text }}
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item>
          <footer>
            <img src={logos} alt="logos" />
          </footer>
        </Grid>
      </Grid>
    );
  }
}

export default Home;
