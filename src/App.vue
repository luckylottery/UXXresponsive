<template>
  <div id="app">
    <div class="header-container">
      <header class="max-width">
        <div id="nav">
          <router-link to="/" class="navbar">
            <img src="@/assets/images/logo.png" alt="" />
            <div id="logoText">UXX</div>
          </router-link>
          <div
            class="links"
            v-show="width > 1280"
            v-if="!$route.path.startsWith('/app')"
          >
            <router-link to="/about">About</router-link>
            <router-link to="/summary">Summary</router-link>
            <router-link to="/resource">Resource</router-link>
            <router-link to="/contact">Contact</router-link>
            <router-link to="/system">System</router-link>
            <router-link to="/learn">Learn</router-link>
          </div>

          <div class="links home" v-show="width > 1280" v-else>
            <router-link to="/app">Home</router-link>
            <router-link to="/app/stake">stake</router-link>
            <router-link to="/app/mine">mine</router-link>
          </div>
        </div>
        <div class="d-flex">
          <div
            id="social"
            v-show="width >= 768"
            v-if="!$route.path.startsWith('/app')"
          >
            <img src="@/assets/images/telegram.png" alt="" />
            <img src="@/assets/images/discord.png" alt="" />
            <router-link to="/app"
              ><button to="/app" class="btn-app">App</button></router-link
            >
          </div>

          <!-- dapp page -->
          <div v-show="width > 760" v-else>
            <button class="btn-header dark-background me-1">
              <img src="@/assets/images/wifi.svg" />
            </button>
            <button class="btn-header dark-background me-3">
              Connect Wallet
            </button>
            <button class="btn-header light-background">
              <img src="@/assets/images/setting.svg" />
            </button>
          </div>

          <div id="nav-button" v-show="width < 1280">
            <div class="nav-button-icon"></div>
            <div class="nav-button-icon"></div>

            <b-dropdown
              id="header-dropdown"
              text=""
              right
              v-if="!$route.path.startsWith('/app')"
            >
              <b-dropdown-item @click="changeRoute('/about')">About</b-dropdown-item>
              <b-dropdown-item @click="changeRoute('/summary')">Summary</b-dropdown-item>
              <b-dropdown-item @click="changeRoute('/resource')">Resource</b-dropdown-item>
              <b-dropdown-item @click="changeRoute('/contact')">Contact</b-dropdown-item>
              <b-dropdown-item @click="changeRoute('/system')">System</b-dropdown-item>
              <b-dropdown-item @click="changeRoute('/learn')">Learn</b-dropdown-item>
            </b-dropdown>

            <!-- dapp page -->
            <b-dropdown id="header-dropdown" right v-else>
              <b-dropdown-item @click="changeRoute('/app')"
                >Home</b-dropdown-item
              >
              <b-dropdown-item @click="changeRoute('/app/stake')"
                >Stake</b-dropdown-item
              >
              <b-dropdown-item @click="changeRoute('/app/mine')"
                >Mine</b-dropdown-item
              >
              <b-dropdown-item v-show="width < 768">
                <span class="btn-header dark-background me-1"
                  ><img src="@/assets/images/wifi.svg"
                /></span>
                <span class="btn-header dark-background me-3"
                  >Connect Wallet</span
                >
              </b-dropdown-item>
            </b-dropdown>
          </div>
        </div>
      </header>
      <div class="border-bottom" v-if="$route.path.startsWith('/app')"></div>
    </div>
    <div>
      <router-view />
    </div>
  </div>
</template>
<script>
const throttle = (func, limit = 1) => {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};
export default {
  data() {
    return {
      width: window.innerWidth,
    };
  },
  computed: {
    gridItem: (s) => s.grid.find((item) => item.label == s.gridLabel),
    desktop: (s) => s.width > 1122,
    mobile: (s) => s.width < 771,
  },
  mounted() {
    window.addEventListener("resize", throttle(this.updateDimensions), true);
    console.log(this.$route);
  },
  methods: {
    updateDimensions(e) {
      this.width = window.innerWidth;
    },
    changeRoute(url) {
      this.$router.push(url).catch((err) => {
        console.log("duplicate url");
      });
    },
  },
};
</script>
<style>
@import url("./assets/css/App.css");
</style>
