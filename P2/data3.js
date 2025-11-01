const redis = require('redis');

// Create a Redis client
const client = redis.createClient({
  socket: {
    host: 'localhost',
    port: 6379
  }
});

client.on('error', (error) => console.log("Redis client error:", error));

// Async function for working with Redis Hashes
async function useRedisHashes() {
  try {
    // Connect to Redis
    await client.connect();
    console.log("✅ Connected to Redis");

    const hashKey = 'user:1001';

    // HSET → Set multiple fields in hash
    await client.hSet(hashKey, {
      name: 'Tanishq',
      age: 21,
       city: 'Delhi'
    });
    console.log("✅ Hash fields set");

    // HGETALL → Get all fields of hash
    const userData = await client.hGetAll(hashKey);
    console.log("👤 User Data:", userData);

    // HGET → Get specific field
    const userName = await client.hGet(hashKey, 'name');
    console.log("📛 User Name:", userName);

    // HINCRBY → Increment numeric field
    await client.hIncrBy(hashKey, 'age', 1);
    const updatedData = await client.hGetAll(hashKey);
    console.log("🔁 Updated Data:", updatedData);

    // HEXISTS → Check if field exists
    const hasCity = await client.hExists(hashKey, 'city');
    console.log("🏙️ City exists?", hasCity);

    // HDEL → Delete a specific field
    await client.hDel(hashKey, 'city');
    console.log("❌ City field deleted");

    const finalData = await client.hGetAll(hashKey);
    console.log("📦 Final Data:", finalData);

  } catch (err) {
    console.error("❗ Redis error:", err);
  } finally {
    // Always disconnect when done
    await client.disconnect();
    console.log("🔒 Disconnected from Redis");
  }
}

// Run the function
useRedisHashes();
