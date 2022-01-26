<style>
@import url("../assets/css/Dapp.css");
</style>

<template>
  <b-container class="mt-4 mb-3">
    <!-- up container -->
    <div class="up-container">
      <div class="left-container">
        <div v-if="width >= 768" class="home-header px-3 box-background">
          <div>
            <span class="header-title">Circulating UXX</span
            ><span v-text="stats.circulating"></span>
          </div>
          <div>
            <span class="header-title">Staked</span
            ><span v-text="stats.staked"></span>
          </div>
          <div>
            <span class="header-title">Mining</span
            ><span v-text="stats.mining"></span>
          </div>
          <div>
            <span class="header-title">Duration</span
            ><span v-text="stats.duration"></span>
          </div>
          <div>
            <span class="header-title">Yield</span
            ><span v-text="stats.yield"></span>
          </div>
        </div>

        <div class="yield-box box-background">
          <div class="title">yield Curve</div>

          <div class="range-header justify-content-between px-4">
            <span>INFLATION</span>
            <div class="d-flex">
              <span class="me-3 inflation-span">{{ inflationValue }}</span>
              <div class="range-slider bg-ruler">
                <img
                  class="ruler-image"
                  src="@/assets/images/ruler.svg"
                  width="250"
                />
                <!-- <img class="ruler-pointer-image" src="@/assets/images/ruler_pointer.svg"> -->
                <span class="ruler-pointer-value" :style="leftValue">
                  {{ inflationValue }}
                </span>
                <b-form-input
                  id="inflation-range myRange"
                  class="slider input-slider"
                  v-model="inflationValue"
                  type="range"
                  min="0"
                  max="100"
                ></b-form-input>
              </div>
            </div>
            <span class="staking-span">STAKING</span>
          </div>

          <div
            :class="{
              'px-3': width >= 350,
              'pt-3': true,
              'pb-5': width < 768,
              'pb-3': width >= 768,
            }"
          >
            <div class="mini-chart-top" v-show="width < 768">
              <span @click="showHelpModal = !showHelpModal"
                >X Plane Left
                <div>i</div>
                <img src="@/assets/images/circle.svg"
              /></span>
              <span class="ms-2" @click="showHelpModal = !showHelpModal"
                >X Plane Right
                <div>i</div>
                <img src="@/assets/images/circle.svg"
              /></span>
            </div>
            <div
              class="circle-i"
              v-show="width < 768"
              @click="showHelpModal = !showHelpModal"
            >
              <div>i</div>
              <img src="@/assets/images/circle.svg" />
            </div>
            <LineChart v-if="width >= 768"></LineChart>
            <MiniLineChart
              v-else
              class="mini-line-chart"
              @click="clickMiniChart"
            ></MiniLineChart>
            <div
              class="box-in-chart"
              :style="boxLeftBottom"
              v-show="boxShow && width < 768"
            >
              <img src="@/assets/images/box-in-chart.svg" />
              <span>{{ chartValue }}</span>
            </div>
            <div class="clear-y-axis"></div>
            <div class="zero-line"></div>
            <div class="chart-legend">
              <span class="mx-3">Stake</span>
              <svg height="10" width="30">
                <line
                  x1="0"
                  y1="5"
                  x2="30"
                  y2="5"
                  class="stake-chart-legend-line"
                />
              </svg>
              <span class="mx-3">Yield</span>
              <svg height="10" width="30">
                <line
                  x1="0"
                  y1="5"
                  x2="30"
                  y2="5"
                  class="yield-chart-legend-line"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div class="p-0 right-container">
        <div class="box box-background">
          <div class="title">liquidity</div>
          <div>
            <table class="uxxTable">
              <tbody>
                <tr>
                  <td class="lab1">Liquid</td>
                  <td class="lab2">15,000,000</td>
                  <td></td>
                </tr>
                <tr>
                  <td class="lab1">Inflation</td>
                  <td class="lab2">225,000</td>
                  <td><button class="btn">Claim</button></td>
                </tr>
                <tr>
                  <td class="lab1">Mining</td>
                  <td class="lab2">1,000,000</td>
                  <td><button class="btn">Claim</button></td>
                </tr>
                <tr>
                  <td class="lab3">Unstaked</td>
                  <td class="lab4">133,000</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="order-box box-background">
          <div class="title">order Entry</div>
          <div class="order-header">
            <span class="title-single me-2">Single</span>
            <toggle-button
              :value="orderToggle"
              color="#D4B5FF"
              @click="orderToggle = !orderToggle"
            />
            <span class="title-single">Multi</span>
          </div>

          <div class="order-container">
            <b-row class="py-2 order-row">
              <b-col class="order-name">Maturity</b-col>
              <b-col :class="orderButtonClass(1)" @click="clickOrderButton(1)"
                ><span>*Month</span></b-col
              >
              <b-col :class="orderButtonClass(2)" @click="clickOrderButton(2)"
                ><span>*Year</span></b-col
              >
            </b-row>
            <b-row class="py-2 order-row">
              <b-col class="order-name">Date</b-col>
              <b-col :class="orderButtonClass(3)" @click="clickOrderButton(3)"
                ><span>19/12/2025</span></b-col
              >
              <b-col :class="orderButtonClass(4)" @click="clickOrderButton(4)"
                ><span>4.23</span></b-col
              >
            </b-row>
            <b-row class="py-2 order-row">
              <b-col class="order-name">Open Interest</b-col>
              <b-col :class="orderButtonClass(5)" @click="clickOrderButton(5)"
                ><span>600,000</span></b-col
              >
              <b-col :class="orderButtonClass(6)" @click="clickOrderButton(6)"
                ><span>1.5%</span></b-col
              >
            </b-row>
            <b-row class="py-2 order-row">
              <b-col class="order-name">Daily Delta</b-col>
              <b-col :class="orderButtonClass(7)" @click="clickOrderButton(7)"
                ><span>(5,000)</span></b-col
              >
              <b-col :class="orderButtonClass(8)" @click="clickOrderButton(8)"
                ><span>0.135%</span></b-col
              >
            </b-row>
            <b-row class="py-2 order-row">
              <b-col class="order-name">Yield / Exit Fee</b-col>
              <b-col :class="orderButtonClass(9)" @click="clickOrderButton(9)"
                ><span>14.61%</span></b-col
              >
              <b-col :class="orderButtonClass(10)" @click="clickOrderButton(10)"
                ><span>34.65%</span></b-col
              >
            </b-row>
            <b-row class="py-2 order-row">
              <b-col class="order-name">Position</b-col>
              <b-col :class="orderButtonClass(11)" @click="clickOrderButton(11)"
                ><span>20,000</span></b-col
              >
              <b-col :class="orderButtonClass(12)" @click="clickOrderButton(12)"
                ><span>0.0500%</span></b-col
              >
            </b-row>
            <b-row class="py-2 order-row">
              <b-col class="order-name">Quantity</b-col>
              <b-col :class="orderButtonClass(13)" @click="clickOrderButton(13)"
                ><span>*Quantity</span></b-col
              >
              <b-col :class="orderButtonClass(14)" @click="clickOrderButton(14)"
                ><span>0.0025%</span></b-col
              >
            </b-row>
          </div>

          <div class="ruler-container-small">
            <span class="me-1 inflation-span-small">{{ inflationValue }}%</span>
            <div class="range-slider bg-ruler range-slider-small">
              <img
                class="ruler-image"
                src="@/assets/images/ruler.svg"
                width="170"
              />
              <span class="ruler-pointer-value" :style="leftValue">
                {{ inflationValue }}
              </span>
              <b-form-input
                id="inflation-range myRange"
                class="slider input-slider"
                v-model="inflationValue"
                type="range"
                min="0"
                max="100"
              ></b-form-input>
            </div>
          </div>

          <div class="btn-group">
            <button class="stake-btn">Stake</button>
            <button class="stake-btn withdraw-btn">Withdraw</button>
          </div>
        </div>
      </div>
    </div>

    <!-- down container -->
    <div class="down-container">
      <div class="left-container box-background">
        <div class="stake-box">
          <div class="title">my Stakes</div>
          <div class="stake-content">
            <table class="stake-table stake-table-big">
              <tbody>
                <tr class="first-tr">
                  <th class="first-cell">Contracts</th>
                  <th>Maturity</th>
                  <th>Time(Years)</th>
                  <th>UXX</th>
                  <th>Yield</th>
                  <th>Exit Fee %</th>
                  <th>Exit Fee UXX</th>
                </tr>
                <tr v-for="(e, i) in stakeData" :key="i">
                  <td class="first-cell">{{ e.contracts }}</td>
                  <td>{{ e.maturity }}</td>
                  <td>{{ e.time }}</td>
                  <td>{{ e.uxx }}</td>
                  <td>{{ e.yield }}</td>
                  <td>{{ e.feePro }}</td>
                  <td>{{ e.feeUxx }}</td>
                </tr>
              </tbody>
            </table>
            <table class="stake-table stake-table-small">
              <tbody>
                <tr>
                  <th class="first-cell">Contracts</th>
                  <td>{{ stakeData[selectedStake - 2].contracts }}</td>
                  <td>{{ stakeData[selectedStake - 1].contracts }}</td>
                </tr>
                <tr>
                  <td class="first-cell">Maturity</td>
                  <td>{{ stakeData[selectedStake - 2].maturity }}</td>
                  <td>{{ stakeData[selectedStake - 1].maturity }}</td>
                </tr>
                <tr>
                  <td class="first-cell">Time(Years)</td>
                  <td>{{ stakeData[selectedStake - 2].time }}</td>
                  <td>{{ stakeData[selectedStake - 1].time }}</td>
                </tr>
                <tr>
                  <td class="first-cell">UXX</td>
                  <td>{{ stakeData[selectedStake - 2].uxx }}</td>
                  <td>{{ stakeData[selectedStake - 1].uxx }}</td>
                </tr>
                <tr>
                  <td class="first-cell">Yield</td>
                  <td>{{ stakeData[selectedStake - 2].yield }}</td>
                  <td>{{ stakeData[selectedStake - 1].yield }}</td>
                </tr>
                <tr>
                  <td class="first-cell">Exit Fee %</td>
                  <td>{{ stakeData[selectedStake - 2].feePro }}</td>
                  <td>{{ stakeData[selectedStake - 1].feePro }}</td>
                </tr>
                <tr>
                  <td class="first-cell">Exit Fee UXX</td>
                  <td>{{ stakeData[selectedStake - 2].feeUxx }}</td>
                  <td>{{ stakeData[selectedStake - 1].feeUxx }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div
        class="stake-slide-right mb-4 mt-2"
        v-show="width < 504"
        @click="stakeSlideRight"
      >
        Slide Right
        <b-icon icon="caret-right-fill"></b-icon>
      </div>

      <div class="p-0 right-container box-background">
        <div class="recent-box">
          <div class="recent-title-container">
            <span>recent Transactions</span>
            <img src="@/assets/images/three_dot.svg" width="20px" />
          </div>
          <div class="recent">
            <table class="recent-table">
              <tbody>
                <tr class="first-tr">
                  <th>Time</th>
                  <th>Account</th>
                  <th>Action</th>
                  <th>UXX Gross</th>
                  <th>Maturity</th>
                </tr>
                <tr>
                  <td>09:25</td>
                  <td>genesis1…</td>
                  <td>STAKE</td>
                  <td>100,000</td>
                  <td>DEC26</td>
                </tr>
                <tr>
                  <td>09:25</td>
                  <td>genesis1…</td>
                  <td>STAKE</td>
                  <td>100,000</td>
                  <td>DEC26</td>
                </tr>
                <tr>
                  <td>09:25</td>
                  <td>genesis1…</td>
                  <td>STAKE</td>
                  <td>100,000</td>
                  <td>DEC26</td>
                </tr>
                <tr>
                  <td>09:25</td>
                  <td>genesis1…</td>
                  <td>STAKE</td>
                  <td>100,000</td>
                  <td>DEC26</td>
                </tr>
                <tr>
                  <td>09:25</td>
                  <td>genesis1…</td>
                  <td>STAKE</td>
                  <td>100,000</td>
                  <td>DEC26</td>
                </tr>
                <tr>
                  <td>09:25</td>
                  <td>genesis1…</td>
                  <td>STAKE</td>
                  <td>100,000</td>
                  <td>DEC26</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <HelpModal :show="showHelpModal" />
  </b-container>
</template>

<script>
import LineChart from "./components/LineChart";
import MiniLineChart from "./components/MiniLineChart";
import HelpModal from "./components/Help";
import { BIcon } from "bootstrap-vue";

export default {
  data() {
    return {
      width: window.innerWidth,
      inflationValue: 0,
      orderType: "Single",
      stats: {
        circulating: "40,000,000",
        staked: "24,000,000",
        mining: "33%",
        duration: 5.125,
        yield: "16.61%",
      },
      initialGraphData: [
        {
          t: 0.5,
          st: 2.5,
          ytstake: 13.13,
          ryt: -0.07,
        },
        {
          t: 1,
          st: 2.5,
          ytstake: 14.03,
          ryt: 0.82,
        },
        {
          t: 1.5,
          st: 2.5,
          ytstake: 14.98,
          ryt: 1.78,
        },
        {
          t: 2,
          st: 2.5,
          ytstake: 16.01,
          ryt: 2.8,
        },
        {
          t: 2.5,
          st: 2.5,
          ytstake: 17.1,
          ryt: 3.9,
        },
        {
          t: 3,
          st: 2.5,
          ytstake: 18.27,
          ryt: 5.06,
        },
        {
          t: 3.5,
          st: 2.5,
          ytstake: 19.51,
          ryt: 6.31,
        },
        {
          t: 4,
          st: 2.5,
          ytstake: 20.85,
          ryt: 7.64,
        },
        {
          t: 4.5,
          st: 2.5,
          ytstake: 22.27,
          ryt: 9.06,
        },
        {
          t: 5,
          st: 2.5,
          ytstake: 23.79,
          ryt: 10.58,
        },
        {
          t: 5.5,
          st: 2.5,
          ytstake: 25.41,
          ryt: 12.21,
        },
        {
          t: 6,
          st: 2.5,
          ytstake: 27.14,
          ryt: 13.94,
        },
        {
          t: 6.5,
          st: 2.5,
          ytstake: 29,
          ryt: 15.79,
        },
        {
          t: 7,
          st: 2.5,
          ytstake: 30.98,
          ryt: 17.77,
        },
        {
          t: 7.5,
          st: 2.5,
          ytstake: 33.09,
          ryt: 19.89,
        },
        {
          t: 8,
          st: 2.5,
          ytstake: 33.35,
          ryt: 22.14,
        },
        {
          t: 8.5,
          st: 2.5,
          ytstake: 37.76,
          ryt: 24.56,
        },
        {
          t: 9,
          st: 2.5,
          ytstake: 40.34,
          ryt: 27.13,
        },
        {
          t: 9.5,
          st: 2.5,
          ytstake: 43.09,
          ryt: 29.89,
        },
        {
          t: 10,
          st: 2.5,
          ytstake: 46.03,
          ryt: 32.83,
        },
      ],
      stakeData: [
        {
          contracts: "MARCH21",
          maturity: "30-MAR-21",
          time: "3.1",
          uxx: "100,001",
          yield: "12.91%",
          feePro: "-30.51%",
          feeUxx: "(30,51)",
        },
        {
          contracts: "MARCH22",
          maturity: "30-MAR-22",
          time: "3.2",
          uxx: "100,002",
          yield: "12.92%",
          feePro: "-30.52%",
          feeUxx: "(30,52)",
        },
        {
          contracts: "MARCH23",
          maturity: "30-MAR-23",
          time: "3.3",
          uxx: "100,003",
          yield: "12.93%",
          feePro: "-30.53%",
          feeUxx: "(30,53)",
        },
        {
          contracts: "MARCH24",
          maturity: "30-MAR-24",
          time: "3.4",
          uxx: "100,004",
          yield: "12.94%",
          feePro: "-30.54%",
          feeUxx: "(30,54)",
        },
        {
          contracts: "MARCH25",
          maturity: "30-MAR-25",
          time: "3.5",
          uxx: "100,005",
          yield: "12.95%",
          feePro: "-30.55%",
          feeUxx: "(30,55)",
        },
        {
          contracts: "MARCH26",
          maturity: "30-MAR-26",
          time: "3.6",
          uxx: "100,006",
          yield: "12.96%",
          feePro: "-30.56%",
          feeUxx: "(30,56)",
        },
      ],
      orderToggle: true,
      orderedNumber: [1],
      leftValue: "left: 0",
      showHelpModal: false,
      selectedStake: 2,
      chartValue: 0,
      boxLeftBottom: "left: 0; bottom: 170px;",
      boxShow: false,
    };
  },
  computed: {
    graphData() {},
  },
  watch: {
    inflationValue: function (val1, val2) {
      if (this.width >= 768) this.leftValue = `left: ${val1 * 2.5 - 3}px`;
      else this.leftValue = `left: ${val1 * 1.7 - 3}px`;
    },
    width(v1, v2) {
      console.log("dapp= ", v1, v2);
    },
  },
  methods: {
    clickOrderButton: function (num) {
      const found = this.orderedNumber.findIndex((e) => e === num);
      if (found == -1) this.orderedNumber.push(num);
      else this.orderedNumber.splice(found, 1);
    },
    orderButtonClass: function (num) {
      const found = this.orderedNumber.findIndex((e) => e === num);
      if (found == -1) return "order-button";
      else return "order-button clicked-order-button";
    },
    handleResize() {
      this.width = window.outerWidth;
      this.boxShow = false;
    },
    stakeSlideRight() {
      const temp = this.selectedStake + 2;
      if (temp == 8) this.selectedStake = 2;
      else this.selectedStake = temp;
    },
    clickMiniChart(value, index) {
      console.log(value, index);
      this.boxShow = true;

      if (this.width >= 300 && this.width < 400) {
        this.chartValue = parseInt(value);
        this.boxLeftBottom = `left: ${-14 + index * 11}px; bottom: ${
          170 + index * 3
        }px;`;
      } else if (this.width >= 400 && this.width < 504) {
        this.chartValue = parseInt(value);
        this.boxLeftBottom = `left: ${index * 14}px; bottom: ${
          170 + index * 3.2
        }px;`;
      } else if (this.width >= 504 && this.width < 575) {
        this.chartValue = parseInt(value);
        this.boxLeftBottom = `left: ${index * 19}px; bottom: ${
          170 + index * 3.2
        }px;`;
      } else if (this.width >= 575 && this.width < 768) {
        this.chartValue = parseInt(value);
        this.boxLeftBottom = `left: ${index * 19}px; bottom: ${
          170 + index * 3.2
        }px;`;
      }
    },
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  components: {
    LineChart,
    MiniLineChart,
    BIcon,
    HelpModal,
  },
};
</script>