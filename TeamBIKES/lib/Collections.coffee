# All bike positional information
@DailyBikeData = new Mongo.Collection 'dailyBikeData'

# Subset of above collection. Only bikes tagged with 'Avilable'
@AvailableBikeLocations = new Mongo.Collection 'availableBikeLocations'
# AvailableBikeLocations.helpers {}

# AvailableBikeLocations.before.insert (userId, doc) ->
#   doc.createdAt = moment().toDate()
#   return

# Specific bike information: repairs, serial number, etc.
@MechanicNotes = new Mongo.Collection 'mechanicNotes'
MechanicNotes.attachSchema new SimpleSchema(
  Timestamp:
    type: String
    label: 'Timestamp'
    max: 200
  Bike:
    type: Number
    label: 'Bike Number'
    min: 0
  Notes:
    type: String
    label: 'Notes'
  Tag:
    type: String
    label: 'Tag')



## WIP
# TBD: Bikes to be redistributed?
@RedistributionCollection = new Mongo.Collection 'redistributionCollection'

@RFIDdata = new Mongo.Collection 'RFIDdata'

# For testing Webix
@Movies = new Mongo.Collection 'movies'
@Books = new Mongo.Collection 'books'

