<template>

  <v-card>
    <v-card-title>
      Transport
    </v-card-title>
    <v-card-subtitle>
      Bus
    </v-card-subtitle>
    <v-table>
      <thead>
        <tr>
          <th></th>
          <th colspan="2" class="text-center">current</th>
          <th colspan="2" class="text-center">next</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>Lund</th>
          <template v-if="departureLund?.lines[0]">
            <td class="text-right">{{departureLund?.lines[0]?.journeyTime}}</td>
            <td class="text-left">({{departureLund?.lines[0]?.line}})</td>
          </template>
          <template v-else>
            <td class="text-right">N/A</td>
            <td class="text-left">N/A</td>
          </template>
          <template v-if="departureLund?.lines[1]">
            <td class="text-right">{{departureLund?.lines[1]?.journeyTime}}</td>
            <td class="text-left">({{departureLund?.lines[1]?.line}})</td>
          </template>
          <template v-else>
            <td class="text-right">N/A</td>
            <td class="text-left">N/A</td>
          </template>
        </tr>
        <tr>
          <th>Malmö</th>
          <template v-if="departureMalmo?.lines[0]">
            <td class="text-right">{{departureMalmo?.lines[0]?.journeyTime}}</td>
            <td class="text-left">({{departureMalmo?.lines[0]?.line}})</td>
          </template>
          <template v-else>
            <td class="text-right">N/A</td>
            <td class="text-left">N/A</td>
          </template>
          <template v-if="departureMalmo?.lines[1]">
            <td class="text-right">{{departureMalmo?.lines[1]?.journeyTime}}</td>
            <td class="text-left">({{departureMalmo?.lines[1]?.line}})</td>
          </template>
          <template v-else>
            <td class="text-right">N/A</td>
            <td class="text-left">N/A</td>
          </template>
        </tr>
      </tbody>
    </v-table>
  </v-card>
</template>

<script lang="ts">



import { Component, Vue } from 'vue-facing-decorator';
import { useDepartureStore } from '../stores/departureStore';
import IDeparture from '@/interfaces/iDeparture';

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

</style>
