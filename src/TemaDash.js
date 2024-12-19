import {createTheme} from '@mui/material/styles';


export const theme = createTheme({
    palette: {
        primary: {
            main: "#FF6100",
            light: '#131313',

        },
        secondary: {
            main: "#FFFFFF",
        },
        info: {
            main: "#fff",
        },
        success: {
            main: "#00FF1E"
        },
        action: {
            main: "#FFF"
        },
        text: {
            primary: '#000C22'
        }

    },
    typography: {
        fontFamily: ['Space Grotesk', 'sans-serif'].join(','),
    },
    components: {
        MuiGrid: {
            styleOverrides: {
                root: {
                    transition: "all .2s ease-in-out"
                }
            }
        },
        MuiTextField: {
            defaultProps: {
                fullWidth: true,
                variant: "outlined",
                size: "medium"
            }
        },
        MuiFilledInput: {
            styleOverrides: {
                root: {
                    paddingLeft: 10,
                    paddingRight: 10,
                    borderRadius: 6,
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: 6
                }
            }
        },
        MuiButtonBase: {
            variants: [
                {
                    props: {variant: 'efecto'},
                    style: {
                        transition: 'all .1s ease-in-out',
                        borderRadius: 10,
                        '&: hover': {
                            marginTop: -6,
                            boxShadow: "0px 0px 0px 0px rgba(0,0,0,0)",

                        }
                    },
                },


            ],

        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    borderRadius: 10,
                    backgroundColor: '#131313',


                }
            }
        },
        MuiButton: {
            defaultProps: {
                variant: "contained",
            },
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    fontWeight: 600,
                    paddingLeft: 32,
                    paddingRight: 32,
                    fontSize: 16,
                    textTransform: 'none'


                },
            }
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: "131313"
                }
            }
        }

    }


})
