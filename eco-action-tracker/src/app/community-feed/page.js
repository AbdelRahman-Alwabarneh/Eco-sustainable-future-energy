import Community from "../../components/community";

async function fetchUser() {
    // Simulating a server-side fetch
    const userResponse = await fetch('http://localhost:3000/api/community/user', { cache: "no-store" });

    if (!userResponse.ok) {
        throw new Error('Error fetching posts');
    }

    // Wait for the JSON data to be parsed
    const data = await userResponse.json();

    return data; // Make sure to return the entire data object
}

async function fetchPosts() {
    // Simulating a server-side fetch
    const postsResponse = await fetch('http://localhost:3000/api/community/posts', { cache: "no-store" });

    if (!postsResponse.ok) {
        throw new Error('Error fetching posts');
    }

    // Wait for the JSON data to be parsed
    const data = await postsResponse.json();

    return data; // Make sure to return the entire data object
}

async function EcoGymEnergyPage() {
    try {
        // Fetch user and posts from the API
        const { user } = await fetchUser();
        const { posts } = await fetchPosts();

        // Now you can use user and posts in your component
        // console.log('User:', user);
        // console.log('------------++++-------');
        // console.log('Posts:', posts);

        // Return your component or render logic here
        return (
            <div className="min-h-screen flex flex-col bg-gradient-to-r from-green-50 to-blue-50">

                <Community user={user} posts={posts} />

            </div>
        );
    } catch (error) {
        console.error('Error in EcoGymEnergyPage:', error);
        return <div>Error loading data</div>; // Handle error accordingly
    }

}

export default EcoGymEnergyPage;