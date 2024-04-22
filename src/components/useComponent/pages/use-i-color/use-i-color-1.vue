<template>
  <div style="padding: 20px">
    <div class="header">
      <div class="color-tabs">
        <div
          class="color-circle"
          v-for="(color, idx) in tabs"
          :key="color"
          :style="getVariable(color)"
          @click="activeIdx = idx"
        >
          <transition name="ease-in-out">
            <div class="triangle" v-show="idx === activeIdx" />
          </transition>
        </div>
      </div>
      <div class="random-button" @click="randomColor">
        <img
          src="@/assets/icons/refresh.svg"
          alt=""
          style="width: 15px; height: 15px; margin-right: 10px"
        />
        换一批
      </div>
    </div>
    <div class="blocks">
      <i-color-box
        v-for="(,idx) in colorList"
        :key="idx"
        :color="colorList[idx].color"
        :label="colorList[idx].label"
        showOpacity
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, reactive } from "vue";

const tabs = [
  "black",
  "blue",
  "brown",
  "orange",
  "purple",
  "pink",
  "red",
  "white",
  "yellow",
  "linear-gradient(to left, #40e0d0, #ff8c00, #ff0080)",
];

const colorTable = [
  {
    label: "black",
    colors: [
      {
        label: "Black Box",
        color: "#0f282f",
      },
      {
        label: "Black Cat",
        color: "#2e2f31",
      },
      {
        label: "Black Chasm",
        color: "#102c33",
      },
      {
        label: "Black Cherry",
        color: "#2c1620",
      },
      {
        label: "Black Chestnut Oak",
        color: "#252321",
      },
      {
        label: "Black Chocolate",
        color: "#441100",
      },
      {
        label: "Black Coffee",
        color: "#3e3231",
      },
      {
        label: "Black Coral",
        color: "#54626f",
      },
      {
        label: "Black Dahlia",
        color: "#4e434d",
      },
      {
        label: "Black Diamond Apple",
        color: "#8a779a",
      },
      {
        label: "Black Dragon's Cauldron",
        color: "#545562",
      },
      {
        label: "Black Drop",
        color: "#90abd9",
      },
      {
        label: "Black Elder",
        color: "#a66e7a",
      },
      {
        label: "Black Elegance",
        color: "#50484a",
      },
      {
        label: "Black Emerald",
        color: "#12221d",
      },
      {
        label: "Black Evergreen",
        color: "#45524f",
      },
      {
        label: "Black Feather",
        color: "#112222",
      },
      {
        label: "Black Flame",
        color: "#484b5a",
      },
      {
        label: "Black Forest",
        color: "#5e6354",
      },
      {
        label: "Black Forest Blue",
        color: "#29485a",
      },
      {
        label: "Black Forest Green",
        color: "#424740",
      },
      {
        label: "Black Fox",
        color: "#4f4842",
      },
      {
        label: "Black Garnet",
        color: "#4e4444",
      },
      {
        label: "Black Glaze",
        color: "#001111",
      },
      {
        label: "Black Green",
        color: "#384e49",
      },
      {
        label: "Black Is Beautiful",
        color: "#552222",
      },
      {
        label: "Black Jasmine Rice",
        color: "#74563d",
      },
      {
        label: "Black Kite",
        color: "#351e1c",
      },
      {
        label: "Black Knight",
        color: "#010b13",
      },
      {
        label: "Black Lacquer",
        color: "#3f3e3e",
      },
      {
        label: "Black Lead",
        color: "#474c4d",
      },
      {
        label: "Black Leather Jacket",
        color: "#253529",
      },
      {
        label: "Black Liquorice",
        color: "#3a3b3b",
      },
      {
        label: "Black Locust",
        color: "#646763",
      },
      {
        label: "Black Magic",
        color: "#4f4554",
      },
      {
        label: "Black Marlin",
        color: "#383740",
      },
      {
        label: "Black Mesa",
        color: "#222211",
      },
      {
        label: "Black Metal",
        color: "#060606",
      },
      {
        label: "Black Mocha",
        color: "#4b4743",
      },
      {
        label: "Black Oak",
        color: "#4e4f4e",
      },
      {
        label: "Black of Night",
        color: "#323639",
      },
      {
        label: "Black Olive",
        color: "#3b3c36",
      },
      {
        label: "Black Onyx",
        color: "#2a272c",
      },
      {
        label: "Black Orchid",
        color: "#525463",
      },
      {
        label: "Black Out",
        color: "#222222",
      },
      {
        label: "Black Panther",
        color: "#424242",
      },
      {
        label: "Black Pearl",
        color: "#1e272c",
      },
      {
        label: "Black Pine Green",
        color: "#33654a",
      },
      {
        label: "Black Plum",
        color: "#77606f",
      },
      {
        label: "Black Pool",
        color: "#4f5552",
      },
      {
        label: "Black Panther",
        color: "#424242",
      },
      {
        label: "Black Pearl",
        color: "#1e272c",
      },
      {
        label: "Black Pine Green",
        color: "#33654a",
      },
      {
        label: "Black Plum",
        color: "#77606f",
      },
      {
        label: "Black Pool",
        color: "#4f5552",
      },
      {
        label: "Black Powder",
        color: "#34342c",
      },
      {
        label: "Black Power",
        color: "#654b37",
      },
      {
        label: "Black Pudding",
        color: "#a44a56",
      },
      {
        label: "Black Queen",
        color: "#694d27",
      },
      {
        label: "Black Raspberry",
        color: "#16110d",
      },
      {
        label: "Black Ribbon",
        color: "#484c51",
      },
      {
        label: "Black Ribbon",
        color: "#484c51",
      },
      {
        label: "Black River Falls",
        color: "#343e54",
      },
      {
        label: "Black Rock",
        color: "#2c2d3c",
      },
      {
        label: "Black Rooster",
        color: "#331111",
      },
      {
        label: "Black Rose",
        color: "#532934",
      },
      {
        label: "Black Russian",
        color: "#24252b",
      },
      {
        label: "Black Sabbath",
        color: "#220022",
      },
      {
        label: "Black Sable",
        color: "#434b4d",
      },
      {
        label: "Black Safflower",
        color: "#302833",
      },
      {
        label: "Black Sand",
        color: "#5b4e4b",
      },
      {
        label: "Black Sapphire",
        color: "#434555",
      },
      {
        label: "Black Shadows",
        color: "#bfafb2",
      },
      {
        label: "Black Sheep",
        color: "#0f0d0d",
      },
      {
        label: "Black Slug",
        color: "#332211",
      },
      {
        label: "Black Space",
        color: "#545354",
      },
      {
        label: "Black Spruce",
        color: "#4c5752",
      },
      {
        label: "Black Squeeze",
        color: "#e5e6df",
      },
      {
        label: "Black Suede",
        color: "#434342",
      },
      {
        label: "Black Swan",
        color: "#332200",
      },
      {
        label: "Black Tie",
        color: "#464647",
      },
      {
        label: "Black Tortoise",
        color: "#353235",
      },
      {
        label: "Black Truffle",
        color: "#463d3e",
      },
      {
        label: "Black Turmeric",
        color: "#2c4364",
      },
      {
        label: "Black Velvet",
        color: "#222233",
      },
      {
        label: "Black Violet",
        color: "#2b2c42",
      },
      {
        label: "Black Walnut",
        color: "#5e4f46",
      },
      {
        label: "Black Wash",
        color: "#0c0c0c",
      },
      {
        label: "Black Water",
        color: "#2e4846",
      },
      {
        label: "Black White",
        color: "#e5e4db",
      },
      {
        label: "Blackadder",
        color: "#292c2c",
      },
      {
        label: "Blackberry",
        color: "#43182f",
      },
      {
        label: "Blackberry Black",
        color: "#2e2848",
      },
      {
        label: "Blackberry Burgundy",
        color: "#4c3938",
      },
      {
        label: "Blackberry Cobbler",
        color: "#404d6a",
      },
      {
        label: "Blackberry Cordial",
        color: "#4f3357",
      },
      {
        label: "Blackberry Cream",
        color: "#d9d3da",
      },
      {
        label: "Blackberry Deep Red",
        color: "#633654",
      },
      {
        label: "Blackberry Farm",
        color: "#62506b",
      },
      {
        label: "Blackberry Harvest",
        color: "#504358",
      },
      {
        label: "Blackberry Jam",
        color: "#87657e",
      },
    ],
  },
  {
    label: "blue",
    colors: [
      {
        label: "Abyssal Anchorfish Blue",
        color: "#1b2632",
      },
      {
        label: "Abyssal Blue",
        color: "#00035b",
      },
      {
        label: "Academic Blue",
        color: "#2c3e56",
      },
      {
        label: "Accent Green Blue",
        color: "#208468",
      },
      {
        label: "Adamantine Blue",
        color: "#46adf9",
      },
      {
        label: "Adirondack Blue",
        color: "#74858f",
      },
      {
        label: "Admiral Blue",
        color: "#50647f",
      },
      {
        label: "Adriatic Blue",
        color: "#5c899b",
      },
      {
        label: "Advertising Blue",
        color: "#0081a8",
      },
      {
        label: "Aegean Blue",
        color: "#4f6d83",
      },
      {
        label: "Aero Blue",
        color: "#c0e8d5",
      },
      {
        label: "After Work Blue",
        color: "#24246d",
      },
      {
        label: "Aggressive Baby Blue",
        color: "#6fffff",
      },
      {
        label: "Ahoy! Blue",
        color: "#0082a1",
      },
      {
        label: "Apple II Blue",
        color: "#93d6bf",
      },
      {
        label: "Aqua Blue",
        color: "#79b6bc",
      },
      {
        label: "Aquamarine Blue",
        color: "#71d9e2",
      },
      {
        label: "Aquarelle Blue",
        color: "#bfe0e4",
      },
      {
        label: "Aquarium Blue",
        color: "#66cdaa",
      },
      {
        label: "Aragonite Blue",
        color: "#6a95b1",
      },
      {
        label: "Architecture Blue",
        color: "#7195a6",
      },
      {
        label: "Arctic Blue",
        color: "#95d6dc",
      },
      {
        label: "Aristocratic Blue",
        color: "#354655",
      },
      {
        label: "Aroma Blue",
        color: "#96d2d6",
      },
      {
        label: "Artist Blue",
        color: "#01343a",
      },
      {
        label: "Aruba Blue",
        color: "#7dd4d6",
      },
      {
        label: "Asagi Blue",
        color: "#48929b",
      },
      {
        label: "Ash Blue",
        color: "#c0c6c9",
      },
      {
        label: "Bahama Blue",
        color: "#25597f",
      },
      {
        label: "Baharroth Blue",
        color: "#58c1cd",
      },
      {
        label: "Baja Blue",
        color: "#66a6d9",
      },
      {
        label: "Bakos Blue",
        color: "#273f4b",
      },
      {
        label: "Baleine Blue",
        color: "#165a90",
      },
      {
        label: "Ball Blue",
        color: "#21abcd",
      },
      {
        label: "Ballad Blue",
        color: "#c0ceda",
      },
      {
        label: "Ballet Blue",
        color: "#afc4d9",
      },
      {
        label: "Ballroom Blue",
        color: "#a6b3c9",
      },
      {
        label: "Baltic Blue",
        color: "#6c969a",
      },
      {
        label: "Bank Blue",
        color: "#3e4652",
      },
      {
        label: "Barbados Blue",
        color: "#2766ac",
      },
      {
        label: "Barely Blue",
        color: "#dde0df",
      },
      {
        label: "Baroque Blue",
        color: "#95b6b5",
      },
      {
        label: "Baroque Chalk Soft Blue",
        color: "#aecccb",
      },
      {
        label: "Bashful Blue",
        color: "#6994cf",
      },
      {
        label: "Basilica Blue",
        color: "#4a9fa7",
      },
      {
        label: "Champion Blue",
        color: "#606788",
      },
      {
        label: "Champlain Blue",
        color: "#435572",
      },
      {
        label: "Chapel Blue",
        color: "#b0d2e7",
      },
      {
        label: "Charcoal Blue",
        color: "#67778a",
      },
      {
        label: "Charter Blue",
        color: "#546e91",
      },
      {
        label: "Chathams Blue",
        color: "#2c5971",
      },
      {
        label: "Chefchaouen Blue",
        color: "#a3d1e8",
      },
      {
        label: "Chetwode Blue",
        color: "#666fb4",
      },
      {
        label: "Chicago Blue",
        color: "#b6dbe9",
      },
      {
        label: "Children's Soft Blue",
        color: "#a1ced7",
      },
      {
        label: "Chilly Blue",
        color: "#8aaec3",
      },
      {
        label: "China Blue",
        color: "#5a6c80",
      },
      {
        label: "Dusky Alpine Blue",
        color: "#296767",
      },
      {
        label: "Dusty Blue",
        color: "#8093a4",
      },
      {
        label: "Dutch Blue",
        color: "#4e6594",
      },
      {
        label: "Dutch Tile Blue",
        color: "#9aabab",
      },
      {
        label: "Dying Storm Blue",
        color: "#111166",
      },
      {
        label: "Dynamic Blue",
        color: "#0192c6",
      },
      {
        label: "Eames for Blue",
        color: "#466b82",
      },
      {
        label: "Eastern Blue",
        color: "#00879f",
      },
      {
        label: "Eastern Bluebird",
        color: "#748695",
      },
      {
        label: "Easy Breezy Blue",
        color: "#9eb1ae",
      },
      {
        label: "Echo Blue",
        color: "#a4afcd",
      },
      {
        label: "Eclipse Blue",
        color: "#456074",
      },
      {
        label: "Effervescent Blue",
        color: "#00315a",
      },
      {
        label: "Frozen Blue",
        color: "#a5c5d9",
      },
      {
        label: "Fuchsia Blue",
        color: "#7a58c1",
      },
      {
        label: "Fun Blue",
        color: "#335083",
      },
      {
        label: "Functional Blue",
        color: "#3f6086",
      },
      {
        label: "Galaxy Blue",
        color: "#2d5284",
      },
      {
        label: "Galenite Blue",
        color: "#374b52",
      },
      {
        label: "Galleon Blue",
        color: "#3f95bf",
      },
      {
        label: "Galleria Blue",
        color: "#8fa4ac",
      },
      {
        label: "Gallery Blue",
        color: "#9bbce4",
      },
      {
        label: "Ganon Blue",
        color: "#a4e4fc",
      },
      {
        label: "Garish Blue",
        color: "#00a4b1",
      },
      {
        label: "Garnet Stone Blue",
        color: "#384866",
      },
      {
        label: "Gemstone Blue",
        color: "#004f6d",
      },
      {
        label: "Genteel Blue",
        color: "#698eb3",
      },
      {
        label: "Haze Blue",
        color: "#b7c0be",
      },
      {
        label: "Hazy Blue",
        color: "#bcc8cc",
      },
      {
        label: "Heavenly Blue",
        color: "#a3bbcd",
      },
      {
        label: "Heavy Blue",
        color: "#2c5674",
      },
      {
        label: "Heavy Blue Grey",
        color: "#9fabaf",
      },
      {
        label: "Heisenberg Blue",
        color: "#70d4fb",
      },
      {
        label: "Hera Blue",
        color: "#7777ee",
      },
      {
        label: "Heritage Blue",
        color: "#5296b7",
      },
      {
        label: "Heroic Blue",
        color: "#1166ff",
      },
      {
        label: "Hey Blue!",
        color: "#16f8ff",
      },
      {
        label: "High Blue",
        color: "#4ca8e0",
      },
      {
        label: "High Elf Blue",
        color: "#8cbed6",
      },
      {
        label: "Highlighter Blue",
        color: "#3aafdc",
      },
      {
        label: "Infinitesimal Blue",
        color: "#bddde1",
      },
      {
        label: "Ingénue Blue",
        color: "#334c5d",
      },
      {
        label: "Ink Blue",
        color: "#0c5a77",
      },
      {
        label: "Inky Blue",
        color: "#4e7287",
      },
      {
        label: "Innocent Blue",
        color: "#91b3d0",
      },
      {
        label: "Inoffensive Blue",
        color: "#114477",
      },
      {
        label: "Insignia Blue",
        color: "#313f58",
      },
      {
        label: "Insomniac Blue",
        color: "#110077",
      },
      {
        label: "Interdimensional Blue",
        color: "#360ccc",
      },
      {
        label: "Intergalactic Blue",
        color: "#afe0ef",
      },
      {
        label: "Intermediate Blue",
        color: "#56626e",
      },
      {
        label: "International Blue",
        color: "#002fa7",
      },
      {
        label: "International Klein Blue",
        color: "#002fa6",
      },
      {
        label: "Interstellar Blue",
        color: "#001155",
      },
    ],
  },
  {
    label: "brown",
    colors: [
      {
        label: "Trojan Horse Brown",
        color: "#775020",
      },
      {
        label: "Tropical Wood Brown",
        color: "#603b2a",
      },
      {
        label: "Trough Shell Brown",
        color: "#918754",
      },
      {
        label: "Turmeric Brown",
        color: "#c18116",
      },
      {
        label: "Tuscan Brown",
        color: "#6f4c37",
      },
      {
        label: "Uguisu Brown",
        color: "#645530",
      },
      {
        label: "Umber Brown",
        color: "#613936",
      },
      {
        label: "Uniform Brown",
        color: "#6e5d3e",
      },
      {
        label: "Van Dyke Brown",
        color: "#664228",
      },
      {
        label: "Vandyck Brown",
        color: "#7b5349",
      },
      {
        label: "Vanilla Bean Brown",
        color: "#362c1d",
      },
      {
        label: "Rich Brown",
        color: "#715e4f",
      },
      {
        label: "Rikan Brown",
        color: "#534a32",
      },
      {
        label: "Rikyū Brown",
        color: "#826b58",
      },
      {
        label: "Rikyūnezumi Brown",
        color: "#656255",
      },
      {
        label: "Rikyūshira Brown",
        color: "#b0927a",
      },
      {
        label: "Rokō Brown",
        color: "#665343",
      },
      {
        label: "Rokou Brown",
        color: "#8c7042",
      },
      {
        label: "Rookwood Brown",
        color: "#7f614a",
      },
      {
        label: "Rookwood Dark Brown",
        color: "#5f4d43",
      },
      {
        label: "Rookwood Medium Brown",
        color: "#6e5241",
      },
      {
        label: "Root Brown",
        color: "#6b3226",
      },
      {
        label: "Rose Brown",
        color: "#bc8e8f",
      },
      {
        label: "Rosewood Brown",
        color: "#72371c",
      },
      {
        label: "Rosy Brown",
        color: "#bc8f8f",
      },
      {
        label: "Roxy Brown",
        color: "#7a5546",
      },
      {
        label: "Royal Brown",
        color: "#523b35",
      },
      {
        label: "Ruddy Brown",
        color: "#bb6528",
      },
      {
        label: "Rugged Brown",
        color: "#694336",
      },
      {
        label: "Nearly Brown",
        color: "#a88e76",
      },
      {
        label: "Necrophilic Brown",
        color: "#dead69",
      },
      {
        label: "Night Brown",
        color: "#44281b",
      },
      {
        label: "Night Brown Black",
        color: "#322d25",
      },
      {
        label: "Nougat Brown",
        color: "#7c503f",
      },
      {
        label: "Nurude Brown",
        color: "#9d896c",
      },
      {
        label: "Nut Brown",
        color: "#86695e",
      },
      {
        label: "Nutria Fur Brown",
        color: "#514035",
      },
      {
        label: "Nutty Brown",
        color: "#8a6f44",
      },
      {
        label: "Oak Brown",
        color: "#a18d80",
      },
      {
        label: "Oakwood Brown",
        color: "#8f716e",
      },
      {
        label: "Obsidian Brown",
        color: "#523e35",
      },
      {
        label: "Ochre Brown",
        color: "#9f7b3e",
      },
      {
        label: "Leather Brown",
        color: "#97502b",
      },
      {
        label: "Leprous Brown",
        color: "#d99631",
      },
      {
        label: "Less Brown",
        color: "#756761",
      },
      {
        label: "Light Ash Brown",
        color: "#c2a487",
      },
      {
        label: "Light Brown",
        color: "#b5651d",
      },
      {
        label: "Light Brown Drab",
        color: "#b08699",
      },
      {
        label: "Light Oak Brown",
        color: "#af855c",
      },
      {
        label: "Light Pumpkin Brown",
        color: "#c2a585",
      },
      {
        label: "Limonite Brown",
        color: "#4b4433",
      },
      {
        label: "Lisbon Brown",
        color: "#423921",
      },
      {
        label: "Liver Brown",
        color: "#513e32",
      },
      {
        label: "Livid Brown",
        color: "#312a29",
      },
      {
        label: "Lizard Brown",
        color: "#795419",
      },
      {
        label: "Hot Brown",
        color: "#984218",
      },
      {
        label: "Huckleberry Brown",
        color: "#71563b",
      },
      {
        label: "Hunt Club Brown",
        color: "#938370",
      },
      {
        label: "Ibex Brown",
        color: "#482400",
      },
      {
        label: "Indigo Ink Brown",
        color: "#393432",
      },
      {
        label: "Electric Brown",
        color: "#b56257",
      },
      {
        label: "Elm Brown Red",
        color: "#b25b09",
      },
      {
        label: "Enfield Brown",
        color: "#a73211",
      },
      {
        label: "Essential Brown",
        color: "#7d6848",
      },
      {
        label: "Fairfax Brown",
        color: "#61463a",
      },
      {
        label: "Fawn Brown",
        color: "#71452a",
      },
      {
        label: "Federation Brown",
        color: "#634041",
      },
      {
        label: "Festering Brown",
        color: "#cb8e00",
      },
      {
        label: "Fiery Brown",
        color: "#5d3831",
      },
      {
        label: "Filthy Brown",
        color: "#e8aa08",
      },
      {
        label: "Flat Brown",
        color: "#754600",
      },
      {
        label: "Florence Brown",
        color: "#835740",
      },
      {
        label: "Florentine Brown",
        color: "#7a5544",
      },
      {
        label: "Cocoa Brown",
        color: "#35281e",
      },
      {
        label: "Cognac Brown",
        color: "#b98563",
      },
      {
        label: "Congo Brown",
        color: "#654d49",
      },
      {
        label: "Conker Brown",
        color: "#552200",
      },
      {
        label: "Copper Brown",
        color: "#9a6051",
      },
      {
        label: "Cork Brown",
        color: "#cc8855",
      },
      {
        label: "Corral Brown",
        color: "#937360",
      },
      {
        label: "Coyote Brown",
        color: "#81613c",
      },
      {
        label: "Craft Brown",
        color: "#b7a083",
      },
      {
        label: "Craftsman Brown",
        color: "#ae9278",
      },
      {
        label: "Crater Brown",
        color: "#4d3e3c",
      },
      {
        label: "Cuba Brown",
        color: "#623d3d",
      },
    ],
  },
  {
    label: "orange",
    colors: [
      {
        label: "Tiger Moth Orange",
        color: "#dd6611",
      },
      {
        label: "Tobiko Orange",
        color: "#e45c10",
      },
      {
        label: "Toxic Orange",
        color: "#ff6037",
      },
      {
        label: "Transparent Orange",
        color: "#ffaa66",
      },
      {
        label: "Troll Slayer Orange",
        color: "#f4a34c",
      },
      {
        label: "Ultimate Orange",
        color: "#ff4200",
      },
      {
        label: "University of Tennessee Orange",
        color: "#f77f00",
      },
      {
        label: "Untamed Orange",
        color: "#de5730",
      },
      {
        label: "Vermillion Orange",
        color: "#f9603b",
      },
      {
        label: "Vibrant Orange",
        color: "#ff6216",
      },
      {
        label: "Vintage Orange",
        color: "#ffb05f",
      },
      {
        label: "Vivid Orange",
        color: "#ff5f00",
      },
      {
        label: "Vivid Orange Peel",
        color: "#ffa102",
      },
      {
        label: "Orange Salmonberry",
        color: "#f0b073",
      },
      {
        label: "Orange Satisfaction",
        color: "#dd9900",
      },
      {
        label: "Orange Sherbet",
        color: "#fec49b",
      },
      {
        label: "Orange Shimmer",
        color: "#e2d6bd",
      },
      {
        label: "Orange Shot",
        color: "#dd7744",
      },
      {
        label: "Orange Soda",
        color: "#fa5b3d",
      },
      {
        label: "Orange Spice",
        color: "#fea060",
      },
      {
        label: "Orange Squash",
        color: "#c27635",
      },
      {
        label: "Orange Sulphur",
        color: "#e8a320",
      },
      {
        label: "Orange Supreme",
        color: "#ff7435",
      },
      {
        label: "Orange Tea Rose",
        color: "#ff8379",
      },
      {
        label: "Orange Tiger",
        color: "#f95c14",
      },
      {
        label: "Melon Orange",
        color: "#f08f48",
      },
      {
        label: "Mikan Orange",
        color: "#f08300",
      },
      {
        label: "Mild Orange",
        color: "#f3bb93",
      },
      {
        label: "Milvus Milvus Orange",
        color: "#bb7722",
      },
      {
        label: "Mimolette Orange",
        color: "#ee8811",
      },
      {
        label: "Mock Orange",
        color: "#ff9863",
      },
      {
        label: "Mod Orange",
        color: "#d8583c",
      },
      {
        label: "Monarch Orange",
        color: "#efa06b",
      },
      {
        label: "Mythical Orange",
        color: "#ff7f49",
      },
      {
        label: "Nārangī Orange",
        color: "#ff8050",
      },
      {
        label: "Nârenji Orange",
        color: "#ffc14b",
      },
      {
        label: "Ninjin Orange",
        color: "#e5aa70",
      },
      {
        label: "Non-Stop Orange",
        color: "#dd8811",
      },
      {
        label: "Carrot Orange",
        color: "#ed9121",
      },
      {
        label: "Celosia Orange",
        color: "#e76a35",
      },
      {
        label: "Chat Orange",
        color: "#f79a3e",
      },
      {
        label: "Chéng Hóng Sè Orange",
        color: "#f94009",
      },
      {
        label: "Chinese Orange",
        color: "#f37042",
      },
      {
        label: "Christmas Orange",
        color: "#d56c2b",
      },
      {
        label: "Clarified Orange",
        color: "#fea15b",
      },
      {
        label: "Clear Orange",
        color: "#ee8800",
      },
      {
        label: "Coppery Orange",
        color: "#7f4330",
      },
      {
        label: "Coral Orange",
        color: "#e4694c",
      },
      {
        label: "Crayola Orange",
        color: "#fe7438",
      },
      {
        label: "Creamy Orange",
        color: "#fce9d1",
      },
      {
        label: "À L'Orange",
        color: "#f2850d",
      },
      {
        label: "Accent Orange",
        color: "#e56d00",
      },
      {
        label: "Adventure Orange",
        color: "#eda367",
      },
      {
        label: "Aerospace Orange",
        color: "#ff4f00",
      },
      {
        label: "Alloy Orange",
        color: "#c46210",
      },
      {
        label: "American Orange",
        color: "#ff8b00",
      },
      {
        label: "Amiable Orange",
        color: "#df965b",
      },
      {
        label: "Apocalyptic Orange",
        color: "#f4711e",
      },
      {
        label: "Apricot Orange",
        color: "#c86b3c",
      },
      {
        label: "Aquarelle Orange",
        color: "#fbe8e0",
      },
      {
        label: "Araigaki Orange",
        color: "#ec8254",
      },
      {
        label: "Atomic Orange",
        color: "#f88605",
      },
      {
        label: "Aura Orange",
        color: "#b42b26",
      },
      {
        label: "Aurora Orange",
        color: "#ec7042",
      },
      {
        label: "Dark Orange",
        color: "#c65102",
      },
      {
        label: "Day Glow Orange",
        color: "#eb5c34",
      },
      {
        label: "Deep Orange",
        color: "#dc4d01",
      },
      {
        label: "Deep Orange-coloured Brown",
        color: "#864735",
      },
      {
        label: "Deep Reddish Orange",
        color: "#bb603c",
      },
      {
        label: "Determined Orange",
        color: "#c56639",
      },
      {
        label: "Diluted Orange",
        color: "#fbe8e2",
      },
      {
        label: "Diminished Orange",
        color: "#fae9e1",
      },
      {
        label: "Dirty Orange",
        color: "#c87606",
      },
      {
        label: "Discreet Orange",
        color: "#ffad98",
      },
      {
        label: "Dull Orange",
        color: "#d8863b",
      },
    ],
  },
  {
    label: "purple",
    colors: [
      {
        label: "Disappearing Purple",
        color: "#3f313a",
      },
      {
        label: "Distinct Purple",
        color: "#a294c9",
      },
      {
        label: "Divine Purple",
        color: "#69005f",
      },
      {
        label: "Dragonlord Purple",
        color: "#6241c7",
      },
      {
        label: "Dried Flower Purple",
        color: "#752653",
      },
      {
        label: "Dull Purple",
        color: "#84597e",
      },
      {
        label: "Dusky Purple",
        color: "#895b7b",
      },
      {
        label: "Dusty Purple",
        color: "#825f87",
      },
      {
        label: "Easter Purple",
        color: "#c071fe",
      },
      {
        label: "Ebizome Purple",
        color: "#6d2b50",
      },
      {
        label: "Eclectic Purple",
        color: "#483e45",
      },
      {
        label: "Electric Purple",
        color: "#bf00ff",
      },
      {
        label: "Elegant Purple Gown",
        color: "#552367",
      },
      {
        label: "Eupatorium Purple",
        color: "#bf36e0",
      },
      {
        label: "Exotic Purple",
        color: "#6a5078",
      },
      {
        label: "Elegant Purple Gown",
        color: "#552367",
      },
      {
        label: "Eupatorium Purple",
        color: "#bf36e0",
      },
      {
        label: "Exotic Purple",
        color: "#6a5078",
      },
      {
        label: "Explosive Purple",
        color: "#cc11bb",
      },
      {
        label: "Faded Purple",
        color: "#916e99",
      },
      {
        label: "Fine Purple",
        color: "#5e548d",
      },
      {
        label: "Fioletowy Purple",
        color: "#fc44a3",
      },
      {
        label: "Flint Purple",
        color: "#42424d",
      },
      {
        label: "Forgotten Purple",
        color: "#9878f8",
      },
      {
        label: "Freesia Purple",
        color: "#b3b0d4",
      },
      {
        label: "Freshly Purpleized",
        color: "#5c5083",
      },
      {
        label: "Fuchsia Purple",
        color: "#d33479",
      },
      {
        label: "Fuji Purple",
        color: "#89729e",
      },
      {
        label: "Genestealer Purple",
        color: "#7761ab",
      },
      {
        label: "Ghostly Purple",
        color: "#7b5d92",
      },
      {
        label: "Gloomy Purple",
        color: "#8756e4",
      },
      {
        label: "Gothic Purple",
        color: "#92838a",
      },
      {
        label: "Grand Purple",
        color: "#534778",
      },
      {
        label: "Grape Purple",
        color: "#5d1451",
      },
      {
        label: "Grey Purple",
        color: "#826d8c",
      },
      {
        label: "Greyish Purple",
        color: "#887191",
      },
      {
        label: "Grim Purple",
        color: "#441188",
      },
      {
        label: "Han Purple",
        color: "#5218fa",
      },
      {
        label: "Harley Hair Purple",
        color: "#8547b5",
      },
      {
        label: "Hashita Purple",
        color: "#8d608c",
      },
      {
        label: "Haunted Purple",
        color: "#991177",
      },
      {
        label: "Hormagaunt Purple",
        color: "#51576f",
      },
      {
        label: "Jane Purple",
        color: "#e3c2ff",
      },
      {
        label: "Kickstart Purple",
        color: "#7777cc",
      },
      {
        label: "Kikyō Purple",
        color: "#5d3f6a",
      },
      {
        label: "Kokimurasaki Purple",
        color: "#3a243b",
      },
      {
        label: "KSU Purple",
        color: "#512888",
      },
      {
        label: "Kuwanomi Purple",
        color: "#55295b",
      },
      {
        label: "Kyo Purple",
        color: "#9d5b8b",
      },
      {
        label: "Lavender Purple",
        color: "#967bb6",
      },
      {
        label: "Legendary Purple",
        color: "#4e4e63",
      },
      {
        label: "Lepidolite Purple",
        color: "#947e94",
      },
      {
        label: "Leviathan Purple",
        color: "#8b2a98",
      },
      {
        label: "Liche Purple",
        color: "#730061",
      },
      {
        label: "Light Shōtoku Purple",
        color: "#aa55ee",
      },
      {
        label: "Lighter Purple",
        color: "#a55af4",
      },
      {
        label: "Lightish Purple",
        color: "#a552e6",
      },
      {
        label: "Loden Purple",
        color: "#553a76",
      },
      {
        label: "Long Forgotten Purple",
        color: "#a1759c",
      },
      {
        label: "Loulou's Purple",
        color: "#bb2288",
      },
      {
        label: "Luscious Purple",
        color: "#605c71",
      },
      {
        label: "Magenta Purple",
        color: "#762a54",
      },
      {
        label: "Majestic Purple",
        color: "#65608c",
      },
      {
        label: "Matt Purple",
        color: "#9370db",
      },
      {
        label: "Maximum Blue Purple",
        color: "#acace6",
      },
      {
        label: "Maximum Purple",
        color: "#733380",
      },
      {
        label: "Maximum Red Purple",
        color: "#a63a79",
      },
      {
        label: "Medium Purple",
        color: "#9e43a2",
      },
      {
        label: "Méi Gūi Zǐ Purple",
        color: "#e03fd8",
      },
      {
        label: "Melody Purple",
        color: "#a8acd0",
      },
      {
        label: "SQL Injection Purple",
        color: "#5e0092",
      },
      {
        label: "Star Platinum Purple",
        color: "#9500ff",
      },
      {
        label: "Striking Purple",
        color: "#944e87",
      },
      {
        label: "Sumptuous Purple",
        color: "#604c81",
      },
      {
        label: "Sunset Purple",
        color: "#724770",
      },
      {
        label: "Teldrassil Purple",
        color: "#ad66d2",
      },
      {
        label: "Thick Purple",
        color: "#8833dd",
      },
      {
        label: "Tillandsia Purple",
        color: "#60397f",
      },
      {
        label: "Timid Purple",
        color: "#dfdfea",
      },
      {
        label: "True Purple",
        color: "#65318e",
      },
      {
        label: "Trusted Purple",
        color: "#6600cc",
      },
      {
        label: "Tulip Poplar Purple",
        color: "#531938",
      },
      {
        label: "Twilight Purple",
        color: "#65648b",
      },
      {
        label: "Tyrian Purple",
        color: "#66023c",
      },
      {
        label: "Umemurasaki Purple",
        color: "#8f4155",
      },
      {
        label: "Unloaded Texture Purple",
        color: "#c154c1",
      },
      {
        label: "Veronia Purple",
        color: "#7e3075",
      },
      {
        label: "Vibrant Purple",
        color: "#ad03de",
      },
      {
        label: "Liche Purple",
        color: "#730061",
      },
      {
        label: "Light Shōtoku Purple",
        color: "#aa55ee",
      },
      {
        label: "Lighter Purple",
        color: "#a55af4",
      },
      {
        label: "Lightish Purple",
        color: "#a552e6",
      },
      {
        label: "Lilac Purple",
        color: "#a183c0",
      },
      {
        label: "Liseran Purple",
        color: "#de6fa1",
      },
      {
        label: "Loden Purple",
        color: "#553a76",
      },
      {
        label: "Long Forgotten Purple",
        color: "#a1759c",
      },
      {
        label: "Loulou's Purple",
        color: "#bb2288",
      },
      {
        label: "Luscious Purple",
        color: "#605c71",
      },
      {
        label: "Magenta Purple",
        color: "#762a54",
      },
      {
        label: "Majestic Purple",
        color: "#65608c",
      },
      {
        label: "Matt Purple",
        color: "#9370db",
      },
      {
        label: "Maximum Blue Purple",
        color: "#acace6",
      },
      {
        label: "Maximum Purple",
        color: "#733380",
      },
      {
        label: "Maximum Red Purple",
        color: "#a63a79",
      },
      {
        label: "Medium Purple",
        color: "#9e43a2",
      },
      {
        label: "Méi Gūi Zǐ Purple",
        color: "#e03fd8",
      },
    ],
  },
  {
    label: "pink",
    colors: [
      {
        label: "China Pink",
        color: "#df6ea1",
      },
      {
        label: "Chinese Pink",
        color: "#de70a1",
      },
      {
        label: "Christmas Pink",
        color: "#e34285",
      },
      {
        label: "Cinderella Pink",
        color: "#ffc6c4",
      },
      {
        label: "Cinnapink",
        color: "#a6646f",
      },
      {
        label: "City of Pink Angels",
        color: "#e6b4a6",
      },
      {
        label: "Cloud Pink",
        color: "#f5d1c8",
      },
      {
        label: "Clover Pink",
        color: "#cd9bc4",
      },
      {
        label: "Cold Pink",
        color: "#bca5ad",
      },
      {
        label: "Conch Pink",
        color: "#dba496",
      },
      {
        label: "Congo Pink",
        color: "#f98379",
      },
      {
        label: "Pink Flame",
        color: "#b55a63",
      },
      {
        label: "Pink Flamingo",
        color: "#ff66ff",
      },
      {
        label: "Pink Flare",
        color: "#d8b4b6",
      },
      {
        label: "Pink Floyd",
        color: "#eb9a9d",
      },
      {
        label: "Pink Fluorite",
        color: "#fbd3d9",
      },
      {
        label: "Pink Frappé",
        color: "#e6d2dc",
      },
      {
        label: "Pink Frosting",
        color: "#f7d7e2",
      },
      {
        label: "Pink Garnet",
        color: "#d2738f",
      },
      {
        label: "Pink Gin",
        color: "#dfa3ba",
      },
      {
        label: "Pink Ginger",
        color: "#cfa798",
      },
      {
        label: "Pink Glamour",
        color: "#ff787b",
      },
      {
        label: "Pink Glitter",
        color: "#fddfda",
      },
      {
        label: "Pink Glow",
        color: "#ffece0",
      },
      {
        label: "Pink Granite",
        color: "#bd9e97",
      },
      {
        label: "Pink Grapefruit",
        color: "#f3bac9",
      },
      {
        label: "Pink Heath",
        color: "#f2bddf",
      },
      {
        label: "Pink Hibiscus",
        color: "#b36c86",
      },
      {
        label: "Pink Horror",
        color: "#90305d",
      },
      {
        label: "Petal Pink",
        color: "#f4e5e0",
      },
      {
        label: "Petit Pink",
        color: "#e9cdd8",
      },
      {
        label: "Petite Pink",
        color: "#eacacb",
      },
      {
        label: "Phenomenal Pink",
        color: "#ee55ff",
      },
      {
        label: "Philanthropist Pink",
        color: "#e2d9dd",
      },
      {
        label: "Philippine Pink",
        color: "#fa1a8e",
      },
      {
        label: "Phlox Pink",
        color: "#ce5e9a",
      },
      {
        label: "Pickled Pink",
        color: "#da467d",
      },
      {
        label: "Pico-8 Pink",
        color: "#ff77a8",
      },
      {
        label: "Piercing Pink",
        color: "#dd00ee",
      },
      {
        label: "Pig Pink",
        color: "#fdd7e4",
      },
      {
        label: "Pigeon Pink",
        color: "#9d857f",
      },
      {
        label: "Pineal Pink",
        color: "#786d72",
      },
      {
        label: "Pink",
        color: "#ffc0cb",
      },
      {
        label: "Pink Abalone",
        color: "#e9b8a4",
      },
      {
        label: "Pink Amour",
        color: "#f4e2e9",
      },
      {
        label: "Pink and Sleek",
        color: "#ffc3c6",
      },
      {
        label: "Fairy Pink",
        color: "#eed3cb",
      },
      {
        label: "Fancy Pink",
        color: "#f6e9e8",
      },
      {
        label: "Fandango Pink",
        color: "#e04f80",
      },
      {
        label: "Fantastic Pink",
        color: "#e6c8c9",
      },
      {
        label: "Fěn Hóng Pink",
        color: "#ff6cb5",
      },
      {
        label: "Feverish Pink",
        color: "#cb3e50",
      },
      {
        label: "Fiesta Pink",
        color: "#d47194",
      },
      {
        label: "Firm Pink",
        color: "#da93c1",
      },
      {
        label: "Flamingo Pink",
        color: "#fc8eac",
      },
      {
        label: "Flickr Pink",
        color: "#fb0081",
      },
      {
        label: "Flirty Pink",
        color: "#9e88b1",
      },
      {
        label: "Fluffy Pink",
        color: "#f7d6cb",
      },
      {
        label: "Fluorescent Pink",
        color: "#fe1493",
      },
      {
        label: "Flush Pink",
        color: "#f8cbc4",
      },
      {
        label: "Forest Fruit Pink",
        color: "#68393b",
      },
      {
        label: "Forgotten Pink",
        color: "#ffd9d6",
      },
      {
        label: "Foxy Pink",
        color: "#db95ab",
      },
      {
        label: "Christmas Pink",
        color: "#e34285",
      },
      {
        label: "Cinderella Pink",
        color: "#ffc6c4",
      },
      {
        label: "Cinnapink",
        color: "#a6646f",
      },
      {
        label: "City of Pink Angels",
        color: "#e6b4a6",
      },
      {
        label: "Cloud Pink",
        color: "#f5d1c8",
      },
      {
        label: "Clover Pink",
        color: "#cd9bc4",
      },
      {
        label: "Cold Pink",
        color: "#bca5ad",
      },
      {
        label: "Conch Pink",
        color: "#dba496",
      },
      {
        label: "Congo Pink",
        color: "#f98379",
      },
      {
        label: "Cool Pink",
        color: "#e5ccd1",
      },
      {
        label: "Copper Pink",
        color: "#946877",
      },
      {
        label: "Coral Pink",
        color: "#f88379",
      },
      {
        label: "Corinthian Pink",
        color: "#ffa6d9",
      },
      {
        label: "Coy Pink",
        color: "#f9dad8",
      },
      {
        label: "Cradle Pink",
        color: "#eac9d5",
      },
      {
        label: "Crash Pink",
        color: "#cc88ff",
      },
      {
        label: "Crazy Pink",
        color: "#f970ac",
      },
      {
        label: "Benevolent Pink",
        color: "#dd1188",
      },
      {
        label: "Big Bang Pink",
        color: "#ff0099",
      },
      {
        label: "Bistro Pink",
        color: "#e3b8b7",
      },
      {
        label: "Blossom Pink",
        color: "#e6d5ce",
      },
      {
        label: "Blue Pink",
        color: "#b5a3c5",
      },
      {
        label: "Blush Pink",
        color: "#ff6fff",
      },
      {
        label: "Bombay Pink",
        color: "#c9736a",
      },
      {
        label: "Bonker Pink",
        color: "#f54d79",
      },
      {
        label: "Borderline Pink",
        color: "#ee1166",
      },
      {
        label: "Bōsōzoku Pink",
        color: "#e7dbe1",
      },
      {
        label: "Boysenberry Pink",
        color: "#a1395d",
      },
      {
        label: "Brain Pink",
        color: "#f2aeb1",
      },
      {
        label: "Bright Pink",
        color: "#fe01b1",
      },
      {
        label: "Brink Pink",
        color: "#fb607f",
      },
      {
        label: "Brownish Pink",
        color: "#c27e79",
      },
      {
        label: "Brusque Pink",
        color: "#ee00ff",
      },
      {
        label: "Brutal Pink",
        color: "#ff00bb",
      },
      {
        label: "Bubblegum Pink",
        color: "#f6b0ba",
      },
    ],
  },
  {
    label: "red",
    colors: [
      {
        label: "Brick Red",
        color: "#8f1402",
      },
      {
        label: "Brickwork Red",
        color: "#986971",
      },
      {
        label: "Bright Red",
        color: "#ff000d",
      },
      {
        label: "Brown Red",
        color: "#922b05",
      },
      {
        label: "Brownish Purple Red",
        color: "#8d746f",
      },
      {
        label: "Brownish Red",
        color: "#9e3623",
      },
      {
        label: "Bullfighters Red",
        color: "#cd4646",
      },
      {
        label: "Burlat Red",
        color: "#6e314f",
      },
      {
        label: "Burled Redwood",
        color: "#8f4c3a",
      },
      {
        label: "Burnt Red",
        color: "#9f2305",
      },
      {
        label: "Buttered Popcorn",
        color: "#fff0a4",
      },
      {
        label: "Buttered Rum",
        color: "#9d702e",
      },
      {
        label: "Buttered Up",
        color: "#f7f0d2",
      },
      {
        label: "Cacodemon Red",
        color: "#9f0000",
      },
      {
        label: "Cadmium Red",
        color: "#e30022",
      },
      {
        label: "Caput Mortuum Grey Red",
        color: "#6f585b",
      },
      {
        label: "Cardinal Red",
        color: "#9b365e",
      },
      {
        label: "Carmine Red",
        color: "#ff0038",
      },
      {
        label: "Carnage Red",
        color: "#940008",
      },
      {
        label: "Carriage Red",
        color: "#8c403d",
      },
      {
        label: "Cattail Red",
        color: "#b64925",
      },
      {
        label: "Caught Red-Handed",
        color: "#be4236",
      },
      {
        label: "Cerise Red",
        color: "#de3163",
      },
      {
        label: "CG Red",
        color: "#e03c31",
      },
      {
        label: "Chaotic Red",
        color: "#740600",
      },
      {
        label: "Charismatic Red",
        color: "#ee2244",
      },
      {
        label: "Charred Brown",
        color: "#3e0007",
      },
      {
        label: "Charred Chocolate",
        color: "#553b3d",
      },
      {
        label: "Charred Clay",
        color: "#885132",
      },
      {
        label: "Dockside Red",
        color: "#813533",
      },
      {
        label: "Dolomite Red",
        color: "#c5769b",
      },
      {
        label: "Dòu Shā Sè Red",
        color: "#a52939",
      },
      {
        label: "Dragon Red",
        color: "#9e0200",
      },
      {
        label: "Dramatical Red",
        color: "#991100",
      },
      {
        label: "Dull Red",
        color: "#bb3f3f",
      },
      {
        label: "Dusty Red",
        color: "#b9484e",
      },
      {
        label: "Dynamite Red",
        color: "#dd3311",
      },
      {
        label: "Earth Fired Red",
        color: "#785240",
      },
      {
        label: "Earth Red",
        color: "#a3485b",
      },
      {
        label: "Ecstatic Red",
        color: "#aa1122",
      },
      {
        label: "Edgy Red",
        color: "#ba3d3c",
      },
      {
        label: "Egyptian Red",
        color: "#983f4a",
      },
      {
        label: "Electric Red",
        color: "#e60000",
      },
      {
        label: "Elm Brown Red",
        color: "#b25b09",
      },
      {
        label: "Ember Red",
        color: "#792445",
      },
      {
        label: "Filtered Rays",
        color: "#d0b064",
      },
      {
        label: "Fire Axe Red",
        color: "#ce1620",
      },
      {
        label: "Fired Brick",
        color: "#793030",
      },
      {
        label: "Fired Clay",
        color: "#884444",
      },
      {
        label: "Fired Up",
        color: "#d37a38",
      },
      {
        label: "Flame Red",
        color: "#86282e",
      },
      {
        label: "Flamingo Red",
        color: "#ef8e87",
      },
      {
        label: "Flattered Flamingo",
        color: "#ee6655",
      },
      {
        label: "Flint Corn Red",
        color: "#d9623b",
      },
      {
        label: "Florence Red",
        color: "#753f38",
      },
      {
        label: "Flowerhorn Cichlid Red",
        color: "#f62e52",
      },
      {
        label: "Fluorescent Red",
        color: "#ff5555",
      },
      {
        label: "Fluorescent Red Orange",
        color: "#fc8427",
      },
      {
        label: "Forbidden Red",
        color: "#8a4646",
      },
      {
        label: "Forest Fruit Red",
        color: "#6e2759",
      },
      {
        label: "Gypsy Red",
        color: "#b6363b",
      },
      {
        label: "Halt Red",
        color: "#ff004f",
      },
      {
        label: "Hammered Copper",
        color: "#834831",
      },
      {
        label: "Hammered Gold",
        color: "#cb9d5e",
      },
      {
        label: "Hammered Pewter",
        color: "#7e7567",
      },
      {
        label: "Hammered Silver",
        color: "#978a7f",
      },
      {
        label: "Handmade Red",
        color: "#a87678",
      },
      {
        label: "Harissa Red",
        color: "#a52a2a",
      },
      {
        label: "Haute Red",
        color: "#aa1829",
      },
      {
        label: "Heather Red Grey",
        color: "#988e94",
      },
      {
        label: "Heathered Grey",
        color: "#b6b095",
      },
      {
        label: "Heavy Red",
        color: "#9e1212",
      },
      {
        label: "Heidelberg Red",
        color: "#960117",
      },
      {
        label: "Helvetia Red",
        color: "#f00000",
      },
      {
        label: "Hundred Waters",
        color: "#b2b7d1",
      },
      {
        label: "Hungry Red",
        color: "#f0000d",
      },
      {
        label: "Hyacinth Red",
        color: "#a75536",
      },
      {
        label: "Hydrangea Red",
        color: "#9e194d",
      },
      {
        label: "Hypnotic Red",
        color: "#cf0d14",
      },
      {
        label: "Imperial Red",
        color: "#ec2938",
      },
      {
        label: "In the Red",
        color: "#ff2233",
      },
      {
        label: "Incredible White",
        color: "#e3ded7",
      },
      {
        label: "Incubation Red",
        color: "#da1d38",
      },
      {
        label: "Indian Red",
        color: "#850e04",
      },
      {
        label: "Indigo Red",
        color: "#695a78",
      },
      {
        label: "Jalapeño Red",
        color: "#c01141",
      },
      {
        label: "Janemba Red",
        color: "#ff2211",
      },
      {
        label: "Jasper Red",
        color: "#fa2b00",
      },
      {
        label: "Jester Red",
        color: "#ac112c",
      },
      {
        label: "Karacha Red",
        color: "#b35c44",
      },
      {
        label: "Karakurenai Red",
        color: "#c91f37",
      },
      {
        label: "Ken Masters Red",
        color: "#ec2c25",
      },
      {
        label: "Khorne Red",
        color: "#6a0001",
      },
      {
        label: "Kindred",
        color: "#71a2d4",
      },
      {
        label: "Kiriume Red",
        color: "#8b352d",
      },
      {
        label: "Là Jiāo Hóng Red",
        color: "#fc2647",
      },
      {
        label: "Lacquered Liquorice",
        color: "#383838",
      },
      {
        label: "Lady in Red",
        color: "#b34b47",
      },
      {
        label: "Lake Red",
        color: "#b74a70",
      },
      {
        label: "Lāl Red",
        color: "#d85525",
      },
      {
        label: "Lannister Red",
        color: "#cd0101",
      },
      {
        label: "Laredo Road",
        color: "#c7994f",
      },
      {
        label: "Lazy Shell Red",
        color: "#cc0011",
      },
      {
        label: "Left on Red",
        color: "#ff0303",
      },
      {
        label: "Library Red",
        color: "#5b3530",
      },
      {
        label: "Lifestyle Red",
        color: "#8e3350",
      },
      {
        label: "Light Powdered Granite",
        color: "#d1d6eb",
      },
      {
        label: "Light Red",
        color: "#f3d3d9",
      },
      {
        label: "Light Shōrei Red",
        color: "#d0181f",
      },
      {
        label: "Light Weathered Hide",
        color: "#e0d4d0",
      },
      {
        label: "Little Red Corvette",
        color: "#e50102",
      },
      {
        label: "Llilacquered",
        color: "#c35b99",
      },
      {
        label: "Lotti Red",
        color: "#e40046",
      },
      {
        label: "Lotus Red",
        color: "#d1717b",
      },
      {
        label: "Love Red",
        color: "#ff496c",
      },
      {
        label: "Lurid Red",
        color: "#ff4505",
      },
      {
        label: "Lusty Red",
        color: "#b1383d",
      },
      {
        label: "Luxurious Red",
        color: "#863a42",
      },
      {
        label: "Madder Red",
        color: "#b7282e",
      },
      {
        label: "Magenta Red",
        color: "#913977",
      },
      {
        label: "Magenta Red Lips",
        color: "#62416d",
      },
      {
        label: "Makore Veneer Red",
        color: "#6e2f2c",
      },
      {
        label: "Mammary Red",
        color: "#b00b1e",
      },
      {
        label: "Mandarin Red",
        color: "#e84f3c",
      },
      {
        label: "Manganese Red",
        color: "#e52b50",
      },
    ],
  },
  {
    label: "white",
    colors: [
      {
        label: "Whitecap Snow",
        color: "#fffdfd",
      },
      {
        label: "Whiten't",
        color: "#050d02",
      },
      {
        label: "Whitened Sage",
        color: "#dee0d2",
      },
      {
        label: "Whiteout",
        color: "#fbfbfb",
      },
      {
        label: "Whitest White",
        color: "#f8f9f5",
      },
      {
        label: "Whitetail",
        color: "#f4eee5",
      },
      {
        label: "Whitewash",
        color: "#fefffc",
      },
      {
        label: "Whitewash Oak",
        color: "#cac9c0",
      },
      {
        label: "Whitewashed Fence",
        color: "#faf2e3",
      },
      {
        label: "Whitewater Bay",
        color: "#bac4ad",
      },
      {
        label: "Wind Fresh White",
        color: "#d0d8cf",
      },
      {
        label: "Windfresh White",
        color: "#ded8cf",
      },
      {
        label: "Winter White",
        color: "#f5ecd2",
      },
      {
        label: "Wishful White",
        color: "#f4f1e8",
      },
      {
        label: "Wispy White",
        color: "#ffc196",
      },
      {
        label: "Wizard White",
        color: "#dff1fd",
      },
      {
        label: "Wool White",
        color: "#f9ede4",
      },
      {
        label: "White Coffee",
        color: "#e6e0d4",
      },
      {
        label: "White Convolvulus",
        color: "#f4f2f4",
      },
      {
        label: "White Corn",
        color: "#f0d498",
      },
      {
        label: "White Crest",
        color: "#f9f8ef",
      },
      {
        label: "White Currant",
        color: "#f9ebc5",
      },
      {
        label: "White Desert",
        color: "#fdfaf1",
      },
      {
        label: "White Dogwood",
        color: "#efeae6",
      },
      {
        label: "White Down",
        color: "#f5eede",
      },
      {
        label: "White Duck",
        color: "#cecaba",
      },
      {
        label: "White Edgar",
        color: "#ededed",
      },
      {
        label: "Reliable White",
        color: "#e8ded3",
      },
      {
        label: "Reserved White",
        color: "#e0e0d9",
      },
      {
        label: "Resort White",
        color: "#f4f1e4",
      },
      {
        label: "Restful White",
        color: "#eee8d7",
      },
      {
        label: "Roadster White",
        color: "#e1e0d7",
      },
      {
        label: "Roman White",
        color: "#deedeb",
      },
      {
        label: "Rose White",
        color: "#fbeee8",
      },
      {
        label: "Rosemary White",
        color: "#dfe3db",
      },
      {
        label: "Rotunda White",
        color: "#d7d1c6",
      },
      {
        label: "Salsify White",
        color: "#ded8c4",
      },
      {
        label: "Sand Dollar White",
        color: "#fae3c9",
      },
      {
        label: "Sandalwood White",
        color: "#f2ecde",
      },
      {
        label: "Panda White",
        color: "#eae2d4",
      },
      {
        label: "Paper White",
        color: "#eef0f3",
      },
      {
        label: "Paperwhite",
        color: "#f6efdf",
      },
      {
        label: "Parchment White",
        color: "#f9eae5",
      },
      {
        label: "Paris White",
        color: "#bfcdc0",
      },
      {
        label: "Patient White",
        color: "#ede2de",
      },
      {
        label: "Pearl White",
        color: "#f3f2ed",
      },
      {
        label: "Pearly White",
        color: "#feefd3",
      },
      {
        label: "Pebble Soft Blue White",
        color: "#d3d7dc",
      },
      {
        label: "Perfect White",
        color: "#f0eeee",
      },
      {
        label: "Photon White",
        color: "#f8f8e8",
      },
      {
        label: "Picket Fence White",
        color: "#ebe7db",
      },
      {
        label: "Insignia White",
        color: "#ecf3f9",
      },
      {
        label: "Intimate White",
        color: "#f0e1d8",
      },
      {
        label: "Inuit White",
        color: "#d1cdd0",
      },
      {
        label: "Japanese White",
        color: "#eee6d9",
      },
      {
        label: "Jet White",
        color: "#f2ede2",
      },
      {
        label: "Jewel White",
        color: "#cfeee1",
      },
      {
        label: "Jewellery White",
        color: "#ced6e6",
      },
      {
        label: "Jewett White",
        color: "#e6ddca",
      },
      {
        label: "Journal White",
        color: "#e6d3b2",
      },
      {
        label: "Just About White",
        color: "#e8e8e0",
      },
      {
        label: "Kestrel White",
        color: "#e0d6c8",
      },
      {
        label: "High Reflective White",
        color: "#f7f7f1",
      },
      {
        label: "Himalaya White Blue",
        color: "#b9dee9",
      },
      {
        label: "Historic White",
        color: "#ebe6d7",
      },
      {
        label: "Holy White",
        color: "#f5f5dc",
      },
      {
        label: "Honeysuckle White",
        color: "#f8ecd3",
      },
      {
        label: "Honied White",
        color: "#fcefd1",
      },
      {
        label: "Hush White",
        color: "#e5dad4",
      },
      {
        label: "Hushed White",
        color: "#f1f2e4",
      },
      {
        label: "Hyacinth White Soft Blue",
        color: "#c1c7d7",
      },
      {
        label: "Ibis White",
        color: "#f2ece6",
      },
      {
        label: "Ice-Cold White",
        color: "#dff0e2",
      },
      {
        label: "Impure White",
        color: "#f5e7e3",
      },
      {
        label: "Incredible White",
        color: "#e3ded7",
      },
      {
        label: "Bright White",
        color: "#f6f2f1",
      },
      {
        label: "Brilliant White",
        color: "#e8eefe",
      },
      {
        label: "Broken White",
        color: "#eeebe3",
      },
      {
        label: "Butter White",
        color: "#fddebd",
      },
      {
        label: "Buttery White",
        color: "#f1ebda",
      },
      {
        label: "Cascade White",
        color: "#ecf2ec",
      },
      {
        label: "Cascading White",
        color: "#f7f5f6",
      },
      {
        label: "Catskill White",
        color: "#e0e4dc",
      },
      {
        label: "Ceiling Bright White",
        color: "#e9ebe7",
      },
      {
        label: "Celery White",
        color: "#dbd9cd",
      },
      {
        label: "Ceramite White",
        color: "#fefee0",
      },
      {
        label: "Chalky Blue White",
        color: "#d0ebf1",
      },
      {
        label: "Chenille White",
        color: "#f9efe2",
      },
      {
        label: "Coconut White",
        color: "#e9edf6",
      },
      {
        label: "Cold White",
        color: "#edfcfb",
      },
      {
        label: "Colonial White",
        color: "#ffedbc",
      },
      {
        label: "Commercial White",
        color: "#edece6",
      },
      {
        label: "Confident White",
        color: "#e4dfce",
      },
      {
        label: "Cool White",
        color: "#dae6e2",
      },
      {
        label: "Cottage White",
        color: "#f7efdd",
      },
      {
        label: "Cotton White",
        color: "#e4e3d8",
      },
      {
        label: "Cream White",
        color: "#f2eee2",
      },
      {
        label: "Creamy White",
        color: "#f0e9d6",
      },
      {
        label: "Crepe Silk White",
        color: "#f0eee3",
      },
      {
        label: "Crystal Salt White",
        color: "#d9e5dd",
      },
      {
        label: "Curated White",
        color: "#eae1ce",
      },
      {
        label: "Daikon White",
        color: "#d4d4c4",
      },
      {
        label: "Daisy White",
        color: "#f8f3e3",
      },
      {
        label: "Dead Nettle White",
        color: "#d2dad0",
      },
      {
        label: "Décor White",
        color: "#f2e5cf",
      },
      {
        label: "Decorator White",
        color: "#f6f4ec",
      },
      {
        label: "Coconut White",
        color: "#e9edf6",
      },
    ],
  },
  {
    label: "yellow",
    colors: [
      {
        label: "Dirty Yellow",
        color: "#cdc50a",
      },
      {
        label: "Dodie Yellow",
        color: "#fef65b",
      },
      {
        label: "Dorn Yellow",
        color: "#fff200",
      },
      {
        label: "Dough Yellow",
        color: "#f6d0b6",
      },
      {
        label: "Duckie Yellow",
        color: "#ffff11",
      },
      {
        label: "Dull Light Yellow",
        color: "#e5d9b4",
      },
      {
        label: "Dull Yellow",
        color: "#eedc5b",
      },
      {
        label: "Durian Yellow",
        color: "#e1bd27",
      },
      {
        label: "Dusky Yellow",
        color: "#ffff05",
      },
      {
        label: "Dusty Yellow",
        color: "#cfc88f",
      },
      {
        label: "yellow",
        color: "Dull Light Yellow",
      },
      {
        label: "#e5d9b4",
        color: "Dull Yellow",
      },
      {
        label: "#eedc5b",
        color: "Durian Yellow",
      },
      {
        label: "#e1bd27",
        color: "Dusky Yellow",
      },
      {
        label: "#ffff05",
        color: "Dusty Yellow",
      },
      {
        label: "#cfc88f",
        color: "Dynamic Yellow",
      },
      {
        label: "#ffe36d",
        color: "Earth Yellow",
      },
      {
        label: "#e1a95f",
        color: "Electric Yellow",
      },
      {
        label: "#fffc00",
        color: "Elfin Yellow",
      },
      {
        label: "#ebe885",
        color: "Emoji Yellow",
      },
      {
        label: "#ffde34",
        color: "Empire Yellow",
      },
      {
        label: "#f7d000",
        color: "Energy Yellow",
      },
      {
        label: "#f5d752",
        color: "Enjoyable Yellow",
      },
      {
        label: "#f5d6a9",
        color: "Extreme Yellow",
      },
      {
        label: "#ffb729",
        color: "Faded Yellow",
      },
      {
        label: "#feff7f",
        color: "Fashion Yellow",
      },
      {
        label: "#edc537",
        color: "Fig Mustard Yellow",
      },
      {
        label: "#bb8610",
        color: "Fire Yellow",
      },
      {
        label: "#ffb70b",
        color: "Coconut White",
      },
      {
        label: "#e9edf6",
        color: "Highlighter Yellow",
      },
      {
        label: "#f1e740",
        color: "Himawari Yellow",
      },
      {
        label: "#fcc800",
        color: "Hint of Yellow",
      },
      {
        label: "#faf1cd",
        color: "Homeopathic Yellow",
      },
      {
        label: "#ede7d7",
        color: "Honey Yellow",
      },
      {
        label: "#ca9456",
        color: "Honey Yellow Green",
      },
      {
        label: "#937016",
        color: "Honeycomb Yellow",
      },
      {
        label: "#de9c52",
        color: "Hornet Yellow",
      },
      {
        label: "#a67c08",
        color: "Horseradish Yellow",
      },
      {
        label: "#ffdea9",
        color: "Huáng Dì Yellow",
      },
      {
        label: "#f8ff73",
        color: "Huáng Sè Yellow",
      },
      {
        label: "#f0f20c",
        color: "Ice Yellow",
      },
      {
        label: "#fefecd",
        color: "Immortelle Yellow",
      },
      {
        label: "#d4a207",
        color: "Imperial Yellow",
      },
      {
        label: "#ffb200",
        color: "Inca Yellow",
      },
      {
        label: "#ffd301",
        color: "yellow",
      },
      {
        label: "Immortelle Yellow",
        color: "#d4a207",
      },
      {
        label: "Imperial Yellow",
        color: "#ffb200",
      },
      {
        label: "Inca Yellow",
        color: "#ffd301",
      },
      {
        label: "Indian Yellow",
        color: "#e3a857",
      },
      {
        label: "Intense Yellow",
        color: "#e19c35",
      },
      {
        label: "Kalliene Yellow",
        color: "#b59808",
      },
      {
        label: "Kazakhstan Yellow",
        color: "#fec50c",
      },
      {
        label: "Kihada Yellow",
        color: "#fef263",
      },
      {
        label: "Kings Yellow",
        color: "#ead665",
      },
      {
        label: "Kōwhai Yellow",
        color: "#e1b029",
      },
      {
        label: "Kuchinashi Yellow",
        color: "#ffdb4f",
      },
      {
        label: "Lahn Yellow",
        color: "#fff80a",
      },
      {
        label: "Lamenters Yellow",
        color: "#fffeb6",
      },
      {
        label: "Leaf Yellow",
        color: "#e9d79e",
      },
      {
        label: "Lemon Ice Yellow",
        color: "#f6e2a7",
      },
      {
        label: "Lemon Sorbet Yellow",
        color: "#dcc68e",
      },
      {
        label: "Liechtenstein Yellow",
        color: "#fdff38",
      },
      {
        label: "Leaf Yellow",
        color: "#e9d79e",
      },
      {
        label: "yellow",
        color: "Yellow Pear",
      },
      {
        label: "#e9df8a",
        color: "Yellow Pepper",
      },
      {
        label: "#eeef06",
        color: "Yellow Petal",
      },
      {
        label: "#f0e74b",
        color: "Yellow Phosphenes",
      },
      {
        label: "#e4e4cb",
        color: "Yellow Polka Dot",
      },
      {
        label: "#fcb867",
        color: "Yellow Powder",
      },
      {
        label: "#fcfd74",
        color: "Yellow Rose",
      },
      {
        label: "#fff000",
        color: "Yellow Salmonberry",
      },
      {
        label: "#fff47c",
        color: "Yellow Sand",
      },
      {
        label: "#a28744",
        color: "Yellow Sea",
      },
      {
        label: "#f49f35",
        color: "Yellow Shimmer",
      },
      {
        label: "#f8e2ca",
        color: "Yellow Shout",
      },
      {
        label: "#d19932",
        color: "Yellow Stagshorn",
      },
      {
        label: "#fada5e",
        color: "Yellow Submarine",
      },
      {
        label: "#ffff14",
        color: "Yellow Sumac",
      },
      {
        label: "#e19447",
        color: "Yellow Summer",
      },
      {
        label: "#f9b500",
        color: "Yellow Sunshine",
      },
      {
        label: "#fff601",
        color: "Yellow Taffy",
      },
      {
        label: "#f7edb7",
        color: "Maximum Green Yellow",
      },
      {
        label: "#d9e650",
        color: "yellow",
      },
      {
        label: "Yellowish Grey",
        color: "#edeeda",
      },
      {
        label: "Yellowish Orange",
        color: "#ffab0f",
      },
      {
        label: "Yellowish Tan",
        color: "#fcfc81",
      },
      {
        label: "Yellowish White",
        color: "#e9f1d0",
      },
      {
        label: "Yellowl",
        color: "#f3d80e",
      },
      {
        label: "Yellowstone",
        color: "#ceb736",
      },
      {
        label: "Yellowstone Park",
        color: "#e4d6ba",
      },
      {
        label: "Yellowy Green",
        color: "#bff128",
      },
      {
        label: "Yippie Ya Yellow",
        color: "#f9f59f",
      },
      {
        label: "Yippie Yellow",
        color: "#ffff84",
      },
      {
        label: "Yolk Yellow",
        color: "#e2b051",
      },
      {
        label: "Yriel Yellow",
        color: "#ffdb58",
      },
      {
        label: "Zard Yellow",
        color: "#fde634",
      },
      {
        label: "Zheleznogorsk Yellow",
        color: "#fef200",
      },
      {
        label: "Zhohltyi Yellow",
        color: "#e4c500",
      },
      {
        label: "Yellow Trumpet",
        color: "#f9d988",
      },
    ],
  },
  {
    label: "mix",
    colors: [
      {
        label: "",
        color: "#FDFCFB",
      },
      {
        label: "",
        color: "#B9AB85",
      },
      {
        label: "",
        color: "#898254",
      },
      {
        label: "",
        color: "#737D22",
      },
      {
        label: "",
        color: "#97D138",
      },
      {
        label: "",
        color: "#202917",
      },
      {
        label: "",
        color: "#445F58",
      },
      {
        label: "",
        color: "#A19738",
      },
      {
        label: "",
        color: "#83978A",
      },
      {
        label: "",
        color: "#BFCFB7",
      },
      {
        label: "",
        color: "#42252D",
      },
      {
        label: "",
        color: "#B6534C",
      },
      {
        label: "",
        color: "#C5986A",
      },
      {
        label: "",
        color: "#DFA578",
      },
      {
        label: "",
        color: "#9CA06D",
      },
      {
        label: "",
        color: "#42252D",
      },
      {
        label: "",
        color: "#B6534C",
      },
      {
        label: "",
        color: "#C5986A",
      },
      {
        label: "",
        color: "#DFA578",
      },
      {
        label: "",
        color: "#9CA06D",
      },
      {
        label: "",
        color: "#DC4388",
      },
      {
        label: "",
        color: "#7E3529",
      },
      {
        label: "",
        color: "#794C63",
      },
      {
        label: "",
        color: "#857890",
      },
      {
        label: "",
        color: "#65657B",
      },
      {
        label: "",
        color: "#342423",
      },
      {
        label: "",
        color: "#62563A",
      },
      {
        label: "",
        color: "#6A785F",
      },
      {
        label: "",
        color: "#849169",
      },
      {
        label: "",
        color: "#858A79",
      },
      {
        label: "",
        color: "#90ACB9",
      },
      {
        label: "",
        color: "#271D25",
      },
      {
        label: "",
        color: "#808989",
      },
      {
        label: "",
        color: "#ADBAB0",
      },
      {
        label: "",
        color: "#CFB2A1",
      },
      {
        label: "",
        color: "#4F423F",
      },
      {
        label: "",
        color: "#9FAE68",
      },
      {
        label: "",
        color: "#C9B566",
      },
      {
        label: "",
        color: "#DCCC8A",
      },
      {
        label: "",
        color: "#954A32",
      },
      {
        label: "",
        color: "#777956",
      },
      {
        label: "",
        color: "#4F4529",
      },
      {
        label: "",
        color: "#6D1B09",
      },
      {
        label: "",
        color: "#473B1A",
      },
      {
        label: "",
        color: "#9D6D40",
      },
      {
        label: "",
        color: "#520E06",
      },
      {
        label: "",
        color: "#AB5513",
      },
      {
        label: "",
        color: "#B3A546",
      },
      {
        label: "",
        color: "#968551",
      },
      {
        label: "",
        color: "#8EA360",
      },
      {
        label: "",
        color: "#262724",
      },
      {
        label: "",
        color: "#665B5F",
      },
      {
        label: "",
        color: "#778154",
      },
      {
        label: "",
        color: "#808555",
      },
      {
        label: "",
        color: "#A7A987",
      },
      {
        label: "",
        color: "#3F3344",
      },
      {
        label: "",
        color: "#C5C1CA",
      },
      {
        label: "",
        color: "#B1ABC6",
      },
      {
        label: "",
        color: "#33354B",
      },
      {
        label: "",
        color: "#514B84",
      },
      {
        label: "",
        color: "#3F5D51",
      },
      {
        label: "",
        color: "#6F5D55",
      },
      {
        label: "",
        color: "#FDFCFD",
      },
      {
        label: "",
        color: "#B7D17A",
      },
      {
        label: "",
        color: "#FAF1C2",
      },
      {
        label: "",
        color: "#331E1D",
      },
      {
        label: "",
        color: "#726167",
      },
      {
        label: "",
        color: "#838478",
      },
      {
        label: "",
        color: "#796740",
      },
      {
        label: "",
        color: "#9B8A56",
      },
      {
        label: "",
        color: "#384E5A",
      },
      {
        label: "",
        color: "#969079",
      },
      {
        label: "",
        color: "#BCB097",
      },
      {
        label: "",
        color: "#BD7C51",
      },
      {
        label: "",
        color: "#563B20",
      },
      {
        label: "",
        color: "#3F5D51",
      },
      {
        label: "",
        color: "#6F5D55",
      },
      {
        label: "",
        color: "#FDFCFD",
      },
      {
        label: "",
        color: "#B7D17A",
      },
      {
        label: "",
        color: "#FAF1C2",
      },
      {
        label: "",
        color: "#777956",
      },
      {
        label: "",
        color: "#4F4529",
      },
      {
        label: "",
        color: "#6D1B09",
      },
      {
        label: "",
        color: "#473B1A",
      },
      {
        label: "",
        color: "#9D6D40",
      },
      {
        label: "",
        color: "#520E06",
      },
      {
        label: "",
        color: "#AB5513",
      },
      {
        label: "",
        color: "#B3A546",
      },
      {
        label: "",
        color: "#968551",
      },
      {
        label: "",
        color: "#8EA360",
      },
      {
        label: "",
        color: "#331E1D",
      },
      {
        label: "",
        color: "#726167",
      },
      {
        label: "",
        color: "#838478",
      },
      {
        label: "",
        color: "#796740",
      },
      {
        label: "",
        color: "#9B8A56",
      },
      {
        label: "",
        color: "#384E5A",
      },
      {
        label: "",
        color: "#969079",
      },
      {
        label: "",
        color: "#BCB097",
      },
      {
        label: "",
        color: "#BD7C51",
      },
      {
        label: "",
        color: "#563B20",
      },
      {
        label: "",
        color: "#A13C39",
      },
      {
        label: "",
        color: "#DBE04F",
      },
      {
        label: "",
        color: "#75B364",
      },
      {
        label: "",
        color: "#26785E",
      },
      {
        label: "",
        color: "#143D50",
      },
      {
        label: "",
        color: "#520E06",
      },
      {
        label: "",
        color: "#AB5513",
      },
      {
        label: "",
        color: "#B3A546",
      },
      {
        label: "",
        color: "#968551",
      },
      {
        label: "",
        color: "#8EA360",
      },
      {
        label: "",
        color: "#331E1D",
      },
      {
        label: "",
        color: "#726167",
      },
      {
        label: "",
        color: "#838478",
      },
      {
        label: "",
        color: "#796740",
      },
      {
        label: "",
        color: "#9B8A56",
      },
      {
        label: "",
        color: "#384E5A",
      },
      {
        label: "",
        color: "#969079",
      },
      {
        label: "",
        color: "#BCB097",
      },
      {
        label: "",
        color: "#BD7C51",
      },
      {
        label: "",
        color: "#563B20",
      },
      {
        label: "",
        color: "#5D5553",
      },
      {
        label: "",
        color: "#839179",
      },
      {
        label: "",
        color: "#C7D0AB",
      },
      {
        label: "",
        color: "#DEE8B8",
      },
      {
        label: "",
        color: "#A6BA9D",
      },
      {
        label: "",
        color: "#777956",
      },
      {
        label: "",
        color: "#4F4529",
      },
      {
        label: "",
        color: "#6D1B09",
      },
      {
        label: "",
        color: "#473B1A",
      },
      {
        label: "",
        color: "#9D6D40",
      },
      {
        label: "",
        color: "#520E06",
      },
      {
        label: "",
        color: "#AB5513",
      },
      {
        label: "",
        color: "#B3A546",
      },
      {
        label: "",
        color: "#968551",
      },
      {
        label: "",
        color: "#8EA360",
      },
      {
        label: "",
        color: "#331E1D",
      },
      {
        label: "",
        color: "#726167",
      },
      {
        label: "",
        color: "#838478",
      },
      {
        label: "",
        color: "#796740",
      },
      {
        label: "",
        color: "#9B8A56",
      },
      {
        label: "",
        color: "#384E5A",
      },
      {
        label: "",
        color: "#969079",
      },
      {
        label: "",
        color: "#BCB097",
      },
      {
        label: "",
        color: "#BD7C51",
      },
      {
        label: "",
        color: "#563B20",
      },
    ],
  },
];

const paintingList = [
  {
    label: "black",
    colors: [
      { label: "Abaddon Black", color: "#231f20" },
      { label: "Accursed Black", color: "#090807" },
      { label: "Anubis Black", color: "#312231" },
      { label: "Apple Herb Black", color: "#4b4247" },
      { label: "Aswad Black", color: "#17181c" },
      { label: "Back In Black", color: "#16141c" },
      { label: "Badab Black Wash", color: "#0a0908" },
      { label: "Basalt Black", color: "#4d423e" },
      { label: "Benthic Black", color: "#000011" },
      { label: "Berry Blackmail", color: "#662277" },
      { label: "Beryl Black Green", color: "#2b322d" },
      { label: "Binrouji Black", color: "#433d3c" },
      { label: "Black", color: "#000000" },
      { label: "Black Bamboo", color: "#5b5d53" },
    ],
  },
  {
    label: "blue",
    colors: [
      { label: "Aggressive Baby Blue", color: "#6fffff" },
      { label: "Ahriman Blue", color: "#199ebd" },
      { label: "After Work Blue", color: "#24246d" },
      { label: "Air Blue", color: "#69a3c1" },
      { label: "Airy Blue", color: "#88ccee" },
      { label: "Adriatic Blue", color: "#5c899b" },
      { label: "Advertising Blue", color: "#0081a8" },
      { label: "Aegean Blue", color: "#4f6d83" },
      { label: "Air Force Blue", color: "#5d8aa8" },
    ],
  },
  {
    label: "brown",
    colors: [
      { label: "All the Leaves Are Brown", color: "#994411" },
      { label: "Amber Brown", color: "#b46a4d" },
      { label: "Ash Brown", color: "#98623c" },
      { label: "American Brown", color: "#804040" },
      { label: "Antique Brown", color: "#553f2d" },
      { label: "Apple Brown Betty", color: "#9c6757" },
      { label: "Arable Brown", color: "#7a552e" },
      { label: "Ashen Brown", color: "#994444" },
      { label: "Aurora Brown", color: "#6a4238" },
      { label: "Authentic Brown", color: "#6b5446" },
      { label: "Autumn Leaf Brown", color: "#7a560e" },
      { label: "Badshahi Brown", color: "#d3a194" },
      { label: "Baikō Brown", color: "#887938" },
    ],
  },
  {
    label: "orange",
    colors: [
      { label: "Orange Soda", color: "#fa5b3d" },
      { label: "Orange Supreme", color: "#ff7435" },
      { label: "Orange Tea Rose", color: "#ff8379" },
      { label: "Orange Sulphur", color: "#e8a320" },
      { label: "Orange Tiger", color: "#f95c14" },
      { label: "Orange Vermillion", color: "#bc5339" },
      { label: "Orange Sherbet", color: "#fec49b" },
      { label: "Orange Shot", color: "#dd7744" },
      { label: "Orange Spice", color: "#fea060" },
      { label: "Orange White", color: "#eae3cd" },
      { label: "Orange Wood", color: "#b74923" },
      { label: "Orange Yellow", color: "#fdb915" },
    ],
  },
  {
    label: "purple",
    colors: [
      { label: "Aconite Purple", color: "#7249d6" },
      { label: "Amora Purple", color: "#bb22aa" },
      { label: "Amaranth Deep Purple", color: "#9f2b68" },
      { label: "Aged Purple", color: "#a442a0" },
      { label: "Amethyst Purple", color: "#562f7e" },
      { label: "Akebi Purple", color: "#983fb2" },
      { label: "Bright Purple", color: "#be03fd" },
      { label: "Alien Purple", color: "#490648" },
      { label: "Amaranth Purple", color: "#723f89" },
      { label: "Benimidori Purple", color: "#78779b" },
      { label: "Blue Purple", color: "#5729ce" },
      { label: "Blue With A Hint Of Purple", color: "#533cc6" },
      { label: "Bluish Purple Anemone", color: "#6666bb" },
      { label: "Brave Purple", color: "#968db8" },
      { label: "C64 Purple", color: "#6f6ed1" },
      { label: "Campanula Purple", color: "#6c6d94" },
    ],
  },
  {
    label: "pink",
    colors: [
      { label: "Barbie Pink", color: "#fe46a5" },
      { label: "Ballerina Pink", color: "#f7b6ba" },
      { label: "Baker-Miller Pink", color: "#ff92ae" },
      { label: "Aurora Pink", color: "#e881a6" },
      { label: "Avant-Garde Pink", color: "#ff77ee" },
      { label: "Baby Pink", color: "#ffb7ce" },
      { label: "Aries Hot Pink", color: "#f887c7" },
      { label: "Bazooka Pink", color: "#ffa6c9" },
      { label: "Begonia Pink", color: "#ec9abe" },
      { label: "Abbey Pink", color: "#cd716b" },
      { label: "Adventure Island Pink", color: "#f87858" },
      { label: "Aristocratic Pink", color: "#ddaacc" },
      { label: "Art House Pink", color: "#c06f70" },
      { label: "Artful Pink", color: "#cc6c82" },
      { label: "Altered Pink", color: "#efc7be" },
      { label: "Amaranth Pink", color: "#f19cbb" },
      { label: "American Pink", color: "#ff9899" },
      { label: "Angora Pink", color: "#ebdfea" },
      { label: "Antique Hot Pink", color: "#b07f9e" },
    ],
  },
  {
    label: "red",
    colors: [
      { label: "Assassin's Red", color: "#f60206" },
      { label: "Astorath Red", color: "#dd482b" },
      { label: "Atlas Red", color: "#82193a" },
      { label: "Artful Red", color: "#b30103" },
      { label: "Bara Red", color: "#e9546b" },
      { label: "Aurora Red", color: "#c13435" },
      { label: "Bethlehem Red", color: "#ee0022" },
      { label: "Bijou Red", color: "#a33d3b" },
      { label: "Bindi Red", color: "#b0003c" },
      { label: "Barn Red", color: "#8b4044" },
      { label: "Bengala Red", color: "#8f2e14" },
      { label: "Bengara Red", color: "#913225" },
      { label: "Benihi Red", color: "#f35336" },
    ],
  },
  {
    label: "white",
    colors: [
      { label: "Bean White", color: "#ebf0e4" },
      { label: "Belyi White", color: "#f0f1e1" },
      { label: "Birch White", color: "#f6eedf" },
      { label: "Black White", color: "#e5e4db" },
      { label: "Bleach White", color: "#ebe1ce" },
      { label: "Bleached White", color: "#dfe3e8" },
      { label: "Blossom White", color: "#f2eee4" },
      { label: "Blues White Shoes", color: "#99badd" },
      { label: "Bone White", color: "#f1e1b0" },
      { label: "Breakwater White", color: "#ebf1e9" },
      { label: "Bright White", color: "#f6f2f1" },
      { label: "Brilliant White", color: "#e8eefe" },
      { label: "Broken White", color: "#eeebe3" },
      { label: "Butter White", color: "#fddebd" },
      { label: "Buttery White", color: "#f1ebda" },
    ],
  },
  {
    label: "yellow",
    colors: [
      { label: "Angelic Yellow", color: "#f4dfa7" },
      { label: "Anise Grey Yellow", color: "#b0ac98" },
      { label: "Apricot Yellow", color: "#f7bd81" },
      { label: "Aquarelle Yellow", color: "#f4eeda" },
      { label: "Arnica Yellow", color: "#e59b00" },
      { label: "Arylide Yellow", color: "#e9d66b" },
      { label: "Asagi Yellow", color: "#f7bb7d" },
      { label: "Asfar Yellow", color: "#fcef01" },
      { label: "Ash Yellow", color: "#f0bd7e" },
      { label: "Asparagus Yellow", color: "#dac98e" },
      { label: "Aspen Yellow", color: "#f6df9f" },
      { label: "Autumn Apple Yellow", color: "#cda449" },
      { label: "Autumn Yellow", color: "#e99700" },
      { label: "Bad Moon Yellow", color: "#f2e5b4" },
      { label: "Bakelite Yellow", color: "#c6b788" },
      { label: "Bamboo Yellow", color: "#ae884b" },
    ],
  },
  {
    label: "mix",
    colors: [
      {
        label: "",
        color: "#FDFCFB",
      },
      {
        label: "",
        color: "#B9AB85",
      },
      {
        label: "",
        color: "#898254",
      },
      {
        label: "",
        color: "#737D22",
      },
      {
        label: "",
        color: "#97D138",
      },
      {
        label: "",
        color: "#202917",
      },
      {
        label: "",
        color: "#445F58",
      },
      {
        label: "",
        color: "#A19738",
      },
      {
        label: "",
        color: "#83978A",
      },
    ],
  },
];

let activeIdx = ref(3);

let colorList = reactive([]);

const getVariable = computed(() => {
  return (color) => {
    return {
      "--color": color,
      "--triangle-color": color === "white" ? "#EEE9BF" : color,
      "--border": color === "white" ? "1px solid #EEE9BF" : "",
      "--box-shadow": `0 0 5px 1px ${
        color === "white" ||
        color === "linear-gradient(to left, #40e0d0, #ff8c00, #ff0080)"
          ? "#CDC9A5"
          : color
      }`,
    };
  };
});

const randomColor = (e) => {
  const colors = colorTable[activeIdx.value].colors;
  const len = colors.length;
  const set = new Set();
  while (set.size < 9) {
    const idx = Math.floor(Math.random() * (len - 1));
    set.add(colors[idx]);
  }
  const arr = Array.from(set);
  console.log(arr);
  for (let i = 0; i < 9; i++) {
    paintingList[activeIdx.value].colors[i] = arr[i];
    colorList[i] = arr[i];
  }
};

watch(
  () => activeIdx.value,
  (newVal, oldVal) => {
    for (let i = 0; i < 9; i++) {
      colorList[i] = paintingList[newVal].colors[i];
    }
  },
  {
    immediate: true,
  }
);
</script>

<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-between;
  .color-tabs {
    display: flex;
    padding: 15px 15px 25px 15px;
    .color-circle {
      position: relative;
      width: 25px;
      height: 25px;
      background: var(--color);
      border: var(--border);
      border-radius: 50%;
      margin-right: 15px;
      cursor: pointer;
      &:hover {
        box-shadow: var(--box-shadow);
      }
      .triangle {
        position: absolute;
        bottom: -18px;
        left: 50%;
        transform: translateX(-50%);
        -webkit-clip-path: polygon(0 0, 100% 0, 50% 90%);
        background: var(--triangle-color);
        width: 15px;
        height: 15px;
      }
    }
  }
  .random-button {
    width: 120px;
    height: 35px;
    border-radius: 20px;
    background: linear-gradient(to right, #c6ffdd, #fbd786, #f7797d);
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgba(250, 91, 61, 1);
    font-size: 14px;
    opacity: 0.8;
    transition: all 0.3s;
    &:hover {
      opacity: 1;
    }
  }
}
.blocks {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 10px;
  border-radius: 4px 0 0 4px;
  // background-color: rgba(red, green, blue, alpha);
}
</style>
