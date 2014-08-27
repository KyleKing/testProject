var bikesData = [
  {
    title: 'Bike #1',
    status: 'Good',
    needs: 'none',
    repaired: '2014-08-12',
    latitude: '38.983046',
    longitude: '-76.949717'
  },
  {
    title: 'Bike #2',
    status: 'BadBadBad',
    needs: 'Needs Parts',
    repaired: '2014-08-12',
    latitude: '38.982043',
    longitude: '-76.942719'
  },
  {
    title: 'Bike #3',
    status: 'Good',
    needs: 'none',
    repaired: '2014-08-12',
    latitude: '38.932046',
    longitude: '-76.949717'
  },
  {
    title: 'Bike #4',
    status: 'Good',
    needs: 'none',
    repaired: '2014-08-12',
    latitude: '38.982346',
    longitude: '-76.942797'
  },
  {
    title: 'Bike #5',
    status: 'Good',
    needs: 'none',
    repaired: '2014-08-12',
    latitude: '38.982043',
    longitude: '-76.949797'
  },
  {
    title: 'Bike #6',
    status: 'Good',
    needs: 'none',
    repaired: '2014-08-12',
    latitude: '38.932046',
    longitude: '-76.949717'
  },
  {
    title: 'Bike #7',
    status: 'Good',
    needs: 'none',
    repaired: '2014-08-12',
    latitude: '38.983046',
    longitude: '-76.942719'
  },
  {
    title: 'Bike #8',
    status: 'Good',
    needs: 'none',
    repaired: '2014-08-12',
    latitude: '38.985046',
    longitude: '-76.943717'
  },
  {
    title: 'Bike #9',
    status: 'Good',
    needs: 'none',
    repaired: '2014-08-12',
    latitude: '38.982056',
    longitude: '-76.932717'
  },
  {
    title: 'Bike #10',
    status: 'Good',
    needs: 'none',
    repaired: '2014-08-12',
    latitude: '38.582046',
    longitude: '-76.942713'
  },
  {
    title: 'Bike #11',
    status: 'Good',
    needs: 'none',
    repaired: '2014-08-12',
    latitude: '38.952046',
    longitude: '-76.942317'
  },
  {
    title: 'Bike #12',
    status: 'Good',
    needs: 'none',
    repaired: '2014-08-12',
    latitude: '38.982056',
    longitude: '-76.942737'
  }
];

Template.bikesList.helpers({
  bikes: bikesData
});