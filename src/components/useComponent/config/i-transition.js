export default {
  title: {
    text: "Transition 过渡动画",
    desc: "通过节点和连线绘制简易的思维导图 目前支持拖动、重命名、添加和删除功能",
  },
  lists: [
    {
      title: "Transition Attributes",
      type: "attributes",
      listData: [
        {
          params: "name",
          desc: "过渡动画的类型",
          type: "String",
          optional:
            "scale-in-out/scale-rotate/zoom-in-x/zoom-in-y/shrink-in-top/shrink-in-bottom/shrink-in-left/shrink-in-right/translate-right-down/ease-in-out/linear/ease-in",
          default: "",
        },
      ],
    },
  ],
  defaultUnfold: false,
  children: [
    {
      id: "use-i-transition-1",
      title: {
        text: "过渡动画",
        desc: "",
      },
      code: ``,
    },
  ],
};
