import { createTheme } from "@mui/material";


const theme = createTheme({
  typography: {
    fontFamily: [
      'Poppins',
       ].join(','),
       subtitle1: {
        fontSize: 12,
      },
      body1: {
        fontWeight: '900px',
        color:'red'
      },
      button: {
        fontStyle: 'italic',
      },
      h1:{
fontWeight:'600px'
      },
      h2:{
        fontWeight:'900px'
      },
      h3:{
        fontWeight:'6900px'
      },
      h4:{
fontWeight:'600px'
      },
      h5:{
        fontWeight:'600px'
      },
      h6:{
        fontWeight:'800px'
      },
      subtitle1:{
        fontWeight:'600px'
      },
      subtitle2:{
        fontWeight:'600px'
      },
      body1:{
        fontWeight:'600px'
      },
      body2:{
        fontWeight:'600px'
      },
      button:{
        fontWeight:'600px'
      },
      caption:{
        fontWeight:'600px'
      },
      overline:{
        fontWeight:'600px'
      }
       
  },
  

  
  // palette: {
  //   primary: {
  //      main:'#DA1F2c',
  //     contrastText: '#fff',
  //   },

  //   secondary: {
  //    main: '#000',
  //     contrastText: '#fff',
  //   },
  //   accent:{
  //     main: '#f47d20',
  //     contrastText: '#fff',
  //   },
  //   accentB:{
  //     main: '#f47d20',
  //     contrastText: '#000',
  //   },

  //   helper:{
  //     main: '#f17184',
  //     contrastText: '#fff',
  //   },
  //   helperB:{
  //     main: '#f17184',
  //     contrastText: '#000',
  //   },


  //   custom: {
  //     light: '#ffa726',
  //     main: '#f57c00',
  //     dark: '#ef6c00',
  //     contrastText: '#ffcc00',
  //     contrastText: 'rgba(0, 0, 0, 0.87)',
  //   },
  //   // Used by `getContrastText()` to maximize the contrast between
  //   // the background and the text.
  //   contrastThreshold: 3,
  //   // Used by the functions below to shift a color's luminance by approximately
  //   // two indexes within its tonal palette.
  //   // E.g., shift from Red 500 to Red 300 or Red 700.
  //   tonalOffset: 0.2,
  // },
  overrides: {
    MuiOutlinedInput: {
      root: {
        fontSize: "80px"
      },
      input: {
        padding: "16px 14px",
        height: 56,
        boxSizing: "border-box"
      }
    },

    MuiInputBase: {
      root: {
        fontSize: '80px',
        lineHeight: '80px',
      },
      input: {
        height: '0.95em',
      }
    },

    MuiInputLabel: {
      root: {
        fontSize: "80px"
      },
      outlined: {
        transform: "translate(14px, 19px) scale(1)"
      }
    }
  }
});

export default theme