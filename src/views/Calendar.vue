<template>
  <Calendar startDate="2018-03-07" :dateData="data">
    <div slot="header-left">
      <Button>month</Button>
      <Button>week</Button>
    </div>

    <div
            :class="['calendar-item', { 'is-otherMonth': !isCurMonth }]"
            slot-scope="item"
    >
      <div
              :class="['calendar-item-date']">
        {{item.date.date}}
      </div>
      <div class="calendar-item-name">{{item.data.title}}</div>
    </div>
  </Calendar>
</template>

<script>
</script>