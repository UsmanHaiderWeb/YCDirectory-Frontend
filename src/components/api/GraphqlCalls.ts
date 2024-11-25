import { gql } from "@apollo/client";

//   User

export const allCreators = gql`
    query allCreators {
        getAllUsers {
            _id
            email
            image
            username
            isPaidUser
            recommendedBy{
                _id
            }
            blogs{
                _id
            }
        }
    }
`


export const TopCreators = gql`
    query TopCreators {
        TopCreators {
            _id
            email
            image
            username
            isPaidUser
            recommendedBy{
                _id
            }
            blogs{
                _id
            }
        }
    }
`

export const SingleCreator = gql`
    query SingleCreator($id: ID!) {
        getSingleUser (id: $id) {
            _id
            email
            image
            username
            isPaidUser
            recommendedBy{
                _id
            }
            blogs{
                _id
                title
                caption
                description
                image
                likedBy {
                    _id
                }
                createdBy {
                    _id
                    username
                    email
                    image
                }
                categories
                tags
                createdAt
            }
            likedBlogs{
                _id
            }
            savedBlogs{
                _id
            }
        }
    }
`

export interface UsersInterface {
    _id: string;
    email: string;
    image: string;
    username: string;
    isPaidUser: boolean;
    recommendedBy: [{
        _id?: string
    }];
    blogs: [BlogInterface];
    likedBlogs?: [{
        _id?: string
    }];
    savedBlogs?: [{
        _id?: string
    }];
}

export const myData = gql`
    query Mydata($clerkId: String!) {
        me (clerkId: $clerkId) {
            _id
            email
            image
            username
            isPaidUser
            recommendedBy{
                _id
            }
            likedCreators{
                _id
            }
            blogs{
                _id
                title
                caption
                description
                image
                likedBy {
                    _id
                }
                createdBy {
                    _id
                    username
                    email
                    image
                }
                categories
                tags
                createdAt
            }
            likedBlogs{
                _id
                title
                caption
                description
                image
                createdBy {
                    _id
                    username
                    email
                    image
                }
                likedBy {
                    _id
                }
                categories
                tags
                createdAt
            }
            savedBlogs{
                _id
                title
                caption
                description
                image
                createdBy {
                    _id
                    username
                    email
                    image
                }
                likedBy {
                    _id
                }
                categories
                tags
                createdAt
            }
        }
    }
`

export interface myDataInterface {
    _id: string;
    email: string;
    image: string;
    username: string;
    isPaidUser: boolean;
    recommendedBy: [{
        _id: string;
    }];
    likedCreators: [{
        _id: string;
    }];
    blogs: BlogInterface[];
    likedBlogs: BlogInterface[];
    savedBlogs: BlogInterface[];
}



//   Blogs

export const allBlogs = gql`
    query allBlogs {
        allBlogs {
            _id
            title
            description
            image
            createdBy {
                _id
                username
                email
                image
            }
            likedBy {
                _id
            }
            categories
            tags
            createdAt
        }
    }
`


export const TopBlogsQuery = gql`
    query TopBlogs {
        TopBlogs {
            _id
            title
            description
            image
            createdBy {
                _id
                username
                email
                image
            }
            likedBy {
                _id
            }
            categories
            tags
            createdAt
        }
    }
`


export const SingleBlogs = gql`
    query SingleBlogs ($id: ID!) {
        getSingleBlog (id: $id) {
            _id
            title
            caption
            description
            image
            createdBy {
                _id
                username
                email
                image
            }
            likedBy {
                _id
            }
            reviews {
                _id
                content
                stars
                reviewedBy {
                    _id
                    username
                    email
                    image
                }
            }
            categories
            tags
            createdAt
        }
    }
`
    
export const searchBlogTitle = gql`
    query allBlogsTitle {
        allBlogs {
            _id
            title
        }
    }
`

    
export interface BlogInterface {
    _id: string;
    title: string;
    caption: string;
    description: string;
    image: string;
    createdBy: {
        _id: string;
        username: string;
        email: string;
        image: string;
    }
    likedBy: [{
        _id: string;
    }]
    reviews: [reviewType]
    categories: string;
    createdAt: string;
    tags: string;
}

export const TestimonialsQuery = gql`
    query TestimonialsQuery {
        appReviews {
            _id
            content
            stars
            reviewedBy {
                _id
                username
                email
                image
            }
        }
    }
`

export type reviewType = {
    _id: string;
    content: string;
    stars: number;
    reviewedBy: {
        _id: string;
        username: string;
        email: string;
        image: string;
    }
}