import React, { Fragment, PureComponent } from "react";
import { Link } from "react-router-dom";
import { withStyles, CardMedia } from "@material-ui/core";
import { Typography, Grid, Card, CardContent } from "@material-ui/core";
import logos from "../../assets/images/logos.png";
import styles from "./homeStyle";
import bg from "../../assets/images/bg.jpg";

class Home extends PureComponent {
  render() {
    const { classes } = this.props;
    const user = this.props.firebase.auth().currentUser.displayName;
    return (
      <Fragment>
        <div className={classes.root}>
          <Grid container className={classes.mainFeaturedPost}>
            <Grid item>
              <Card className={classes.card}>
                <CardMedia image={bg} className={classes.cardMedia} />
                <CardContent>
                  <Typography
                    component="h1"
                    variant="h5"
                    className={classes.postTitle}
                  >
                    {user === null ? "Welcome!" : "Welcome, " + user + "!"}
                  </Typography>
                  <Typography
                    className={classes.postText}
                    variant="subtitle1"
                    color="inherit"
                    paragraph
                  >
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
          <Grid container spacing={4}>
            {user === null ? (
              <Grid item key={"no-user-auth"} xs={12} md={6}>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography variant="h6" className={classes.postTitle}>
                      Set your name!
                    </Typography>
                    <Typography
                      className={classes.postText}
                      variant="subtitle1"
                      color="inherit"
                    >
                      Visit <Link to="/config">config</Link> to set your name.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ) : (
              undefined
            )}
            {this.props.posts.map(post => (
              <Grid item key={post.title} xs={12} md={6}>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography variant="h6" className={classes.postTitle}>
                      {post.title}
                    </Typography>
                    <Typography
                      className={classes.postText}
                      variant="subtitle1"
                      color="inherit"
                      dangerouslySetInnerHTML={{ __html: post.text }}
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
        <footer className={classes.footer}>
          <img className={classes.logos} src={logos} alt="logos" />
        </footer>
      </Fragment>
    );
  }
}

export default withStyles(styles)(Home);
