export const lightTheme = {
    token: {
        colorPrimaryBg: "#19504C",
        colorText: "#0E1446",
        colorPrimaryText: "#2fbfa0",
        colorBgTextHover: "#19504C",
        colorLink: "white",
        colorTextSecondary: "black",
        colorFillContent: "white",
        colorBgLayout: "#F0F3F4",
        motionDurationMid: "0.1s",
        motionDurationSlow: "0.1s",
        colorBgMask: "rgba(0, 0, 0, 0.1)",
    },
    components: {
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
        colorPrimaryBg: "#1E2125",
        colorText: "white",
        colorPrimaryText: "#2fbfa0",
        colorBgTextHover: "#032030",
        colorLink: "white",
        colorTextSecondary: "white",
        colorBgContainer: "#1A202C",
        colorFillContent: "#006494",
        colorBgLayout: "#2A2B2E",
    },
    components: {
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