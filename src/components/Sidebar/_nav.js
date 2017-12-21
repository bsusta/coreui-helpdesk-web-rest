export default {
  items: [
    {
      name: "Filters",
      url: "/filters",
      icon: "fa fa-filter",
      children: [
        {
          name: "Do it",
          url: "/doit",
          icon: "fa fa-play",
          badge: {
            variant: "info",
            text: "4"
          }
        },
        {
          name: "My Pending",
          url: "/pending",
          icon: "fa fa-pause",
          badge: {
            variant: "info",
            text: "4"
          }
        },
        {
          name: "My repeat",
          url: "/my-repeat",
          icon: "fa fa-repeat",
          badge: {
            variant: "info",
            text: "4"
          }
        },
        {
          name: "My closed",
          url: "/myClosed",
          icon: "fa fa-check",
          badge: {
            variant: "info",
            text: "4"
          }
        },
        {
          name: "Filter",
          url: "/mytasks",
          icon: "fa fa-plus"
        }
      ]
    },

    {
      name: "Projects",
      url: "/projects",
      icon: "icon-folder",
      children: [
        {
          name: "Project 1",
          url: "/project",
          icon: "icon-folder",
          badge: {
            variant: "info",
            text: "4"
          }
        },
        {
          name: "Trojstlpec",
          url: "/trojstlpec",
          icon: "icon-folder",
          badge: {
            variant: "info",
            text: "4"
          }
        },
        {
          name: "Project",
          url: "/addProject",
          icon: "fa fa-plus"
        }
      ]
    }
  ]
};
