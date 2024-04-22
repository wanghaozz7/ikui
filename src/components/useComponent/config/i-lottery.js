export default {
  title: {
    text: "lottery 抽奖器",
    desc: "",
  },
  lists: [
    {
      title: "lottery Attributes",
      type: "attributes",
      listData: [
        {
          params: "group",
          desc: "奖项组",
          type: "Array",
          optional: "",
          default: "[]",
        },
        {
          params: "delay",
          desc: "抽奖花费的时间",
          type: "Number",
          optional: "",
          default: "3000",
        },
        {
          params: "turn",
          desc: "旋转的圈数",
          type: "Number",
          optional: "",
          default: "5",
        },
      ],
    },
  ],
  children: [
    {
      id: "use-i-lottery-1",
      title: {
        text: "基础用法",
        desc: "基础用法",
      },
      code: `
      <template>
        <i-lottery />
      </template>
      <script setup>
      const group = [{
        name: '1',
        weight: 4,
        bgc: 'purple'
      }, {
        name: '2',
        weight: 2,
        bgc: 'blue'
      }, {
        name: '2',
        weight: 2,
        bgc: 'lightgreen'
      }, {
        name: '4',
        weight: 2,
        bgc: 'brown'
      }];
      </script>
      `,
      defaultChecked: true,
    },
  ],
};
