<template>
  <div id="app">
    
    <div class="header-container">
      <header class="max-width">
        <!-- home -->
        <template v-if="!$route.path.startsWith('/app')">
          <div id="nav">
            <router-link to="/" class="navbar">
              <img src="@/assets/images/logo.png" alt="" />
              <div id="logoText">UXX</div>
            </router-link>
            <div
              class="links"
              v-show="width > 1280"
            >
              <a href="#about">About</a>
              <a href="#summary">Summary</a>
              <a href="#resource">Resource</a>
              <a href="#contact">Contact</a>
              <a href="#system">System</a>
              <a href="#learn">Learn</a>
            </div>
          </div>
          <div class="d-flex">
            <div
              id="social"
              v-show="width >= 768"
            >
              <img src="@/assets/images/telegram.png" alt="" />
              <img src="@/assets/images/discord.png" alt="" />
              <router-link to="/app"
                ><button to="/app" class="btn-app">App</button></router-link
              >
            </div>

            <div id="nav-button" v-show="width < 1280">
              <div class="nav-button-icon"></div>
              <div class="nav-button-icon"></div>

              <b-dropdown
                id="header-dropdown"
                text=""
                right
              >
                <a href="#about">
                  About
                </a>
                <a href="#summary">
                  Summary
                </a>
                <a href="#resource">
                  Resource
                </a>
                <a href="#contact">
                  Contact
                </a>
                <a href="#system">
                  System
                </a>
                <a href="#learn">
                  Learn
                </a>
              </b-dropdown>
            </div>
          </div>
        </template>

        <!-- dapp -->
        <template v-else>
          <div id="nav">
            <router-link to="/" class="navbar">
              <img src="@/assets/images/logo.png" alt="" />
              <div id="logoText">UXX</div>
            </router-link>

            <div class="links home" v-show="width > 1280">
              <router-link to="/app">Home</router-link>
              <router-link to="/app/stake">stake</router-link>
              <router-link to="/app/mine">mine</router-link>
            </div>
          </div>
          <div class="d-flex">
            <!-- dapp page -->
            <div v-show="width > 760">
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

            <div id="nav-button">
              <div class="nav-button-icon"></div>
              <div class="nav-button-icon"></div>

              <!-- dapp page -->
              <b-dropdown id="header-dropdown" right>
                <b-dropdown-item @click="changeRoute('/app')">Home</b-dropdown-item>
                <b-dropdown-item @click="changeRoute('/app/stake')">Stake</b-dropdown-item>
                <b-dropdown-item @click="changeRoute('/app/mine')">Mine</b-dropdown-item>
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
        </template>
      </header>
      <div class="border-bottom" v-if="$route.path.startsWith('/app')"></div>
    </div>

    <div>
      <router-view />
    </div>
    
  </div>
</template>
<script>

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
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    handleResize() {
      this.width = window.outerWidth;
    },
    changeRoute(url) {
      this.$router.push(url).catch((err) => {
      });
    },
  },
};
</script>
<style>
@import url("./assets/css/App.css");
</style>
