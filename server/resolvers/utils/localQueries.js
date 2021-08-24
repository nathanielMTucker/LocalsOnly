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
            publishedBy{
                _id
            }
            description 
            rating 
            reviewCount
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
            images{
                data{
                    url
                    description
                    user{
                        avatar{
                            data{
                                url
                              }
                        }
                        name
                    }
                }
            }
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
  query ($limit:Int!, $offset:String, $city : String!, $state : String!){
    localByLocation(_size:$limit,_cursor:$offset city : $city, state : $state){
      data{
        _id
        description
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
        images(_size:1){
            data{
                url
            }
        }
      }
      before
      after
    }
  }
`

const CREATE_LOCAL =`
    mutation(
        $name: String!, 
        $description: String!,
        $website: String,
        $city: String!,
        $phoneNumber: String,
        $state: String!,
        $geo:GeoInput,
        $price:Int,
        $hours:HoursInput,
        $rating:Float,
        $localsOnly:Boolean,
        $address:AddressInput,
        $quick:QuickInput,
        $owner:ID!,
        $reviewCount:Int
    ){
        createLocal(data:{
            name:$name , 
            description:$description,
            website:$website,
            city:$city,
            phoneNumber:$phoneNumber,
            state:$state,
            geo:$geo,
            price:$price,
            hours:$hours,
            rating:$rating,
            localsOnly:$localsOnly,
            address:$address,
            quick:$quick,
            publishedBy:{connect:$owner},
            reviewCount:$reviewCount
        }){
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

const GET_LOCAL_RATING = `
    query($id:ID!){
        findLocalByID(id:$id){
            rating
            reviewCount
        }
    }
`
const UPDATE_LOCAL_RATING = `
    mutation($id:ID!, $rating:Float, $reviewCount:Int){
        updateLocal(id:$id, data:{rating:$rating, reviewCount:$reviewCount}){
            rating
            reviewCount
        }
    }
`
module.exports = { 
    GET_ALL_LOCALS,
    GET_LOCALS_BY_ID, 
    CREATE_LOCAL, 
    UPDATE_LOCAL,
    DELETE_LOCAL,
    QUICK_LOOK_LOCAL,
    GET_LOCAL_RATING,
    UPDATE_LOCAL_RATING
}