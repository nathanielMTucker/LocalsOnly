export default `
enum Role {
    FREE
    PREM
    ADMIN
}

type User {
    avatar: Avatar
    name : String
    handler : String
    authID : String
    email : String
    localTo : String
    softLocalTo : [String]
    owns : [Local!] @relation
    birthday : Birthday
    updateLocalTo : String,
    dateUpdateLocalTo : Date
    reviews : [Review!] @relation 
    role : Role
    images : [Image] @relation
}

type Birthday @embedded {
    day : Int,
    month : Int,
    year : Int
}

type Image {
    user : User! @relation
    local : Local! @relation
    review: Review @relation
    url : String!
    description : String
}

type Avatar {
    user: User! @relation
    url: String!
}

type Local {
    name : String
    owner : User
    description : String
    reviews : [Review!] @relation
    reviewCount : Int
    rating : Float
    address : Address
    price : Int
    hours : Hours
    localsOnly : Boolean
    website : String
    phoneNumber : String
    geo : Geo
    quick : Quick
    city : String
    state : String
    images : [Image] @relation
}



type Quick @embedded {
    twentyOnePlus : Boolean
    familyFriendly : Boolean
    takeout : Boolean
    dineIn : Boolean
    delivery : Boolean
    dogFriendly : Boolean
} 

type Address @embedded {
    street : String
    apt : String
    city : String
    state : String
    zip : String
}
type Hours @embedded{
    monday : Day
    tuesday : Day
    wednesday : Day
    thursday : Day
    friday : Day
    saturday : Day
    sunday : Day
}
type Day @embedded{
    from : String
    to : String
    closed : Boolean
}
type Review {
    local : Local!
    reviewer : User!
    review : String
    rating : Float
    upvote : Int
    downvote : Int
    shares : Int
    actual : Float
    userUpvoted: [User!] @relation
    images: [Image!] @relation
}

type Geo @embedded{
    lat : String!
    lng : String!
}



type Query {
    allLocals : [Local]
    allUsers : [User]
    userAuth(authID : String!) : User
    localByLocation(city : String!, state : String!) : [Local]
}
`