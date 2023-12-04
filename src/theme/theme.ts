export const lightTheme = {
  token: {
    colorPrimaryBg: "#19504C",
    colorText: "#0E1446",
    colorPrimaryText: "#19504C",
    colorBgTextHover: "#19504C",
    colorLink: "white",
    colorTextSecondary: "black",
    colorFillContent: "white",
    colorBgLayout: "#F0F3F4",
    motionDurationMid: "0.1s",
    motionDurationSlow: "0.3s",
    colorBgMask: "rgba(0, 0, 0, 0.1)",
    boxShadowTertiary: "0px 0px 20px 1px rgba(0,0,0,0.1);",
  },
  components: {
    Skeleton: {
      gradientFromColor: "#f6f6f6",
      gradientToColor: "#EDEDED",
    },
    Layout: {
      headerBg: "#19504C",
    },
    Table: {
      headerBg: "#D7E8E4",
      headerColor: "#19504C",
      rowSelectedHoverBg: "#C2E2C9",
      rowSelectedBg: "#6AB67D",
    },
    Input: {
      activeBorderColor: "none",
      activeShadow: "none",
    },
    Select: {
      optionSelectedColor: "white",
    },
    Modal: { titleFontSize: 24 },
    Button: {
      defaultBg: "#006DA4",
      primaryColor: "#19504C",
    },
    Menu: {
      itemSelectedColor: "white",
      itemHoverColor: "white",
      iconSize: 20,
      collapsedIconSize: 20,
    },
    Popover: {
      fontSize: 18,
    },
  },
};

export const darkTheme = {
  token: {
    colorPrimaryBg: "#1d232c",
    colorText: "white",
    colorPrimaryText: "#2fbfa0",
    colorBgTextHover: "#032030",
    colorLink: "white",
    colorTextSecondary: "white",
    colorBgContainer: "#1A202C",
    colorFillContent: "#006494",
    colorBgLayout: "#161b21",
  },
  components: {
    Layout: {
      headerBg: "#1d232c",
    },
    Modal: { titleFontSize: 24 },
    Button: {
      defaultBg: "#032030",
    },
    Menu: {
      itemSelectedColor: "white",
      itemHoverColor: "white",
      iconSize: 17,
    },
    Popover: {
      fontSize: 18,
    },
  },
};
