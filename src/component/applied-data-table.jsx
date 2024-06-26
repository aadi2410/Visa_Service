import * as React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Box, styled } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { axiosAuthorized } from '../api/apiconfig';
import { useNavigate } from 'react-router-dom';
const CustomTableHead = styled(Paper)({
    '& thead': {
        background: 'lightgray',
    }
})

function createData(id, name, calories, fat, carbs, protein) {
    return {
        id,
        name,
        calories,
        fat,
        carbs,
        protein,
    };
}

const rows = [
    createData(1, 'Aditya', 6, 2, 9876543210, 'Varified'),
    createData(1, 'Aditya', 6, 2, 9876543210, 'Pending'),
    createData(1, 'Aditya', 6, 2, 9876543210, 'Varified'),
    createData(1, 'Aditya', 6, 2, 9876543210, 'Pending'),
    createData(1, 'Aditya', 6, 2, 9876543210, 'Varified'),
    createData(1, 'Aditya', 6, 2, 9876543210, 'Pending'),
    createData(1, 'Aditya', 6, 2, 9876543210, 'Pending'),
    createData(1, 'Aditya', 6, 2, 9876543210, 'Pending'),
    createData(1, 'Aditya', 6, 2, 9876543210, 'Pending'),
    createData(1, 'Aditya', 6, 2, 9876543210, 'Pending'),
    createData(1, 'Aditya', 6, 2, 9876543210, 'Pending'),
    createData(1, 'Aditya', 6, 2, 9876543210, 'Varified'),
    createData(1, 'Aditya', 6, 2, 9876543210, 'Pending'),
    createData(1, 'Aditya', 6, 2, 9876543210, 'Pending'),
    createData(1, 'Aditya', 6, 2, 9876543210, 'Pending'),
    createData(1, 'Aditya', 6, 2, 9876543210, 'Varified'),
    createData(1, 'Aditya', 6, 2, 9876543210, 'Varified'),
    createData(1, 'Aditya', 6, 2, 9876543210, 'Varified'),
    createData(1, 'Aditya', 6, 2, 9876543210, 'Pending'),
    createData(1, 'Aditya', 6, 2, 9876543210, 'Pending'),
    createData(1, 'Aditya', 6, 2, 9876543210, 'Varified'),
    createData(1, 'Aditya', 6, 2, 9876543210, 'Pending'),
    createData(1, 'Aditya', 6, 2, 9876543210, 'Varified'),
    createData(1, 'Aditya', 6, 2, 9876543210, 'Pending'),
    createData(1, 'Aditya', 6, 2, 9876543210, 'Pending'),
];

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'Applicant Name',
    },
    {
        id: 'calories',
        numeric: true,
        disablePadding: false,
        label: 'Mobile No.',
    },
    {
        id: 'fat',
        numeric: true,
        disablePadding: false,
        label: 'Email',
    },
    {
        id: 'carbs',
        numeric: true,
        disablePadding: false,
        label: 'created_at',
    },
    {
        id: 'protein',
        numeric: true,
        disablePadding: false,
        label: 'isVerified',
    },
    {
        id: 'protein',
        numeric: true,
        disablePadding: false,
        label: 'Reason',
    },
];

function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };
    return (
        
            <TableHead>
                <TableRow>
                    {headCells.map((headCell) => (
                        <TableCell
                            key={headCell.id}
                            align={headCell.numeric ? 'right' : 'left'}
                            padding={headCell.disablePadding ? '16' : 'normal'}
                            sortDirection={orderBy === headCell.id ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.label}
                                {orderBy === headCell.id ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

export default function EnhancedTable() {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [userData,setUserData]=React.useState([])
const navigate=useNavigate();
  const getUserData = async () => {
        try {
            let userId = localStorage.getItem('user_id') || null;
            if (userId) {

                const response = await axiosAuthorized.get(`getUsers/${JSON.parse(localStorage.getItem('user_id'))}?type=${JSON.parse(localStorage.getItem('type'))}`);
                const { user } = response.data;
                setUserData(user)
            }
             
        } catch (error) {
        }
    };
    React.useEffect(()=>{
        getUserData()
    },[])

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (id) => selected.indexOf(id) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows = React.useMemo(
        () =>
            stableSort(rows, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [order, orderBy, page, rowsPerPage],
    );

    return (
        <Box sx={{ width: '100%', overflow: 'hidden', boxShadow: 'none', border: '1px solid lightgray', borderRadius: 2 }}>
            <CustomTableHead sx={{ width: '100%'}}>
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {userData.map((row, index) => {
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={row.id}
                                        sx={{ cursor: 'pointer' }}
                                        onClick={()=>navigate('/documentuploaded',{state:{id:row._id,data:row}})                                    }
                                    >
                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            padding="16"
                                        >
                                            {row.full_name}
                                        </TableCell>
                                        <TableCell align="right">{row.mobile_no}</TableCell>
                                        <TableCell align="right">{row.email}</TableCell>
                                        <TableCell align="right">{moment(row.created_at).format('DD/MM/YYYY')}</TableCell>
                                        <TableCell align="right">{row?.isVerified?"Verified":"Not Verified"}</TableCell>
                                        <TableCell align="right">{row?.reason?row?.reason:"N/A"}</TableCell>

                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 20, 30]}
                    component="div"
                    count={userData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </CustomTableHead>
        </Box>
    );
}
