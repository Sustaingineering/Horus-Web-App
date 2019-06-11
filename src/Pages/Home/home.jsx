import React, { Fragment, Component } from 'react';
import { Link } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import { Paper, Typography, Grid, Card, CardContent, IconButton } from '@material-ui/core';
import styles from './homeStyle';
// Logos
import logos from '../../assets/images/logos.png';
import RefreshIcon from "@material-ui/icons/Refresh";
import classNames from "classnames";

class Home extends Component {
  render() {
    console.log("Home rendering");
    const { classes } = this.props;
    const user = this.props.firebase.auth().currentUser.displayName;
    return (
      <Fragment>
        <div className={classes.layout}>
          <Paper className={classes.mainFeaturedPost}>
            <Grid container>
              <Grid item md={6}>
                <div className={classes.mainFeaturedPostContent}>
                  <Typography
                    component='h1'
                    variant='h4'
                    color='inherit'
                    gutterBottom
                  >
                    {user === null ? "Welcome!" : "Welcome, " + user + "!"}
                  </Typography>
                  <Typography variant='subtitle1' color='inherit' paragraph>
                    Sustaingineering is a student engineering design team that
                    designs, develops and deploys sustainable technology solutions
                    for renewable energy applications in remote and developing
                    communities. Our goal is to create power solutions to address
                    the global challenge of climate change and to improve the
                    quality of life of the people living in these communities.
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </Paper>
          <IconButton
            color="inherit"
            aria-label="refresh"
            onClick={this.props.refreshPosts}
            className={classNames(classes.card, classes.menuButton)}
          >
            <RefreshIcon />
          </IconButton>
          <Grid container spacing={40} className={classes.cardGrid}>
            {user === null ?
              <Grid item key={"no-user-auth"} xs={12} md={6}>
              <Card className={classes.card}>
                <div className={classes.cardDetails}>
                  <CardContent>
                    <h2 className={classes.postTitle}>Set your name!</h2>
                    <div 
                      className={classes.postText} 
                      variant='subtitle1' 
                      color='inherit' 
                    >Visit <Link to="/config">config</Link> to set your name.</div>
                  </CardContent>
                </div>
              </Card>
            </Grid> : undefined}
            {this.props.posts.map(post => (
              <Grid item key={post.title} xs={12} md={6}>
                <Card className={classes.card}>
                  <div className={classes.cardDetails}>
                    <CardContent>
                      <h2 className={classes.postTitle}>{post.title}</h2>
                      <div className={classes.postText} variant='subtitle1' color='inherit' dangerouslySetInnerHTML={{__html: post.text}}></div>
                    </CardContent>
                  </div>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
        <footer className={classes.footer}>
          <img className={classes.logos} src={logos} alt='logos' />
        </footer>
      </Fragment>
    )
  }
}

export default withStyles(styles)(Home);
