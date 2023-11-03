<template>
  <img :src="require(`@/assets/bus32x32.png`)" />
  <table>
    <thead>
      <tr class="border-bottom">
        <th></th>
        <th colspan="2" class="border-left">current</th>
        <th colspan="2" class="border-left">next</th>
      </tr>
    </thead>
    <tbody>
      <tr class="border-bottom">
        <th>Lund</th>
        <template v-if="departureLund?.lines[0]">
          <td class="border-left">{{departureLund?.lines[0]?.journeyTime}}</td>
          <td>({{departureLund?.lines[0]?.line}})</td>
        </template>
        <template v-else>
          <td class="border-left">-</td>
          <td>-</td>
        </template>
        <template v-if="departureLund?.lines[1]">
          <td class="border-left">{{departureLund?.lines[1]?.journeyTime}}</td>
          <td>({{departureLund?.lines[1]?.line}})</td>
        </template>
        <template v-else>
          <td class="border-left">-</td>
          <td>-</td>
        </template>
      </tr>
      <tr class="border-bottom">
        <th>Malmö</th>
        <template v-if="departureMalmo?.lines[0]">
          <td class="border-left">{{departureMalmo?.lines[0]?.journeyTime}}</td>
          <td>({{departureMalmo?.lines[0]?.line}})</td>
        </template>
        <template v-else>
          <td class="border-left">-</td>
          <td>-</td>
        </template>
        <template v-if="departureMalmo?.lines[1]">
          <td>{{departureMalmo?.lines[1]?.journeyTime}}</td>
          <td>({{departureMalmo?.lines[1]?.line}})</td>
        </template>
        <template v-else>
          <td class="border-left">-</td>
          <td>-</td>
        </template>
      </tr>
    </tbody>
  </table>
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
table {
    table-layout: fixed;
    font-size: 2rem; /* Adjust this value as needed */
}

td {
    text-align: right;
    padding-left: 10px;
    padding-right: 10px;
}
tr.border-bottom td,
tr.border-bottom th {
  border-bottom: 1px solid white;
}
.border-left {
  border-left: 1px solid white;
}
</style>
