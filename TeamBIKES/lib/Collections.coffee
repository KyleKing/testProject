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



## WIP
# TBD: Bikes to be redistributed?
@RedistributionCollection = new Mongo.Collection 'redistributionCollection'

@RFIDdata = new Mongo.Collection 'RFIDdata'

# For testing Webix
@Movies = new Mongo.Collection 'movies'