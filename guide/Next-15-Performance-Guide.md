# Next.js 15 Performance Guide - Best Practices for High-Performance Apps

## 🚀 Quick Start Performance Checklist

**Essential Setup for Maximum Performance:**

- ✅ Use Server Components by default (automatic in Next.js 15)
- ✅ Enable Partial Prerendering (PPR) for hybrid static/dynamic rendering
- ✅ Implement proper caching strategies
- ✅ Use streaming and Suspense boundaries
- ✅ Optimize data fetching patterns

---

## 1. Server vs Client Components - Performance-First Approach

### **Default Rule: Server Components First**

By default, layouts and pages are Server Components, which lets you fetch data and render parts of your UI on the server, optionally cache the result, and stream it to the client.

**Performance Benefits:**

- **Faster First Contentful Paint (FCP)** - HTML sent immediately
- **Reduced JavaScript bundle size** - Logic runs on server
- **Better SEO** - Server-rendered content
- **Secure API access** - Tokens/keys never exposed to client

### **When to Use Each Component Type**

### 🔄 Use **Client Components** Only When You Need:

```tsx
'use client'
import { useState } from 'react'

export default function InteractiveButton() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}

```

**Client Component Requirements:**

- State management (`useState`, `useReducer`)
- Event handlers (`onClick`, `onChange`)
- Browser APIs (`localStorage`, `window`, `geolocation`)
- Lifecycle effects (`useEffect`)
- Custom hooks

### 🏗️ Use **Server Components** When You Need:

```tsx
// Server Component - No 'use client' directive
import { getPost } from '@/lib/data'

export default async function PostPage({ params }) {
  const { id } = await params
  const post = await getPost(id) // Direct database access

  return (
    <div>
      <h1>{post.title}</h1>
      <ClientButton likes={post.likes} />
    </div>
  )
}

```

**Server Component Benefits:**

- Database/API access near data source
- Keep secrets secure (API keys, tokens)
- Reduce client-side JavaScript
- Improve initial page load performance

### **💡 Performance Optimization Patterns**

### **Pattern 1: Minimize Client Bundle Size**

```tsx
// ❌ Bad - Large Layout becomes client component
'use client'
import { Search, Logo, Navigation } from './components'

export default function Layout({ children }) {
  return (
    <>
      <nav>
        <Logo /> {/* Unnecessary client-side rendering */}
        <Navigation /> {/* Unnecessary client-side rendering */}
        <Search /> {/* Only this needs to be interactive */}
      </nav>
      <main>{children}</main>
    </>
  )
}

// ✅ Good - Only interactive part is client component
import Search from './search' // Client Component
import Logo from './logo'     // Server Component
import Navigation from './nav' // Server Component

export default function Layout({ children }) {
  return (
    <>
      <nav>
        <Logo />
        <Navigation />
        <Search /> {/* Only this is 'use client' */}
      </nav>
      <main>{children}</main>
    </>
  )
}

```

### **Pattern 2: Server-to-Client Data Passing**

```tsx
// Server Component
export default async function Page({ params }) {
  const { id } = await params
  const post = await getPost(id) // Server-side data fetching

  // Pass data as props to Client Component
  return <LikeButton likes={post.likes} postId={post.id} />
}

// Client Component
'use client'
export default function LikeButton({ likes, postId }) {
  const [currentLikes, setCurrentLikes] = useState(likes)
  // Interactive functionality here
}

```

---

## 2. Partial Prerendering (PPR) - Next.js 15's Performance Game Changer

### **What is PPR?**

Partial Prerendering (PPR) is a rendering strategy that allows you to combine static and dynamic content in the same route. This improves the initial page performance while still supporting personalized, dynamic data.

**Performance Benefits:**

- **Instant static shell delivery** - Users see content immediately
- **Parallel dynamic loading** - Dynamic parts stream in parallel
- **Single HTTP request** - No extra roundtrips needed
- **Best of both worlds** - Static performance + dynamic personalization

### **Enabling PPR**

```tsx
// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    ppr: 'incremental', // Enable incremental adoption
  },
}

export default nextConfig

```

```tsx
// Enable PPR for specific routes
export const experimental_ppr = true

export default function Layout({ children }) {
  return <div>{children}</div>
}

```

### **PPR Implementation Patterns**

### **Pattern 1: Static Shell with Dynamic User Data**

```tsx
import { Suspense } from 'react'
import { User, AvatarSkeleton } from './user'

export const experimental_ppr = true

export default function Page() {
  return (
    <section>
      {/* Static content - prerendered at build time */}
      <h1>Welcome to Our Store</h1>
      <nav>Shop Categories</nav>

      {/* Dynamic content - streams at runtime */}
      <Suspense fallback={<AvatarSkeleton />}>
        <User /> {/* Uses cookies() - dynamic */}
      </Suspense>
    </section>
  )
}

```

### **Pattern 2: E-commerce Product Page**

```tsx
export const experimental_ppr = true

export default async function ProductPage({ params }) {
  const { productId } = await params
  const product = await getProduct(productId) // Static at build time

  return (
    <div>
      {/* Static product info */}
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} />
      <p>{product.description}</p>

      {/* Dynamic user-specific content */}
      <Suspense fallback={<CartSkeleton />}>
        <AddToCartButton productId={productId} />
      </Suspense>

      <Suspense fallback={<RecommendationsSkeleton />}>
        <PersonalizedRecommendations />
      </Suspense>
    </div>
  )
}

```

---

## 3. Data Fetching - Performance-Optimized Patterns

### **Server Components Data Fetching**

### **Pattern 1: Direct Database/API Access**

```tsx
// ✅ Optimal - Direct server-side data access
export default async function PostsPage() {
  const posts = await fetch('https://api.example.com/posts', {
    cache: 'force-cache' // Cache for performance
  })

  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}

// ✅ Or with database ORM
import { db, posts } from '@/lib/db'

export default async function PostsPage() {
  const allPosts = await db.select().from(posts)

  return (
    <ul>
      {allPosts.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}

```

### **Client Components Data Fetching**

### **Pattern 1: React's `use` Hook for Streaming**

```tsx
// Server Component - Don't await the promise
export default function Page() {
  const posts = getPosts() // Promise not awaited

  return (
    <Suspense fallback={<div>Loading posts...</div>}>
      <Posts posts={posts} />
    </Suspense>
  )
}

// Client Component - Use the promise
'use client'
import { use } from 'react'

export default function Posts({ posts }) {
  const allPosts = use(posts) // Unwrap the promise

  return (
    <ul>
      {allPosts.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}

```

### **Pattern 2: Community Libraries**

```tsx
'use client'
import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((r) => r.json())

export default function BlogPage() {
  const { data, error, isLoading } = useSWR(
    'https://api.example.com/posts',
    fetcher
  )

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <ul>
      {data.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}

```

### **Performance-Critical Data Patterns**

### **Pattern 1: Parallel vs Sequential Fetching**

```tsx
// ❌ Sequential - Slow
export default async function Page({ params }) {
  const { username } = await params
  const artist = await getArtist(username)    // Wait for this
  const albums = await getAlbums(username)    // Then wait for this

  return <div>{artist.name}</div>
}

// ✅ Parallel - Fast
export default async function Page({ params }) {
  const { username } = await params

  // Start both requests simultaneously
  const artistPromise = getArtist(username)
  const albumsPromise = getAlbums(username)

  // Wait for both together
  const [artist, albums] = await Promise.all([
    artistPromise,
    albumsPromise
  ])

  return <div>{artist.name}</div>
}

```

### **Pattern 2: Request Deduplication**

```tsx
import { cache } from 'react'
import 'server-only'

// ✅ Cache function calls within a request
export const getUser = cache(async (id: string) => {
  const user = await db.query.users.findFirst({
    where: eq(users.id, id)
  })
  return user
})

// Multiple calls to getUser(123) will only execute once per request

```

### **Pattern 3: Preloading Data**

```tsx
// ✅ Preload data before it's needed
export default async function Page({ params }) {
  const { id } = await params

  // Start loading item data early
  preload(id)

  // Do other work
  const isAvailable = await checkIsAvailable()

  return isAvailable ? <Item id={id} /> : null
}

export const preload = (id: string) => {
  void getItem(id) // Start fetching without waiting
}

```

---

## 4. Streaming & Suspense - Progressive Loading

### **Performance Benefits of Streaming**

Streaming splits the route into chunks and progressively streams them to the client as they become ready. This allows the user to see parts of the page immediately, before the entire content has finished rendering.

### **Implementation Patterns**

### **Pattern 1: Page-Level Streaming with `loading.js`**

```tsx
// app/dashboard/loading.js
export default function Loading() {
  return <DashboardSkeleton />
}

// app/dashboard/page.js
export default async function DashboardPage() {
  const data = await getSlowData() // Will stream when ready
  return <Dashboard data={data} />
}

```

### **Pattern 2: Component-Level Streaming**

```tsx
import { Suspense } from 'react'

export default function BlogPage() {
  return (
    <div>
      {/* Immediate content */}
      <header>
        <h1>Our Blog</h1>
        <p>Latest posts from our team</p>
      </header>

      {/* Streaming content */}
      <main>
        <Suspense fallback={<PostsSkeleton />}>
          <BlogPosts />
        </Suspense>

        <Suspense fallback={<SidebarSkeleton />}>
          <BlogSidebar />
        </Suspense>
      </main>
    </div>
  )
}

```

### **Pattern 3: Multiple Streaming Sections**

```tsx
export default function Page() {
  return (
    <div>
      <Header /> {/* Renders immediately */}

      <div className="grid grid-cols-2 gap-4">
        <Suspense fallback={<StatsSkeleton />}>
          <UserStats />
        </Suspense>

        <Suspense fallback={<ActivitySkeleton />}>
          <RecentActivity />
        </Suspense>
      </div>

      <Suspense fallback={<TableSkeleton />}>
        <DataTable />
      </Suspense>
    </div>
  )
}

```

---

## 5. Server Actions - Efficient Data Updates

### **Creating High-Performance Server Actions**

```tsx
// actions.ts
'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createPost(formData: FormData) {
  const title = formData.get('title')
  const content = formData.get('content')

  // Update database
  await db.insert(posts).values({ title, content })

  // Revalidate relevant pages
  revalidatePath('/posts')

  // Redirect to new post
  redirect(`/posts/${newPost.id}`)
}

```

### **Performance Patterns**

### **Pattern 1: Form-Based Actions**

```tsx
// Server Component with form
export default function CreatePostForm() {
  return (
    <form action={createPost}>
      <input name="title" placeholder="Post title" />
      <textarea name="content" placeholder="Content" />
      <button type="submit">Create Post</button>
    </form>
  )
}

```

### **Pattern 2: Client Component with Loading States**

```tsx
'use client'
import { useActionState } from 'react'
import { createPost } from '@/app/actions'

export default function CreatePostButton() {
  const [state, action, pending] = useActionState(createPost, null)

  return (
    <button onClick={() => action()}>
      {pending ? 'Creating...' : 'Create Post'}
    </button>
  )
}

```

---

## 6. Caching & Revalidation - Maximum Performance

### **Caching Strategies**

### **Strategy 1: Fetch API Caching**

```tsx
// ✅ Cache forever (until manually revalidated)
const data = await fetch('https://api.example.com/data', {
  cache: 'force-cache'
})

// ✅ Time-based revalidation
const data = await fetch('https://api.example.com/data', {
  next: { revalidate: 3600 } // Revalidate every hour
})

// ✅ No caching for dynamic data
const data = await fetch('https://api.example.com/user-data', {
  cache: 'no-store'
})

```

### **Strategy 2: Database Query Caching**

```tsx
import { unstable_cache } from 'next/cache'

export const getUserById = unstable_cache(
  async (id: string) => {
    return db.query.users.findFirst({
      where: eq(users.id, id)
    })
  },
  ['user'], // Cache key
  {
    tags: ['user'], // For targeted revalidation
    revalidate: 3600 // Time-based revalidation
  }
)

```

### **Revalidation Patterns**

### **Pattern 1: Tag-Based Revalidation**

```tsx
// Tag your data fetching
export async function getUsers() {
  return fetch('https://api.example.com/users', {
    next: { tags: ['users'] }
  })
}

// Revalidate by tag
import { revalidateTag } from 'next/cache'

export async function createUser(userData) {
  // Create user
  await createUserInDB(userData)

  // Revalidate all user-related caches
  revalidateTag('users')
}

```

### **Pattern 2: Path-Based Revalidation**

```tsx
import { revalidatePath } from 'next/cache'

export async function updateProfile(formData) {
  // Update user profile
  await updateUserProfile(formData)

  // Revalidate specific pages
  revalidatePath('/profile')
  revalidatePath('/dashboard')
}

```

---

## 7. Edge Runtime - Ultra-Fast Performance

### **When to Use Edge Runtime**

The Edge Runtime which contains a more limited set of APIs, used in Middleware.

**Performance Benefits:**

- **Faster cold starts** - Minimal runtime overhead
- **Global distribution** - Runs closer to users
- **Lower latency** - Reduced geographical distance

### **Edge Runtime APIs Available**

- Network APIs: `fetch`, `Request`, `Response`, `Headers`
- Web Standards: `URL`, `URLSearchParams`, `Promise`, `JSON`
- Crypto APIs: `crypto`, `SubtleCrypto`
- Stream APIs: `ReadableStream`, `WritableStream`

### **Edge Runtime Limitations**

- No Node.js APIs
- No filesystem access
- Limited to Web Standard APIs
- No `require()` - Use ES modules only

---

## 8. Production Performance Checklist

### **Pre-Deploy Checklist**

### **Component Architecture**

- ✅ Server Components used by default
- ✅ Client Components only where interactive features needed
- ✅ Proper component boundaries established
- ✅ Third-party components wrapped appropriately

### **Data Fetching**

- ✅ Parallel data fetching implemented where possible
- ✅ Request deduplication in place
- ✅ Appropriate caching strategies applied
- ✅ Database queries optimized and cached

### **Streaming & Loading**

- ✅ Suspense boundaries strategically placed
- ✅ Loading states provide meaningful feedback
- ✅ Critical content renders immediately
- ✅ Non-critical content streams progressively

### **Caching Configuration**

- ✅ Static content cached appropriately
- ✅ Dynamic content uses proper cache strategies
- ✅ Revalidation strategies implemented
- ✅ Cache tags used for targeted invalidation

### **Performance Monitoring**

- ✅ Core Web Vitals measured
- ✅ Bundle size monitored
- ✅ Database query performance tracked
- ✅ Cache hit rates monitored

---

## 9. Common Performance Pitfalls

### **❌ Avoid These Mistakes**

### **Mistake 1: Over-using Client Components**

```tsx
// ❌ Don't do this
'use client'
export default function ProductPage({ product }) {
  return (
    <div>
      <h1>{product.name}</h1> {/* No interactivity needed */}
      <p>{product.description}</p> {/* No interactivity needed */}
      <AddToCartButton product={product} /> {/* Only this needs client */}
    </div>
  )
}

// ✅ Do this instead
export default function ProductPage({ product }) {
  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <AddToCartButton product={product} />
    </div>
  )
}

```

### **Mistake 2: Sequential Data Fetching**

```tsx
// ❌ Don't do this
export default async function Dashboard() {
  const user = await getUser()
  const posts = await getPosts()
  const analytics = await getAnalytics()

  return <DashboardContent user={user} posts={posts} analytics={analytics} />
}

// ✅ Do this instead
export default async function Dashboard() {
  const [user, posts, analytics] = await Promise.all([
    getUser(),
    getPosts(),
    getAnalytics()
  ])

  return <DashboardContent user={user} posts={posts} analytics={analytics} />
}

```

### **Mistake 3: Missing Cache Strategies**

```tsx
// ❌ Don't do this
export default async function PostsPage() {
  const posts = await fetch('https://api.example.com/posts') // No caching
  return <PostsList posts={posts} />
}

// ✅ Do this instead
export default async function PostsPage() {
  const posts = await fetch('https://api.example.com/posts', {
    next: { revalidate: 3600 } // Cache for 1 hour
  })
  return <PostsList posts={posts} />
}

```

---

## 10. Advanced Performance Optimization

### **Bundle Size Optimization**

```tsx
// Dynamic imports for better code splitting
const DynamicModal = dynamic(() => import('./Modal'), {
  loading: () => <ModalSkeleton />
})

// Conditional loading
export default function Page() {
  const [showModal, setShowModal] = useState(false)

  return (
    <div>
      <button onClick={() => setShowModal(true)}>
        Open Modal
      </button>
      {showModal && <DynamicModal />}
    </div>
  )
}

```

### **Memory Optimization**

```tsx
// Use React.memo for expensive computations
const ExpensiveComponent = memo(function ExpensiveComponent({ data }) {
  const processedData = useMemo(() => {
    return expensiveProcessing(data)
  }, [data])

  return <div>{processedData}</div>
})

```

### **Database Connection Optimization**

```tsx
// Connection pooling and caching
import { cache } from 'react'

export const getDBConnection = cache(() => {
  return createConnection({
    // Connection pooling configuration
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  })
})

```

---

## 🎯 Key Takeaways for Maximum Performance

1. **Server Components First** - Use client components only when absolutely necessary
2. **Enable PPR** - Get the best of static and dynamic rendering
3. **Optimize Data Fetching** - Use parallel requests and proper caching
4. **Implement Streaming** - Progressive loading for better user experience
5. **Cache Everything** - Use appropriate caching strategies for your data
6. **Monitor Performance** - Track Core Web Vitals and optimize continuously

**Remember**: Next.js 15 is built for performance by default. Follow these patterns, and you'll build incredibly fast applications that scale beautifully.