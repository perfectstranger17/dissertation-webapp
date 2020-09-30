import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_DOCUMENTS } from '../queries/index';
import _ from 'lodash';
import {
  Table,
  Menu,
  Header,
  Modal,
  Dropdown,
  Transition,
  Icon,
  Button,
  Input,
  Grid,
  Divider,
  Segment,
  Portal,
  Message,
  Label,
} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { DocumentsTable } from './DocumentsTable';
import { Link } from 'react-router-dom';

export const MainComponent = () => {
  //data loader
  const { loading, error, data } = useQuery(GET_DOCUMENTS, {
    fetchPolicy: 'network-only',
  });

  //filters
  const [buildingTypeFilter, setBuildingTypeFilter] = useState(null);
  const [builtFormFilter, setbuiltFormFilter] = useState(null);
  const [minTotalArea, setMinTotalArea] = useState(0);
  const [maxTotalArea, setMaxTotalArea] = useState(1000);
  const [windowsFilter, setWindowsFilter] = useState(null);
  const [wallFilter, setWallFilter] = useState(null);
  const [mainHeatFilter, setMainHeatFilter] = useState(null);
  const [lightingFilter, setLightingFilter] = useState(null);

  //averages
  const [avgLightingCost, setAvglightingCost] = useState(null);
  const [avgHeatingCost, setAvgHeatingCost] = useState(null);
  const [avgHotWaterCost, setAvgHotWaterCost] = useState(null);
  const [avgEnergyConsumption, setAvgEnergyConsumption] = useState(null);
  const [avgEnergyRating, setAvgEnergyRating] = useState(null);

  //refined data state
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (data) {
      setFilteredData(data.documents);

      // setFilteredData(_.filter(data.documents, fullFilter));
      // console.log(filteredData);

      if (
        buildingTypeFilter ||
        builtFormFilter ||
        minTotalArea ||
        maxTotalArea ||
        mainHeatFilter ||
        wallFilter ||
        windowsFilter ||
        lightingFilter
      ) {
        setFilteredData(
          data.documents
            .filter(
              (obj) =>
                obj.TOTAL_FLOOR_AREA >= minTotalArea &&
                obj.TOTAL_FLOOR_AREA <= maxTotalArea
            )
            .filter((obj) =>
              buildingTypeFilter
                ? obj.PROPERTY_TYPE === buildingTypeFilter
                : obj
            )
            .filter((obj) =>
              builtFormFilter ? obj.BUILT_FORM === builtFormFilter : obj
            )
            .filter((obj) =>
              windowsFilter ? obj.WINDOWS_ENERGY_EFF === windowsFilter : obj
            )
            .filter((obj) =>
              wallFilter ? obj.WALLS_ENERGY_EFF === wallFilter : obj
            )
            .filter((obj) =>
              lightingFilter ? obj.LIGHTING_ENERGY_EFF === lightingFilter : obj
            )
            .filter((obj) =>
              mainHeatFilter ? obj.MAINHEAT_ENERGY_EFF === mainHeatFilter : obj
            )
        );
      }
    }
  }, [
    buildingTypeFilter,
    builtFormFilter,
    minTotalArea,
    maxTotalArea,
    windowsFilter,
    wallFilter,
    mainHeatFilter,
    lightingFilter,
    data,
  ]);

  useEffect(() => {
    setAvglightingCost(
      _.meanBy(filteredData, (doc) => doc.LIGHTING_COST_CURRENT)
    );
    setAvgHeatingCost(
      _.meanBy(filteredData, (doc) => doc.HEATING_COST_CURRENT)
    );

    setAvgHotWaterCost(
      _.meanBy(filteredData, (doc) => doc.HOT_WATER_COST_CURRENT)
    );

    // setAvgEnergyRating(
    setAvgEnergyRating(
      _.chain(filteredData)
        .countBy('CURRENT_ENERGY_RATING', ['desc']) // C:100 A: 60 B: 50 :D:30
        .keys()
        .first()
        .value()
    );

    setAvgEnergyConsumption(
      _.chain(filteredData)
        .countBy('ENERGY_CONSUMPTION_CURRENT', ['desc'])
        .keys()
        .first()
        .value()
    );
    // );
  }, [filteredData]);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  // console.log(data);

  const buildingTypeOptions = [
    {
      key: 'All',
      text: 'All',
      value: null,
      content: 'All',
    },
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
      key: 'All',
      text: 'All',
      value: null,
      content: 'All',
    },
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

    {
      key: 'NO DATA!',
      text: 'NO DATA!',
      value: 'NO DATA!',
      content: 'NO DATA!',
    },
  ];

  const basicOptions = [
    {
      key: 'All',
      text: 'All',
      value: null,
      content: 'All',
    },
    {
      key: 'N/A',
      text: 'N/A',
      value: 'N/A',
      content: 'N/A',
    },
    {
      key: 'Very Poor',
      text: 'Very Poor',
      value: 'Very Poor',
      content: 'Very Poor',
    },
    {
      key: 'Poor',
      text: 'Poor',
      value: 'Poor',
      content: 'Poor',
    },
    {
      key: 'Average',
      text: 'Average',
      value: 'Average',
      content: 'Average',
    },
    {
      key: 'Good',
      text: 'Good',
      value: 'Good',
      content: 'Good',
    },
    {
      key: 'Very Good',
      text: 'Very Good',
      value: 'Very Good',
      content: 'Very Good',
    },
  ];

  return (
    <>
      <Menu>
        <Menu.Item>
          <Menu.Header as="h3">Building</Menu.Header>
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
        <Menu.Item>
          <Menu.Header as={'h3'}>Total Floor Area:</Menu.Header>
        </Menu.Item>
        <Menu.Item>
          <Input
            style={{ width: '4vw', marginLeft: '1vw' }}
            placeholder={'min'}
            value={minTotalArea}
            onChange={(e, { value }) => setMinTotalArea(value)}
            type="number"
          ></Input>
          <Input
            style={{ width: '4vw', marginLeft: '1vw' }}
            placeholder={'max'}
            value={maxTotalArea}
            onChange={(e, { value }) => setMaxTotalArea(value)}
            type="number"
          ></Input>
        </Menu.Item>
        <Menu.Item>
          <Menu.Header as="h3">Energy Efficiency</Menu.Header>
        </Menu.Item>
        <Dropdown
          text="Windows"
          options={basicOptions}
          simple
          item
          onChange={(e, { value }) => setWindowsFilter(value)}
        />{' '}
        <Dropdown
          text="Walls"
          options={basicOptions}
          simple
          item
          onChange={(e, { value }) => setWallFilter(value)}
        />{' '}
        <Dropdown
          text="Main Heat"
          options={basicOptions}
          simple
          item
          onChange={(e, { value }) => setMainHeatFilter(value)}
        />{' '}
        <Dropdown
          text="Lighting"
          options={basicOptions}
          simple
          item
          onChange={(e, { value }) => setLightingFilter(value)}
        />{' '}
        <Menu.Item>
          <Button as={Link} color="blue" to="/upgrades">
            Upgrades Calculator
          </Button>
        </Menu.Item>
      </Menu>
      <Segment
        basic
        style={{ width: '200vw', minHeight: '100vh', overflow: 'auto' }}
      >
        <DocumentsTable
          // buildingTypeFilter={buildingTypeFilter}
          avgHeatingCost={avgHeatingCost}
          avgHotWaterCost={avgHotWaterCost}
          avgLightingCost={avgLightingCost}
          avgEnergyRating={avgEnergyRating}
          avgEnergyConsumption={avgEnergyConsumption}
          data={filteredData}
          upgradesData={data.documents}
          basicOptions={basicOptions}
          windowsFilter={windowsFilter}
          mainHeatFilter={mainHeatFilter}
          lightingFilter={lightingFilter}
          wallFilter={wallFilter}
        ></DocumentsTable>
      </Segment>
    </>
  );
};
