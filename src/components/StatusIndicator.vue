<template>
    <div class="heart-container">
        <div class="last-contact-text">
            {{secondsSinceLastMQTTReceived}}
        </div>
        <div class="heart-icon">
            <v-icon :color="heartColor" large>{{ svgPath }}</v-icon>
        </div>
    </div>            
</template>

<script lang="ts">

import { mdiHeart } from '@mdi/js';
import moment from "moment";

import { Component, Vue, Watch } from 'vue-facing-decorator';
import { useMqttStore } from '../stores/mqttStore';

@Component
export default class StatusIndicator extends Vue {
    
    private mqttStore = useMqttStore();

    readonly HEART_BEAT_ANIMATION_CYCLE_MS = 700;
    readonly TIME_BEFORE_CONSIDERED_DEAD_MS = 1000 * 8;
    readonly UPDATE_TIMER_TEXT_INTERVAL_MS = 1000;

    timeoutAliveCheckTimerID = -1;
    timeoutHeartAnimationTimerID = -1;
    timeoutTextTimerID = -1;
    storedMQTTReceived!: Date;
    secondsSinceLastMQTTReceived = ""
    
    isDead = false;
    
    heartToggleColor = false;

    heartColor = "";

    /** hooks */
    private created(): void {
        this.resetAliveCheckTimer();
        this.resetHeartAnimationTimer();
        this.resetUpdateSecondsSinceLastMQTTReceivedTimer();
        this.heartColor = "grey";
    }

    @Watch('this.mqttStore.getLastRecievedMqttMessage')
    private onCurrentMQTTReceived() {            
        this.isDead = false;
        this.resetAliveCheckTimer();
        this.resetHeartAnimationTimer();
    }

    
    get svgPath(): string {
        return mdiHeart;
    }

    private updateCurrentHeartColor() {
        if (this.isDead) {
            this.heartColor = "grey";
        } else {
            this.heartColor = this.heartToggleColor ? "red" : "red lighten-4";
        }
    }

    /** alive */

    private setIsDead(): void {
        this.isDead = true;
        this.updateCurrentHeartColor();
    }

    private startAliveCheck(): void {
        this.timeoutAliveCheckTimerID =
            window.setTimeout(this.setIsDead, this.TIME_BEFORE_CONSIDERED_DEAD_MS);
    }

    private resetAliveCheckTimer(): void {
        window.clearTimeout(this.timeoutAliveCheckTimerID);
        this.isDead = false;
        this.startAliveCheck();
    }

    private animateHeartBeat(): void {
        this.heartToggleColor = !this.heartToggleColor;
        this.updateCurrentHeartColor();
    }

    private heartAnimate(): void {
        this.animateHeartBeat();
        this.timeoutHeartAnimationTimerID =
            window.setTimeout(this.resetHeartAnimationTimer, this.HEART_BEAT_ANIMATION_CYCLE_MS);
    }

    private resetHeartAnimationTimer(): void {
        window.clearTimeout(this.timeoutHeartAnimationTimerID);
        this.heartAnimate();
    }

    private updateSecondsSinceLastMQTTReceived() {
        const lastMQTTReceived = moment(this.storedMQTTReceived);
        const now = moment(new Date());
        const duration = moment.duration(now.diff(lastMQTTReceived));
        const seconds = duration.asSeconds();
        const secondsRounded = Math.round(seconds);

        this.secondsSinceLastMQTTReceived = secondsRounded.toString();

        this.timeoutTextTimerID =
            window.setTimeout(this.resetUpdateSecondsSinceLastMQTTReceivedTimer, this.UPDATE_TIMER_TEXT_INTERVAL_MS);
    }
    
    private resetUpdateSecondsSinceLastMQTTReceivedTimer(): void {
        window.clearTimeout(this.timeoutTextTimerID);
        this.updateSecondsSinceLastMQTTReceived();
    }

    private beforeDestroy(): void {
        if (this.timeoutAliveCheckTimerID) {
            window.clearTimeout(this.timeoutAliveCheckTimerID);
        }
        if (this.timeoutHeartAnimationTimerID) {
            window.clearTimeout(this.timeoutHeartAnimationTimerID);
        }
        if (this.timeoutTextTimerID) {
            window.clearTimeout(this.timeoutTextTimerID);
        }
    }

}
</script>

<style scope>
    .heart-container {
        height: 100%;
        width: 20px;
        position: relative;
    }
    .heart-icon {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        
        z-index: 10;
    }
    .last-contact-text {
        position: absolute;
        width: 1rem;
        top: 0.5rem;
        left: 0.6rem;
        background-color: white; 
        
        text-align: center;

  border-radius: 15px;
        z-index: 100;
    }

</style>