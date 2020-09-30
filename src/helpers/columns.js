import React from 'react';
import {
  Icon,
  Segment,
  Progress,
  Grid,
  Loader,
  Label,
  Divider,
} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import _ from 'lodash';
const columns = [
  // {
  //   // Make an expander cell
  //   Header: () => null, // No header
  //   id: 'expander', // It needs an ID
  //   Cell: ({ row }) => <></>,
  // },
  {
    Header: () => {
      return (
        <>
          <Icon name="map"></Icon> Address information
        </>
      );
    },
    id: 'POSTCODE',
    accessor: (r) => {},

    Cell: (obj) => {
      return (
        <>
          <Segment raised>
            Address: {obj.row.original.ADDRESS1}
            <Divider></Divider>
            Postcode {obj.row.original.POSTCODE}
          </Segment>
        </>
      );
    },
  },
  {
    Header: () => {
      return (
        <>
          <Icon name="home"></Icon> Property Info
        </>
      );
    },
    id: 'PROPERTY_TYPE',
    accessor: (r) => {},

    Cell: (obj) => {
      return (
        <>
          <Segment raised>
            Property Type: {obj.row.original.PROPERTY_TYPE}
            <Divider></Divider>
            Built Form: {obj.row.original.BUILT_FORM}
            <Divider></Divider>
            <Grid>
              <Grid.Column width={8}>
                Total floor Area: {obj.row.original.TOTAL_FLOOR_AREA}
              </Grid.Column>
              <Grid.Column width={8}>
                Floor Level {obj.row.original.FLOOR_LEVEL}
              </Grid.Column>
            </Grid>
            {/* Postcode {obj.row.original.POSTCODE} */}
          </Segment>
        </>
      );
    },
  },
  {
    Header: () => {
      return (
        <>
          <Icon name="money bill alternate"></Icon> Costs Info
        </>
      );
    },
    id: 'ENERGY_CONSUMPTION_CURRENT',
    accessor: (r) => {},

    Cell: (obj) => {
      return (
        <>
          <Segment raised>
            Energy consumption (CURRENT):{' '}
            {obj.row.original.ENERGY_CONSUMPTION_CURRENT} KWh/m2
            <Divider></Divider>
            Lighting cost (CURRENT): {obj.row.original.LIGHTING_COST_CURRENT} £
            <Divider></Divider>
            Heating cost (CURRENT): {obj.row.original.HEATING_COST_CURRENT} £
            <Divider></Divider>
            Hot water cost (CURRENT): {
              obj.row.original.HOT_WATER_COST_CURRENT
            }{' '}
            £<Divider></Divider>
            Current Energy Rating: {obj.row.original.CURRENT_ENERGY_RATING}
          </Segment>
        </>
      );
    },
  },
  {
    Header: () => {
      return (
        <>
          <Icon name="building"></Icon> Building Characteristics
        </>
      );
    },
    id: 'GLAZED_TYPE',
    accessor: (r) => {},

    Cell: (obj) => {
      return (
        <>
          <Segment raised>
            Glazed Type: {obj.row.original.GLAZED_TYPE}
            <Divider></Divider>
            Windows Description {obj.row.original.WINDOWS_DESCRIPTION}
            <Divider></Divider>
            Roof description: {obj.row.original.ROOF_DESCRIPTION}
            <Divider></Divider>
            Main heat description: {obj.row.original.MAINHEAT_DESCRIPTION}
            <Divider></Divider>
            Walls description: {obj.row.original.WALLS_DESCRIPTION}
            <Divider></Divider>
            Main Fuel: {obj.row.original.MAIN_FUEL}
            <Divider></Divider>
            No of Habitable Roooms: {obj.row.original.NUMBER_HABITABLE_ROOMS}
          </Segment>
        </>
      );
    },
  },
  {
    Header: () => {
      return (
        <>
          <Icon name="leaf"></Icon> Efficiency Characteristics
        </>
      );
    },
    id: 'WINDOWS_ENERGY_EFF',
    accessor: (r) => {},

    Cell: (obj) => {
      return (
        <>
          <Segment raised>
            Windows energy efficiency: {obj.row.original.WINDOWS_ENERGY_EFF}
            <Divider></Divider>
            Walls energy efficiency {obj.row.original.WALLS_ENERGY_EFF}
            <Divider></Divider>
            Roof energy efficiency: {obj.row.original.ROOF_ENERGY_EFF}
            <Divider></Divider>
            Main heat energy efficiency: {obj.row.original.MAINHEAT_ENERGY_EFF}
            <Divider></Divider>
            Lighting energy efficiency: {obj.row.original.LIGHTING_ENERGY_EFF}
          </Segment>
        </>
      );
    },
  },
  {
    Header: () => {
      return (
        <>
          <Icon name="info circle"></Icon> Extra Info
        </>
      );
    },
    id: 'FIXED_LIGHTING_OUTLETS_COUNT',
    accessor: (r) => {},

    Cell: (obj) => {
      return (
        <>
          <Segment>
            Fixed Lighting outlets count:{' '}
            {obj.row.original.FIXED_LIGHTING_OUTLETS_COUNT}
            <Divider></Divider>
            Low energy fixed lighting count{' '}
            {obj.row.original.LOW_ENERGY_LIGHTING} %<Divider></Divider>
            Mechanical Ventilation: {obj.row.original.MECHANICAL_VENTILATION}
            <Divider></Divider>
            Mains Gas Flag: {obj.row.original.MAINS_GAS_FLAG}
          </Segment>
        </>
      );
    },
  },

  //  ADDRESS1
  //     POSTCODE
  //     CURRENT_ENERGY_RATING
  //     CURRENT_ENERGY_EFFICIENCY
  //     PROPERTY_TYPE
  //     BUILT_FORM
  //     ENERGY_CONSUMPTION_CURRENT
  //     CO2_EMISSIONS_CURRENT
  //     CO2_EMISS_CURR_PER_FLOOR_AREA
  //     LIGHTING_COST_CURRENT
  //     HEATING_COST_CURRENT
  //     HOT_WATER_COST_CURRENT
  //     TOTAL_FLOOR_AREA
  //     ENERGY_TARIFF
  //     MAINS_GAS_FLAG
  //     FLOOR_LEVEL
  //     FLAT_STOREY_COUNT
  //     GLAZED_TYPE
  //     NUMBER_HABITABLE_ROOMS
  //     NUMBER_HEATED_ROOMS
  //     LOW_ENERGY_LIGHTING
  //     HOTWATER_DESCRIPTION
  //     HOT_WATER_ENERGY_EFF
  //     FLOOR_DESCRIPTION
  //     WINDOWS_DESCRIPTION
  //     WINDOWS_ENERGY_EFF
  //     WALLS_DESCRIPTION
  //     WALLS_ENERGY_EFF
  //     ROOF_DESCRIPTION
  //     ROOF_ENERGY_EFF
  //     MAINHEAT_DESCRIPTION
  //     MAINHEAT_ENERGY_EFF
  //     MAINHEATCONT_DESCRIPTION
  //     MAINHEATC_ENERGY_EFF
  //     LIGHTING_DESCRIPTION
  //     LIGHTING_ENERGY_EFF
  //     MAIN_FUEL
  //     CONSTRUCTION_AGE_BAND
  //     FIXED_LIGHTING_OUTLETS_COUNT
];

export default columns;
