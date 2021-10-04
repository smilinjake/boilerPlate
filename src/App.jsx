import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import '@fontsource/roboto/300.css';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import StarIcon from '@mui/icons-material/Star';
import CircleSharpIcon from '@mui/icons-material/CircleSharp';
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';
import NearMeSharpIcon from '@mui/icons-material/NearMeSharp';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import MoodIcon from '@mui/icons-material/Mood';
// import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
// import HourglassFullSharpIcon from '@mui/icons-material/HourglassFullSharp';
// import DangerousSharpIcon from '@mui/icons-material/DangerousSharp';
// import Crop75SharpIcon from '@mui/icons-material/Crop75Sharp';

const useStyles = makeStyles((theme) => ({
  outerBoard: {
    width: "100%",
    height: "100%",
    justifyContent: 'center'
  },
  board: {
    width: "700px",
    height: "700px",
  },
  red: {
    color: "#FF0000"
  },
  pink: {
    color: "#FFC0CB"
  },
  darkorange: {
    color: "#FF8C00"
  },
  gold: {
    color: "#FFD700"
  },
  plum: {
    color: "#DDA0DD"
  },
  purple: {
    color: "#800080"
  },
  lime: {
    color: "#00FF00"
  },
  button: {
    width: "100px",
    height: "50px",
    margin: "10px"
  },
  text: {
    justifyContent: "center",
  },
  stack: {
    justifyContent: "center",
    marginTop: "30px"
  },
  icon: {
    length: "500px",
    width: "500px",
    alignItems: "center"
  }
}));
const App = () => {
  const classes = useStyles();
  const [answered, setAnswered] = useState(1);
  const [displayCorrect, setDisplayCorrect] = useState(1);
  const [displayIncorrect, setDisplayIncorrect] = useState(1);
  const [tryAgain, setTryAgain] = useState(false);
  let colors = [classes.gold, classes.purple, classes.lime];
  let board = [];
  let pieces = {};

  // Functions for selecting random colors and shapes
  let buildColors = () => {
    return colors[Math.floor(Math.random() * (3 - 0) + 0)];
  };

  let buildShapes = () => {
    return Math.floor(Math.random() * (5 - 0) + 0);
  };

  // Populating the board with colors and shapes
  for (let i = 0; i < 16; i++) {
    let color = buildColors();
    let shape = buildShapes();
    let shapesArray = [
      <CropSquareIcon className={color} style={{ fontSize: "175px" }} key={i} />,
      <StarIcon className={color} style={{ fontSize: "175px" }} key={i} />,
      <CircleSharpIcon className={color} style={{ fontSize: "175px" }} key={i} />,
      <FavoriteSharpIcon className={color} style={{ fontSize: "175px" }} key={i} />,
      // <ChangeHistoryIcon className={color} style={{ fontSize: "175px" }} key={i} />,
      // <HourglassFullSharpIcon className={color} style={{ fontSize: "175px" }} key={i} />,
      // <DangerousSharpIcon className={color} style={{ fontSize: "175px" }} key={i} />,
      // <Crop75SharpIcon className={color} style={{ fontSize: "175px" }} key={i} />,
      <NearMeSharpIcon className={color} style={{ fontSize: "175px" }} key={i} />];

    board.push(shapesArray[shape]);

    // Populating an object that counts Colors and Shapes
    if (pieces[shape + color[color.length - 1]]) {
      pieces[shape + color[color.length - 1]]++
    } else {
      pieces[shape + color[color.length - 1]] = 1
    }
  }

  // Handling the submission of Yes or No and Try Again
  const handleSubmit = (submission) => {
    let yes = false;
    for (let piece in pieces) {
      if (pieces[piece] === 4) {
        yes = true;
      }
    }
    if (submission === yes) {
      setDisplayCorrect(displayCorrect + 1);
    } else {
      setDisplayIncorrect(displayIncorrect + 1);
    }
  }

  const handleTryAgain = () => {
    setTryAgain(true)
  }

  // Handling conditional rendering using state
  useEffect(() => {
    if (displayCorrect % 2 === 0) {
      setDisplayCorrect(displayCorrect + 1);
    } else if (displayIncorrect % 2 === 0) {
      setDisplayIncorrect(displayIncorrect + 1);
    }
  }, [tryAgain])

  useEffect(() => {
    if (tryAgain === true) {
      setTryAgain(false)
    }
    setAnswered(answered + 1)
  }, [displayIncorrect, displayCorrect])

  // Outputting the board for debugging purposes
  console.log('this is the board for debugging purposes.', pieces);

  return (
    <div>

      {answered % 2 === 0 ? <Grid container item className={classes.outerBoard}>
        <Grid className={classes.board}>
          {
            board.map((ColoredShape, i) => {
              return (
                ColoredShape
              )
            })
          }
        </Grid >
        <Grid>
          <Typography variant="h2" >
            On the board, are there 4 instances of the same-colored shape?
          </Typography>
          <Stack direction="row" className={classes.stack} spacing={2}>
            <Button
              className={classes.button}
              variant="contained"
              onClick={() => {
                handleSubmit(true);
              }}>
              Yes
            </Button>
            <Button
              className={classes.button}
              variant="contained"
              onClick={() => {
                handleSubmit(false);
              }}>
              No
            </Button>
          </Stack>
        </Grid>
      </Grid> : null}

      <Grid container item className={classes.outerBoard}>
        {displayCorrect % 2 === 0 ?
          <div>
            <MoodIcon style={{ fontSize: "700px", alignItems: "center" }} />
            <Button
              className={classes.button}
              variant="contained"
              onClick={() => {
                handleTryAgain()
              }}>
              Try again?
            </Button>
          </div> : null}
        {displayIncorrect % 2 === 0 ?
          <div>
            <SentimentVeryDissatisfiedIcon style={{ fontSize: "700px", alignItems: "center" }} />
            <Button
              className={classes.button}
              variant="contained"
              onClick={() => {
                handleTryAgain()
              }}>
              Try again?
            </Button>
          </div> : null}
      </Grid>

    </div>
  )
}

export default App;