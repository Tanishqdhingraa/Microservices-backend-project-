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

async function testredisconnection2() {
    try {
        // ✅ Connect to Redis
        await client.connect();
        console.log("✅ Connected to Redis");

        // ----------------------------
        // 🔹 SORTED SET OPERATIONS
        // ----------------------------

        const leaderboard = "game:leaderboard";

        // 🔸 ZADD — Add members with their score
        // Syntax: ZADD key score member
        await client.zAdd(leaderboard, [
            { score: 100, value: "Alice" },
            { score: 200, value: "Bob" },
            { score: 150, value: "Charlie" }
        ]);
        console.log("ZADD → Added players to leaderboard");

        // 🔸 ZRANGE — Get elements by score rank (lowest to highest)
        // Syntax: ZRANGE key start stop [WITHSCORES]
        const playersAsc = await client.zRange(leaderboard, 0, -1, { WITHSCORES: true });
        console.log("ZRANGE → Players by rank (low → high):", playersAsc);

        // 🔸 ZRANK — Get the rank (position) of a specific member
        // Syntax: ZRANK key member
        const bobRank = await client.zRank(leaderboard, "Bob");
        console.log("ZRANK → Bob’s rank:", bobRank);

        // 🔸 ZREM — Remove a member from the sorted set
        // Syntax: ZREM key member
        await client.zRem(leaderboard, "Alice");
        console.log("ZREM → Removed Alice from leaderboard");

        // ✅ Final check after removal
        const updatedList = await client.zRange(leaderboard, 0, -1, { WITHSCORES: true });
        console.log("✅ Final leaderboard:", updatedList);

        const alldata = await client.zRangeWithScores('leaderboard',0 , -1);
        console.log(alldata);
        
    } catch (error) {
        console.error("❌ Error:", error);
    } finally {
        // ✅ Quit the connection properly
        await client.quit();
        console.log("🔒 Redis connection closed here");
    }
}

testredisconnection2();
