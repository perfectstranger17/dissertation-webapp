import { gql } from '@apollo/client';
//?_limit=20
export const GET_DOCUMENTS = gql`
  query GET_DOCUMENTS {
    documents @rest(type: "documents", path: "documents") {
      ADDRESS1
      POSTCODE
      CURRENT_ENERGY_RATING
      CURRENT_ENERGY_EFFICIENCY
      PROPERTY_TYPE
      BUILT_FORM
      ENERGY_CONSUMPTION_CURRENT
      CO2_EMISSIONS_CURRENT
      CO2_EMISS_CURR_PER_FLOOR_AREA
      LIGHTING_COST_CURRENT
      HEATING_COST_CURRENT
      HOT_WATER_COST_CURRENT
      TOTAL_FLOOR_AREA
      ENERGY_TARIFF
      MAINS_GAS_FLAG
      FLOOR_LEVEL
      FLAT_STOREY_COUNT
      GLAZED_TYPE
      NUMBER_HABITABLE_ROOMS
      NUMBER_HEATED_ROOMS
      LOW_ENERGY_LIGHTING
      HOTWATER_DESCRIPTION
      HOT_WATER_ENERGY_EFF
      FLOOR_DESCRIPTION
      WINDOWS_DESCRIPTION
      WINDOWS_ENERGY_EFF
      WALLS_DESCRIPTION
      WALLS_ENERGY_EFF
      ROOF_DESCRIPTION
      ROOF_ENERGY_EFF
      MAINHEAT_DESCRIPTION
      MAINHEAT_ENERGY_EFF
      MAINHEATCONT_DESCRIPTION
      MAINHEATC_ENERGY_EFF
      LIGHTING_DESCRIPTION
      LIGHTING_ENERGY_EFF
      MAIN_FUEL
      CONSTRUCTION_AGE_BAND
      MECHANICAL_VENTILATION
      FIXED_LIGHTING_OUTLETS_COUNT
    }
  }
`;

//     # LMK_KEY
//   # ADDRESS2
//       # ADDRESS3
//       # BUILDING_REFERENCE_NUMBER
//   # POTENTIAL_ENERGY_RATING
//   # POTENTIAL_ENERGY_EFFICIENCY
//     # INSPECTION_DATE
//       # LOCAL_AUTHORITY
//       # CONSTITUENCY
//       # COUNTY
//       # LODGEMENT_DATE
//       # TRANSACTION_TYPE
//       # ENVIRONMENT_IMPACT_CURRENT
//       # ENVIRONMENT_IMPACT_POTENTIAL
//       # ENERGY_CONSUMPTION_POTENTIAL
//      # CO2_EMISSIONS_POTENTIAL
//       # LIGHTING_COST_POTENTIAL
//       # HEATING_COST_POTENTIAL
// # HOT_WATER_COST_POTENTIAL
//       # FLAT_TOP_STOREY
//   # MAIN_HEATING_CONTROLS
//       # MULTI_GLAZE_PROPORTION
//    # GLAZED_AREA
//       # EXTENSION_COUNT
// # NUMBER_OPEN_FIREPLACES
//     # HOT_WATER_ENV_EFF
//  # FLOOR_ENERGY_EFF
//       # FLOOR_ENV_EFF
//   # WINDOWS_ENV_EFF
//      # WALLS_ENV_EFF
//       # SECONDHEAT_DESCRIPTION
//       # SHEATING_ENERGY_EFF
//       # SHEATING_ENV_EFF
//       # ROOF_ENV_EFF
//   # MAINHEAT_ENV_EFF
//    # MAINHEATC_ENV_EFF
//   # LIGHTING_ENV_EFF
//   # WIND_TURBINE_COUNT
//       # HEAT_LOSS_CORRIDOOR
//       # UNHEATED_CORRIDOR_LENGTH
//       # FLOOR_HEIGHT
//       # PHOTO_SUPPLY
//       # SOLAR_WATER_HEATING_FLAG
//       # MECHANICAL_VENTILATION
//       # ADDRESS
//       # LOCAL_AUTHORITY_LABEL
//       # CONSTITUENCY_LABEL
//       # POSTTOWN
//      # LODGEMENT_DATETIME
//       # TENURE
//     # LOW_ENERGY_FIXED_LIGHT_COUNT
