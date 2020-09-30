import React, { Fragment, useState, useEffect } from 'react';
import {
  useTable,
  usePagination,
  useExpanded,
  // useTableState,
  useSortBy,
  useFilters,
} from 'react-table';
import {
  Table,
  Menu,
  Icon,
  Grid,
  Segment,
  Divider,
  Dropdown,
} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import columns from '../helpers/columns';
import _ from 'lodash';

export const DocumentsTable = ({
  data,
  avgHeatingCost,
  avgHotWaterCost,
  avgLightingCost,
  avgEnergyRating,
  avgEnergyConsumption,
  wallFilter,
  windowsFilter,
  mainHeatFilter,
  lightingFilter,
  basicOptions,
  upgradesData,
}) => {
  //   console.log(data);

  const {
    getTableProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    // setExpanded,
    state: { pageIndex, pageSize, expanded },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useFilters,
    useSortBy,
    useExpanded,
    usePagination
  );

  const [windowsUpgrade, setWindowsUpgrade] = useState(null);
  const [wallUpgrade, setwallUpgrade] = useState(null);
  const [lightingUpgrade, setlightingUpgrade] = useState(null);
  const [mainheatUpgrade, setmainheatUpgrade] = useState(null);

  const [currentWindowsCost, setcurrentWindowsCost] = useState(null);

  useEffect(() => {
    console.log(_.meanBy(upgradesData, (doc) => doc.LIGHTING_COST_CURRENT));
  }, [upgradesData, windowsUpgrade]);

  useEffect(() => {
    setcurrentWindowsCost(
      windowsFilter === 'Very Poor'
        ? 170
        : windowsFilter === 'Poor'
        ? 230
        : windowsFilter === 'Average'
        ? 250
        : windowsFilter === 'Good'
        ? 400
        : windowsFilter === 'Very Good'
        ? 500
        : null
    );
  }, [windowsFilter]);

  return (
    <>
      <Grid style={{ marginLeft: '1vw', width: '100vw' }}>
        <Grid.Column width={8}>
          <Segment textAlign="left" style={{ width: '40vw' }}>
            <strong>Average costs:</strong>{' '}
            <Grid style={{ marginTop: '1.5vh' }}>
              <Grid.Column width={5}>
                <Icon name="thermometer half" size="large" color="red"></Icon>{' '}
                Heating: {avgHeatingCost.toFixed()} £{' '}
              </Grid.Column>
              <Grid.Column width={5}>
                <Icon name="shower" size="large" color="blue"></Icon> Hot Water:
                {avgHotWaterCost.toFixed()} £
              </Grid.Column>{' '}
              <Grid.Column width={5}>
                <Icon name="lightbulb" size="large" color="orange"></Icon>
                Lighting: {avgLightingCost.toFixed()} £
              </Grid.Column>
            </Grid>
            <Divider></Divider>
            <Icon name="lightning" size="large" color="yellow"></Icon>
            <strong>Average Energy Rating:</strong> {avgEnergyRating}{' '}
            <Divider></Divider>
            <Icon
              name="tachometer alternate"
              size="large"
              color="teal"
            ></Icon>{' '}
            <strong>Average Energy Consumption:</strong> {avgEnergyConsumption}{' '}
            KWh/m2
          </Segment>
        </Grid.Column>
        {/* <Grid.Column width={8}>
          <Segment textAlign="left" style={{ width: '40vw' }}>
            <strong>Upgrade costs:</strong>{' '}
            <Grid style={{ marginTop: '1.5vh' }}>
              <Grid.Row>
                <Grid.Column width={16}>
                  <Dropdown
                    text="Windows"
                    disabled={!windowsFilter}
                    options={basicOptions.filter(
                      (e) =>
                        e.value != windowsFilter &&
                        e.key != 'All' &&
                        e.key != 'N/A'
                    )}
                    onChange={(e, { value }) => setWindowsUpgrade(value)}
                  />{' '}
                  Current Windows Cost: {currentWindowsCost} Upgrade Windows
                  Cost:
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={16}>
                  <Dropdown
                    text="Walls"
                    disabled={!wallFilter}
                    options={basicOptions.filter(
                      (e) =>
                        e.value != wallFilter &&
                        e.key != 'All' &&
                        e.key != 'N/A'
                    )}
                    onChange={(e, { value }) => setwallUpgrade(value)}
                  />{' '}
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={16}>
                  <Dropdown
                    text="Main Heat"
                    disabled={!mainHeatFilter}
                    options={basicOptions.filter(
                      (e) =>
                        e.value != mainHeatFilter &&
                        e.key != 'All' &&
                        e.key != 'N/A'
                    )}
                    onChange={(e, { value }) => setmainheatUpgrade(value)}
                  />{' '}
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={16}>
                  <Dropdown
                    text="Lighting"
                    disabled={!lightingFilter}
                    options={basicOptions.filter(
                      (e) =>
                        e.value != lightingFilter &&
                        e.key != 'All' &&
                        e.key != 'N/A'
                    )}
                    onChange={(e, { value }) => setlightingUpgrade(value)}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </Grid.Column> */}
      </Grid>
      <Grid style={{ marginLeft: '1vw', marginTop: '5vh' }}>
        <Menu pagination>
          <Menu.Item
            as="a"
            icon
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            <Icon name="chevron left" />
          </Menu.Item>

          <Menu.Item
            as="a"
            icon
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            <Icon name="chevron right" />
          </Menu.Item>
          <Menu.Item>
            <span>
              Page
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>
            </span>
          </Menu.Item>
          <Menu.Item>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </Menu.Item>
        </Menu>
      </Grid>
      <Table
        style={{ marginTop: '5vh' }}
        color="teal"
        celled
        // sortable
        scrolling
        // style={{ overflowX: 'scroll' }}
        {...getTableProps()}
      >
        <Table.Header>
          {headerGroups.map((headerGroup) => (
            <Table.Row {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => {
                // console.log(column);
                return (
                  <Table.HeaderCell
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render('Header')}
                  </Table.HeaderCell>
                );
              })}
            </Table.Row>
          ))}
        </Table.Header>

        <Table.Body>
          {page.map(
            (row, i) =>
              prepareRow(row) || (
                <Fragment key={row.index}>
                  <Table.Row {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <Table.Cell {...cell.getCellProps()}>
                          {cell.render('Cell')}
                        </Table.Cell>
                      );
                    })}
                  </Table.Row>
                  {row.isExpanded && (
                    <Table.Row>
                      <Table.Cell colSpan={columns.length}>
                        {/* {renderSubComponent({ row })} */}
                      </Table.Cell>
                    </Table.Row>
                  )}
                </Fragment>
              )
          )}
        </Table.Body>
      </Table>
    </>
  );
};
