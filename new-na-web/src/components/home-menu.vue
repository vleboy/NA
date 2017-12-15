<template>
  <div class="home-menu">
    <div class="pc-menu">
      <h1>
        <img src="../assets/img/logo.png" alt="">
        <p>新亚洲集团</p>
      </h1>
      <nav>
        <ul>
          <li class="active">首页</li>
          <li>NA优势</li>
          <li>创新产品</li>
          <li>NA游戏</li>
          <li>服务方案</li>
          <li>联系我们</li>
          <li>游戏下载</li>
        </ul>
      </nav>
    </div>

    <div class="mobile-menu" >
      <div class="mobile-menu-left">
        <div class="mobile-menu-icon">
          <div class="navbar-burger" @click="showMenu = !showMenu" :class="{'is-active': showMenu}">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <h1><img src="../assets/img/logo.png" alt=""></h1>
      </div>
      <ul class="mobile">
        <li class="active">NA优势</li>
        <li>创新产品</li>
        <li>NA游戏</li>
        <li>服务方案</li>
        <li>联系我们</li>
        <li>游戏下载</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "home-menu",
  data() {
    return {
      showMenu: false
    };
  }
};
</script>

<style lang="stylus" scoped>
.home-menu {
  position: absolute;
  top: 0;
  left: 0;
  width: 300px;
  height: 100%;
  color: #ffffff;
  background: #00000073;
  text-align: center;
  z-index: 99;

  h1 {
    max-width: 157px;
    margin: 0 auto;
    padding: 50px 0 10px;

    p {
      font-size: 30px;
    }
  }

  nav {
    ul {
      li {
        height: 50px;
        border-bottom: 1px solid #444444;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }

      .active {
        color: #FFCB16;
        background: #000000;
        border-right: 3px solid #FFCB16;
        border-bottom: none;
      }
    }
  }
}

@media (min-width: 768px) and (max-width: 1200px) {
  .home-menu {
    width: 170px;

    h1 {
      max-width: 90px;
      padding: 30px 0 10px;

      p {
        font-size: 18px;
      }
    }

    nav {
      ul {
        li {
          height: 30px;
          font-size: 12px;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .home-menu {
    position: absolute;
    width: 100%;
    height: 100vh;
    background: #000000;

    h1 {
      display: none;

      p {
        display: none;
      }
    }

    nav {
      display: none;
    }

    .mobile-menu-left {
      position: relative;
      display: flex;
      justify-content: center;
      padding: 10px 0;

      .mobile-menu-icon {
        position: absolute;
        top: 0;
        left: 0;
      }

      h1 {
        display: block;
        margin: 0;
        padding: 0;
        width: 70px;
        font-size: 0;

        img {
          width: 100%;
        }
      }
    }

    .mobile {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 40px;

      li {
        width: 200px;
        border-bottom: 1px solid #303030;
        padding: 15px 0;
      }

      .active {
        color: #FFCB16;
      }
    }
  }

  .show {
    display: block;
  }

  .disshow {
    display: none;
  }
}
</style>


