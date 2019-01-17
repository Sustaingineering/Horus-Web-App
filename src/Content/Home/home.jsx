import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Typography, Grid, Card, CardContent } from '@material-ui/core';
import styles from './homeStyle';
// Logos
import logos from '../../assets/images/logos.png';

const featuredPosts = [
  {
    title: 'About Us',
    link: 'sustaingineering.com',
    description:
      'We want to power change by creating sustainable solutions that help and impact our global community.'
  },
  {
    title: 'Contact',
    link: 'sustaingineering@gmail.com',
    description: 'For general inquiries, please reach out by email.'
  }
]

function Home(props) {
  const { classes } = props

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
                  We design, develop and deploy sustainable technology.
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
        <Grid container spacing={40} className={classes.cardGrid}>
          {featuredPosts.map(post => (
            <Grid item key={post.title} xs={12} md={6}>
              <Card className={classes.card}>
                <div className={classes.cardDetails}>
                  <CardContent>
                    <h2 className={classes.postText}>{post.title}</h2>
                    <h3 className={classes.postLink}>{post.link}</h3>
                    <h4 className={classes.postText}>{post.description}</h4>
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

Home.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Home)
