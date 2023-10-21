<template>
	<article class="flex-container" v-if="departureLund && departureMalmo">
        <div class="flex-container column">
                <img :src="require(`@/assets/bus32x32.png`)" />
        </div>
        <div class="flex-container column">
            <div class="flex-container">

               <div class="flex-container column">
                    <div class="current-ride" v-if="departureLund?.lines[0]">
                        <span>Mot Lund:</span>
                        <span>{{departureLund?.lines[0]?.name}}</span>
                        <span class="line-info">{{departureLund?.lines[0]?.journeyTime}}</span>                   
                    </div>
                    <div class="current-ride" v-if="departureMalmo?.lines[0]">
                        <span>Mot Malmö:</span>
                        <span>{{departureMalmo?.lines[0]?.name}}</span>
                        <span class="line-info">{{departureMalmo?.lines[0]?.journeyTime}}</span>                   
                    </div>
                </div>
                
                <div class="flex-container column">
                    <span class="next-ride" v-if="departureLund?.lines[1]">
                        <span>({{departureLund?.lines[1]?.name}}</span>
                        <span>{{departureLund?.lines[1]?.journeyTime}})</span>
                    </span>
                     <span class="next-ride" v-if="departureMalmo?.lines[1]">
                        <span>({{departureMalmo?.lines[1]?.name}}</span>
                        <span>{{departureMalmo?.lines[1]?.journeyTime}})</span>
                    </span>
                </div>
 
            </div>
        </div>
    </article>
</template>

<script lang="ts">



import { Component, Vue } from 'vue-facing-decorator';
import { useDepartureStore } from '../stores/departureStore';
import IDeparture from '@/interfaces/iDeparture';
import ITransportData from '@/interfaces/iTransportData';

@Component({
    components: {
    },
})
export default class KommandoranFooterTransport extends Vue {
    
    private readonly departureStore = useDepartureStore();
    
    public get departureLund(): IDeparture | undefined {
        const departureLund = this.departureStore.departureLund();

        return departureLund;
    }

    public get departureMalmo(): IDeparture | undefined {
        const departureMalmo = this.departureStore.departureMalmo();

        return departureMalmo;
    }
}
</script>

<style scope>
    .flex-container {
        display: flex;
    }
    .column {
        flex-direction: column;
    }
    .current-ride {
        font-weight: bolder;
    }
    .current-ride > span {
        padding-left: 1rem;
    }
    .line-info {
        font-weight: lighter;
    }
    .scheduled-departure {
        font-weight: bold;
    }
    .next-ride {
        font-weight: lighter;
    }
    .next-ride > span {
        padding-left: 1rem;
    }
</style>
