const fetchSlots = async (selectedDate: Date) => {
  console.log("fetching slots");

  return [
    {
      id: 1,
      reserved: false,
    },
    {
      id: 2,
      reserved: false,
    },
    {
      id: 3,
      reserved: false,
    },
    {
      id: 4,
      reserved: true,
    },
    {
      id: 5,
      reserved: false,
    },
    {
      id: 6,
      reserved: false,
    },
    {
      id: 7,
      reserved: true,
    },
    {
      id: 8,
      reserved: true,
    },
  ];
};

export default fetchSlots;
