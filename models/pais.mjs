import mongoose from 'mongoose';

const paisSchema = new mongoose.Schema(
  {
    name: {
      official: {
        type: String,
        required: true,
      },
      common: {
        type: String,
      },
      nativeName: {
        spa: {
          official: {
            type: String,
            required: true,
          },
          common: {
            type: String,
          },
        },
      },
    },
    independent: { type: Boolean, default: true },
    status: { type: String, default: "officially-assigned" },
    unMember: { type: Boolean, default: false },
    currencies: { type: Object },
    capital: { type: Array, required: true },
    region: { type: String },
    subregion: { type: String },
    languages: { type: Object },
    latlng: {
      type: Array,
      validate: [
        (val) => val.length === 0 || val.length === 2,
        "{PATH} must be 2 (latitude and longitude)",
      ],
    },
    landlocked: { type: Boolean, default: true },
    borders: { type: Array, required: true },
    area: { type: Number, required: true },
    flag: { type: String },
    maps: { type: Object },
    population: { type: Number, required: true },
    gini: {
      type: Map,
      of: {
        type: Number,
        min: 0,
        max: 100,
        // validate: {
        //   validator: (value) => !isNaN(value),
        //   message: "{VALUE} no es un número valido",
        // },
      },
    },
    fifa: { type: String },
    timezones: { type: Array, required: true },
    continents: { type: Array, required: true },
    flags: { type: Object },
    startOfWeek: { type: String },
    capitalInfo: { type: Object },
    creador: { type: String, required: true },
  },
  { collection: "Grupo-05" }
);

export default mongoose.model('Pais', paisSchema);
