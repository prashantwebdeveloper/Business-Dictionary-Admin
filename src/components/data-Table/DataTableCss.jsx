// DataTable
import { createTheme } from "react-data-table-component";

// Theme
createTheme('blackTheme', {
    text: {
        primary: '#ffffff',
        secondary: '#b2b2b2',
    },
    background: {
        default: '#000000',
    },
    divider: {
        default: '#333333',
    },
    pagination: {
        background: '#000000',
        color: '#ffffff',
    },
    rows: {
        highlightOnHoverBackground: '#333333',
    },
});

// css
export const customStyles = {
    table: {
        style: {
            border: '1px solid rgba(255, 255, 255, 0.2)',
        },
    },
    header: {
        style: {
            backgroundColor: '#101316 !important',
        },
    },
    headCells: {
        style: {
            fontSize: '15px',
            fontWeight: '600',
        },
    },
    cells: {
        style: {
            fontSize: '14px',
            fontWeight: '500',
            whiteSpace: 'pre-wrap !important'
        },
    },
    pagination: {
        style: {
            color: '#000',
            fontSize: '13px',
            fontWeight: '500',
            // backgroundColor: '#fff',
            // borderTop: '1px solid rgba(255, 255, 255, 0.2)',
        },
        // pageButtonsStyle: {
        //     color: '#fff',
        //     fill: '#fff',
        //     backgroundColor: 'transparent',
        //     '&:hover': {
        //         backgroundColor: '#333',
        //     },
        //     '&:focus': {
        //         outline: 'none',
        //         backgroundColor: '#444',
        //     },
        //     '&:disabled': {
        //         fill: 'rgba(255, 255, 255, 0.2) ',
        //         color: 'rgba(255, 255, 255, 0.3)',
        //     },
        // },
    },
};