import React, { useState, useEffect } from 'react';
import { Menu, Button, Grid, Segment, Dropdown, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { GET_DOCUMENTS } from '../queries';
import { useQuery } from '@apollo/client';
import {
  calculateWallsCost,
  calculateWallsUniversal,
  calculateWallsROI,
} from '../helpers/calculateWallsCost';
import {
  calculateMainHeatCost,
  calculateMainHeatingUniversal,
  calculateMainHeatingHotWaterUniversal,
  calculateMainHeatingROI,
} from '../helpers/calculateMainHeatCost';
import {
  calculateWindowsCost,
  calculateWindowsUniversal,
  calculateWindowsROI,
} from '../helpers/calculateWindowsCost';
import {
  calculateLightingCost,
  calculateLightingUniversal,
  calculateLightingROI,
} from '../helpers/calculateLightingCost';

import _ from 'lodash';

export const UpgradesComponent = () => {
  const [buildingTypeFilter, setBuildingTypeFilter] = useState(null);
  const [builtFormFilter, setbuiltFormFilter] = useState(null);
  const [totalAreaFilter, setTotalAreaFilter] = useState(null);

  const [numWindows, setNumWindows] = useState({
    windowsSmall: 6,
    windowsAvg: 10,
    windowsBig: 16,
  });

  const [numOutlets, setNumOutlets] = useState({
    small: 10,
    avg: 20,
    big: 28,
  });

  const [windowsPrices, setWindowsPrices] = useState({
    very_poor: 170,
    poor: 230,
    average: 250,
    good: 400,
    very_good: 500,
  });

  const [lightingPrices, setLightingPrices] = useState({
    very_poor: 3,
    poor: 4,
    average: 5,
    good: 7,
    very_good: 12,
  });

  const [wallPrices, setWallPrices] = useState({
    very_poor_0: 2000,
    very_poor_1: 5000,
    very_poor_2: 9000,
    poor_0: 3000,
    poor_1: 7000,
    poor_2: 10000,
    average_0: 5000,
    average_1: 9000,
    average_2: 13000,
    good_0: 7000,
    good_1: 13000,
    good_2: 16000,
    very_good_0: 10000,
    very_good_1: 15000,
    very_good_2: 18000,
  });

  const [mainHeatPrices, setMainHeatPrices] = useState({
    very_poor_0: 5000,
    very_poor_1: 5750,
    very_poor_2: 6325,
    poor_0: 7000,
    poor_1: 8050,
    poor_2: 8855,
    average_0: 9000,
    average_1: 10350,
    average_2: 11385,
    good_0: 12000,
    good_1: 13800,
    good_2: 15180,
    very_good_0: 12000,
    very_good_1: 13800,
    very_good_2: 15180,
  });

  //costs
  const [currentWindowsCost, setCurrentWindowsCost] = useState({
    value: null,
    comparator: null,
  });
  const [currentWallsCost, setCurrentWallsCost] = useState({
    value: null,
    comparator: null,
  });
  const [currentLightingCost, setCurrentLightingCost] = useState({
    value: null,
    comparator: null,
  });
  const [currentMainHeatCost, setCurrentMainHeatCost] = useState({
    value: null,
    comparator: null,
  });

  const [upgradedWindowsCost, setUpgradedWindowsCost] = useState({
    value: null,
    comparator: null,
  });
  const [upgradedWallsCost, setUpgradedWallsCost] = useState({
    value: null,
    comparator: null,
  });
  const [upgradedLightingCost, setUpgradedLightingCost] = useState({
    value: null,
    comparator: null,
  });
  const [upgradedMainHeatCost, setUpgradedMainHeatCost] = useState({
    value: null,
    comparator: null,
  });

  //avg current
  const [
    avgCurrentWindowsHeatingCost,
    setAvgCurrentWindowsHeatingCost,
  ] = useState(null);

  const [avgCurrentWallsHeatingCost, setAvgCurrentWallsHeatingCost] = useState(
    null
  );

  const [
    avgCurrentMainHeatHeatingCost,
    setAvgCurrentMainHeatHeatingCost,
  ] = useState({ heating: null, hotwater: null });

  const [avgCurrentLightingCost, setavgCurrentLightingCost] = useState(null);

  //avg upgraded
  const [
    avgUpgradedWindowsHeatingCost,
    setAvgUpgradedWindowsHeatingCost,
  ] = useState(null);

  const [
    avgUpgradedWallsHeatingCost,
    setAvgUpgradedWallsHeatingCost,
  ] = useState(null);

  const [
    avgUpgradedMainHeatHeatingCost,
    setAvgUpgradedMainHeatHeatingCost,
  ] = useState({ heating: null, hotwater: null });

  const [avgUpgradedLightingCost, setavgUpgradedLightingCost] = useState(null);

  const [filteredData, setFilteredData] = useState(null);
  const { loading, error, data } = useQuery(GET_DOCUMENTS, {
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    if (data) {
      setFilteredData(data.documents);

      // setFilteredData(_.filter(data.documents, fullFilter));
      // console.log(filteredData);

      if (
        buildingTypeFilter ||
        builtFormFilter
        // minTotalArea ||
        // maxTotalArea ||
        // mainHeatFilter ||
        // wallFilter ||
        // windowsFilter ||
        // lightingFilter
      ) {
        setFilteredData(
          data.documents

            .filter((obj) =>
              buildingTypeFilter
                ? obj.PROPERTY_TYPE === buildingTypeFilter
                : obj
            )
            .filter((obj) =>
              builtFormFilter ? obj.BUILT_FORM === builtFormFilter : obj
            )
          // .filter((obj) =>
          //   windowsFilter ? obj.WINDOWS_ENERGY_EFF === windowsFilter : obj
          // )
          // .filter((obj) =>
          //   wallFilter ? obj.WALLS_ENERGY_EFF === wallFilter : obj
          // )
          // .filter((obj) =>
          //   lightingFilter ? obj.LIGHTING_ENERGY_EFF === lightingFilter : obj
          // )
          // .filter((obj) =>
          //   mainHeatFilter ? obj.MAINHEAT_ENERGY_EFF === mainHeatFilter : obj
          // )
        );
      }
    }
  }, [
    buildingTypeFilter,
    builtFormFilter,
    // minTotalArea,
    // maxTotalArea,
    // windowsFilter,
    // wallFilter,
    // mainHeatFilter,
    // lightingFilter,
    data,
  ]);

  //   useEffect(() => {
  //     switch (totalAreaFilter) {
  //       case '0-50':
  //         setWindowsPrices({
  //           very_poor: 170 * 6,
  //           poor: 230 * 6,
  //           average: 250 * 6,
  //           good: 400 * 6,
  //           very_good: 500 * 6,
  //         });
  //         break;
  //       case '50-100':
  //         setWindowsPrices({
  //           very_poor: 170 * 10,
  //           poor: 230 * 10,
  //           average: 250 * 10,
  //           good: 400 * 10,
  //           very_good: 500 * 10,
  //         });
  //         break;
  //       case '100+':
  //         setWindowsPrices({
  //           very_poor: 170 * 16,
  //           poor: 230 * 16,
  //           average: 250 * 16,
  //           good: 400 * 16,
  //           very_good: 500 * 16,
  //         });
  //         break;
  //       default:
  //         break;
  //     }
  //   }, [totalAreaFilter]);

  useEffect(() => {
    if (data) {
      let local = filteredData.filter(
        (obj) => obj.WINDOWS_ENERGY_EFF === currentWindowsCost.value
      );

      setAvgCurrentWindowsHeatingCost(
        _.meanBy(local, (doc) => doc.HEATING_COST_CURRENT).toFixed()
      );
    }
  }, [filteredData, currentWindowsCost]);

  useEffect(() => {
    if (data) {
      let local = filteredData.filter(
        (obj) => obj.WALLS_ENERGY_EFF === currentWallsCost.value
      );
      setAvgCurrentWallsHeatingCost(
        _.meanBy(local, (doc) => doc.HEATING_COST_CURRENT).toFixed()
      );
    }
  }, [filteredData, currentWallsCost]);

  useEffect(() => {
    if (data) {
      let local = filteredData.filter(
        (obj) => obj.LIGHTING_ENERGY_EFF === currentLightingCost.value
      );
      setavgCurrentLightingCost(
        _.meanBy(local, (doc) => doc.LIGHTING_COST_CURRENT).toFixed()
      );
    }
  }, [filteredData, currentLightingCost]);

  useEffect(() => {
    if (data) {
      let local = filteredData.filter(
        (obj) => obj.MAINHEAT_ENERGY_EFF === currentMainHeatCost.value
      );
      setAvgCurrentMainHeatHeatingCost({
        heating: _.meanBy(local, (doc) => doc.HEATING_COST_CURRENT).toFixed(),
        hotwater: _.meanBy(
          local,
          (doc) => doc.HOT_WATER_COST_CURRENT
        ).toFixed(),
      });
    }
  }, [filteredData, currentMainHeatCost]);

  //

  useEffect(() => {
    if (data) {
      let local = filteredData.filter(
        (obj) => obj.WINDOWS_ENERGY_EFF === upgradedWindowsCost.value
      );

      setAvgUpgradedWindowsHeatingCost(
        _.meanBy(local, (doc) => doc.HEATING_COST_CURRENT).toFixed()
      );
    }
  }, [filteredData, upgradedWindowsCost]);

  useEffect(() => {
    if (data) {
      let local = filteredData.filter(
        (obj) => obj.WALLS_ENERGY_EFF === upgradedWallsCost.value
      );
      setAvgUpgradedWallsHeatingCost(
        _.meanBy(local, (doc) => doc.HEATING_COST_CURRENT).toFixed()
      );
    }
  }, [filteredData, upgradedWallsCost]);

  useEffect(() => {
    if (data) {
      let local = filteredData.filter(
        (obj) => obj.LIGHTING_ENERGY_EFF === upgradedLightingCost.value
      );
      setavgUpgradedLightingCost(
        _.meanBy(local, (doc) => doc.LIGHTING_COST_CURRENT).toFixed()
      );
    }
  }, [filteredData, upgradedLightingCost]);

  useEffect(() => {
    if (data) {
      let local = filteredData.filter(
        (obj) => obj.MAINHEAT_ENERGY_EFF === upgradedMainHeatCost.value
      );
      setAvgUpgradedMainHeatHeatingCost({
        heating: _.meanBy(local, (doc) => doc.HEATING_COST_CURRENT).toFixed(),
        hotwater: _.meanBy(
          local,
          (doc) => doc.HOT_WATER_COST_CURRENT
        ).toFixed(),
      });
    }
  }, [filteredData, upgradedMainHeatCost]);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const basicOptions = [
    {
      key: 'Very Poor',
      text: 'Very Poor',
      value: { text: 'Very Poor', comparator: 0 },
      content: 'Very Poor',
    },
    {
      key: 'Poor',
      text: 'Poor',
      value: { text: 'Poor', comparator: 1 },
      content: 'Poor',
    },
    {
      key: 'Average',
      text: 'Average',
      value: { text: 'Average', comparator: 2 },
      content: 'Average',
    },
    {
      key: 'Good',
      text: 'Good',
      value: { text: 'Good', comparator: 3 },
      content: 'Good',
    },
    {
      key: 'Very Good',
      text: 'Very Good',
      value: { text: 'Very Good', comparator: 4 },
      content: 'Very Good',
    },
  ];

  const buildingTypeOptions = [
    {
      key: 'Flat',
      text: 'Flat',
      value: 'Flat',
      content: 'Flat',
    },
    {
      key: 'House',
      text: 'House',
      value: 'House',
      content: 'House',
    },
    {
      key: 'Maisonette',
      text: 'Maisonette',
      value: 'Maisonette',
      content: 'Maisonette',
    },
    {
      key: 'Bungalow',
      text: 'Bungalow',
      value: 'Bungalow',
      content: 'Bungalow',
    },
  ];

  const builtFormOptions = [
    {
      key: 'Detached',
      text: 'Detached',
      value: 'Detached',
      content: 'Detached',
    },
    {
      key: 'Semi-Detached',
      text: 'Semi-Detached',
      value: 'Semi-Detached',
      content: 'Semi-Detached',
    },
    {
      key: 'Enclosed End-Terrace',
      text: 'Enclosed End-Terrace',
      value: 'Enclosed End-Terrace',
      content: 'Enclosed End-Terrace',
    },
    {
      key: 'Enclosed Mid-Terrace',
      text: 'Enclosed Mid-Terrace',
      value: 'Enclosed Mid-Terrace',
      content: 'Enclosed Mid-Terrace',
    },
    {
      key: 'End-Terrace',
      text: 'End-Terrace',
      value: 'End-Terrace',
      content: 'End-Terrace',
    },
    {
      key: 'Mid-Terrace',
      text: 'Mid-Terrace',
      value: 'Mid-Terrace',
      content: 'Mid-Terrace',
    },
  ];

  const totalAreaOptions = [
    {
      key: '0-50',
      text: '0-50',
      value: '0-50',
      content: '0-50',
      comparator: 0,
    },
    {
      key: '50-100',
      text: '50-100',
      value: '50-100',
      content: '50-100',
      comparator: 1,
    },
    {
      key: '100+',
      text: '100+',
      value: '100+',
      content: '100+',
      comparator: 2,
    },
  ];

  return (
    <>
      <Menu fixed={'top'}>
        <Menu.Item>
          <Button as={Link} to="/" color={'blue'}>
            Back to Table
          </Button>
        </Menu.Item>
        <Dropdown
          text="Type"
          options={buildingTypeOptions}
          simple
          item
          onChange={(e, { value }) => setBuildingTypeFilter(value)}
        />
        <Dropdown
          text="Built Form"
          options={builtFormOptions}
          simple
          item
          onChange={(e, { value }) => setbuiltFormFilter(value)}
        />{' '}
        <Dropdown
          text="Total Area"
          options={totalAreaOptions}
          simple
          item
          onChange={(e, { value }) => setTotalAreaFilter(value)}
        />{' '}
      </Menu>

      <Segment basic style={{ height: '100vh', marginTop: '5vh' }}>
        <Grid>
          {' '}
          <Grid.Column width={8}>
            <Segment textAlign="left" style={{ width: '40vw' }}>
              <strong>Current costs:</strong>{' '}
              <Grid style={{ marginTop: '1.5vh' }}>
                <Grid.Row>
                  <Grid.Column width={16}>
                    <Grid>
                      <Grid.Column width={3}>
                        <Dropdown
                          text="Windows"
                          options={basicOptions}
                          onChange={(e, { value }) => {
                            setCurrentWindowsCost({
                              value: value.text,
                              comparator: value.comparator,
                            });
                            console.log(value);
                          }}
                        ></Dropdown>
                      </Grid.Column>
                      <Grid.Column width={5}>
                        {avgCurrentWindowsHeatingCost && (
                          <>
                            <Icon
                              name="thermometer half"
                              color="red"
                              size="large"
                            ></Icon>
                            {avgCurrentWindowsHeatingCost} £
                          </>
                        )}
                      </Grid.Column>
                      <Grid.Column width={5}>
                        Current Windows cost:
                        {calculateWindowsCost(
                          currentWindowsCost.value,
                          numWindows,
                          windowsPrices,
                          totalAreaFilter
                        )}
                        £
                      </Grid.Column>
                    </Grid>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width={16}>
                    <Grid>
                      <Grid.Column width={3}>
                        <Dropdown
                          text="Walls"
                          // disabled={!wallFilter}
                          options={basicOptions}
                          onChange={(e, { value }) => {
                            setCurrentWallsCost({
                              value: value.text,
                              comparator: value.comparator,
                            });
                            console.log(value);
                          }}
                        ></Dropdown>
                      </Grid.Column>
                      <Grid.Column width={5}>
                        {avgCurrentWallsHeatingCost && (
                          <>
                            <Icon
                              name="thermometer half"
                              color="red"
                              size="large"
                            ></Icon>
                            {avgCurrentWallsHeatingCost} £
                          </>
                        )}
                      </Grid.Column>
                      <Grid.Column width={5}>
                        Current Walls cost:
                        {calculateWallsCost(
                          currentWallsCost.value,
                          wallPrices,
                          totalAreaFilter
                        )}
                        £
                      </Grid.Column>
                    </Grid>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width={16}>
                    <Grid>
                      <Grid.Column width={3}>
                        <Dropdown
                          text="Main Heat"
                          // disabled={!wallFilter}
                          options={basicOptions}
                          onChange={(e, { value }) => {
                            setCurrentMainHeatCost({
                              value: value.text,
                              comparator: value.comparator,
                            });
                            console.log(value);
                          }}
                        ></Dropdown>
                      </Grid.Column>
                      <Grid.Column width={5}>
                        {avgCurrentMainHeatHeatingCost && (
                          <>
                            <Icon
                              name="thermometer half"
                              color="red"
                              size="large"
                            ></Icon>
                            {avgCurrentMainHeatHeatingCost.heating} £
                            <Icon
                              style={{ marginLeft: '2vw' }}
                              name="shower"
                              color="blue"
                              size="large"
                            ></Icon>
                            {avgCurrentMainHeatHeatingCost.hotwater} £
                          </>
                        )}
                      </Grid.Column>
                      <Grid.Column width={5}>
                        Current Main Heat cost:
                        {calculateMainHeatCost(
                          currentMainHeatCost.value,
                          mainHeatPrices,
                          totalAreaFilter
                        )}
                        £
                      </Grid.Column>
                    </Grid>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width={16}>
                    <Grid>
                      <Grid.Column width={3}>
                        <Dropdown
                          text="Lighting"
                          // disabled={!wallFilter}
                          options={basicOptions}
                          onChange={(e, { value }) => {
                            setCurrentLightingCost({
                              value: value.text,
                              comparator: value.comparator,
                            });
                            console.log(value);
                          }}
                        ></Dropdown>
                      </Grid.Column>
                      <Grid.Column width={5}>
                        {avgCurrentLightingCost && (
                          <>
                            <Icon
                              name="lightbulb"
                              size="large"
                              color="orange"
                            ></Icon>
                            {avgCurrentLightingCost} £
                          </>
                        )}
                      </Grid.Column>
                      <Grid.Column width={5}>
                        Current Outlet Cost:
                        {calculateLightingCost(
                          currentLightingCost.value,
                          numOutlets,
                          lightingPrices,
                          totalAreaFilter
                        )}{' '}
                        £
                      </Grid.Column>
                    </Grid>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
          </Grid.Column>
          {/* <Grid.Column width={8}></Grid.Column> */}
          <Grid.Row>
            <Grid.Column width={16}>
              <Segment textAlign="left" style={{ width: '80vw' }}>
                <strong>Upgrade costs:</strong>{' '}
                <Grid style={{ marginTop: '1.5vh' }}>
                  <Grid.Row>
                    <Grid.Column width={16}>
                      <Grid>
                        <Grid.Column width={2}>
                          <Dropdown
                            text="Windows"
                            options={basicOptions.filter(
                              (e) =>
                                e.value.comparator >
                                currentWindowsCost.comparator
                            )}
                            onChange={(e, { value }) => {
                              setUpgradedWindowsCost({
                                value: value.text,
                                comparator: value.comparator,
                              });
                              console.log(value);
                            }}
                          ></Dropdown>
                        </Grid.Column>
                        <Grid.Column width={3}>
                          {avgUpgradedWindowsHeatingCost && (
                            <>
                              <Icon
                                name="thermometer half"
                                color="red"
                                size="large"
                              ></Icon>
                              {/* {avgUpgradedWindowsHeatingCost} £ */}
                              {calculateWindowsUniversal(
                                avgCurrentWindowsHeatingCost,
                                avgUpgradedWindowsHeatingCost,
                                currentWindowsCost.value,
                                upgradedWindowsCost.value
                              )}{' '}
                              £
                            </>
                          )}
                        </Grid.Column>
                        <Grid.Column width={3}>
                          Upgraded Windows cost:
                          {calculateWindowsCost(
                            upgradedWindowsCost.value,
                            numWindows,
                            windowsPrices,
                            totalAreaFilter
                          )}
                          £
                        </Grid.Column>

                        <Grid.Column width={3}>
                          <Icon
                            name="money bill alternate"
                            color="green"
                          ></Icon>
                          Saving:
                          {(
                            avgCurrentWindowsHeatingCost -
                            calculateWindowsUniversal(
                              avgCurrentWindowsHeatingCost,
                              avgUpgradedWindowsHeatingCost,
                              currentWindowsCost.value,
                              upgradedWindowsCost.value
                            )
                          ).toFixed()}
                          £
                        </Grid.Column>

                        <Grid.Column width={3}>
                          <Icon name="line graph" color="blue"></Icon>
                          ROI:
                          {calculateWindowsROI(
                            avgCurrentWindowsHeatingCost -
                              calculateWindowsUniversal(
                                avgCurrentWindowsHeatingCost,
                                avgUpgradedWindowsHeatingCost,
                                currentWindowsCost.value,
                                upgradedWindowsCost.value
                              ),
                            calculateWindowsCost(
                              upgradedWindowsCost.value,
                              numWindows,
                              windowsPrices,
                              totalAreaFilter
                            )
                          )}
                          % per year
                        </Grid.Column>
                      </Grid>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={16}>
                      <Grid>
                        <Grid.Column width={2}>
                          <Dropdown
                            text="Walls"
                            options={basicOptions.filter(
                              (e) =>
                                e.value.comparator > currentWallsCost.comparator
                            )}
                            onChange={(e, { value }) => {
                              setUpgradedWallsCost({
                                value: value.text,
                                comparator: value.comparator,
                              });
                            }}
                          />{' '}
                        </Grid.Column>
                        <Grid.Column width={3}>
                          {avgUpgradedWallsHeatingCost && (
                            <>
                              <Icon
                                name="thermometer half"
                                color="red"
                                size="large"
                              ></Icon>
                              {/* {avgUpgradedWallsHeatingCost} £ */}
                              {calculateWallsUniversal(
                                avgCurrentWallsHeatingCost,
                                avgUpgradedWallsHeatingCost,
                                currentWallsCost.value,
                                upgradedWallsCost.value
                              )}{' '}
                              £
                            </>
                          )}
                        </Grid.Column>
                        <Grid.Column width={3}>
                          Upgraded Walls cost:
                          {calculateWallsCost(
                            upgradedWallsCost.value,
                            wallPrices,
                            totalAreaFilter
                          )}
                          £
                        </Grid.Column>
                        <Grid.Column width={3}>
                          <Icon
                            name="money bill alternate"
                            color="green"
                          ></Icon>
                          Saving:
                          {(
                            avgCurrentWallsHeatingCost -
                            calculateWallsUniversal(
                              avgCurrentWallsHeatingCost,
                              avgUpgradedWallsHeatingCost,
                              currentWallsCost.value,
                              upgradedWallsCost.value
                            )
                          ).toFixed()}
                          £
                        </Grid.Column>

                        <Grid.Column width={3}>
                          <Icon name="line graph" color="blue"></Icon>
                          ROI:
                          {calculateWallsROI(
                            avgCurrentWallsHeatingCost -
                              calculateWallsUniversal(
                                avgCurrentWallsHeatingCost,
                                avgUpgradedWallsHeatingCost,
                                currentWallsCost.value,
                                upgradedWallsCost.value
                              ),
                            calculateWallsCost(
                              upgradedWallsCost.value,
                              wallPrices,
                              totalAreaFilter
                            )
                          )}
                          % per year
                        </Grid.Column>
                      </Grid>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={16}>
                      <Grid>
                        <Grid.Column width={2}>
                          <Dropdown
                            text="Main Heat"
                            options={basicOptions.filter(
                              (e) =>
                                e.value.comparator >
                                currentMainHeatCost.comparator
                            )}
                            onChange={(e, { value }) => {
                              setUpgradedMainHeatCost({
                                value: value.text,
                                comparator: value.comparator,
                              });
                              console.log(value);
                            }}
                          ></Dropdown>
                        </Grid.Column>
                        <Grid.Column width={3}>
                          {avgUpgradedMainHeatHeatingCost && (
                            <>
                              <Icon
                                name="thermometer half"
                                color="red"
                                size="large"
                              ></Icon>
                              {calculateMainHeatingUniversal(
                                avgCurrentMainHeatHeatingCost.heating,
                                avgUpgradedMainHeatHeatingCost.heating,
                                currentMainHeatCost.value,
                                upgradedMainHeatCost.value
                              )}
                              £
                              {/* {avgUpgradedMainHeatHeatingCost.heating} £ */}
                              <Icon
                                style={{ marginLeft: '2vw' }}
                                name="shower"
                                color="blue"
                                size="large"
                              ></Icon>
                              {calculateMainHeatingHotWaterUniversal(
                                avgCurrentMainHeatHeatingCost.hotwater,
                                avgUpgradedMainHeatHeatingCost.hotwater,
                                currentMainHeatCost.value,
                                upgradedMainHeatCost.value
                              )}{' '}
                              £
                              {/* {avgUpgradedMainHeatHeatingCost.hotwater} £ */}
                            </>
                          )}
                        </Grid.Column>
                        <Grid.Column width={3}>
                          Upgraded Main Heat cost:
                          {calculateMainHeatCost(
                            upgradedMainHeatCost.value,
                            mainHeatPrices,
                            totalAreaFilter
                          )}
                          £
                        </Grid.Column>
                        <Grid.Column width={3}>
                          <Icon
                            name="money bill alternate"
                            color="green"
                          ></Icon>
                          Saving: <strong>H: </strong>
                          {(
                            avgCurrentMainHeatHeatingCost.heating -
                            calculateMainHeatingUniversal(
                              avgCurrentMainHeatHeatingCost.heating,
                              avgUpgradedMainHeatHeatingCost.heating,
                              currentMainHeatCost.value,
                              upgradedMainHeatCost.value
                            )
                          ).toFixed()}
                          £ {'    '} | {'    '}
                          {(
                            avgCurrentMainHeatHeatingCost.hotwater -
                            calculateMainHeatingUniversal(
                              avgCurrentMainHeatHeatingCost.hotwater,
                              avgUpgradedMainHeatHeatingCost.hotwater,
                              currentMainHeatCost.value,
                              upgradedMainHeatCost.value
                            )
                          ).toFixed()}{' '}
                          <strong>W</strong>
                        </Grid.Column>

                        <Grid.Column width={3}>
                          <Icon name="line graph" color="blue"></Icon>
                          ROI: <strong>H: </strong>
                          {calculateMainHeatingROI(
                            avgCurrentMainHeatHeatingCost.heating -
                              calculateMainHeatingUniversal(
                                avgCurrentMainHeatHeatingCost.heating,
                                avgUpgradedMainHeatHeatingCost.heating,
                                currentMainHeatCost.value,
                                upgradedMainHeatCost.value
                              ),
                            calculateMainHeatCost(
                              upgradedMainHeatCost.value,
                              mainHeatPrices,
                              totalAreaFilter
                            )
                          )}
                          %{'    '} | {'    '}
                          <strong>W: </strong>
                          {calculateMainHeatingROI(
                            avgCurrentMainHeatHeatingCost.hotwater -
                              calculateMainHeatingUniversal(
                                avgCurrentMainHeatHeatingCost.hotwater,
                                avgUpgradedMainHeatHeatingCost.hotwater,
                                currentMainHeatCost.value,
                                upgradedMainHeatCost.value
                              ),
                            calculateMainHeatCost(
                              upgradedMainHeatCost.value,
                              mainHeatPrices,
                              totalAreaFilter
                            )
                          )}{' '}
                          % per year
                        </Grid.Column>
                      </Grid>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={16}>
                      <Grid>
                        <Grid.Column width={2}>
                          <Dropdown
                            text="Lighting"
                            options={basicOptions.filter(
                              (e) =>
                                e.value.comparator >
                                currentLightingCost.comparator
                            )}
                            onChange={(e, { value }) => {
                              setUpgradedLightingCost({
                                value: value.text,
                                comparator: value.comparator,
                              });
                              console.log(value);
                            }}
                          ></Dropdown>
                        </Grid.Column>
                        <Grid.Column width={3}>
                          {avgUpgradedLightingCost && (
                            <>
                              <Icon
                                name="lightbulb"
                                size="large"
                                color="orange"
                              ></Icon>
                              {calculateLightingUniversal(
                                avgCurrentLightingCost,
                                avgUpgradedLightingCost,
                                currentLightingCost.value,
                                upgradedLightingCost.value
                              )}{' '}
                              £
                            </>
                          )}
                        </Grid.Column>
                        <Grid.Column width={3}>
                          Upgraded Outlet Cost:
                          {calculateLightingCost(
                            upgradedLightingCost.value,
                            numOutlets,
                            lightingPrices,
                            totalAreaFilter
                          )}
                          £
                        </Grid.Column>

                        <Grid.Column width={3}>
                          <Icon
                            name="money bill alternate"
                            color="green"
                          ></Icon>
                          Saving:
                          {(
                            avgCurrentLightingCost -
                            calculateLightingUniversal(
                              avgCurrentLightingCost,
                              avgUpgradedLightingCost,
                              currentLightingCost.value,
                              upgradedLightingCost.value
                            )
                          ).toFixed()}
                          £
                        </Grid.Column>

                        <Grid.Column width={3}>
                          <Icon name="line graph" color="blue"></Icon>
                          ROI:
                          {calculateLightingROI(
                            avgCurrentLightingCost -
                              calculateLightingUniversal(
                                avgCurrentLightingCost,
                                avgUpgradedLightingCost,
                                currentLightingCost.value,
                                upgradedLightingCost.value
                              ),
                            calculateLightingCost(
                              upgradedLightingCost.value,
                              numOutlets,
                              lightingPrices,
                              totalAreaFilter
                            )
                          )}
                          % per year
                        </Grid.Column>
                      </Grid>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </>
  );
};
