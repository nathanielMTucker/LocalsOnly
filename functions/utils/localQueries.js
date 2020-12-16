const  GET_ALL_LOCALS = `
    query {
        allLocals {
            data {
                name
                _id
                description
            }
        }
    }`

const GET_LOCALS_BY_ID = `
fragment hourRange on Day{
    from
    to
    closed
  }
  fragment week on Hours{
    monday {
          ...hourRange
    }
    tuesday{
          ...hourRange
    }
    wednesday{
          ...hourRange
    }
    thursday{
          ...hourRange
    }
    friday{
          ...hourRange
    }
    saturday{
          ...hourRange
    }
    sunday{
          ...hourRange
    }
  }
    query($id:ID!){
        findLocalByID(id:$id){
            name
            owner
            description 
            reviews{
                rating
                review
            }
            reviewCount
            rating 
            hashtags
            searchTags
            address{
                street
                apt
                city
                state
                zip
            }
            price
            hours{
                ...week
            }
            localsOnly
            website
            phoneNumber
            geo{
                lat
                lng
            }
            quick {
                twentyOnePlus 
                familyFriendly 
                takeout 
                dineIn 
                delivery 
                dogFriendly 
            }
            city 
            state 
        }
    }
`
const QUICK_LOOK_LOCAL = `
fragment hourRange on Day{
    from
    to
    closed
  }
  fragment week on Hours{
    monday {
          ...hourRange
    }
    tuesday{
          ...hourRange
    }
    wednesday{
          ...hourRange
    }
    thursday{
          ...hourRange
    }
    friday{
          ...hourRange
    }
    saturday{
          ...hourRange
    }
    sunday{
          ...hourRange
    }
  }
  query ($city : String!, $state : String!){
    localByLocation(city : $city, state : $state){
      data{
        _id
        name
        address{
          street
          apt
          city
          state
          zip
        }
        hours{
         ...week
        }
        reviewCount
        rating
        price
        localsOnly
        website
        phoneNumber
        geo{
          lat
          lng
        }
        quick{
          twentyOnePlus 
          familyFriendly 
          takeout 
          dineIn 
          delivery 
          dogFriendly 
        }
      }
    }
  }
`

const CREATE_LOCAL = `
    mutation(
        $name: String!, 
        $description: String!,
        $website: String,
        $city: String!,
        $searchTags: [String!],
        $phoneNumber: String,
        $state: String!,
        $geo:GeoInput,
        $price:Int,
        $hours:HoursInput,
        $rating:Int,
        $localsOnly:Boolean,
        $address:AddressInput,
        $quick:QuickInput,
        $owner:ID!,
        $reviewCount:Int,
        $hashtags: [String!]
    ){
        createLocal(data:{
            name:$name , 
            description:$description,
            website:$website,
            city:$city,
            searchTags:$searchTags,
            phoneNumber:$phoneNumber,
            state:$state,
            geo:$geo,
            price:$price,
            hours:$hours,
            rating:$rating,
            localsOnly:$localsOnly,
            address:$address,
            quick:$quick,
            owner:$owner,
            reviewCount:$reviewCount,
            hashtags:$hashtags}){
            _id
        }
    }
`

const UPDATE_LOCAL = `
    mutation($id: ID!, $archived: Boolean!, $name: String!, $url: String!, $description: String!){
        updateLocal(id: $id, data: {name:$name, url:$url, description:$description, archived:$archived}){
            name
            _id
            url
            description
            archived
        }
    }
`

const DELETE_LOCAL = `
    mutation($id: ID!){
        deleteLocal(id:$id){
            _id
        }
    }
`

module.exports = { 
    GET_ALL_LOCALS,
    GET_LOCALS_BY_ID, 
    CREATE_LOCAL, 
    UPDATE_LOCAL,
    DELETE_LOCAL,
    QUICK_LOOK_LOCAL
}