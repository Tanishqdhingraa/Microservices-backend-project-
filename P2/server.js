 
async function testredisconnection() {
    try {
        // Connect to Redis
        await client.connect();
        console.log("Connected to Redis client");

        // Store a key-value pair in Redis
        await client.set('name', 'tanishq');

        // Retrieve the stored value
        const extractvalue = await client.get('name');
        console.log(extractvalue); // Output: tanishq

        // delte the key 
        const deletecount = await client.del('name')// del is use to delete 
        console.log(deletecount);// no of keys deleted here 
        
        const updatevalue = await client.get('name');
        console.log(updatevalue);// null 

        await client.set('count', 10);     // Set numeric value
        const increment = await client.incr('count'); // Increments by 1
        console.log(increment); // Output: 11

        const decrement = await client.decr('count'); // Decrease by 1
        console.log(decrement); // Output: 10

        
        
    } catch (error) {
        console.log(error);
    } finally {
        // Close the Redis connection
        await client.quit();
    }
}

testredisconnection();
