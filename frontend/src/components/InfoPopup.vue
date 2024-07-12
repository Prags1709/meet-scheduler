<template>
    <div class="info-popup" :style="customStyle">
        {{ info.msg }}
    </div>
</template>

<script>
export default {
    props: ['info'],
    computed: {
    customStyle() {
      return {
        backgroundColor: this.info.popupColor 
      };
    }
  }
}
</script>

<style>
.info-popup {
    height: auto;
    width: 22%;
    font-size: 20px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 30px;
    left: 50%;
    transform: translateX(-50%);
    padding: 10px 20px;
}
</style>