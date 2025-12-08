export const taskCards = [
  {
    id: 1,
    condition: "total",
    title: "Total tasks",
    icon: "fa-chart-column",
    iconColor: "text-emerald-500",
    bgColor: "",
  },
  {
    id: 2,
    condition: "completed",
    title: "Completed",
    icon: "fa-check",
    iconColor: "text-emerald-500",
    bgColor: "bg-emerald-100",
  },
  {
    id: 3,
    condition: "pending",
    title: "Pending",
    icon: "fa-spinner",
    iconColor: "text-amber-500",
    bgColor: "",
  },
];

export const goalCards = [
  {
    id: 1,
    condition: "total",
    title: "Total Goals",
    icon: "fa-bullseye",
    iconColor: "text-emerald-500",
    bgColor: "",
  },
  {
    id: 2,
    condition: "progress",
    title: "Avg Progress",
    icon: "fa-trophy",
    iconColor: "text-amber-500",
    bgColor: "",
  },
  {
    id: 3,
    condition: "completed",
    title: "Completed",
    icon: "fa-check",
    iconColor: "text-emerald-500",
    bgColor: "bg-emerald-100",
  },
];

export const taskFilterBtns = ["All", "Today", "Completed", "Pending"];

export const navBtns = [
  {
    id: "1",
    btnText: "Tasks",
    faIcon: "fa-solid fa-list-check",
    activePage: "tasks",
  },
  {
    id: "2",
    btnText: "Goals",
    faIcon: "fa-solid fa-bullseye",
    activePage: "goals",
  },
  {
    id: "3",
    btnText: "Habits",
    faIcon: "fa-solid fa-arrow-trend-up",
    activePage: "habits",
  },
  {
    id: "4",
    btnText: "Profile",
    faIcon: "fa-regular fa-user",
    activePage: "profile",
  },
];
