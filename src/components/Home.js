import { Typography, Container, makeStyles } from "@material-ui/core";

const Home = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
    // btn: {
    //   fontSize: 20,
    //   backgroundColor: "#E2725A",
    //   "&:hover": {
    //     backgroundColor: "#94ACBF",
    //   },
    title: {
      marginTop: 20,

      color: "#110303",
      fontSize: 40,
    },
    subTitle: {
      color: "#110303",
      fontSize: 30,
    },
    // textField: {
    //   color: "white",
    //   backgroundColor: "white",
    // },
    // form: {
    //   display: "flex",
    //   justifyContent: "center",
    //   alignItems: "center",
    //   height: "30vh",
    // },
  }));
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <Container>
          <Typography
            className={classes.title}
            variant='h6'
            color='secondary'
            component='h2'
            align='center'
            gutterBottom>
            Welcome to Fitness Trackr!
          </Typography>
        </Container>
      </div>
    </>
  );
};

export default Home;