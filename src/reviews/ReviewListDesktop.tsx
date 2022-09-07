import * as React from 'react';
import {
    Identifier,
    Datagrid,
    DateField,
    TextField,
    BulkDeleteButton,
    useGetList,
    useListContext,
} from 'react-admin';
import {  Tabs, Tab } from '@mui/material';
import ProductReferenceField from '../products/ProductReferenceField';
import CustomerReferenceField from '../visitors/CustomerReferenceField';
import StarRatingField from './StarRatingField';
import rowStyle from './rowStyle';

import BulkAcceptButton from './BulkAcceptButton';
import BulkRejectButton from './BulkRejectButton';

export interface ReviewListDesktopProps {
    selectedRow?: Identifier;
}

const ReviewsBulkActionButtons = () => (
    <>
        <BulkAcceptButton />
        <BulkRejectButton />
        <BulkDeleteButton />
    </>
);
//These are used for status filter.
/*const tabs = [
    { id: 'pending', name: 'pending' },
    { id: 'accepted', name: 'accepted' },
    { id: 'rejected', name: 'rejected' },
];
const useGetTotals = (filterValues: any) => {
    const { total: tablePending } = useGetList('reviews', {
        pagination: { perPage: 1, page: 1 },
        sort: { field: 'id', order: 'ASC' },
        filter: { ...filterValues, status: 'pending' },
    });
    const { total: tableAccepted } = useGetList('reviews', {
        pagination: { perPage: 1, page: 1 },
        sort: { field: 'id', order: 'ASC' },
        filter: { ...filterValues, status: 'accepted' },
    });
    const { total: tableRejected } = useGetList('reviews', {
        pagination: { perPage: 1, page: 1 },
        sort: { field: 'id', order: 'ASC' },
        filter: { ...filterValues, status: 'rejected' },
    });

    return {
        pending: tablePending,
        accepted: tableAccepted,
        rejected: tableRejected,
    };
};*/
const tabs = [
    { id: '1', name: '1 STAR' },
    { id: '2', name: '2 STAR' },
    { id: '3', name: '3 STAR' },
    { id: '4', name: '4 STAR' },
    { id: '5', name: '5 STAR' },
];
const useGetTotals = (filterValues: any) => {
    const { total: tableStar1 } = useGetList('reviews', {
        pagination: { perPage: 1, page: 1 },
        sort: { field: 'id', order: 'ASC' },
        filter: { ...filterValues, rating: 1 },
    });
    const { total: tableStar2 } = useGetList('reviews', {
        pagination: { perPage: 1, page: 1 },
        sort: { field: 'id', order: 'ASC' },
        filter: { ...filterValues, rating: 2 },
    });
    const { total: tableStar3 } = useGetList('reviews', {
        pagination: { perPage: 1, page: 1 },
        sort: { field: 'id', order: 'ASC' },
        filter: { ...filterValues, rating: 3 },
    });
    const { total: tableStar4 } = useGetList('reviews', {
        pagination: { perPage: 1, page: 1 },
        sort: { field: 'id', order: 'ASC' },
        filter: { ...filterValues, rating: 4 },
    });
    const { total: tableStar5 } = useGetList('reviews', {
        pagination: { perPage: 1, page: 1 },
        sort: { field: 'id', order: 'ASC' },
        filter: { ...filterValues, rating: 5 },
    });

    return {
        "STAR 1": tableStar1,
        "STAR 2": tableStar2,
        "STAR 3": tableStar3,
        "STAR 4": tableStar4,
        "STAR 5": tableStar5,
    };
};
const ReviewListDesktop = ({ selectedRow }: ReviewListDesktopProps) => 
{
    const listContext = useListContext();
    const { filterValues, setFilters, displayedFilters } = listContext;
    const totals = useGetTotals(filterValues) as any;

    //used for status filter
    // const handleChange = React.useCallback(
    //     (event: React.ChangeEvent<{}>, value: any) => {
    //         setFilters &&
    //             setFilters(
    //                 { ...filterValues, status: value },
    //                 displayedFilters,
    //                 false // no debounce, we want the filter to fire immediately
    //             );
    //     },
    //     [displayedFilters, filterValues, setFilters]
    // );
    //used for rating filter
    const handleChange = React.useCallback(
        (event: React.ChangeEvent<{}>, value: any) => {
            setFilters &&
                setFilters(
                    { ...filterValues, rating: value },
                    displayedFilters,
                    false // no debounce, we want the filter to fire immediately
                );
        },
        [displayedFilters, filterValues, setFilters]
    );

    console.log(totals);
    return (
        <React.Fragment>
            {/* Status Filter */}
            {/* {displayedFilters.status ? (<Tabs
                    variant="fullWidth"
                    centered
                    value={filterValues.status}
                    indicatorColor="primary"
                    onChange={handleChange}
                >
                    {tabs.map(choice => (
                        <Tab
                            key={choice.id}
                            label={
                                totals[choice.name]
                                    ? `${choice.name} (${totals[choice.name]})`
                                    : choice.name
                            }
                            value={choice.id}
                        />
                    ))}
                </Tabs>):(<></>)} */}
                {/* Rating Filter */}
                {displayedFilters.rating ? (<Tabs
                        variant="fullWidth"
                        centered
                        value={filterValues.rating}
                        indicatorColor="primary"
                        onChange={handleChange}
                    >
                        {tabs.map(choice => (
                            <Tab
                                key={choice.id}
                                label={
                                    totals["STAR " + choice.id]
                                        ? `${"STAR " + choice.id} (${totals["STAR " + choice.id]})`
                                        : choice.name
                                }
                                value={choice.id}
                            />
                        ))}
                    </Tabs>):(<></>)}
                <Datagrid
                    rowClick="edit"
                    rowStyle={rowStyle(selectedRow)}
                    optimized
                    bulkActionButtons={<ReviewsBulkActionButtons />}
                    sx={{
                        '& .RaDatagrid-thead': {
                            borderLeftColor: 'transparent',
                            borderLeftWidth: 5,
                            borderLeftStyle: 'solid',
                        },
                        '& .column-comment': {
                            maxWidth: '18em',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        },
                    }}
                >
                    <DateField source="date" />
                    <CustomerReferenceField link={false} />
                    <ProductReferenceField link={false} />
                    <StarRatingField size="small" />
                    <TextField source="comment" />
                    <TextField source="status" />
                </Datagrid>
        </React.Fragment>
    
)};

export default ReviewListDesktop;
