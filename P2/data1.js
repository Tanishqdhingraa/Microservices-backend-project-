const redis = require('redis');

// ✅ Create a Redis client (v4+ syntax)
const client = redis.createClient({
    socket: {
        host: 'localhost',
        port: 6379
    }
});

// Error listener
client.on('error', (error) => console.log("Redis client error:", error));

async function testredisconnection() {
    try {
        // Connect to Redis
        await client.connect();
        console.log("✅ Connected to Redis");

        // ----------------------------
        // 🔹 STRING OPERATIONS
        // ----------------------------

        // SET: Store a single key-value pair
        await client.set('key', 'tanishq');
        const value = await client.get('key');
        console.log("Stored single value:", value);

        // ----------------------------
        // 🔹 MULTIPLE SET AND GET
        // ----------------------------

        // MSET: Store multiple key-value pairs at once
        await client.mSet({
            'user:name': 'Sangam Bhai',
            'user:email': 'sangam@example.com',
            'user:city': 'Delhi',
            'user:age': '25'
        });

        // MGET: Retrieve multiple values at once
        const userData = await client.mGet(['user:name', 'user:email', 'user:city', 'user:age']);
        console.log("User details:", userData);

        
        // ----------------------------
        // 🔹 LIST OPERATIONS
        // ----------------------------

        // LPUSH: Add elements to the *left* (start) of the list
        await client.lPush('students', 'Tanishq', 'Sangam');
        console.log("➡️ Added elements to left (LPUSH)");

        // RPUSH: Add elements to the *right* (end) of the list
        await client.rPush('students', 'Rahul', 'Amit');
        console.log("➡️ Added elements to right (RPUSH)");

        // LRANGE: Get elements from the list (start to end)
        const allStudents = await client.lRange('students', 0, -1);
        console.log("📋 All students:", allStudents);

        // LPOP: Remove and return element from the *left*
        const leftPop = await client.lPop('students');
        console.log("🧾 Removed from left (LPOP):", leftPop);

        // RPOP: Remove and return element from the *right*
        const rightPop = await client.rPop('students');
        console.log("🧾 Removed from right (RPOP):", rightPop);

        // Final list after pops
        const remaining = await client.lRange('students', 0, -1);
        console.log("✅ Remaining students:", remaining);


        // ----------------------------
        // 🔹 SET OPERATIONS
        // ----------------------------
        // SADD , SMEMBERS , SISMEMBERS SREM

          // SADD → Add unique elements to a set
        await client.sAdd('fruits', 'apple', 'banana', 'mango', 'apple'); 
        // Duplicate 'apple' won’t be added again
        console.log("🍎 Added fruits to set");

        // SMEMBERS → Get all members of the set
        const allFruits = await client.sMembers('fruits');
        console.log("📋 All fruits:", allFruits);

        // SISMEMBER → Check if a specific element exists (1 = yes, 0 = no)
        const isBanana = await client.sIsMember('fruits', 'banana');
        console.log("🍌 Is banana in set?", isBanana ? "Yes" : "No");

        const isGrapes = await client.sIsMember('fruits', 'grapes');
        console.log("🍇 Is grapes in set?", isGrapes ? "Yes" : "No");

        // SREM → Remove element(s) from the set
        await client.sRem('fruits', 'banana');
        console.log("❌ Removed 'banana' from set");

        // Final set after removal
        const updatedFruits = await client.sMembers('fruits');
        console.log("✅ Updated fruits:", updatedFruits);


    } catch (error) {
        console.error("Redis operation error:", error);
    } finally {
        // Quit the connection properly
        await client.quit();
        console.log("🔒 Redis connection closed");
    }
   
}

// Run the function
testredisconnection();
