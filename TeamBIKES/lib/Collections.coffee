# All bike positional information
@DailyBikeData = new Mongo.Collection 'dailyBikeData'
DailyBikeData.attachSchema new SimpleSchema(
  Bike:
    type: Number
    label: 'Bike Number'
    min: 0
  Day:
    type: Number
    label: 'Day'
    min: 0
    max: 367
  Tag:
    type: String
    label: 'Tag')

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


# All the options from the core documentation at:
# https://github.com/aldeed/meteor-collection2#attach-a-schema-to-meteorusers
Schema = {}
Schema.UserCountry = new SimpleSchema(
  name: type: String
  code:
    type: String
    regEx: /^[A-Z]{2}$/)
Schema.UserProfile = new SimpleSchema(
  firstName:
    type: String
    regEx: /^[a-zA-Z-]{2,25}$/
    optional: true
  lastName:
    type: String
    regEx: /^[a-zA-Z]{2,25}$/
    optional: true
  birthday:
    type: Date
    optional: true
  gender:
    type: String
    allowedValues: [
      'Male'
      'Female'
    ]
    optional: true
  organization:
    type: String
    regEx: /^[a-z0-9A-z .]{3,30}$/
    optional: true
  website:
    type: String
    regEx: SimpleSchema.RegEx.Url
    optional: true
  bio:
    type: String
    optional: true
  country:
    type: Schema.UserCountry
    optional: true)
Schema.User = new SimpleSchema(
  username:
    type: String
    regEx: /^[a-z0-9A-Z_]{3,15}$/
  emails:
    type: [ Object ]
    optional: true
  'emails.$.address':
    type: String
    regEx: SimpleSchema.RegEx.Email
  'emails.$.verified': type: Boolean
  createdAt: type: Date
  profile:
    type: Schema.UserProfile
    optional: true
  services:
    type: Object
    optional: true
    blackbox: true
  roles:
    type: Object
    optional: true
    blackbox: true
  roles:
    type: [ String ]
    optional: true)
Meteor.users.attachSchema Schema.User

# Meteor.users.attachSchema new SimpleSchema(
#   createdAt:
#     type: Date
#     label: 'createdAt'
#   Bike:
#     type: Number
#     label: 'Bike Number'
#     min: 0
#   Notes:
#     type: String
#     label: 'Notes'
#   Tag:
#     type: String
#     label: 'Tag')