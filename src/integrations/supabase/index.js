import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

import React from "react";
export const queryClient = new QueryClient();
export function SupabaseProvider({ children }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
}

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

/* supabase integration types

### users

| name     | type   | format | required |
|----------|--------|--------|----------|
| id       | uuid   | string | true     |
| username | text   | string | true     |
| email    | text   | string | true     |
| created_at | timestamp | string | true |

### posts

| name     | type   | format | required |
|----------|--------|--------|----------|
| id       | uuid   | string | true     |
| user_id  | uuid   | string | true     |  // foreign key to users
| title    | text   | string | true     |
| content  | text   | string | true     |
| created_at | timestamp | string | true |

### comments

| name     | type   | format | required |
|----------|--------|--------|----------|
| id       | uuid   | string | true     |
| post_id  | uuid   | string | true     |  // foreign key to posts
| user_id  | uuid   | string | true     |  // foreign key to users
| content  | text   | string | true     |
| created_at | timestamp | string | true |

### patterns

| name     | type   | format | required |
|----------|--------|--------|----------|
| id       | uuid   | string | true     |
| name     | text   | string | true     |
| description | text | string | true     |
| created_at | timestamp | string | true |

*/

// Hooks for users table
export const useUsers = () => useQuery({
    queryKey: ['users'],
    queryFn: () => fromSupabase(supabase.from('users').select('*')),
});

export const useUser = (id) => useQuery({
    queryKey: ['users', id],
    queryFn: () => fromSupabase(supabase.from('users').select('*').eq('id', id).single()),
});

export const useAddUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newUser) => fromSupabase(supabase.from('users').insert([newUser])),
        onSuccess: () => {
            queryClient.invalidateQueries('users');
        },
    });
};

export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedUser) => fromSupabase(supabase.from('users').update(updatedUser).eq('id', updatedUser.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('users');
        },
    });
};

export const useDeleteUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('users').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('users');
        },
    });
};

// Hooks for posts table
export const usePosts = () => useQuery({
    queryKey: ['posts'],
    queryFn: () => fromSupabase(supabase.from('posts').select('*')),
});

export const usePost = (id) => useQuery({
    queryKey: ['posts', id],
    queryFn: () => fromSupabase(supabase.from('posts').select('*').eq('id', id).single()),
});

export const useAddPost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newPost) => fromSupabase(supabase.from('posts').insert([newPost])),
        onSuccess: () => {
            queryClient.invalidateQueries('posts');
        },
    });
};

export const useUpdatePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedPost) => fromSupabase(supabase.from('posts').update(updatedPost).eq('id', updatedPost.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('posts');
        },
    });
};

export const useDeletePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('posts').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('posts');
        },
    });
};

// Hooks for comments table
export const useComments = () => useQuery({
    queryKey: ['comments'],
    queryFn: () => fromSupabase(supabase.from('comments').select('*')),
});

export const useComment = (id) => useQuery({
    queryKey: ['comments', id],
    queryFn: () => fromSupabase(supabase.from('comments').select('*').eq('id', id).single()),
});

export const useAddComment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newComment) => fromSupabase(supabase.from('comments').insert([newComment])),
        onSuccess: () => {
            queryClient.invalidateQueries('comments');
        },
    });
};

export const useUpdateComment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedComment) => fromSupabase(supabase.from('comments').update(updatedComment).eq('id', updatedComment.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('comments');
        },
    });
};

export const useDeleteComment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('comments').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('comments');
        },
    });
};

// Hooks for patterns table
export const usePatterns = () => useQuery({
    queryKey: ['patterns'],
    queryFn: () => fromSupabase(supabase.from('Patterns').select('*')),
});

export const usePattern = (id) => useQuery({
    queryKey: ['patterns', id],
    queryFn: () => fromSupabase(supabase.from('Patterns').select('*').eq('id', id).single()),
});

export const useAddPattern = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newPattern) => fromSupabase(supabase.from('Patterns').insert([newPattern])),
        onSuccess: () => {
            queryClient.invalidateQueries('patterns');
        },
    });
};

export const useUpdatePattern = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedPattern) => fromSupabase(supabase.from('Patterns').update(updatedPattern).eq('id', updatedPattern.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('patterns');
        },
    });
};

export const useDeletePattern = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('Patterns').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('patterns');
        },
    });
};