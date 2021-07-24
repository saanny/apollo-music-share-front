import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CreateSongInput = {
  title: Scalars['String'];
  artist: Scalars['String'];
  url: Scalars['String'];
  duration: Scalars['Float'];
  thumbnail: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createSong: Song;
};


export type MutationCreateSongArgs = {
  input: CreateSongInput;
};

export type Query = {
  __typename?: 'Query';
  songs: Array<Song>;
  song?: Maybe<Song>;
};


export type QuerySongArgs = {
  id: Scalars['String'];
};

export type Song = {
  __typename?: 'Song';
  id: Scalars['String'];
  title: Scalars['String'];
  artist: Scalars['String'];
  url: Scalars['String'];
  thumbnail: Scalars['String'];
  duration: Scalars['Float'];
  created_at: Scalars['String'];
};

export type CreateSongMutationVariables = Exact<{
  title: Scalars['String'];
  artist: Scalars['String'];
  url: Scalars['String'];
  thumbnail: Scalars['String'];
  duration: Scalars['Float'];
}>;


export type CreateSongMutation = (
  { __typename?: 'Mutation' }
  & { createSong: (
    { __typename?: 'Song' }
    & Pick<Song, 'id' | 'title' | 'artist' | 'url' | 'thumbnail' | 'duration'>
  ) }
);

export type SongsQueryVariables = Exact<{ [key: string]: never; }>;


export type SongsQuery = (
  { __typename?: 'Query' }
  & { songs: Array<(
    { __typename?: 'Song' }
    & Pick<Song, 'id' | 'title' | 'artist' | 'url' | 'thumbnail' | 'duration'>
  )> }
);


export const CreateSongDocument = gql`
    mutation createSong($title: String!, $artist: String!, $url: String!, $thumbnail: String!, $duration: Float!) {
  createSong(
    input: {title: $title, artist: $artist, url: $url, thumbnail: $thumbnail, duration: $duration}
  ) {
    id
    title
    artist
    url
    thumbnail
    duration
  }
}
    `;
export type CreateSongMutationFn = Apollo.MutationFunction<CreateSongMutation, CreateSongMutationVariables>;

/**
 * __useCreateSongMutation__
 *
 * To run a mutation, you first call `useCreateSongMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSongMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSongMutation, { data, loading, error }] = useCreateSongMutation({
 *   variables: {
 *      title: // value for 'title'
 *      artist: // value for 'artist'
 *      url: // value for 'url'
 *      thumbnail: // value for 'thumbnail'
 *      duration: // value for 'duration'
 *   },
 * });
 */
export function useCreateSongMutation(baseOptions?: Apollo.MutationHookOptions<CreateSongMutation, CreateSongMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSongMutation, CreateSongMutationVariables>(CreateSongDocument, options);
      }
export type CreateSongMutationHookResult = ReturnType<typeof useCreateSongMutation>;
export type CreateSongMutationResult = Apollo.MutationResult<CreateSongMutation>;
export type CreateSongMutationOptions = Apollo.BaseMutationOptions<CreateSongMutation, CreateSongMutationVariables>;
export const SongsDocument = gql`
    query songs {
  songs {
    id
    title
    artist
    url
    thumbnail
    duration
  }
}
    `;

/**
 * __useSongsQuery__
 *
 * To run a query within a React component, call `useSongsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSongsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSongsQuery({
 *   variables: {
 *   },
 * });
 */
export function useSongsQuery(baseOptions?: Apollo.QueryHookOptions<SongsQuery, SongsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SongsQuery, SongsQueryVariables>(SongsDocument, options);
      }
export function useSongsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SongsQuery, SongsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SongsQuery, SongsQueryVariables>(SongsDocument, options);
        }
export type SongsQueryHookResult = ReturnType<typeof useSongsQuery>;
export type SongsLazyQueryHookResult = ReturnType<typeof useSongsLazyQuery>;
export type SongsQueryResult = Apollo.QueryResult<SongsQuery, SongsQueryVariables>;