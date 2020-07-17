<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-table">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="modal-header">
              <h2>
                <slot name="header">
                </slot>
              </h2>
              <h4>
                <slot name="subheader">
                </slot>
              </h4>
              <font-awesome-icon :icon="times" class="button-close" @click="$emit('close')"/>
            </div>
            <div class="modal-body">
              <slot name="body">
              </slot>
            </div>
            <div class="modal-buttons align-center">
              <slot name="buttons">
              </slot>
            </div>
            <div class="modal-footer">
              <slot name="footer">
              </slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import {faTimes} from '@fortawesome/free-solid-svg-icons';

export default {
  name: 'Modal',
  data() {
    return {
      times: faTimes,
    };
  },
};
</script>

<style scoped>
  .modal-mask {
    position: absolute;
    z-index: 9998;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(252, 252, 252, 0.5);
    display: block;
    transition: opacity .3s ease;
  }

  .modal-table {
    width: 100%;
    height: 100%;
  }

  .modal-table-new {
    overflow-x: hidden;
    overflow-y: auto;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .modal-wrapper {
    display: block;
    vertical-align: middle;
    margin: .5rem;
    height: 100%;
  }

  @media (min-width: 576px) {
    .modal-wrapper {
      max-width: 600px;
      margin: 1.75rem auto;
    }
  }

  .modal-wrapper-new {
    position: relative;
    width: auto;
    margin: .5rem;
    pointer-events: none;
  }

  .modal-container {
    margin: 0px auto;
    padding: 10px 20px;
    color: #382e2e;
    background-color: white;
    border-radius: 7px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
  }

  .modal-header {
    padding-top: 10px;
    display: block;
    text-align: center;
    border: none;
    position: relative;
  }

  .modal-header h3 {
    margin-top: 0;
  }

  .modal-buttons {
    margin: 20px 0;
    text-align: center;
  }

  .modal-default-button {
    float: right;
  }

  /*
   * The following styles are auto-applied to elements with
   * transition="modal" when their visibility is toggled
   * by Vue.js.
   *
   * You can easily play with the modal transition by editing
   * these styles.
   */

  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }

  .button-close {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 40px;
    cursor: hand;
    cursor: pointer;
  }

  .modal-footer > div {
    width: 100%;
  }

  .modal-body {

  .controls {
    margin: 20px 0;
  }

  .form-control {
    width: 68%;
    font-size: 26px;
    display: inline-block;
  }

  .btn {
    display: inline-block;
    width: 30%;
    margin: 0;
    line-height: 19px;
    float: right;
  }

  }
</style>
