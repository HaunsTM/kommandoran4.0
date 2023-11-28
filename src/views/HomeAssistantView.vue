<template>
  <div class="iframe-container">
    <iframe src="http://10.0.0.6:8123" title="Home Assistant" class="responsive-iframe"></iframe>
  </div>
</template>

<style scoped>

  .iframe-container {
    position: relative;
    width: 100%;
    padding-bottom: 60%; /* 16:9 Aspect Ratio */
    height: 0;
    overflow: hidden;
  }

  .responsive-iframe {
    position: absolute;
    top: 0;
    left: 0;
    border: 0;
    width: 100%;
    height: 100%;
  }

</style>
